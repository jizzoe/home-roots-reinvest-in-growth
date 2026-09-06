# Whisper and Vosk local mobile STT research

Depth: standard
Research date: 2026-08-18

## Scope and terminology

This folder follows the requested `mobile-text-to-speech` path, but the two
engines selected for evaluation are **speech-to-text (STT)** engines:

- **Whisper**: the project’s first local STT spike.
- **Vosk**: the lighter local STT comparator.

Text-to-speech (TTS) is a separate decision. The current M1.1 brief keeps
installed-device TTS behind its own boundary and requires a separate check of
offline Haitian Creole voice availability. Neither Whisper nor Vosk supplies
the TTS path being evaluated here.

This research supports planning only. It does not authorize a mobile-repository
implementation, distribution of model assets, use of participant audio, or a
production engine decision.

## Summary

Both candidates can perform recognition entirely on the device after the model
asset is present, so neither requires an API call or has a per-minute service
charge. Their fit diverges at the project’s non-negotiable language requirement:

- **Whisper is the only selected candidate that can be tested for English,
  French, and Haitian Creole from a supported, off-the-shelf multilingual
  model.** Its official language table contains `en`, `fr`, and `ht`.
- **Vosk is the stronger constrained-device comparator for English and French.**
  Its official small models are about 40–41 MB and its project estimates about
  300 MB runtime memory. But its current official model catalog has no Haitian
  Creole model. It therefore cannot meet the three-language baseline without a
  custom model effort, which is outside this spike.
- **Recommendation:** run the approved Whisper-first spike using the
  multilingual `tiny` model, not `tiny.en`; measure it on the inexpensive
  Android floor device and a named iPhone. If it fails the agreed usability or
  device thresholds, run Vosk only as a constrained-device English/French
  comparator—not as a replacement that claims Haitian Creole coverage.

Language-table inclusion is not a quality result. Neither engine has project
evidence yet for Haitian Creole bookkeeping speech, HTG amounts, code-switching,
local product terms, noise, or the target phones. Visible transcript review,
editable proposals, manual entry, and explicit confirmation remain mandatory.

## Project constraints evaluated

| Constraint | Required interpretation for this research |
| --- | --- |
| Offline | Recognition must work with network disabled after the selected model has been installed or bundled. No cloud fallback may be necessary to complete a transaction. |
| Low recurring cost | No per-minute recognition provider charge in the baseline path. Model packaging, app-store distribution, engineering, device, and support costs still exist. |
| Low-priced Android and iPhone | The engine must be measured on the representative inexpensive Android and a named available iPhone; vendor demonstrations or flagship-device tests are not sufficient. |
| Languages | English, French, and Haitian Creole (`ht`) must be evaluated. Haitian Creole cannot be inferred from French. |
| Safe financial workflow | STT creates an editable proposal only. The user reviews and explicitly confirms before a transaction is saved. |
| Replaceability | One `SpeechToTextAdapter` owns the engine integration so UI and transaction logic do not depend on Whisper- or Vosk-specific APIs. |

## Option 1: Whisper via whisper.cpp / whisper.rn

### What it is

Whisper is OpenAI’s open-source multilingual automatic-speech-recognition model.
The upstream code and model weights are MIT licensed. `whisper.cpp` is a C/C++
inference implementation with Android and iOS support, quantization, CPU-only
operation, and platform acceleration. `whisper.rn` is a React Native binding to
`whisper.cpp`; it is the most direct documented fit for the current Expo/React
Native mobile direction.

### Local-only operation and cost

- The selected model runs locally; after its model file is on the device,
  transcription does not require a speech service, account, or network request.
- No recognition usage fee is charged by Whisper, `whisper.cpp`, or
  `whisper.rn`. Engineering time, native build work, model download/bundling,
  app-size impact, power use, and support remain real costs.
- Keep the model asset under explicit application control. A first-time model
  download is not an offline onboarding experience unless the model is bundled
  or downloaded before the user needs speech and its integrity is verified.

### Language fit

| Language | Evidence | Planning interpretation |
| --- | --- | --- |
| English | `en` is in the official language table. | Candidate for the local spike. |
| French | `fr` is in the official language table. | Candidate for the local spike. |
| Haitian Creole | `ht` is explicitly listed as Haitian Creole in the official language table. | Candidate for the local spike; inclusion does **not** establish bookkeeping-quality recognition. |

Use a **multilingual** model (`tiny`, `base`, `small`, and so on), not an
English-only `.en` model, for the three-language evaluation. Avoid automatic
language detection as the first product behavior: pass the user-selected app
language into the engine and report a clear unavailable/failed result instead
of silently transcribing in the wrong language. Code-switching is a test case,
not a promised capability.

### Device footprint and performance

`whisper.cpp` publishes approximate model-only disk and memory figures:

| Multilingual model | Approx. model disk | Approx. inference memory | Use in this project |
| --- | ---: | ---: | --- |
| `tiny` | 75 MiB | ~273 MB | First three-language feasibility test. |
| `base` | 142 MiB | ~388 MB | Escalate only if `tiny` misses quality and the device evidence remains acceptable. |
| `small` | 466 MiB | ~852 MB | Do not make the starting point for low-priced phones. |
| `medium` | 1.5 GiB | ~2.1 GB | Outside a credible low-cost baseline. |
| `large` | 2.9 GiB | ~3.9 GB | Outside a credible low-cost baseline. |

These are upstream library estimates, not a minimum-device requirement and not
the total installed-app footprint. Actual result changes with model,
quantization, audio duration, thermal condition, device RAM/CPU, background
apps, and React Native/native-bridge overhead. The `whisper.rn` README’s
published tests use an iPhone 13 Pro Max and Pixel 6—useful evidence of
platform feasibility, but not representative evidence for the project’s
low-cost Android floor.

### Integration and operational fit

**Strengths**

- Covers all three required recognition languages from one multilingual model.
- Uses a single local model/runtime instead of requiring a separate model per
  selected language.
- Has an established React Native binding and documented Expo-prebuild route.
- Can transcribe a short recorded file; real-time/VAD helpers are available but
  are not required for a first safe transaction-proposal spike.

**Risks and limits**

- Native dependency: Expo Go is not sufficient; a development build and native
  compilation are required.
- The model, native library, and recorded audio require careful app-size,
  memory, storage, lifecycle, interruption, and battery measurement.
- Local processing does not make inaccurate output safe. It must never bypass
  review and confirmation.
- `whisper.rn` is a third-party binding. Pin, inspect, and test its version;
  do not treat upstream Whisper support as a guarantee of binding maturity.

### Whisper integration instructions for the M1.1 spike

1. **Keep the interface first.** Define the application-owned
   `SpeechToTextAdapter` before adding a package. It accepts a local short-audio
   URI and an explicit language, returns transcript/status/diagnostics, and has
   no knowledge of transaction persistence or UI.
2. **Use the multilingual `tiny` model first.** Package or pre-download a
   `ggml` multilingual asset with version, size, checksum, license, and
   recovery behavior recorded. Do not use `tiny.en` for Haitian Creole/French.
3. **Create an Expo development build.** `whisper.rn` requires Expo prebuild;
   use the project’s native-development workflow, not Expo Go. Preserve native
   configuration through app config/config plugins where possible.
4. **Add the binding’s documented native configuration.** This includes its
   iOS CocoaPods step, Android keep rule when ProGuard/R8 is enabled, and an
   appropriate Android NDK version. Re-verify against the pinned binding
   release during implementation.
5. **Register model assets.** Configure Metro for the binding’s `.bin` model
   asset (and `.mil` if Core ML assets are used). Measure installed application
   size both with and without the model rather than assuming an asset is free.
6. **Capture a short foreground recording.** Request microphone permission only
   after the user taps the control. Record a bounded clip, handle denial,
   interruption, cancellation, no storage, and app restart. The adapter may
   normalize audio to the format expected by the chosen binding/runtime.
7. **Initialize, transcribe, release.** Initialize one context for the selected
   model, call file transcription with the explicit `en`/`fr`/`ht` language,
   support cancellation, and release the context/audio file when finished or
   abandoned. Do not retain audio by default.
8. **Return a proposal, never a write.** Send transcript metadata to the existing
   parse/review path; make the transcript and fields editable; save only after
   the existing confirmation action.
9. **Test the physical-device matrix.** Measure cold model load, latency,
   memory, battery/thermal symptoms, app size, transcript correctness, amount
   correctness, and graceful manual fallback on all three languages.

## Option 2: Vosk

### What it is

Vosk is an Apache-2.0 offline speech-recognition toolkit with Android and iOS
targets, streaming APIs, per-language models, and vocabulary/grammar adaptation.
Its design is attractive for constrained devices: the Vosk site describes small
models as suitable for mobile, while the published catalog describes small
models as roughly 50 MB and about 300 MB runtime memory.

### Local-only operation and cost

- A local Vosk model can recognize speech without a speech API, account, or
  network connection. It meets the local-only requirement for languages for
  which a usable model is supplied.
- The engine has no per-minute service fee. Per-language assets add installed
  size, and a multilingual experience may need multiple models or explicit
  language selection.
- For Android, Vosk publishes a Maven artifact and an Android demo. Its official
  installation page says iOS builds are available on request, which makes the
  iPhone integration path less self-service and higher risk than Whisper’s
  documented React Native route.

### Language fit

| Language | Current official-model evidence | Planning interpretation |
| --- | --- | --- |
| English | `vosk-model-small-en-us-0.15`, 40 MB, is listed as lightweight for Android/RPi. | Strong comparator candidate. |
| French | `vosk-model-small-fr-0.22`, 41 MB, is listed as lightweight for Android/iOS/RPi. | Strong comparator candidate. |
| Haitian Creole | No Haitian Creole / `ht` model appears in the current official Vosk model catalog. | Does not meet the required three-language baseline. Do not claim support based on French or generic Vosk portability. |

A custom Haitian Creole acoustic/language model could theoretically change the
result, but it would require training data, linguistic expertise, model
evaluation, licensing, packaging, and ongoing ownership. That is a distinct
research/training initiative, not a configuration task or a reasonable M1.1
fallback.

### Device footprint and performance

| Model/configuration | Approx. model disk | Upstream runtime guidance | Use in this project |
| --- | ---: | ---: | --- |
| Small English | 40 MB | Small models typically require ~300 MB runtime memory. | Android/French-English constrained-device comparison. |
| Small French | 41 MB | Small models typically require ~300 MB runtime memory. | French comparison. |
| English + French installed | ~81 MB before runtime/support assets | One model should be active at a time; test model switching and storage. | Only if the app supports both without downloading on demand. |
| Large French | 1.4 GB | Server-oriented, not a low-cost-phone starting point. | Exclude from M1.1. |

Published Vosk word-error figures use specific public test sets and are not
directly comparable to Whisper results or to Haitian bookkeeping speech. The
project must measure the same synthetic, labeled utterances on the same phones.

### Integration and operational fit

**Strengths**

- Materially smaller English/French model assets than the initial multilingual
  Whisper candidate.
- Streaming API and vocabulary/grammar adaptation can be useful when the
  vocabulary is deliberately restricted to transaction terms.
- Mature Android library distribution via Maven and a native Android demo.
- Apache-2.0 engine and catalog licenses are explicitly published; record the
  individual model license, not just the engine license.

**Risks and limits**

- No current official Haitian Creole model means it cannot fulfill the core
  three-language requirement.
- Vosk models are per-language; language selection and model storage/loading
  add product and technical behavior that Whisper’s multilingual model avoids.
- The current Expo/React Native implementation would need a maintained binding
  or a thin project-owned Expo native module. Do not attach transaction logic to
  the native bridge.
- Official iOS distribution is described as available on request, so validate
  licensing, binary availability, architecture support, and build instructions
  before budgeting an iPhone implementation.

### Vosk integration instructions for a comparator spike

1. **Reuse the same application interface.** Add `VoskSpeechToTextAdapter`
   behind the exact `SpeechToTextAdapter` contract used by Whisper. This makes
   test results comparable and keeps engine-specific result JSON out of the
   product workflow.
2. **Begin with Android, English/French only.** Add the Vosk Android artifact
   through the documented Maven dependency, bundle one small licensed model at
   a time, and adapt the official demo into a narrow native bridge. Do not
   present it as the Haitian Creole solution.
3. **Bridge audio deliberately.** Capture bounded foreground audio in the JS
   layer or native module, pass PCM frames to Vosk’s recognizer, surface partial
   and final text only as adapter events, and stop/release the recognizer on
   cancel, interruption, or backgrounding.
4. **Use language selection, not guesswork.** Select the English or French
   model from the app’s explicit language setting. If no matching local model
   is installed, return `unavailable` and keep manual entry visible.
5. **Treat grammar adaptation as a later controlled experiment.** A restricted
   vocabulary may improve short business terms but can reject legitimate words;
   benchmark generic recognition before enabling it and version any grammar as
   a product artifact.
6. **Resolve iOS before committing.** Obtain/verify the official iOS build path
   or select a supported, reviewed native binding; create a minimal Swift/Expo
   bridge; test a named iPhone. If this cannot be done cleanly, record Vosk as
   Android-only comparator evidence rather than claiming cross-platform support.
7. **Apply the same workflow guardrails.** Make transcript/proposal editable,
   release local audio by default, and never permit recognition output to create
   a financial transaction without explicit confirmation.

## Direct comparison

| Dimension | Whisper (`whisper.cpp` / `whisper.rn`) | Vosk | Result for this project |
| --- | --- | --- | --- |
| Fully local after model availability | Yes. | Yes. | Tie: both can meet offline recognition without a service. |
| Recurring recognition service cost | None. | None. | Tie; engineering/device/support costs remain. |
| English | Supported by multilingual model. | Supported by small official English model. | Tie for language presence. |
| French | Supported by multilingual model. | Supported by small official French model. | Tie for language presence. |
| Haitian Creole | `ht` appears in upstream Whisper language table. | No Haitian Creole model in current official catalog. | Whisper is the only viable first spike for all three languages. |
| Model size / memory | Multilingual tiny: 75 MiB / ~273 MB; base: 142 MiB / ~388 MB. | Small English/French: 40/41 MB; upstream says small models typically ~300 MB runtime. | Vosk is lighter for English/French; not decisive because it lacks `ht`. |
| One model across languages | Yes, multilingual model. | No, usually one model per language. | Whisper simpler for required language set. |
| Android route | Native C++/React Native binding; needs NDK/build configuration. | Published Android artifact/demo. | Vosk lower-friction on Android, but still needs a React Native bridge. |
| iPhone / Expo route | Documented React Native binding, iOS setup, and Expo prebuild route. | iOS build described as available on request; Expo binding not established here. | Whisper lower integration uncertainty. |
| Streaming / grammar | Supports file transcription and optional real-time/VAD helpers. | Native streaming and vocabulary adaptation are core features. | Vosk potentially attractive for a later constrained English/French command grammar. |
| Correctness for Haitian bookkeeping | Unknown; must be benchmarked. | Not testable with current official model catalog. | Do not substitute Vosk for Whisper in M1.1. |

## Recommended spike plan and decision gates

### Recommended sequence

1. Implement the engine-neutral adapter and bounded microphone-recording path.
2. Run Whisper multilingual `tiny` on the representative inexpensive Android
   and named iPhone, offline, for English, French, and Haitian Creole.
3. If Whisper proves usable but misses an agreed quality target, repeat with
   `base` only if memory, latency, storage, and battery evidence supports it.
4. Run Vosk small English and French on the Android floor device as a size,
   latency, and battery comparator only.
5. Decide whether Whisper is acceptable for the three-language path; do not
   make Vosk the default unless the Haitian Creole requirement is explicitly
   changed or a separately governed Haitian model exists.

### Benchmark corpus and measures

Use synthetic or separately approved test audio only. Include short, labeled
utterances in each language that exercise sales, expenses, cash movement,
amounts, HTG/currency terms, dates, product names, pause/restart behavior,
accents, soft speech, and realistic background noise. Keep both engine inputs
and expected transcripts/versioned ground truth reproducible.

Record at least:

- transcript word and critical-field accuracy (amount, type, currency, date);
- cold model load, recording-to-first-result, and final-result latency;
- installed app/model size, free-storage pressure, peak memory, CPU/thermal
  symptoms, and observable battery drain;
- offline success with all network paths disabled;
- denial, interruption, cancellation, no-space, restart, and unavailable-model
  fallback behavior; and
- user’s ability to edit the proposal and complete the same transaction manually.

Define pass/fail thresholds in the M1.1 component proposal before calling either
engine production-ready. Do not use a generic WER alone: a transcript with one
wrong amount is unsafe even if its overall word error rate looks acceptable.

## Shared implementation architecture

The product should own the contract, data lifecycle, and error vocabulary. The
engine should not be allowed to shape transaction records or screen behavior.

```text
User taps Speak
  -> microphone permission and bounded local recording
  -> SpeechToTextAdapter.transcribe({ audioUri, language, requestId })
  -> transcript + status + non-sensitive performance metadata
  -> existing proposal parser
  -> visible, editable review
  -> explicit confirmation
  -> local transaction write
```

Recommended contract shape:

```ts
type SpeechLanguage = "en" | "fr" | "ht";
type SttStatus = "success" | "unavailable" | "permission-denied" |
  "cancelled" | "interrupted" | "failed";

interface SpeechToTextAdapter {
  availability(language: SpeechLanguage): Promise<{ available: boolean; reason?: string }>;
  transcribe(request: {
    audioUri: string;
    language: SpeechLanguage;
    requestId: string;
  }): Promise<{
    status: SttStatus;
    transcript?: string;
    engine: "whisper" | "vosk";
    modelVersion?: string;
    elapsedMs?: number;
  }>;
  cancel(requestId: string): Promise<void>;
  release(): Promise<void>;
}
```

The exact interface belongs in the mobile component’s future proposal, but these
boundaries are important now:

- use the app language setting as input; do not make automatic language
  detection the product’s source of truth;
- never store raw audio by default; clean up on success, failure, cancellation,
  and restart, subject to the later approved retention policy;
- return a normalized product error/status, not engine-specific exception text;
- attach only non-sensitive engine/model/timing diagnostics to test evidence;
- preserve manual entry and visible text when permission, model, engine, or TTS
  is unavailable; and
- put a separate `TextToSpeechAdapter` around installed-device TTS. STT engine
  selection must not dictate the TTS engine.

## Open questions

- What are the exact low-cost Android model, OS version, storage state, and
  named iPhone that establish the M1.1 acceptance matrix?
- What maximum record length, result latency, installed-size increase, peak
  memory, and battery/thermal behavior are acceptable for the transaction flow?
- Does multilingual Whisper `tiny` meet a pre-agreed Haitian Creole
  critical-field accuracy threshold on the target corpus? If not, does `base`
  meet it without failing device thresholds?
- Will model assets be bundled in the app, delivered as a verified optional
  download before use, or made available through a managed device process?
- Is a Vosk iOS package/binding available, licensed, and maintainable enough to
  justify a cross-platform comparator, or should Vosk be Android-only evidence?
- What consent, retention, support, and deletion rules apply if future testing
  moves beyond synthetic audio?

## Sources and source-quality notes

The detailed source register is in [sources.md](sources.md). Technical and
current-product claims use official upstream project, platform, or vendor
documentation wherever available. The binding documentation is a primary source
for that binding, but it is third-party evidence and not a performance guarantee.
The absence of Haitian Creole in Vosk’s current official catalog supports the
limited conclusion that no listed official model is available as of the research
date; it does not prove that no community or future custom model could exist.
