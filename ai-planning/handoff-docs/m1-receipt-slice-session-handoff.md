# M1 Receipt Slice — Session Handoff

Date: 2026-09-05
Written for: a new session resuming the M1 receipt-capture and OCR slice
Status: **historical handoff with a newer current-state addendum below**;
component Gate 2 remains unapproved after the fifth review

> **Current-state addendum — 2026-09-05:** the mobile branch now points to exact
> commit `7bbe85310e84ffb7e5ca465bd62dc706108d3e42`. The fifth read-only review
> confirmed the round-four duplicate path is closed but found a new blocker:
> large amounts can be stored exactly while the mandatory review screen displays
> a different cent value. It also found another tendered-amount synonym and OCR
> ordinal punctuation variant, showing that example-level remediation is still
> recurring. The root-cause analysis and prevention protocol are in
> `ai-planning/research/tech-research/preventing-repeat-ai-coding-remediation-loops/preventing-repeat-ai-coding-remediation-loops-findings.md`.
> Sections below preserve the earlier round-three handoff and must not be treated
> as the latest branch state.

---

## 1. Read this first

The receipt slice is functionally built and its tests are green, but it has been
through **three independent code reviews**, each of which found real defects the
author had already signed off as correct. Two of those rounds found defects
introduced by the previous round's remediation.

Do not treat green tests or a prior verification document as evidence that this
slice is sound. The most valuable lesson from this session is that the author's
self-assessment has been unreliable here, in a specific and repeatable way:
rules were built as denylists, extended to cover exactly the inputs the last
reviewer reported, and then declared fixed.

---

## 2. Where the work lives

| | Location |
| --- | --- |
| Central planning repo | `/Users/joerice/git/joericearchitect/home-roots-reinvest-in-growth` |
| Central branch | `chore/prototype-receipt-capture-ocr-review` (head `846fef0`) |
| Mobile component repo | `/Users/joerice/git/joericearchitect/hrf-reinvest-in-growth/hrf-reinvest-to-grow-mobile-app` |
| Mobile branch | `feat/m1-receipt-capture-ocr-review` (head `cf7d489`) |
| Central contract pin | `77884c2df34bf0e68e26f015abd42961ac6aee0d` |

Both branches are clean and pushed. The central repo has three untracked
research files under `ai-planning/research/react-native-expo/` that predate this
session and were not touched.

**Published review record:** the third-round reviewer maintains a shared page
carrying all three rounds of findings on a stable link. Ask Joe for the URL — it
is the authoritative record of what was found and is not duplicated in the
repository.

---

## 3. What happened in this session

Roughly in order.

1. **Recovered from a lost implementation.** An earlier build of this slice was
   written in a temporary folder, committed there, never pushed, and lost when
   the folder was cleared. Confirmed unrecoverable against the object store,
   GitHub, other clones, the Trash, IDE history and EAS artifact storage. The
   only surviving trace is EAS build `50639a3f` from commit `3f1efb93`, recorded
   as a residual gap in the central `linkage.md`. See
   `ai-planning/plans/m1-receipt-slice-cleanup-and-restart-plan.md`.
2. **Cleaned up** two repositories, a misplaced change on the wrong branch, a
   dead worktree registration, and a stale duplicate of the change package.
3. **Researched OCR library selection properly.** No prior audit trail existed.
   Six candidates compared; `rn-mlkit-ocr@0.3.1` confirmed. Findings in
   `ai-planning/research/tech-research/on-device-ocr-library-selection/`.
4. **Added Haitian Creole** as a third interface language in its own separate
   OpenSpec change, now archived and merged to mobile `main`. Words live in
   `src/i18n/{en,fr,ht}.json`; the Kreyòl values are machine-generated and
   marked unreviewed, with a reviewer handoff at
   `docs/translation-review/ht-review-2026-09.md`.
5. **Recorded the line-item deferral.** PRD requirement BJ-004 names Items,
   Quantity and Price; M1 deliberately extracts only merchant, date, total and
   description. Rationale in `ai-planning/design-briefs/m1-later-phase-deferred-work.md`.
6. **Built the receipt slice**: dependencies with verified bundled-model
   evidence, domain model, deterministic parser, SQLite persistence, injected
   image and OCR adapters, and the M08 screens.
7. **Three review rounds and three remediations** (section 4).

---

## 4. Review history — essential context

### Round one
Found nine defects. Two were not code defects but false claims in the author's
own verification document: it asserted SQLite repository test coverage that did
not exist, and asserted per-field uncertainty rendering that was never wired.
Gate 2 was withdrawn and the verification document rewritten to say so.

### Round two
Found the round-one remediation had **reintroduced a worse defect**. Keyword
matching collapsed punctuation and used substring tests, so the exclusion
`total ht` matched `TOTAL HTG` — the application's own currency. The real total
was suppressed, a count line became the sole candidate, and a 1,250-gourde
receipt was proposed as **HTG 3.00**. Merchant was still a denylist proposing
street addresses and greetings. Per-field certainty still unrendered.

Diagnosis, quoted because it is the thing to avoid repeating: *"every remaining
defect is a denylist that was extended to cover the reported inputs."*

### Round three (current, unresolved)
The rebuild was accepted as genuine — no confidently wrong amount on 20
realistic total-line shapes, F3 and F4 classes gone rather than relocated,
merchant recall materially improved, per-field certainty now genuinely
satisfied. **One blocking defect and nine smaller ones remain.**

---

## 5. Where we left off — the work to do

All ten findings below were independently reproduced by the author before being
accepted. They are ordered as agreed with the reviewer.

### Blocking

- **Double-write on retry after a post-commit read failure.** In
  `App.tsx` `confirmDraft`, the transaction id is minted by
  `Crypto.randomUUID` *inside* the `try`, and `listTransactions()` and
  `listReceipts()` both run inside it after the write has committed. If either
  read throws, the user is told the save failed and to retry; retrying mints a
  fresh id, idempotency key and operation id, so `INSERT OR IGNORE` cannot
  dedupe and a second identical expense is written. This violates the
  requirement that only explicit confirmation creates one expense and one
  outbox identity. The same `listReceipts()` call **was** correctly guarded on
  the load path in commit `cf7d489`; the guard was applied to the safer of the
  two paths.

### Coverage gaps — the fix exists but nothing holds it in place

- **The money-shape rule is untested.** Reverting the
  `lineNamesCurrency || hasDecimalFraction(token)` filter to a pass-through
  leaves all 86 parser tests green. F3's protection currently rests on `pieces`
  being in the counts denylist — the mechanism the rebuild was supposed to
  replace. Lock it with `TOTAL SACS 3 / TOTAL HTG 1250.00`, which uses a count
  word deliberately absent from the denylist.
- **`escapeForRegExp` is untested** the same way; reverting it to identity
  leaves everything green.

### Correctness and recall

- Activity list labels a **confirmed** record "Suggested from receipt". Swap the
  key from `receiptSource` to `receiptAttached`, which already exists in all
  three languages.
- Amount-tendered lines make the total ambiguous: `MONTANT RECU 1500.00` beside
  `TOTAL 1250.00` blanks, because `montant` is a total keyword and `reçu` and
  `versé` are not excluded.
- `le` in `nonMerchant.ht` blocks ordinary French shop names — `LE BON MARCHE`
  and `RESTAURANT LE CARIBE` both blank. This is machine-translated Kreyòl
  leaking into parser logic; re-check the Kreyòl lists for other short tokens
  that collide across languages.
- Amount ambiguity is computed on strings, so `1250.00` and `1250` compete as
  different values. Compare numerically.
- Only the first date-shaped match per line is examined, so
  `FACTURE NO 12-05-2024 DU 15/03/2026` blanks.

### Disposition in writing, do not necessarily fix

- Bare whole-gourde totals abstain (`TOTAL 1250` → blank). Direct cost of the
  money-shape rule. **Whether Haitian receipts commonly print whole gourdes
  cannot be settled without a real receipt in front of a real camera** — put it
  on the physical-device checklist.
- `TOTAL TTC (TVA INCLUSE) 1250.00` abstains; exclusion wins on a line that is
  unambiguously the payable total. Narrow, safe, same shape as round two.
- First-line merchant still proposes non-names when the name is not first:
  `DELMAS 33`, `WWW.BOUTIK.HT`, `QUALITE ET PRIX`.
- Currency escape hatch: once a line names HTG, every integer on it qualifies as
  money. No realistic failure demonstrated.
- Two-column layouts: `frame` coordinates are captured and persisted but the
  parser never reads them, though `design.md` says it examines optional
  coordinates. **Also a device question** — whether ML Kit splits right-aligned
  amount columns is untested in either direction.

### Then

- Rewrite `docs/implementation-evidence/m1-receipt-capture-ocr-mobile-verification.md`
  to describe the fixed state. It currently describes the withdrawn state, which
  is accurate but stale, and was deliberately not updated pending review.
- Request a fourth independent review. **Do not reopen Gate 2 on self-assessment.**

---

## 6. Governance state

- **Component Gate 1: approved** (`evidence/gate-1-approval.md`).
- **Component Gate 2: withdrawn.** Not to be requested again until the blocking
  defect is fixed and an independent review says so.
- Mobile tasks 1.1–4.3 are checked; 4.4 (Verify/Sync/Archive) and 4.5 (EAS gate)
  are open. **Caveat: task 4.3 is checked but its artifact was withdrawn**, so
  treat 4.3 as effectively incomplete.
- Central task 4.1 gates any EAS build behind separate just-in-time approval
  naming the exact revision. No build has been made from this branch.
- No installed-build or physical-device evidence exists or is claimed.

---

## 7. Environment and commands

```bash
# Mobile repo
npm run check     # prettier + tsc --noEmit + jest  (202 tests, currently green)
npx openspec validate --all --strict --no-interactive

# Android inspection (JDK 25 works; Gradle 9.3.1 supports it)
export JAVA_HOME=/opt/homebrew/opt/openjdk@25
export ANDROID_HOME=$HOME/Library/Android/sdk
npx expo prebuild --platform android --clean
cd android && ./gradlew :app:dependencies --configuration releaseRuntimeClasspath
```

Notes for the new session:

- Joe's shell profile has JDK 25 and `ANDROID_HOME` configured, but a fresh
  agent shell may not inherit them; export explicitly.
- Writes outside the current working directory and all network calls need the
  Bash sandbox disabled.
- `node:sqlite` is used to execute the real SQLite repository in tests; no
  dependency was added for it.
- The bundled-model configuration is guarded by
  `src/receipt/bundledModelConfig.test.ts` because `android/` is gitignored.

---

## 8. Verified and settled — do not re-litigate

- **Bundled OCR model.** Confirmed twice independently. Only
  `com.google.mlkit:text-recognition:16.0.1` is declared directly;
  `text-recognition-bundled-common` ships the static model per ABI; the gms
  artifact arrives transitively through Google's own POM and cannot be
  excluded, so the design's literal "no play-services artifact" criterion is
  unsatisfiable by construction. Recorded in
  `docs/dependency-evidence/m1-receipt-capture-ocr-mobile.md`.
- Three-language key parity (92 keys) and `fr-HT` formatting for Kreyòl.
- Receipt line items, per-item price and tax breakdown are **out of scope**,
  deferred to M8 with recorded rationale.
- The revert pair `be0df90` / `8ff114e` is net-zero.

---

## 9. Working agreements from this session

- Task-autonomous pacing within Apply; continuous commit and push to the feature
  branch; **hard stop before Sync, Archive or merge** pending Gate 2.
- A regression test that passes against the reintroduced defect is not a
  regression test. Revert the fix in a scratch copy and confirm the test fails.
  This caught one worthless test in this session and, in round three, caught two
  fixes with no coverage at all.
- The author should not write the adversarial fixtures for rules the author
  wrote. Self-review in this session found real defects but concentrated on
  areas the previous reviewer had already pointed at.
