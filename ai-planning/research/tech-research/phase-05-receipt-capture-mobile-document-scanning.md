# Phase 05 Research: Receipt Capture And Mobile Document Scanning

Date: 2026-08-08

Related plan:

- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`
- `phase-01-mobile-foundation-react-native-expo-typescript.md`
- `phase-02-offline-first-sqlite-sync-architecture.md`
- `phase-04-touch-first-bookkeeping-mobile-ux.md`

## Question

How should the mobile proof of concept capture receipts, store receipt images offline, attach them to local transactions, and prepare for later upload/OCR, and does the MVP need true document scanning?

## High-Level Summary

Start with simple receipt photo capture, not full document scanning.

For the MVP, the important user workflow is:

```text
Record expense
  -> attach receipt photo
  -> save transaction and receipt reference locally
  -> show receipt is saved on this phone
  -> upload receipt later when online
```

True document scanning means edge detection, perspective correction, cropping, enhancement, multi-page handling, and sometimes PDF generation. Those features are useful later, but they are not required to prove the first mobile bookkeeping architecture.

Recommended MVP path:

- use `expo-image-picker` first for "take photo" and optionally "choose existing photo";
- copy/compress the selected image into durable app document storage;
- store receipt metadata in SQLite;
- queue upload separately from transaction sync;
- attach receipt status to the transaction row;
- defer OCR/Textract extraction until after capture/upload works.

Use `expo-camera` only if the app needs a custom in-app camera UI. `expo-image-picker` is usually faster for MVP because it can launch the system camera UI and return a local image asset.

## 101 Background

### What Is Receipt Capture?

Receipt capture means the user photographs or selects an image of a receipt and links it to a business transaction.

For this project, receipt capture helps:

- support expense records;
- reduce missing documentation;
- prepare for later OCR/AI extraction;
- give staff/funders traceability from reports back to source documents.

Receipt capture does not need to extract the receipt data immediately. The first useful version can simply attach the image to the transaction.

### What Is Document Scanning?

Document scanning is more than taking a photo.

Scanning usually includes:

- detecting the document edges;
- cropping to the receipt/document boundary;
- correcting perspective;
- improving contrast/readability;
- handling glare or blur;
- supporting multiple pages;
- exporting images or PDFs.

This is valuable, but it introduces more device-specific complexity. For MVP, scanning should be considered a later enhancement unless field users consistently produce unreadable receipt photos.

### What Is OCR?

OCR means optical character recognition. It turns text in an image into machine-readable text.

For receipts, OCR may extract:

- merchant name;
- date;
- total amount;
- tax;
- line items;
- currency;
- payment method.

OCR is not the same as capture. Capture saves the image. OCR reads the image. The project can and should separate those steps.

### What Is Local File Storage?

Photos are files. SQLite should store receipt metadata and file paths, not the full image bytes.

The image file should live in app-controlled file storage. SQLite should store:

- receipt local ID;
- linked transaction local ID;
- local file URI;
- file size;
- MIME type;
- width/height if available;
- upload status;
- server document ID after upload.

### What Is An Upload Queue?

An upload queue is like the sync queue from Phase 2, but for files.

File upload often has different failure modes than JSON sync:

- large file;
- slow connection;
- server upload URL expired;
- app backgrounded;
- upload partially completed;
- user deletes or changes the local file.

So file upload should have its own operation status, even if it is linked to a transaction sync operation.

## Foundational Concepts

### Capture Versus Select

There are two MVP-friendly paths:

- capture a new photo with the camera;
- select an existing receipt image from the photo library.

`expo-image-picker` supports both through system UI. This is a good MVP fit because it avoids building a custom camera surface immediately.

### ImagePicker Versus Camera

`expo-image-picker`:

- launches system camera or photo library UI;
- simpler for MVP;
- included in Expo Go;
- supports permissions and image options;
- returns image asset metadata and local URI.

`expo-camera`:

- renders a camera preview inside the app;
- gives more control over camera UI;
- supports flash/torch/zoom/facing/barcode capabilities;
- requires more custom UI and lifecycle handling;
- only one camera preview can be active at a time.

Recommendation:

- MVP: `expo-image-picker`
- later custom capture UI: `expo-camera`

### Cache Directory Versus Document Directory

Expo file storage distinguishes temporary cache files from durable document files.

Use durable document storage for receipts that must survive app restarts and offline periods.

Do not rely on cache paths returned by camera/picker as the permanent receipt location. The app should copy the image into its own receipt folder under document storage.

### Compression And Resizing

Receipt photos can be large. Large files create problems:

- slower upload;
- more local storage;
- higher cloud storage and transfer costs;
- slower OCR;
- poor performance on low-end devices.

Use compression/resizing, but do not over-compress. OCR and human review need readable text.

Recommended MVP target:

- preserve enough resolution for receipt text;
- compress JPEG quality around `0.7` to `0.85` as a starting range;
- cap very large dimensions if needed;
- keep original only if field testing shows compression hurts readability.

### Metadata

Store metadata early. It helps debugging and future OCR.

Minimum metadata:

- receipt local ID;
- transaction local ID;
- local file URI;
- MIME type;
- file size;
- width;
- height;
- captured at timestamp;
- upload status;
- upload attempt count;
- last upload error.

Optional later metadata:

- image hash;
- EXIF orientation;
- OCR status;
- OCR provider;
- OCR confidence;
- user corrections;
- server document ID.

### Receipt Status Lifecycle

Recommended MVP statuses:

- `local`: saved on this phone;
- `queued`: ready to upload;
- `uploading`: upload in progress;
- `uploaded`: accepted by backend/storage;
- `failed`: upload failed and can be retried;
- `needs_review`: file rejected, unreadable, too large, or linked transaction issue.

User-facing labels:

| Technical State | User-Facing Language |
|---|---|
| `local` / `queued` | Receipt saved on this phone |
| `uploading` | Sending receipt |
| `uploaded` | Receipt sent |
| `failed` | Receipt could not send |
| `needs_review` | Receipt needs review |

### Transaction Sync Versus Receipt Upload

Transaction JSON and receipt image upload should be separate operations.

Recommended flow:

1. Save transaction locally.
2. Save receipt file locally.
3. Store receipt metadata in SQLite.
4. Queue transaction sync.
5. Queue receipt upload.
6. Sync transaction first, or upload receipt with a stable local transaction reference.
7. Backend links receipt to server transaction when both are known.

Simpler MVP:

- require transaction sync before receipt upload;
- receipt upload operation waits until transaction has `server_id`.

This avoids backend complexity in the first implementation.

### Presigned Upload URLs

Later, with S3, the backend should issue presigned upload URLs so the mobile app can upload receipt files directly to object storage without routing large files through the Spring Boot app.

For the prototype, upload can be mocked or sent to a local backend endpoint. Do not introduce S3 until receipt capture and local queue behavior are proven.

### OCR Boundary

AI/OCR should not finalize records automatically.

The safe path:

```text
receipt image
  -> OCR extraction
  -> AI/heuristic structured proposal
  -> deterministic validation
  -> user/staff confirmation
  -> transaction update or new transaction
  -> audit event
```

For Phase 5, stop at image capture and upload status. OCR belongs later.

## Baeldung-Style Technology Introduction

### Taking Or Picking A Receipt Photo

With `expo-image-picker`, the app can launch the system camera:

```ts
import * as ImagePicker from "expo-image-picker";

async function captureReceiptPhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Camera permission was not granted");
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    quality: 0.8,
    allowsEditing: false,
    exif: false,
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0];
}
```

The returned asset includes useful fields such as `uri`, `width`, `height`, `fileSize`, `mimeType`, and `fileName` where available.

### Copying The Image To Durable Storage

The picker/camera may return a temporary file URI. Copy it into durable app storage:

```ts
import { Directory, File, Paths } from "expo-file-system";
import * as Crypto from "expo-crypto";

async function persistReceiptImage(sourceUri: string) {
  const receiptsDir = new Directory(Paths.document, "receipts");
  receiptsDir.create({ intermediates: true, idempotent: true });

  const receiptId = Crypto.randomUUID();
  const targetFile = new File(receiptsDir, `${receiptId}.jpg`);

  new File(sourceUri).copy(targetFile);

  return {
    receiptId,
    localUri: targetFile.uri,
  };
}
```

The exact FileSystem API usage should be verified in implementation against the installed Expo SDK version. The architectural point is stable: copy receipt files into app document storage and store metadata in SQLite.

### Receipt Metadata Table

SQLite should track the receipt file:

```sql
create table receipt_attachments (
  local_id text primary key,
  transaction_local_id text not null,
  server_document_id text,
  local_uri text not null,
  mime_type text,
  file_size_bytes integer,
  width integer,
  height integer,
  upload_status text not null,
  upload_attempt_count integer not null default 0,
  last_upload_error_code text,
  last_upload_error_message text,
  captured_at text not null,
  uploaded_at text,
  foreign key (transaction_local_id)
    references transactions(local_id)
);
```

Upload queue can be either:

- a separate `receipt_upload_operations` table; or
- rows in a generic `sync_operations` table with operation type `upload_receipt`.

For the prototype, a separate table may be easier to reason about because file upload retries have different behavior from JSON transaction sync.

### Adding Receipt Capture To The User Flow

The flow should stay simple:

```text
Enter expense
  -> Add receipt
  -> Take photo
  -> Preview photo
  -> Use photo
  -> Review expense
  -> Save locally
```

Do not force receipts for every expense. Some businesses will have cash expenses with no receipt.

### Custom Camera Later

If system camera/picker UX is not enough, use `expo-camera`:

```tsx
import { CameraView, useCameraPermissions } from "expo-camera";

function ReceiptCamera() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission?.granted) {
    return <Button title="Allow camera" onPress={requestPermission} />;
  }

  return <CameraView style={{ flex: 1 }} facing="back" />;
}
```

This allows a custom capture screen, but it also means the app owns more camera UI behavior.

## Recommendation

For MVP:

1. Use `expo-image-picker` for receipt photo capture and optional image selection.
2. Use `expo-image-manipulator` only if initial images are too large or need rotation/resizing.
3. Copy selected/captured images into app document storage.
4. Store receipt metadata in SQLite.
5. Link each receipt to a local transaction ID.
6. Add a receipt upload status lifecycle.
7. Queue receipt upload separately from transaction creation.
8. Require transaction sync before receipt upload for the first backend integration.
9. Defer true document scanning, OCR, and PDF generation.

Do not start with a commercial scanner SDK or complex document-scanner plugin unless field testing shows simple receipt photos are insufficient.

## Primary Decisions

### Does MVP Need True Document Scanning?

Decision: no.

Simple receipt photo capture is enough for the first proof of concept.

Why:

- it proves camera/photo permissions;
- it proves offline file persistence;
- it proves transaction-to-document linking;
- it proves upload queue design;
- it keeps the architecture focused;
- OCR can use the captured image later.

### ImagePicker Or Camera?

Decision: start with `expo-image-picker`.

Why:

- faster MVP path;
- system camera UI is acceptable;
- supports selecting existing images;
- less custom camera lifecycle code;
- included in Expo Go for early tests.

Move to `expo-camera` later if:

- the app needs guided receipt framing;
- capture quality is poor;
- users need an in-app camera overlay;
- the app needs flash/torch UX control;
- document edge guidance becomes important.

### Where Should Receipt Images Live?

Decision: durable app document storage.

Do not keep only the picker/camera return URI if it points into cache. Copy the image to an app-owned receipt path and store that URI in SQLite.

### Should SQLite Store Image Bytes?

Decision: no.

SQLite stores metadata and local URI. The image remains a file.

### Should Upload Wait For Transaction Sync?

Decision for first implementation: yes.

The simplest dependency model:

- transaction has `server_id` after sync;
- receipt upload then references `server_id`;
- backend/storage associates receipt with the server transaction.

This avoids building temporary server-side local-ID reconciliation in Phase 5.

### What About OCR?

Decision: defer.

Phase 5 captures the source document. Later OCR can run after upload or local capture, but OCR output must become a proposal that requires validation and confirmation.

## Alternatives Considered

### `expo-camera` From Day One

Pros:

- more control over camera UI;
- can add framing guidance;
- supports torch/flash behavior inside the app.

Cons:

- more custom UI and lifecycle handling;
- only one active preview at a time;
- more code before proving the workflow.

Assessment:

- Defer until needed. Use `expo-image-picker` first.

### Full Document Scanner Plugin

Examples:

- `react-native-document-scanner-plugin`;
- Expo-compatible scanner modules;
- native wrappers around Apple VisionKit and Google ML Kit.

Pros:

- edge detection;
- crop/perspective correction;
- better document-like output;
- multi-page support in some libraries.

Cons:

- not usable in Expo Go if native plugin is required;
- may require development builds/config plugins;
- quality and maintenance vary;
- iOS and Android support may differ;
- may add native troubleshooting before the MVP needs it.

Assessment:

- Keep as a later spike after simple receipt capture is tested.

### Commercial Scanning SDK

Examples:

- Scanbot;
- Genius Scan SDK;
- other paid document-capture SDKs.

Pros:

- polished scanning UX;
- better image enhancement;
- support contracts;
- advanced document workflows.

Cons:

- likely paid;
- nonprofit pricing needs research;
- vendor lock-in;
- unnecessary before basic receipt workflow is proven.

Assessment:

- Not recommended for MVP. If considered later, add to nonprofit-cost research.

### Store Original Full-Resolution Images Only

Pros:

- maximum readability;
- better OCR source.

Cons:

- large local storage usage;
- slower uploads;
- higher cloud storage costs;
- worse low-connectivity performance.

Assessment:

- Avoid as default. Keep readable compressed images; revisit if OCR accuracy suffers.

## Prototype Impact

Phase 5 prototype should prove:

- user can attach a receipt photo to an expense;
- app handles camera permission denied/canceled states;
- image is copied to durable app storage;
- receipt metadata is stored in SQLite;
- receipt remains linked after app restart;
- receipt status is visible;
- receipt upload can be queued or mocked;
- receipt upload failure can be retried without retaking the photo;
- transaction can still be saved without a receipt.

Acceptance checks:

- no base64 image storage in SQLite;
- receipt local URI points to app-owned document storage;
- deleting/retrying sync does not lose the receipt file accidentally;
- captured image preview is readable;
- upload status does not block transaction save;
- permission-denied path is understandable.

## Risks / Follow-Up

### Temporary File Loss

Risk:

- picker/camera returns a cache URI that may later be removed.

Mitigation:

- copy to document storage immediately before saving metadata.

### Large File Uploads

Risk:

- high-resolution photos may be too large for low-connectivity users.

Mitigation:

- start with quality around `0.8`;
- measure file sizes;
- add resizing/compression with `expo-image-manipulator` if needed.

### Readability

Risk:

- compressed or blurry receipt photos may be unreadable.

Mitigation:

- show preview before use;
- allow retake;
- keep compression conservative;
- field test with real receipts and low-end phones.

### Platform Differences

Risk:

- Android and iOS return different asset metadata, file extensions, MIME types, and permission behavior.

Mitigation:

- store nullable metadata fields;
- test on both platforms;
- do not rely on asset ID always being present.

### Document Scanner Complexity

Risk:

- adopting a scanner library too early may force native build/debug complexity.

Mitigation:

- defer scanner SDK until simple capture data proves the need.

### OCR Prematurity

Risk:

- adding OCR before capture/upload is reliable mixes too many uncertainties.

Mitigation:

- keep OCR as a later worker/proposal flow.

## Cost / Nonprofit Notes

No immediate nonprofit-cost entry is required if MVP uses Expo libraries:

- `expo-image-picker`
- `expo-camera`
- `expo-file-system`
- `expo-image-manipulator`

Potential future paid/cost items:

- S3 receipt storage and transfer;
- Textract or other OCR;
- commercial document scanner SDK;
- larger EAS build plan if build usage exceeds free tier;
- additional cloud storage/backup costs.

AWS nonprofit credit research already exists in:

- `nonprofit-cost-programs-running-list.md`

If a commercial scanner SDK such as Scanbot or Genius Scan becomes a serious candidate, add it to the nonprofit-cost running list with eligibility, nonprofit discount, application owner, and licensing constraints.

## Recommended Next Action

Create the Phase 5 receipt prototype spec:

- `specs/mobile-poc/receipt-capture-and-upload-queue.md`

The spec should define:

- receipt capture button placement;
- camera permission states;
- selected image metadata;
- durable file copy behavior;
- receipt SQLite schema;
- transaction-to-receipt relationship;
- upload status lifecycle;
- retry behavior;
- what is deliberately out of scope: OCR, true scanning, PDF generation.

Then implement receipt attachment after the base local transaction workflow is stable.

## Sources

- Expo ImagePicker: https://docs.expo.dev/versions/latest/sdk/imagepicker/
- Expo Camera: https://docs.expo.dev/versions/latest/sdk/camera/
- Expo FileSystem: https://docs.expo.dev/versions/latest/sdk/filesystem/
- Expo FileSystem legacy directories: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy/
- Expo ImageManipulator: https://docs.expo.dev/versions/latest/sdk/imagemanipulator/
- Expo config plugins: https://docs.expo.dev/config-plugins/plugins/
- Expo mods/config plugin internals: https://docs.expo.dev/config-plugins/mods/
- Expo DocumentPicker: https://docs.expo.dev/versions/latest/sdk/document-picker/
- react-native-document-scanner-plugin: https://www.npmjs.com/package/react-native-document-scanner-plugin
- Infinite Red ML Kit document scanner docs: https://docs.infinite.red/react-native-mlkit/document-scanner/
- Scanbot React Native document scanner docs: https://docs.scanbot.io/react-native/document-scanner-sdk/quick-start/

## Learn More

Best first reads:

- Expo ImagePicker: https://docs.expo.dev/versions/latest/sdk/imagepicker/
- Expo Camera: https://docs.expo.dev/versions/latest/sdk/camera/
- Expo FileSystem: https://docs.expo.dev/versions/latest/sdk/filesystem/
- Expo ImageManipulator: https://docs.expo.dev/versions/latest/sdk/imagemanipulator/

Good search terms for beginner-friendly follow-up reading:

- `Expo ImagePicker take receipt photo upload`
- `React Native offline file upload queue`
- `Expo FileSystem document directory cache directory`
- `React Native receipt capture OCR workflow`
- `document scanning vs photo capture mobile app`
- `Expo development build document scanner config plugin`
