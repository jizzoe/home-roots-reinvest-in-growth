# on-device-ocr-library-selection research findings

Depth: deep

## Summary
Summary: Objective comparison of on-device OCR libraries for the M1 Android receipt slice on Expo SDK 57 / React Native 0.86, conducted without regard to the prior selection. Five candidates were examined: rn-mlkit-ocr, expo-mlkit-ocr, @react-native-ml-kit/text-recognition, agoldis/react-native-mlkit-ocr and barthap/expo-ocr, plus react-native-vision-camera-text-recognition. Two are disqualified outright: agoldis/react-native-mlkit-ocr is an archived repository, and barthap/expo-ocr has been untouched since 2022 and carries no licence. All live candidates wrap the same Google ML Kit Text Recognition v2 engine, so OCR accuracy does not differ between them; the engine itself is the constant and the differences are packaging, configurability, licence provenance and maintenance. The decisive technical finding is that only rn-mlkit-ocr exposes an explicit Android bundled-model switch \(ocrUseBundled\) and per-script model selection \(ocrModels\), but it defaults to the forbidden Play Services downloadable model, so it is correct only when deliberately configured and verified. expo-mlkit-ocr is correct by construction — bundled Latin only, no unbundled branch — but ships no LICENCE file despite declaring MIT, which is a real compliance gap for a nonprofit required to record attribution. @react-native-ml-kit/text-recognition is by far the most adopted \(44,717 weekly downloads vs 3,714 and 627\) but hardcodes all five script models unconditionally, which at Google's stated ~4 MB per script per architecture implies roughly 20 MB of models per architecture for an app that needs only Latin. Separately, independent testing of ML Kit against real receipts reports highly variable results, including a low-resolution receipt where only two text blocks were detected at all; this validates the M1 design's insistence that OCR remain a reviewable proposal with manual fallback, and means no library choice will deliver reliable receipt extraction.

## Verified facts
- Google documents that bundled ML Kit models are statically linked at build time, are usable immediately on install, and give feature functionality with no network connection; unbundled models are downloaded through Google Play services before first use. Bundled requires an app update to refresh the model; unbundled auto-updates.
- The bundled Latin artifact is com.google.mlkit:text-recognition:16.0.1 and the unbundled equivalent is com.google.android.gms:play-services-mlkit-text-recognition:19.0.1. Google states recognition is real-time on most devices for the Latin library, that each character should be at least 16x16 pixels, and that poor image focus reduces accuracy. Bundled adds roughly 4 MB per architecture; unbundled roughly 260 KB.
- The text-recognition artifacts have been stable at 16.0.1 \(bundled\) and 19.0.1 \(unbundled\) since 08/07/2024, while the wider ML Kit framework continued shipping releases through July 2026. The engine is maintained but the text-recognition API itself is stable rather than actively changing.
- rn-mlkit-ocr returns full text plus blocks, lines and elements with bounding-box frames at every level. Its Expo config plugin exposes ocrModels \(latin, chinese, devanagari, japanese, korean, or all\) and an Android ocrUseBundled toggle. It targets iOS 15.5+ and Android API 23+ and states no explicit Expo SDK or React Native version requirement.
- expo-mlkit-ocr returns full text plus blocks, lines and elements with bounding boxes, documents no confidence scores, requires iOS 16.0+, and explicitly will not run in Expo Go. Its config plugin selects the iOS engine \(Apple Vision or ML Kit\) but exposes no Android model-selection or bundling option; the Android behaviour is fixed.
- a7medev/react-native-ml-kit has 582 stars, 86 forks, 25 open issues, MIT licence, and was last pushed 2025-09-06 — roughly twelve months before this review. It is by a wide margin the most adopted candidate but the least recently updated of the live options.
- agoldis/react-native-mlkit-ocr is archived \(archived=true\) with 218 stars and 22 open issues left unresolved. An archived repository accepts no fixes, so it is disqualified regardless of its adoption.
- barthap/expo-ocr was last pushed 2022-09-07, roughly four years before this review, and carries no detected licence. It is effectively abandoned and cannot be used where licence provenance must be recorded.
- rn-mlkit-ocr has 31 stars, 2 forks, 0 open issues, MIT licence, last pushed 2026-01-22. Adoption is very small and there is a single maintainer, so bus-factor risk is high even though the code is current.
- rbayuokt/expo-mlkit-ocr has 34 stars, 2 forks, 0 open issues, was last pushed 2026-05-06, and GitHub detects NO licence on the repository despite npm metadata declaring MIT.
- rn-mlkit-ocr was first published 2025-12-09, has published only 4 versions, was last modified 2026-01-22, and has a single maintainer \(ahmeterenodaci\). It is roughly nine months old.
- expo-mlkit-ocr was first published 2026-05-01 and last modified 2026-05-06 — all 8 versions were released within six days, with no publishing activity in the four months since. It is roughly four months old with a single maintainer \(rbayuokt\).
- @react-native-ml-kit/text-recognition is at 2.0.0 with 12 published versions and was last modified 2025-09-01, maintained by a7medev. It has the longest release history of the candidates.
- Inspection of the published tarball confirms the Gradle file branches on plugin-set properties: ocrModels defaults to \['all'\] and ocrUseBundled defaults to FALSE. With defaults left alone the build resolves com.google.android.gms:play-services-mlkit-text-recognition — the downloadable model the M1 spec forbids. The bundled artifact is selected only when ocrUseBundled is explicitly true.
- The published tarball hardcodes implementation 'com.google.mlkit:text-recognition:16.0.1' with no unbundled branch and no other language model, so it is correct-by-default and Latin-only. However the package root contains NO LICENSE file, despite npm metadata declaring MIT and GitHub detecting no licence either.
- The published Gradle file declares all five bundled script models unconditionally — Latin, Chinese, Devanagari, Japanese and Korean — with no property switch. Every consuming app ships all five whether or not it needs them.
- rn-mlkit-ocr records 627 downloads in the last week, the lowest of the three live candidates by an order of magnitude.
- expo-mlkit-ocr records 3,714 downloads in the last week, roughly six times the incumbent but an order of magnitude below the most adopted option.
- @react-native-ml-kit/text-recognition records 44,717 downloads in the last week, roughly 12x expo-mlkit-ocr and 71x rn-mlkit-ocr.
- This library does support still-image OCR from a file path via PhotoRecognizer, but mandates react-native-vision-camera 4.5.1 and react-native-worklets-core 1.3.3 as required modules. It has 94 stars, 48 forks, 15 open issues and MIT licence, and does not document bundled vs Play Services model selection or Expo support.
- Expo documents config plugins as the mechanism for modifying native projects during prebuild under Continuous Native Generation. They are required where native customisation beyond app-config properties is needed — which is precisely the case when Gradle properties must be set to force a bundled model.
- Expo states that libraries containing native code cannot run in Expo Go and require a development build, and that the native app must be rebuilt whenever such a library is installed or updated. Every OCR candidate therefore forces a development-build workflow.

## Source-reported claims
- A developer test of ML Kit on three Latin-script receipts reported markedly variable results: a Polish receipt where some letters were missed or confused, a low-resolution Spanish receipt \(225x335\) where only two blocks were detected at all, and a German receipt that was almost faultless. The author concludes on-device ML Kit suits detecting keywords or simple information rather than detailed receipt processing.
- Corroborates that the bundled model enables fully offline recognition with no remote calls, that accuracy needs at least 16x16 pixels per character with diminishing returns past 24x24, and that outcomes depend heavily on lighting, focus and motion blur rather than the model itself.

## Assistant inferences
- None supplied.

## Unknowns
- The project's existing receipt research recommends expo-image-picker and local storage but explicitly defers OCR entirely, and evaluates no OCR npm package. No prior internal audit trail comparing OCR libraries exists, which is what prompted this study.

## Recommendations
- The accepted M1 delta requires OCR to run with no cloud, backend or external-OCR dependency and to remain a non-authoritative proposal behind explicit human confirmation, with manual completion preserved on failure. Any candidate must therefore prove a bundled, no-download model; and because the spec already treats OCR output as fallible, extraction quality is a secondary selection criterion rather than the primary one.

## Model guidance provenance
- Role: highest-quality
- Lookup date: 2026-09-04
- codex: gpt-5.6-sol; source: https://developers.openai.com/codex/models; stale-risk; verify current official provider documentation before use
- claude: Claude Opus 4.1; source: https://docs.anthropic.com/en/docs/about-claude/models; stale-risk; verify current official provider documentation before use

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
### ML Kit model installation paths on Android
> Bundled: directly contributes to app size; all models and features are included when the app is installed, so are usable immediately; provides feature functionality without network connection after app installation; requires app updates to refresh models. Unbundled: does not con…

### Recognize text in images with ML Kit on Android \(v2\)
> Bundled Latin: com.google.mlkit:text-recognition:16.0.1. Unbundled Latin: com.google.android.gms:play-services-mlkit-text-recognition:19.0.1. Real-time on most devices for Latin script library, slower for others. Characters should be at least 16x16 pixels. Poor image focus can a…

### ML Kit release notes
> Bundled com.google.mlkit:text-recognition version 16.0.1, last update 08/07/2024. Unbundled play-services-mlkit-text-recognition version 19.0.1, last update 08/07/2024. Release notes extend through July 2026 with the most recent entry dated July 21, 2026 covering genai-prompt.

### Simple OCR implementation on Android with Google's ML Kit
> Tested three receipts in Latin-based languages. Polish receipt: results rather good but some letters weren't detected or were confused. Spanish receipt at low resolution 225x335: only two blocks detected across the entire image. German receipt: detection almost faultless, whole …

### Implementing OCR in Android apps with Google ML Kit
> Bundled model included in the app offers immediate availability; unbundled via Google Play services reduces download size. The bundled approach enables completely offline text recognition without remote API calls or model downloads. Recognition works best with at least 16x16 pix…

### ahmeterenodaci/rn-mlkit-ocr repository
> Returns structured OCR data: top-level text field, blocks with OcrFrame bounding boxes, lines within blocks, elements within lines, frame data \(x, y, width, height\) at every level. Config plugin options: ocrModels to specify language models, ocrUseBundled on Android to toggle bu…

### rbayuokt/expo-mlkit-ocr repository
> Returns full text, blocks \(paragraphs with bounding boxes\), lines, elements \(words\), bounding boxes {x,y,width,height} in native image coordinates. No confidence scores or angle data documented. Requires expo-mlkit-ocr + expo-image-picker + expo-build-properties, iOS deploymentT…

### GitHub repository statistics: a7medev/react-native-ml-kit
> full\_name=a7medev/react-native-ml-kit stars=582 forks=86 open\_issues=25 pushed=2025-09-06T17:24:50Z archived=false license=MIT

### GitHub repository statistics: agoldis/react-native-mlkit-ocr
> full\_name=agoldis/react-native-mlkit-ocr stars=218 forks=51 open\_issues=22 pushed=2025-12-09T20:38:10Z archived=true license=MIT

### GitHub repository statistics: barthap/expo-ocr
> full\_name=barthap/expo-ocr stars=52 forks=4 open\_issues=0 pushed=2022-09-07T07:40:21Z archived=false license=none

### GitHub repository statistics: ahmeterenodaci/rn-mlkit-ocr
> full\_name=ahmeterenodaci/rn-mlkit-ocr stars=31 forks=2 open\_issues=0 pushed=2026-01-22T21:56:55Z archived=false license=MIT

### GitHub repository statistics: rbayuokt/expo-mlkit-ocr
> full\_name=rbayuokt/expo-mlkit-ocr stars=34 forks=2 open\_issues=0 pushed=2026-05-06T12:47:19Z archived=false license=none

### npm registry metadata: rn-mlkit-ocr
> latest: 0.3.1 | created: 2025-12-09 | modified: 2026-01-22 | versions published: 4 | maintainers: \['ahmeterenodaci'\]

### npm registry metadata: expo-mlkit-ocr
> latest: 0.2.7 | created: 2026-05-01 | modified: 2026-05-06 | versions published: 8 | maintainers: \['rbayuokt'\] | description: Production-ready Expo Module for on-device text recognition \(OCR\) using Google ML Kit Text Recognition v2

### npm registry metadata: @react-native-ml-kit/text-recognition
> latest: 2.0.0 | modified: 2025-09-01 | versions: 12 | maintainers: \['a7medev'\] | description: React Native On-Device Text Recognition w/ Google ML Kit

### Published package contents: rn-mlkit-ocr 0.3.1 android/build.gradle
> def ocrModels = safeGetExt\('ocrModels', \['all'\]\); def hasAllModels = ocrModels.contains\('all'\); def isBundled = safeGetExt\('ocrUseBundled', false\); if \(hasAllModels || ocrModels.contains\('latin'\)\) { if \(isBundled\) { implementation 'com.google.mlkit:text-recognition:16.0.1' } els…

### Published package contents: expo-mlkit-ocr 0.2.7 android/build.gradle and package root
> android/build.gradle: group = 'expo.modules.mlkitocr'; namespace 'expo.modules.mlkitocr'; dependencies { implementation 'com.google.mlkit:text-recognition:16.0.1' }. Package root files: README.md android app.plugin.js build expo-module.config.json ios package.json plugins. No LI…

### Published package contents: @react-native-ml-kit/text-recognition 2.0.0 android/build.gradle
> dependencies { implementation 'com.facebook.react:react-native:+'; // To recognize Latin script; implementation 'com.google.mlkit:text-recognition:16.0.1'; // To recognize Chinese script; implementation 'com.google.mlkit:text-recognition-chinese:16.0.1'; // Devanagari; implement…

### npm weekly download count: rn-mlkit-ocr
> {"package":"rn-mlkit-ocr","downloads":627}

### npm weekly download count: expo-mlkit-ocr
> {"package":"expo-mlkit-ocr","downloads":3714}

### npm weekly download count: @react-native-ml-kit/text-recognition
> {"package":"@react-native-ml-kit/text-recognition","downloads":44717}

### gev2002/react-native-vision-camera-text-recognition
> PhotoRecognizer function processes images from file paths: const result = await PhotoRecognizer\({uri:assets.uri, orientation: 'portrait'}\). Required modules: react-native-vision-camera = 4.5.1 and react-native-worklets-core = 1.3.3. Stars 94, forks 48, open issues 15, MIT. Bundl…

### Config plugins introduction
> Config plugins are custom configuration points not built into the app config. They allow developers to modify native projects during the prebuild process using JavaScript functions referenced in the plugins array. Essential when using Continuous Native Generation. Necessary for …

### Development builds introduction
> A development build is a customized version of your app compiled with the expo-dev-client library included. Expo Go works for rapid prototyping with JavaScript/TypeScript changes, while development builds enable you to use any native libraries and change any native configuration…

### M1 receipt capture and OCR review delta specification
> \#\# Purpose Defines the final M1 receipt-assisted expense proof: local receipt evidence and Android OCR suggestions remain reviewable inputs, while the manual offline Business Journal flow remains complete and authoritative. \#\# ADDED Requirements \#\#\# Requirement: Central planning…

### Phase 05: receipt capture and mobile document scanning research
> \# Phase 05 Research: Receipt Capture And Mobile Document Scanning Date: 2026-08-08 Related plan: - \`../../ai-planning/implementation-plans/research-to-prototype-implementation-plan.md\` - \`phase-01-mobile-foundation-react-native-expo-typescript.md\` - \`phase-02-offline-first-sqlit…
