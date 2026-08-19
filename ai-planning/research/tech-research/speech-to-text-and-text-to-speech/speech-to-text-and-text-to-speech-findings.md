# speech-to-text-and-text-to-speech research findings

Depth: deep

## Summary
Summary: For the approved M1 slice, mocked offline STT plus device TTS is the only compliant and least-expensive solution. For a later real-speech slice, device TTS remains the default; AWS Transcribe is the strongest AWS-native Haitian STT candidate but is materially more expensive than AssemblyAI or OpenAI list prices and needs an AI-service opt-out before participant audio. On-device Whisper may minimize recurring cost and maximize offline capability but has the highest mobile engineering and device-performance risk. No provider should be selected without synthetic Haitian/French/English field-quality benchmarks focused on amounts, currencies, local product terms, noise, latency, and failure fallback.

## Verified facts
- Current M1 requires deterministic synthetic STT fixtures that work offline and contact no provider; speech creates only an editable proposal; confirmation alone creates the transaction; TTS is optional device assistance; visible review, manual fallback, localization, accessibility, and synthetic-only evidence remain mandatory.
- The current design deliberately excludes live microphone capture, cloud STT, AWS, backend sync, and real data; it selects an injected mocked STT adapter and a narrow expo-speech device-TTS adapter so failures cannot mutate financial state.
- The future architecture routes short audio through replaceable SpeechToTextProvider and TextToSpeechProvider boundaries, preserves raw input, transcript, proposal, and transaction as distinct records, uses deterministic validation, requires user confirmation, and keeps manual entry available.
- Accepted V1 guardrails require offline-first entrepreneur workflows, Haitian Creole planning as the primary entrepreneur-facing language, plain accessible interaction, visible non-AI fallback, explicit confirmation before financial writes, and synthetic-only work until real-data governance is separately approved.
- Real provider-backed speech, Haitian Creole production localization, backend/cloud integration, retention policy, and AWS infrastructure are later approved slices, not requirements or authorization for the current M1 implementation.
- AWS nonprofit promotional credits can offset eligible charges but are time-limited subsidies, not permanent free service; the nonprofit should own the AWS account and apply, with developers receiving least-privilege access.
- In us-east-1 standard Transcribe starts at $0.024 per audio minute, billed by the second; the current page states no request minimum. The service-specific trial is 60 audio minutes per month for 12 months starting with the first request, and unused minutes do not roll over.
- Amazon Transcribe explicitly supports Haitian Creole ht-HT for batch and streaming, and supports French and US English. Haitian Creole lacks Transcribe's numeric transcription, custom language models, redaction, and call-analytics features shown in the language matrix, so amounts and currencies require especially strict review and field testing.
- Amazon Transcribe streaming returns results in real time over SDK, HTTP/2, or WebSocket; supported formats are FLAC, Ogg Opus, and signed 16-bit little-endian PCM, with lossless FLAC or PCM recommended. Streaming is an online path and does not meet offline operation by itself.
- Batch Transcribe accepts media from S3 and can put output in a customer bucket or a temporary service-managed bucket. Service-managed transcript URLs are temporary and their jobs expire after 90 days; customer S3 objects persist until the customer removes them.
- By default Amazon Transcribe stores and uses processed voice inputs to develop and improve the service. AWS documents an Organizations AI-services opt-out policy; this must be configured and verified before any separately authorized participant-audio pilot.
- Transcribe uses TLS 1.2 in transit, including streaming; batch inputs and outputs can use S3 encryption and customer-managed KMS keys. Encryption does not replace consent, retention, access, or service-improvement opt-out controls.
- Polly Standard voices cost $4 per million characters and Neural voices $16 per million outside allowances; generated audio may be cached and replayed without another synthesis charge. The pricing page lists first-12-month allowances of 5 million Standard and 1 million Neural characters per month for eligible accounts.
- Polly supports French, Canadian French, and US English, but its current supported-language list does not include Haitian Creole. Therefore Polly cannot satisfy a future Haitian-Creole TTS requirement without an approved fallback or different provider.
- Amazon Translate standard text costs $15 per million characters outside its 12-month 2-million-character monthly trial for eligible paid-plan accounts.
- Amazon Translate supports Haitian Creole, French, and English text. It can translate a transcript but cannot repair a misrecognized amount or substitute for human-reviewed static UI localization.
- New AWS customers receive $100 in signup credits and may earn up to $100 more; the Free account plan lasts up to six months or until credits are exhausted. Only paid-plan accounts receive short-term service trials, while Free-plan accounts receive Always Free offers and consume credits for other eligible services.
- Android voices expose locale, quality, latency, and whether a network connection is required. The app can prefer an installed non-network voice but must still handle missing voice data and engine-specific language coverage.
- Open-source Whisper's language table includes Haitian Creole code ht as well as French and English. Language inclusion does not prove acceptable recognition of Haitian accents, local product terms, HTG amounts, or noisy field audio.
- AssemblyAI's prerecorded Universal model lists Haitian among its supported languages. Its documented multilingual streaming model is limited to six major languages, so Haitian should be evaluated as an asynchronous short-file path rather than assumed real-time streaming.
- Deepgram offers a one-time $200 developer credit and usage pricing below AWS Transcribe for several Nova-3 modes, but this is promotional credit rather than an enduring free tier.
- Deepgram Nova-3 supports French and many other languages but its current language list does not include Haitian Creole, excluding it from the primary Haitian STT shortlist despite attractive list pricing.
- Azure Speech F0 advertises 5 audio hours of STT and 0.5 million neural-TTS characters free per month. This is more generous than AWS's Transcribe trial, but account quotas and production eligibility must be verified.
- Azure Speech supports French STT/TTS, but Haitian Creole is not in its STT locale or TTS voice tables; Haitian appears only in a text-language translation section. Azure therefore does not meet the primary Haitian speech path despite its attractive free quota.
- Google Cloud STT lists 60 minutes monthly free on qualifying standard recognition and $0.016 per minute above it, while V2 dynamic batch can be $0.003 per minute. Billing must be enabled and model/version details govern the allowance.
- Google Cloud STT's current supported-language page has no ht-HT or Haitian Creole entry, so its low dynamic-batch price does not meet the primary Haitian requirement.
- Google Cloud TTS Standard voices list 4 million free characters monthly then $4 per million, while premium voice tiers cost more. The broadly priced legacy voice table does not establish a production Haitian voice; Gemini TTS is a separate preview path.
- OpenAI TTS can generate several languages and its voices are optimized for English, but its published supported-language list omits Haitian Creole. It should not be selected for Haitian TTS without explicit support and field-quality evidence.

## Source-reported claims
- The Transcribe guide broadly says custom vocabularies can be used with all supported languages and can improve domain terms such as product names and jargon.
- The Whisper paper reports training on 680,000 hours of multilingual and multitask supervision with strong zero-shot generalization; it does not provide project-specific Haitian bookkeeping accuracy evidence, so a local labeled benchmark remains necessary.

## Assistant inferences
- Android's on-device SpeechRecognizer can be a $0 provider-cost opportunistic adapter on API 31+ when isOnDeviceRecognitionAvailable is true, but language/model availability is device-dependent and the ordinary recognizer may stream audio remotely. It cannot be the sole guaranteed Haitian/offline implementation without device evidence.
- whisper.rn can run Whisper locally on Android with no metered provider fee and supports an Expo prebuild path, but it introduces native NDK/CMake integration, substantially larger app assets, device CPU/memory/battery cost, and library maturity risk. It requires a component-local benchmark on the representative Android device.
- AssemblyAI Universal-2 is $0.15 per audio hour, equivalent to $0.0025 per minute, and its free developer allocation advertises up to 185 hours of pre-recorded audio. At list price it is roughly one-tenth Amazon Transcribe's first-tier rate, but vendor governance and short-clip latency must be evaluated.
- OpenAI lists gpt-4o-mini-transcribe at an estimated $0.003 per audio minute, gpt-4o-transcribe at $0.006, and live transcription models at $0.017. No recurring free API allowance is documented; exact Haitian quality and support for the selected hosted model must be verified with synthetic evaluation audio.

## Unknowns
- The current CreateVocabulary API enum does not list ht-HT even though the guide says all supported languages. Treat Haitian Creole custom-vocabulary availability as unresolved documentation drift and preflight the exact region/API before relying on it.
- Google's Gemini TTS documentation lists Haitian Creole ht-HT in preview. Preview maturity, pricing, quality, data governance, and production availability remain unresolved, so it is a research candidate rather than a default.

## Recommendations
- Keep expo-speech as the default TTS adapter: it uses installed platform TTS, works with the current Expo SDK generation, exposes speech lifecycle callbacks and available voices, adds no per-character provider charge, and preserves the requirement that visible review remains authoritative.

## Model guidance provenance
- Role: highest-quality
- Lookup date: 2026-08-18
- codex: gpt-5.6-sol; source: https://developers.openai.com/codex/models; stale-risk; verify current official provider documentation before use

## Comparative analysis
- See the classified findings and linked sources above.

## Tradeoffs
- See the classified findings and linked sources above.

## Maturity signals
- See the classified findings and linked sources above.

## Implementation patterns
- See the classified findings and linked sources above.

## Risks
- See the classified findings and linked sources above.

## Source quality notes
- See the classified findings and linked sources above.

## Source material used as data
### Prototype speech proposal confirmation specification
> \#\# Purpose Defines the M1 Phase 2 speech-assisted Android prototype behavior and the evidence required to prove that speech remains an optional, reviewable input path rather than an authoritative financial write. \#\# ADDED Requirements \#\#\# Requirement: Speech assistance remains a…

### Prototype speech proposal confirmation design
> \#\# Context See \[proposal.md\]\(proposal.md\) for motivation and \`specs/prototype-speech-proposal-confirmation/spec.md\` for the behavioral contract. M1 Phase 1 is already archived and merged in both the central and mobile repositories. The mobile app has a Home-first manual sale/exp…

### Phase 06 speech, multilingual UX, and AI proposal workflow
> \# Phase 06 Research: Speech, Multilingual UX, And AI Proposal Workflow Date: 2026-08-08 Related plan: - \`../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md\` - \`phase-02-offline-first-sqlite-sync-architecture.md\` - \`phase-04-touch-first-bookkeepin…

### V1 product guardrails specification
> \# v1-product-guardrails Specification \#\# Purpose Defines the accepted Version 1 product guardrails that govern future planning, proposals, implementation authorization, validation, and impact language for the Enterprise Growth App Business Journal Module. \#\# Requirements \#\#\# Req…

### M1 later-phase deferred work
> \# M1 Later-Phase Deferred Work Status: Scope boundary for the M1 Rapid Thin-Slice Prototype Companion: \[M1 Rapid Thin-Slice Prototype Brief\]\(m1-rapid-thin-slice-prototype.md\) and \[V1 Scope Map and Milestone Plan\]\(V1%20Scope%20Map%20and%20Milestone%20Plan.md\) \#\# Purpose This docu…

### Nonprofit cost programs running list
> \# Nonprofit Cost Programs Running List Date started: 2026-08-08 Purpose: Track nonprofit discounts, credits, waivers, eligibility rules, and application ownership for paid technologies and services considered for the mobile bookkeeping platform. This is a running document. Add a…

### Amazon Transcribe pricing
> In us-east-1 standard Transcribe starts at $0.024 per audio minute, billed by the second; the current page states no request minimum. The service-specific trial is 60 audio minutes per month for 12 months starting with the first request, and unused minutes do not roll over.

### Amazon Transcribe supported languages
> Amazon Transcribe explicitly supports Haitian Creole ht-HT for batch and streaming, and supports French and US English. Haitian Creole lacks Transcribe's numeric transcription, custom language models, redaction, and call-analytics features shown in the language matrix, so amount…

### Transcribing streaming audio
> Amazon Transcribe streaming returns results in real time over SDK, HTTP/2, or WebSocket; supported formats are FLAC, Ogg Opus, and signed 16-bit little-endian PCM, with lossless FLAC or PCM recommended. Streaming is an online path and does not meet offline operation by itself.

### Amazon Transcribe data input and output
> Batch Transcribe accepts media from S3 and can put output in a customer bucket or a temporary service-managed bucket. Service-managed transcript URLs are temporary and their jobs expire after 90 days; customer S3 objects persist until the customer removes them.

### Opting out of Transcribe service improvement
> By default Amazon Transcribe stores and uses processed voice inputs to develop and improve the service. AWS documents an Organizations AI-services opt-out policy; this must be configured and verified before any separately authorized participant-audio pilot.

### Amazon Transcribe data encryption
> Transcribe uses TLS 1.2 in transit, including streaming; batch inputs and outputs can use S3 encryption and customer-managed KMS keys. Encryption does not replace consent, retention, access, or service-improvement opt-out controls.

### Amazon Transcribe custom vocabularies
> The Transcribe guide broadly says custom vocabularies can be used with all supported languages and can improve domain terms such as product names and jargon.

### CreateVocabulary API
> The current CreateVocabulary API enum does not list ht-HT even though the guide says all supported languages. Treat Haitian Creole custom-vocabulary availability as unresolved documentation drift and preflight the exact region/API before relying on it.

### Amazon Polly pricing
> Polly Standard voices cost $4 per million characters and Neural voices $16 per million outside allowances; generated audio may be cached and replayed without another synthesis charge. The pricing page lists first-12-month allowances of 5 million Standard and 1 million Neural cha…

### Languages in Amazon Polly
> Polly supports French, Canadian French, and US English, but its current supported-language list does not include Haitian Creole. Therefore Polly cannot satisfy a future Haitian-Creole TTS requirement without an approved fallback or different provider.

### Amazon Translate pricing
> Amazon Translate standard text costs $15 per million characters outside its 12-month 2-million-character monthly trial for eligible paid-plan accounts.

### Amazon Translate supported languages
> Amazon Translate supports Haitian Creole, French, and English text. It can translate a transcript but cannot repair a misrecognized amount or substitute for human-reviewed static UI localization.

### AWS Free Tier
> New AWS customers receive $100 in signup credits and may earn up to $100 more; the Free account plan lasts up to six months or until credits are exhausted. Only paid-plan accounts receive short-term service trials, while Free-plan accounts receive Always Free offers and consume …

### Expo Speech SDK 57
> Keep expo-speech as the default TTS adapter: it uses installed platform TTS, works with the current Expo SDK generation, exposes speech lifecycle callbacks and available voices, adds no per-character provider charge, and preserves the requirement that visible review remains auth…

### Android TextToSpeech Voice
> Android voices expose locale, quality, latency, and whether a network connection is required. The app can prefer an installed non-network voice but must still handle missing voice data and engine-specific language coverage.

### Android SpeechRecognizer
> Android's on-device SpeechRecognizer can be a $0 provider-cost opportunistic adapter on API 31+ when isOnDeviceRecognitionAvailable is true, but language/model availability is device-dependent and the ordinary recognizer may stream audio remotely. It cannot be the sole guarantee…

### whisper.rn React Native binding
> whisper.rn can run Whisper locally on Android with no metered provider fee and supports an Expo prebuild path, but it introduces native NDK/CMake integration, substantially larger app assets, device CPU/memory/battery cost, and library maturity risk. It requires a component-loca…

### OpenAI Whisper tokenizer languages
> Open-source Whisper's language table includes Haitian Creole code ht as well as French and English. Language inclusion does not prove acceptable recognition of Haitian accents, local product terms, HTG amounts, or noisy field audio.

### Robust Speech Recognition via Large-Scale Weak Supervision
> The Whisper paper reports training on 680,000 hours of multilingual and multitask supervision with strong zero-shot generalization; it does not provide project-specific Haitian bookkeeping accuracy evidence, so a local labeled benchmark remains necessary.

### AssemblyAI pricing
> AssemblyAI Universal-2 is $0.15 per audio hour, equivalent to $0.0025 per minute, and its free developer allocation advertises up to 185 hours of pre-recorded audio. At list price it is roughly one-tenth Amazon Transcribe's first-tier rate, but vendor governance and short-clip l…

### AssemblyAI supported languages
> AssemblyAI's prerecorded Universal model lists Haitian among its supported languages. Its documented multilingual streaming model is limited to six major languages, so Haitian should be evaluated as an asynchronous short-file path rather than assumed real-time streaming.

### OpenAI API pricing
> OpenAI lists gpt-4o-mini-transcribe at an estimated $0.003 per audio minute, gpt-4o-transcribe at $0.006, and live transcription models at $0.017. No recurring free API allowance is documented; exact Haitian quality and support for the selected hosted model must be verified with…

### Deepgram pricing
> Deepgram offers a one-time $200 developer credit and usage pricing below AWS Transcribe for several Nova-3 modes, but this is promotional credit rather than an enduring free tier.

### Deepgram models and languages
> Deepgram Nova-3 supports French and many other languages but its current language list does not include Haitian Creole, excluding it from the primary Haitian STT shortlist despite attractive list pricing.

### Azure Speech pricing
> Azure Speech F0 advertises 5 audio hours of STT and 0.5 million neural-TTS characters free per month. This is more generous than AWS's Transcribe trial, but account quotas and production eligibility must be verified.

### Azure Speech language and voice support
> Azure Speech supports French STT/TTS, but Haitian Creole is not in its STT locale or TTS voice tables; Haitian appears only in a text-language translation section. Azure therefore does not meet the primary Haitian speech path despite its attractive free quota.

### Google Cloud Speech-to-Text pricing
> Google Cloud STT lists 60 minutes monthly free on qualifying standard recognition and $0.016 per minute above it, while V2 dynamic batch can be $0.003 per minute. Billing must be enabled and model/version details govern the allowance.

### Google Cloud Speech-to-Text supported languages
> Google Cloud STT's current supported-language page has no ht-HT or Haitian Creole entry, so its low dynamic-batch price does not meet the primary Haitian requirement.

### Google Gemini TTS languages
> Google's Gemini TTS documentation lists Haitian Creole ht-HT in preview. Preview maturity, pricing, quality, data governance, and production availability remain unresolved, so it is a research candidate rather than a default.

### Google Cloud Text-to-Speech pricing
> Google Cloud TTS Standard voices list 4 million free characters monthly then $4 per million, while premium voice tiers cost more. The broadly priced legacy voice table does not establish a production Haitian voice; Gemini TTS is a separate preview path.

### OpenAI text-to-speech guide
> OpenAI TTS can generate several languages and its voices are optimized for English, but its published supported-language list omits Haitian Creole. It should not be selected for Haitian TTS without explicit support and field-quality evidence.
