# M1 Speech Proposal EAS Build Gate

Date: 2026-08-18

## Approved Build Boundary

- Owner approval: Joe Rice authorized installation of EAS CLI in the temporary
  mobile build worktree and the build to proceed after the exact command and
  boundary were presented.
- Source: component repository `jizzoe/hrf-reinvest-to-grow-mobile-app`,
  delivered `main` revision `6dfc4ad79af8310dcc36d3617578878275215a68`.
- EAS project: `@joericearchitect/hrf-reinvest-to-grow`, project ID
  `85d7d86a-ee85-4b82-85ef-8a6b7e26eb48`.
- Build profile: `preview`.
- Distribution and artifact boundary: internal distribution, Android APK only;
  no submission, deployment, release, or external tester distribution.
- Runtime access: local `eas-cli 22.0.0` authenticated as
  `joericearchitect`, an owner of the configured EAS project.
- Credential boundary: the build used the existing remote Android credential
  with `--freeze-credentials`; no signing material was read into this
  repository or changed locally.

## Submission Evidence

Command:

```bash
eas build --platform android --profile preview --non-interactive \
  --freeze-credentials --no-wait --json
```

Build ID: `6dd64511-469e-4cca-b1a0-0aa4e11d8b0d`

Build status at submission: `NEW` (uploaded and accepted by EAS; no artifact
was available yet).

Build details: <https://expo.dev/accounts/joericearchitect/projects/hrf-reinvest-to-grow/builds/6dd64511-469e-4cca-b1a0-0aa4e11d8b0d>

The build reports Android application ID
`org.homerootsfoundation.reinvesttogrow`, SDK `57.0.0`, app version `1.0.1`,
and build version `2`.

## Boundaries And Next Step

This gate authorizes only the stated internal APK build. It does not establish
APK installability, device TTS output, enlarged-text reachability, end-to-end
acceptance, central Verify, Sync, or Archive. After EAS completes successfully,
Joe Rice must install the exact artifact on the assigned Android 15 device and
record the synthetic-data acceptance evidence at
`ai-planning/evidence/m1-speech-proposal-e2e.md`.
