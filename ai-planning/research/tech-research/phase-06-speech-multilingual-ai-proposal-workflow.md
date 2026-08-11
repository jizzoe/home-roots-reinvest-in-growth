# Phase 06 Research: Speech, Multilingual UX, And AI Proposal Workflow

Date: 2026-08-08

Related plan:

- `../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md`
- `phase-02-offline-first-sqlite-sync-architecture.md`
- `phase-04-touch-first-bookkeeping-mobile-ux.md`

## Question

How should speech input, multilingual app behavior, translation, text-to-speech, and AI proposal generation fit into the mobile bookkeeping workflow without letting AI directly create final financial records?

## High-Level Summary

Speech and multilingual support should be added as an alternate input path into the same review-and-confirm workflow created for manual entry.

The first safe pattern is:

```text
user speaks
  -> app records short audio clip
  -> backend or worker transcribes speech
  -> backend/AI converts transcript into structured proposal
  -> deterministic validation checks the proposal
  -> user reviews and edits
  -> confirmed proposal becomes a normal local transaction
  -> transaction sync follows existing queue/idempotency rules
```

Do not let speech, translation, or AI post directly to the ledger or backend transaction-intake endpoint.

For the MVP, start with a mocked speech proposal path before integrating real speech-to-text. The UI can accept typed natural language such as "I bought flour for 50 dollars cash" and return a structured proposal. This proves the proposal, review, correction, and confirmation flow without adding microphone, transcription, translation, and AI costs immediately.

Recommended technology direction:

- mobile audio capture: `expo-audio`
- app localization: `expo-localization` plus `i18n-js` or `react-i18next`
- speech-to-text later: Amazon Transcribe or another provider behind an internal interface
- translation later: Amazon Translate or AI-provider translation behind an internal interface
- text-to-speech later: Amazon Polly or native/device TTS where appropriate
- structured AI proposals: Amazon Bedrock structured outputs or provider-abstracted JSON schema validation

## 101 Background

### What Is Speech Input?

Speech input lets the user speak instead of typing. For this app, the user might say:

```text
I sold three bags of rice for 20 dollars cash.
```

The app should not treat that as a final transaction. It should treat it as raw input that may be misheard or misunderstood.

### What Is Speech-To-Text?

Speech-to-text converts audio into written text.

Example:

```text
audio recording -> "I sold three bags of rice for 20 dollars cash"
```

Speech-to-text systems can make mistakes, especially with:

- background noise;
- accents;
- local business terms;
- mixed languages;
- currencies and numbers;
- low-quality microphones;
- short clips with little context.

That is why the transcript must be reviewed or converted into a proposal that the user confirms.

### What Is Translation?

Translation converts text from one language into another.

This project may need translation in multiple places:

- app labels and buttons;
- speech transcripts;
- AI prompts and responses;
- plain-language reports;
- staff-facing review of recipient-entered notes.

Not all translation should happen the same way. Static app labels should use human-reviewed localization files. Dynamic user text can use machine translation or AI, but should be stored with language/source metadata.

### What Is App Localization?

Localization means adapting the app UI to a user's language and region.

It includes:

- translated labels;
- date formats;
- number formats;
- currency display;
- plural rules;
- right-to-left layout if needed;
- culturally appropriate wording.

Localization is not the same as AI translation. App UI strings should be controlled and testable.

### What Is Text-To-Speech?

Text-to-speech reads text out loud.

For this project, it could eventually help users who prefer spoken confirmation:

```text
Record a 50 dollar flour expense?
```

Text-to-speech is useful, but it is not required for the first speech-input prototype. Start with visible text confirmation.

### What Is An AI Proposal?

An AI proposal is a structured suggestion derived from messy input.

Example input:

```text
I bought ten bags of flour for fifty dollars cash.
```

Example proposal:

```json
{
  "proposalType": "transaction",
  "transactionType": "expense",
  "amountMinorUnits": 5000,
  "currencyCode": "USD",
  "categorySuggestion": "inventory_supplies",
  "plainLanguageSummary": "Record a $50 flour purchase paid with cash?",
  "confidence": 0.84,
  "needsUserConfirmation": true
}
```

The proposal is not the record. It becomes a record only after validation and user confirmation.

## Foundational Concepts

### One Workflow, Multiple Input Methods

Manual entry, speech, receipt OCR, and AI should all converge on the same transaction draft/review model.

```text
manual form
speech transcript
receipt OCR
AI suggestion
  -> transaction proposal
  -> validation
  -> review/edit
  -> confirmed transaction
  -> local save
  -> sync queue
```

This keeps the app predictable and reduces special-case financial logic.

### Raw Input Versus Transcript Versus Proposal Versus Transaction

Keep these separate:

- Raw input: audio file, typed natural-language text, receipt image.
- Transcript: speech-to-text result.
- Proposal: structured suggested transaction.
- Transaction draft: app-editable confirmed candidate.
- Final local transaction: saved SQLite transaction after user confirmation.
- Server intake record: backend-accepted synced record.
- Ledger entry: future accounting-system record.

Do not collapse these layers.

### Short Utterance Capture

For MVP speech, record short clips started and stopped by the user.

Avoid always-listening or long background recording. Long/background recording adds privacy, battery, permission, and trust problems.

### Language Selection

Do not rely only on automatic detection.

Recommended MVP model:

- business/user has a preferred app language;
- speech input has an explicit selected language;
- backend can store detected language if used;
- mixed-language support is a later enhancement.

Automatic detection can help, but it can also choose the wrong dialect. Amazon Transcribe notes that giving likely language options can improve language-identification efficiency and accuracy.

### Static Localization Versus Dynamic Translation

Static UI strings:

- buttons;
- field labels;
- validation messages;
- status labels.

Use app localization files and human review where possible.

Dynamic content:

- user speech transcript;
- user notes;
- AI explanations;
- staff review translations.

Use machine translation or AI only where needed, and preserve original text.

### Proposal Schema Versioning

AI output should use a versioned schema:

```json
{
  "schemaVersion": "transaction-proposal.v1",
  "sourceType": "speech_transcript",
  "languageCode": "en-US",
  "proposal": {
    "transactionType": "expense",
    "amountMinorUnits": 5000,
    "currencyCode": "USD"
  }
}
```

Versioning matters because prompts and model behavior will change.

### Deterministic Validation

AI can suggest. Code must validate.

Validation examples:

- amount exists and is positive;
- currency matches business currency;
- type is sale or expense;
- occurred date is plausible;
- category is in allowed list or marked unknown;
- confidence below threshold requires extra confirmation;
- missing fields prompt the user.

### Confidence And Review

Confidence should guide review, not automate final posting.

Examples:

- high confidence: prefill fields and ask for confirmation;
- medium confidence: ask user to verify highlighted fields;
- low confidence: ask follow-up question or fall back to manual form.

### Storage And Auditability

Store enough to debug and audit AI-assisted workflows:

- original transcript;
- source language;
- audio file reference if retained;
- model/provider/version;
- prompt/schema version;
- proposal JSON;
- confidence scores if available;
- validation result;
- user corrections;
- final confirmed transaction ID.

Do not store sensitive audio/transcripts longer than needed without a retention decision.

### Provider Interface

The backend should hide AI/speech vendors behind interfaces:

```text
SpeechToTextProvider
TranslationProvider
TextToSpeechProvider
TransactionProposalProvider
```

This keeps the architecture flexible if AWS, OpenAI, native device APIs, or another provider is better later.

## Baeldung-Style Technology Introduction

### Recording A Short Audio Clip

With Expo Audio, the app can request microphone permission and record audio:

```ts
import {
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  RecordingPresets,
} from "expo-audio";

async function prepareSpeechRecording() {
  const permission = await requestRecordingPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Microphone permission was not granted");
  }

  await setAudioModeAsync({
    allowsRecording: true,
    playsInSilentMode: true,
  });
}

function useSpeechRecorder() {
  return useAudioRecorder(RecordingPresets.HIGH_QUALITY);
}
```

For the MVP, avoid background recording. A press-and-hold or tap-start/tap-stop flow is easier to explain and safer for privacy.

### Localizing App Labels

Expo can read the device locale. A localization library supplies translated strings.

```ts
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    addSale: "Add sale",
    addExpense: "Add expense",
    savedOnPhone: "Saved on this phone",
  },
  es: {
    addSale: "Agregar venta",
    addExpense: "Agregar gasto",
    savedOnPhone: "Guardado en este telefono",
  },
});

i18n.locale = getLocales()[0]?.languageCode ?? "en";
i18n.enableFallback = true;
```

Translation quality should be reviewed with real speakers before field use.

### Transaction Proposal Schema

A proposal schema gives AI a strict target:

```ts
type TransactionProposalV1 = {
  schemaVersion: "transaction-proposal.v1";
  sourceType: "typed_text" | "speech_transcript" | "receipt_ocr";
  sourceLanguageCode: string;
  plainLanguageSummary: string;
  transaction: {
    type: "sale" | "expense" | "unknown";
    amountMinorUnits: number | null;
    currencyCode: string | null;
    categoryId: string | null;
    note: string | null;
    occurredAt: string | null;
  };
  missingFields: string[];
  confidence: number;
  warnings: string[];
};
```

The app should display the proposal as an editable draft, not as a completed transaction.

### Proposal-To-Draft Flow

```ts
function proposalToDraft(proposal: TransactionProposalV1): TransactionDraft {
  return {
    type: proposal.transaction.type === "unknown"
      ? "expense"
      : proposal.transaction.type,
    amountMinorUnits: proposal.transaction.amountMinorUnits,
    currencyCode: proposal.transaction.currencyCode,
    categoryId: proposal.transaction.categoryId,
    note: proposal.transaction.note,
    occurredAt: proposal.transaction.occurredAt
      ? new Date(proposal.transaction.occurredAt)
      : new Date(),
    source: {
      kind: proposal.sourceType,
      schemaVersion: proposal.schemaVersion,
      confidence: proposal.confidence,
      warnings: proposal.warnings,
    },
  };
}
```

Then existing review UI asks:

```text
Record a $50 expense for flour?
```

### Backend Provider Interfaces

Keep providers swappable:

```java
interface SpeechToTextProvider {
  SpeechTranscript transcribe(SpeechAudioInput input);
}

interface TransactionProposalProvider {
  TransactionProposal propose(TransactionProposalInput input);
}
```

The first implementation can return canned proposals. Later it can call Amazon Transcribe and Bedrock.

## Recommendation

Implement Phase 6 in two layers:

### Layer 1: Mocked Proposal Path

Build this first:

- text box for natural-language input;
- "Make suggestion" button;
- mocked or deterministic parser response;
- proposal review/edit screen;
- confirm saves normal local transaction;
- store source/proposal metadata locally if practical.

This proves the product workflow without speech/AI cost.

### Layer 2: Real Speech/AI Integration Later

Add later:

- microphone permission and short audio recording;
- upload or send audio to backend;
- backend transcribes with provider interface;
- backend creates structured proposal through provider interface;
- app reviews/edits/confirms proposal;
- optional text-to-speech reads confirmation.

Use AWS-native services as the default future path only behind interfaces:

- Amazon Transcribe for speech-to-text;
- Amazon Translate for dynamic translation where needed;
- Amazon Polly for text-to-speech;
- Amazon Bedrock for structured transaction proposals.

## Primary Decisions

### Should Speech Post Directly To The Ledger?

Decision: no.

Speech produces raw input. Transcription produces text. AI produces a proposal. User confirmation produces a local transaction. Sync sends that transaction to backend intake.

### Should The MVP Use Real Speech-To-Text Immediately?

Decision: no.

Start with typed natural-language input and mocked proposals. Add real audio capture after the manual/proposal workflow is proven.

### Where Should Speech-To-Text Run?

Recommended future direction: backend/worker, not directly from the mobile app to AWS.

Why:

- avoids putting AWS credentials in the app;
- centralizes provider choices;
- gives better audit metadata;
- allows queueing and retries;
- supports fallback providers later.

### Which Languages Should MVP Support?

Choose one pilot language plus English for development/support.

The exact language should come from the nonprofit's first field context. Do not choose based only on technical convenience.

For architecture, support:

- app UI locale;
- speech input language;
- transcript language;
- proposal language;
- business currency separately.

### Where Should Translation Happen?

Static UI:

- app localization files.

Dynamic user text:

- backend translation provider if staff need to read it in another language;
- preserve original text.

AI proposal prompt:

- either run model in source language if supported, or translate transcript to the model's working language;
- store which path was used.

### Should Text-To-Speech Be Included?

Decision: defer.

Text-to-speech is useful for accessibility and low-literacy workflows, but visible confirmation should come first.

## Alternatives Considered

### Native On-Device Speech Recognition

Pros:

- can feel fast;
- may reduce cloud cost;
- may support some offline behavior depending on OS/language.

Cons:

- React Native/Expo support may require third-party native modules;
- behavior differs across iOS and Android;
- language support varies by device;
- harder to centralize audit and provider behavior.

Assessment:

- Consider later for cost/offline improvements, but not first integration path.

### Direct Mobile-To-AWS Transcribe

Pros:

- fewer backend moving parts;
- possible streaming UX.

Cons:

- credential/security complexity;
- mobile network fragility;
- harder audit/control;
- tighter coupling to AWS.

Assessment:

- Avoid for MVP. Route through backend/provider interface.

### Real-Time Streaming Transcription First

Pros:

- faster feedback;
- more polished speech UX.

Cons:

- more complex networking and audio streaming;
- AWS Transcribe streaming language/format support must be checked;
- not needed for short bookkeeping utterances.

Assessment:

- Defer. Batch/clip transcription is enough for MVP speech.

### Translate Everything With AI

Pros:

- flexible;
- dynamic;
- can handle mixed content.

Cons:

- less deterministic for UI strings;
- harder QA;
- cost and latency;
- wording can drift.

Assessment:

- Use localization files for UI. Use AI/machine translation only for dynamic content.

## Prototype Impact

Phase 6 prototype should prove:

- user can enter a natural-language bookkeeping phrase;
- app/backend returns a structured transaction proposal;
- user can edit proposal fields;
- user must confirm before save;
- confirmed proposal becomes a normal local transaction;
- proposal metadata is traceable;
- low-confidence or incomplete proposal asks for correction rather than saving silently;
- manual entry remains available.

Acceptance checks:

- no AI/speech path directly inserts final backend transaction-intake records;
- proposal schema is versioned;
- proposal is validated deterministically;
- missing amount/type/currency blocks confirmation;
- original input is stored or linked according to retention decision;
- UI text is ready for localization keys rather than hard-coded scattered strings.

## Risks / Follow-Up

### Speech Accuracy

Risk:

- speech-to-text may mishear amounts, currencies, and local product names.

Mitigation:

- short utterances;
- explicit language selection;
- review sentence;
- highlighted low-confidence fields;
- user correction storage.

### Language Coverage

Risk:

- target pilot language may not have equal support across Transcribe, Translate, Polly, and Bedrock.

Mitigation:

- choose pilot language based on field context;
- verify support across specific AWS services before implementation;
- keep provider interfaces.

### Privacy And Retention

Risk:

- audio and transcripts may contain sensitive personal or financial data.

Mitigation:

- avoid background recording;
- store only what is needed;
- define retention policy before real data;
- do not put unnecessary sensitive data in prompts.

### AI Hallucination

Risk:

- AI may infer details the user did not say.

Mitigation:

- require structured schema;
- distinguish explicit versus inferred fields;
- show warnings;
- require user confirmation;
- validate deterministic fields.

### Translation Drift

Risk:

- translated financial labels may confuse users.

Mitigation:

- human-review core labels;
- field-test wording;
- keep glossary of approved terms.

## Cost / Nonprofit Notes

Phase 6 introduces paid AWS services as future implementation candidates:

- Amazon Transcribe;
- Amazon Translate;
- Amazon Polly;
- Amazon Bedrock.

AWS nonprofit credit research already exists in:

- `nonprofit-cost-programs-running-list.md`

This phase adds Amazon Translate to that running list because it was not in the original AWS service list.

Cost-control recommendations:

- start with mocked proposal path;
- do not call paid speech/AI services during early UI prototyping;
- keep audio clips short;
- log usage by organization/business;
- add budgets/alarms before real AWS integration;
- preserve provider interfaces so costs can be compared later.

## Recommended Next Action

Create the Phase 6 proposal workflow spec:

- `specs/mobile-poc/speech-ai-proposal-workflow.md`

The spec should define:

- typed natural-language input first;
- optional audio recording later;
- proposal schema;
- validation rules;
- review/edit UI behavior;
- correction tracking;
- localization-key strategy;
- what is deliberately out of scope: real Transcribe, real Bedrock, real Translate, real Polly, background recording, direct ledger posting.

Then implement the mocked proposal path after the touch-first manual workflow exists.

## Sources

- Expo Audio: https://docs.expo.dev/versions/latest/sdk/audio/
- Expo Speech: https://docs.expo.dev/versions/latest/sdk/speech/
- Expo Localization SDK: https://docs.expo.dev/versions/latest/sdk/localization/
- Expo Localization guide: https://docs.expo.dev/guides/localization/
- react-i18next documentation: https://react.i18next.com/
- Amazon Transcribe streaming: https://docs.aws.amazon.com/transcribe/latest/dg/streaming.html
- Amazon Transcribe supported languages: https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html
- Amazon Transcribe language identification: https://docs.aws.amazon.com/transcribe/latest/dg/lang-id-batch.html
- Amazon Translate documentation: https://docs.aws.amazon.com/translate/
- Amazon Translate supported languages: https://docs.aws.amazon.com/translate/latest/dg/what-is-languages.html
- Amazon Translate how it works: https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html
- Amazon Polly supported languages: https://docs.aws.amazon.com/polly/latest/dg/supported-languages.html
- Amazon Bedrock structured outputs: https://docs.aws.amazon.com/bedrock/latest/userguide/structured-output.html

## Learn More

Best first reads:

- Expo Audio: https://docs.expo.dev/versions/latest/sdk/audio/
- Expo Localization guide: https://docs.expo.dev/guides/localization/
- Amazon Transcribe streaming overview: https://docs.aws.amazon.com/transcribe/latest/dg/streaming.html
- Amazon Bedrock structured outputs: https://docs.aws.amazon.com/bedrock/latest/userguide/structured-output.html

Good search terms for beginner-friendly follow-up reading:

- `React Native Expo audio recording speech to text`
- `speech to text transaction proposal UX`
- `AI structured output JSON schema validation`
- `mobile app localization i18n React Native`
- `Amazon Transcribe vs device speech recognition mobile app`
- `AI proposal user confirmation financial app`
