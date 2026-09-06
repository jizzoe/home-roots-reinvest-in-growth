# On-Device OCR Library Comparison Matrix

Companion to [on-device-ocr-library-selection-findings.md](on-device-ocr-library-selection-findings.md)
and [sources.md](sources.md). Date: 2026-09-04. Every claim here traces to a
numbered source in those documents.

Conducted independently of the prior selection. The incumbent choice was
deliberately not weighted.

## The constant: OCR accuracy is not a differentiator

Every live candidate wraps the same engine — Google ML Kit Text Recognition v2,
bundled artifact `com.google.mlkit:text-recognition:16.0.1`. Bundled and
unbundled variants ship the *same model*; Google's documentation distinguishes
them on packaging, size and update path, not accuracy.

**Consequence: "best quality of text extraction" cannot decide this.** Quality
is set by the engine and the input image, not the wrapper. Selection therefore
turns on packaging control, licence provenance, size and maintenance.

## Disqualified

| Candidate | Reason |
| --- | --- |
| `agoldis/react-native-mlkit-ocr` | Repository **archived**; 22 open issues frozen unresolved. Accepts no fixes. |
| `barthap/expo-ocr` | Last commit 2022-09-07 (~4 years). **No licence detected.** |
| `react-native-vision-camera-text-recognition` | Requires `react-native-vision-camera@4.5.1` + `react-native-worklets-core@1.3.3` as pinned peers — a camera-framework dependency chain far beyond a still-image OCR need. Bundled-vs-Play-Services behaviour undocumented; Expo support undocumented. |

## Live candidates

| Dimension | `rn-mlkit-ocr` 0.3.1 | `expo-mlkit-ocr` 0.2.7 | `@react-native-ml-kit/text-recognition` 2.0.0 |
| --- | --- | --- | --- |
| Bundled (offline) model | **Opt-in** via `ocrUseBundled` | **Always** (only option) | **Always** |
| Defaults to a compliant config? | **No** — defaults to Play Services download | **Yes** | **Yes** |
| Latin-only selectable | **Yes** (`ocrModels: ['latin']`) | Yes (Latin only by design) | **No** — 5 scripts forced |
| Approx. model payload / architecture | ~4 MB | ~4 MB | **~20 MB** (5 x ~4 MB) |
| Structured output (blocks/lines/elements + boxes) | Yes | Yes | Yes |
| Confidence scores | Not documented | Not documented | Not documented |
| Expo config plugin | Yes — with model + bundling control | Yes — iOS engine only | **None** (autolinked on prebuild) |
| Licence file in published package | **MIT, present** | **ABSENT** (npm claims MIT; GitHub detects none) | MIT |
| Weekly downloads | 627 | 3,714 | **44,717** |
| Stars / forks | 31 / 2 | 34 / 2 | **582 / 86** |
| First published | 2025-12-09 (~9 mo) | 2026-05-01 (~4 mo) | mature, 12 versions |
| Last release | 2026-01-22 | 2026-05-06 (all 8 versions in 6 days, silent since) | 2025-09-01 (~12 mo) |
| Maintainers | 1 | 1 | 1 |

## Tradeoffs against this project's constraints

**APK size is a real cost here, not a theoretical one.** The app targets
entrepreneurs in Haiti on low-end devices and constrained bandwidth. Google
states bundled models add ~4 MB per script per architecture. Shipping four
unused scripts (Chinese, Devanagari, Japanese, Korean) for an English/French
app costs roughly 16 MB per architecture for nothing. This is the strongest
argument against the most popular option.

**Licence provenance is a compliance requirement, not a preference.** Component
task 2.1 requires recording licences and attribution. `expo-mlkit-ocr` ships
no LICENCE file in its published package and GitHub detects none, while its
npm metadata declares MIT. That contradiction cannot be resolved from the
artifact itself and would have to be raised with the maintainer.

**Adoption is the incumbent's weakness.** `rn-mlkit-ocr` has the smallest user
base of the three by an order of magnitude, is ~9 months old, and has one
maintainer. It is the least battle-tested option.

**Default-unsafe configuration is a live hazard.** `rn-mlkit-ocr` resolves the
forbidden Play Services artifact unless `ocrUseBundled: true` is set
explicitly. A silent misconfiguration produces a build that violates the M1
no-download requirement while appearing to work on a networked device.

## Recommendation

**Use `rn-mlkit-ocr`, configured `ocrModels: ['latin']` + `ocrUseBundled: true`,
with mandatory build verification.**

Reached independently of the prior decision; it happens to agree with it, but
for stronger reasons than were recorded in August.

1. It is the only candidate offering explicit, auditable control over both
   bundling and script selection — which is exactly the "generated Android
   bundled-model evidence" component task 2.1 demands as proof.
2. It achieves the smallest model payload (~4 MB/arch) tied with
   `expo-mlkit-ocr` and about 16 MB smaller than the popular alternative.
3. It ships a real MIT licence file, satisfying the attribution requirement
   that `expo-mlkit-ocr` cannot currently satisfy.

**Mandatory gate:** verify the generated Android build resolves
`com.google.mlkit:text-recognition` and contains **no** `play-services-mlkit-*`
artifact. If that cannot be proven, the choice fails and does not proceed.

**Contingency:** `expo-mlkit-ocr` — correct-by-construction bundling — but only
if its licence gap is resolved (maintainer confirmation or an added LICENCE
file). Adopt it only if `rn-mlkit-ocr` fails verification or breaks on
SDK 57 / RN 0.86.

**Rejected:** `@react-native-ml-kit/text-recognition`, despite being the most
adopted, because ~16 MB of unusable language models per architecture is a
direct harm to the target users, and it offers no mechanism to opt out.

## The finding that matters more than the package choice

Independent testing of ML Kit against real receipts reports highly variable
results: on three Latin-script receipts, one was read almost faultlessly, one
had letters missed and confused, and a low-resolution receipt (225x335) yielded
only two detected text blocks in total. That source concludes on-device ML Kit
suits extracting keywords or simple information rather than detailed receipt
processing.

**No library choice changes this.** It is a property of the engine. Two
consequences for M1:

- The design's insistence that OCR output stay a non-authoritative, editable
  proposal behind explicit confirmation, with manual entry always available, is
  vindicated as necessary rather than merely cautious.
- Acceptance criteria should measure *graceful degradation* — blank uncertain
  fields, retained image, working manual path — and must not be written as an
  extraction-accuracy threshold, which this engine cannot be relied upon to meet
  on real receipts.

## Open questions

- Neither small candidate declares Expo SDK 57 / React Native 0.86
  compatibility. Only a build proves it.
- No candidate exposes ML Kit confidence scores, so per-field uncertainty must
  be derived from the deterministic parser's own rules, not from the engine.
