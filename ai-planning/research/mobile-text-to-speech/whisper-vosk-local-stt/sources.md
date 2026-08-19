# Sources for Whisper and Vosk local mobile STT research

Access date for all sources: 2026-08-18.

## Project context

### M1.1 Offline Multilingual Speech Design Brief

- Publisher: Home Roots / Invest in Growth planning repository
- URL or path: `ai-planning/design-briefs/m1.1-offline-multilingual-speech.md`
- Source type: primary project source
- Relevance: Confirms the owner decision to evaluate Whisper first, compare Vosk, retain a replaceable `SpeechToTextAdapter`, and test offline English, French, and Haitian Creole on low-cost Android and iPhone hardware.

### Existing Speech-to-Text and Text-to-Speech Research

- Publisher: Home Roots / Invest in Growth planning repository
- URL or path: `ai-planning/research/tech-research/speech-to-text-and-text-to-speech/speech-to-text-and-text-to-speech-findings.md`
- Source type: primary project source
- Relevance: Records prior project evidence and constraints, including local/offline requirements, M1 fixture scope, and the need for physical-device benchmarks.

## Whisper sources

### OpenAI Whisper README

- Publisher: OpenAI
- URL: https://github.com/openai/whisper/blob/main/README.md
- Source type: primary
- Relevance: Defines Whisper as a multilingual speech-recognition model; documents model families and the MIT license for code and model weights.

### OpenAI Whisper language table

- Publisher: OpenAI
- URL: https://github.com/openai/whisper/blob/main/whisper/tokenizer.py
- Source type: primary
- Relevance: The upstream language map includes `en` English, `fr` French, and `ht` Haitian Creole.

### whisper.cpp README

- Publisher: ggml-org
- URL: https://github.com/ggml-org/whisper.cpp/blob/master/README.md
- Source type: primary
- Relevance: Documents offline Android/iOS support, `whisper.cpp` model disk and memory estimates, quantization, and bindings including React Native.

### whisper.rn README

- Publisher: mybigday
- URL: https://github.com/mybigday/whisper.rn
- Source type: primary for this third-party binding
- Relevance: Documents React Native API usage, Expo-prebuild requirement, iOS Pods, Android R8/ProGuard configuration, NDK guidance, asset registration, model-size cautions, and real-time/VAD helpers.

### whisper.cpp Android example

- Publisher: ggml-org
- URL: https://github.com/ggml-org/whisper.cpp/blob/master/examples/whisper.android/README.md
- Source type: primary
- Relevance: Shows the native Android sample’s model-asset location and confirms direct local model inference architecture.

## Vosk sources

### Vosk overview

- Publisher: Alpha Cephei
- URL: https://alphacephei.com/vosk/
- Source type: primary
- Relevance: Describes Vosk’s offline operation on Android and iOS, small model sizing, streaming API, bindings, and vocabulary reconfiguration.

### Vosk official model catalog

- Publisher: Alpha Cephei
- URL: https://alphacephei.com/vosk/models
- Source type: primary
- Relevance: Lists current official English and French small models, their sizes and licenses, the typical small-model runtime-memory estimate, and no Haitian Creole entry as of the research date.

### Vosk installation guide

- Publisher: Alpha Cephei
- URL: https://alphacephei.com/vosk/install
- Source type: primary
- Relevance: Documents Android Maven coordinates and says that iOS builds are available on request.

### Vosk Android demo guide

- Publisher: Alpha Cephei
- URL: https://alphacephei.com/vosk/android
- Source type: primary
- Relevance: Documents the Android demo, use of the Android AAR, model assets, and small-model guidance for Android.

### Vosk API repository

- Publisher: Alpha Cephei
- URL: https://github.com/alphacep/vosk-api
- Source type: primary
- Relevance: Confirms Apache-2.0 licensing and the project’s stated Android/iOS offline speech-recognition scope.

## Mobile integration sources

### Expo: Add custom native code

- Publisher: Expo
- URL: https://docs.expo.dev/workflow/customizing/
- Source type: primary
- Relevance: Explains that native libraries require an Expo development build/prebuild workflow and recommends config plugins for persistent native configuration.

### Expo Audio

- Publisher: Expo
- URL: https://docs.expo.dev/versions/v54.0.0/sdk/audio/
- Source type: primary
- Relevance: Documents runtime microphone-permission APIs for Android and iOS.

### Android MediaRecorder overview

- Publisher: Android Developers
- URL: https://developer.android.com/media/platform/mediarecorder
- Source type: primary
- Relevance: Documents the `RECORD_AUDIO` runtime permission, foreground recording constraints, and device-dependent audio-source behavior.

### Apple AVAudioSession recording category

- Publisher: Apple Developer Documentation
- URL: https://developer.apple.com/documentation/avfaudio/avaudiosession/category-swift.struct/record
- Source type: primary
- Relevance: Documents iOS recording permission, audio-session behavior, interruption constraints, and background-recording implications.

## Source-quality considerations

- OpenAI, ggml-org, Alpha Cephei, Expo, Android, and Apple documentation are authoritative for their own APIs, published capabilities, and published size/configuration guidance.
- The model-catalog conclusion for Vosk is intentionally narrow: its official catalog did not list Haitian Creole on the access date. This is not a claim that a custom or community model cannot ever be made.
- The `whisper.rn` repository is authoritative for the binding’s own setup, but not for low-cost-device performance. Its published device examples use higher-end phones than this project’s Android floor.
- No cited source establishes acceptable Haitian Creole bookkeeping accuracy for this product. That result can only come from a controlled physical-device benchmark using the project’s labeled test corpus.
