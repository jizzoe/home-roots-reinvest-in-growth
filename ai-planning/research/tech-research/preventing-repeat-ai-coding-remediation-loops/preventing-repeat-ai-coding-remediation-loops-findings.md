# Preventing repeated AI coding remediation loops

Date: 2026-09-05
Depth: standard research
Scope: lessons from the M1 receipt-capture/OCR Component Gate 2 reviews
Status: advisory process note; it does not approve the component or change product truth

## Executive conclusion

I cannot guarantee bug-free code. No coding model or human engineering process can.
That limitation does **not** excuse this four-remediation loop. The fifth review's
blocking defect was a predictable consequence of an incomplete repair: round four
made the stored amount exact but did not trace the same amount through the review
row and spoken/written confirmation summary. I tested the changed conversion
function, not the user-visible financial invariant.

The recurring failure is not primarily insufficient intelligence, an obscure
platform fault, or too few tests. It is a defective remediation method:

1. repair the reviewer's exact counterexample;
2. add tests for that spelling or code path;
3. run a large suite built around the same assumptions;
4. declare the finding closed;
5. let the next reviewer discover an adjacent member of the same bug family.

That method produced 258 green tests while the mandatory review screen displayed
a different amount from the one it stored. Test count was therefore not evidence
of the required outcome.

The corrective action is to stop direct patching, model a small set of end-to-end
invariants, centralize the representations that enforce them, and test families
of inputs and state transitions. External independent review remains necessary,
but it should verify an already adversarially tested design rather than serve as
the first mechanism that explores the design's neighborhood.

## Claim classifications used in this note

- **Verified fact:** directly inspected in the exact-head repository or command
  evidence during this pass.
- **Review-reported claim:** measured by the fifth reviewer and consistent with
  the inspected code, but not independently rerun during this research pass.
- **Source-reported claim:** current guidance or behavior stated by a cited
  external primary or maintained reference source.
- **Assistant inference:** a causal conclusion drawn from the review sequence,
  code structure, and test gaps; the numbered root causes below are inferences.
- **Recommendation:** a proposed change to the engineering process or harness;
  it is not yet approved policy or implementation authority.

## Evidence status

### Verified locally at exact head

The mobile repository was inspected read-only at
`7bbe85310e84ffb7e5ca465bd62dc706108d3e42` on branch
`feat/m1-receipt-capture-ocr-review`; local and remote heads matched.

- `src/domain/journal.ts:74-95` parses a decimal amount into integer cents by
  joining its digits. This is the correct direction for persistence.
- `src/domain/journal.ts:57-62` separately divides those cents by `100` before
  formatting them.
- `src/domain/journal.ts:65-69` separately converts the draft string through
  `Number` and multiplies it by `100` for the review summary.
- `src/domain/journal.test.ts:76-79` tests the exact stored-cent conversion but
  does not assert the rendered review row, review sentence, confirmed record,
  or activity row for the same boundary value.
- The round-four parser diff added one `ENCAISSE` example and exact `N °` / `N º`
  examples. The implementation likewise added vocabulary and one exact regular
  expression. It did not define the semantic family "money received is not the
  payable total" or the separator family "an identifier marker may contain OCR
  punctuation and spacing."

These facts are visible in the exact-head
[journal domain](https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app/blob/7bbe85310e84ffb7e5ca465bd62dc706108d3e42/src/domain/journal.ts),
[parser](https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app/blob/7bbe85310e84ffb7e5ca465bd62dc706108d3e42/src/receipt/receiptParser.ts),
and [parser tests](https://github.com/jizzoe/hrf-reinvest-to-grow-mobile-app/blob/7bbe85310e84ffb7e5ca465bd62dc706108d3e42/src/receipt/receiptParser.test.ts).

### Review-reported and code-corroborated

The fifth review reported:

- entered `90071992547309.93`;
- stored `9007199254730993` cents;
- rendered `HTG 90,071,992,547,309.94` on both mandatory review displays;
- `MONTANT PERÇU/PERCU 1500.00` becoming the confident total beside
  `TOTAL 1250`; and
- `FACTURE N. ° 14-03-2026` becoming a confident date.

This research pass corroborated the responsible code structures but did not
rerun the reviewer's rendered scratch probe. The review text was supplied in the
session and has no durable external URL, so it is recorded as review-reported
evidence rather than falsely presented as an independently reproduced result.

## Why this kept happening

### 1. I closed functions, not outcomes

The round-four finding concerned financial exactness. I scoped the repair to
`parseAmountToCents`, because that was the cited defect location, and proved that
one function returned the expected cents. I did not perform an impact-cone trace
from entered text through:

```text
draft text
  -> validation
  -> review Amount row
  -> review/voice sentence
  -> confirmed transaction
  -> SQLite cents
  -> activity row and totals
```

Three independently implemented conversions remained. The fifth blocker is the
direct result. The missing test was not another unit test; it was one assertion
that every node in this chain represented the same cents.

### 2. I kept treating semantic classes as vocabulary lists

Round two had already identified the denylist pattern. Nevertheless, round four
handled `ENCAISSÉ/ENCAISSE` by adding those words. `PERÇU/PERCU` then escaped the
list. This was foreseeable: French has multiple tendered/received/payment terms,
and OCR introduces accent loss and spelling variation.

The defect class is "a tendered amount can outrank a payable whole-gourde total."
Adding synonyms cannot close that class. The parser needs contextual evidence
for a payable total or a conservative rule that abstains when a tendered line
competes with a weaker total line.

### 3. I implemented an example-shaped regular expression

The ordinal remediation changed `n[°º]` to `n\s*[°º]`. It captured the reported
space but not punctuation between the characters. `N. °` was therefore a natural
next counterexample, not a surprising new requirement.

This is the same methodological error as the tendered-word fix: encode the
reported surface form rather than normalize an OCR separator class and then
reason over the normalized token.

### 4. The test oracle shared the implementation's assumptions

The tests asked whether the newly changed helper produced its intended local
result. They did not independently state the user contract. A test suite can be
large and still be circular when its fixtures and assertions are derived from
the same patch.

OpenAI's evaluation guidance recommends an explicit success objective, a dataset
with typical, edge, and adversarial cases, continuous execution, and growing the
set as new failures appear. That describes what was missing here: an invariant
and a held-out behavior corpus, not simply more examples in the author's unit
test file. See [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices).

### 5. Review was bounded by the diff when risk crossed unchanged callers

The large-amount change touched the persistence converter. The incorrect display
helpers were pre-existing and therefore easy to exclude mentally from a focused
remediation review. Financial correctness crosses those unchanged callers, so a
diff-only review was the wrong boundary. Correct review scope is the affected
behavior and its callers, not only the edited lines.

### 6. Passing checks were described too broadly

The defensible claim after round four was: "the reported persistence conversion
and listed examples pass." The broader implication that financial exactness,
tendered lines, or French identifier variants were closed exceeded the evidence.
This encouraged another external gate attempt before the behavior family was
actually covered.

### 7. We had no stop rule for repeated adjacent defects

Once a second reviewer found another synonym or separator variant, that was
evidence of a faulty abstraction. The process still allowed another local patch.
Without a mandatory design-reset threshold, repeated cheap-looking fixes consumed
the entire day.

### 8. Model behavior amplified the process weakness

Language models are effective at local pattern completion and are therefore also
prone to anchoring on concrete feedback. Long remediation histories can narrow
attention toward "make this reported case pass." A better model can reduce error
rates, but it cannot turn an example-level acceptance contract into a complete
one.

OpenAI explicitly says reliable environments, tests, documentation, and manual
validation remain necessary for Codex-generated work. OpenAI's own agent-first
engineering account says that when an agent struggles, the response is to add a
missing capability or enforceable guardrail, centralize invariants, validate
boundaries, and make the UI directly legible to the agent—not merely to ask the
agent to try harder. See [Introducing Codex](https://openai.com/index/introducing-codex/)
and [Harness engineering](https://openai.com/index/harness-engineering/).

## Why the feature was deceptively difficult

The user-facing action is simple: photograph a receipt and confirm an expense.
Its implementation combines several correctness-sensitive problems:

- noisy multilingual OCR and punctuation variation;
- deciding whether ambiguous text is evidence or a reason to abstain;
- exact decimal money across text, JavaScript numbers, formatting, and SQLite;
- ambiguous transaction commit results and exactly-once retry behavior;
- navigation and recovery state across app restarts; and
- a mandatory human review screen whose display must match persistence.

This explains the risk but does not justify the loop. It is precisely why the
work should have been divided into explicit invariant-sized changes. OpenAI's
current Codex practice recommends planning larger work first, keeping tasks
well-scoped, supplying issue-like context, and improving the repository's test
environment over time. See [How OpenAI uses Codex](https://openai.com/business/guides-and-resources/how-openai-uses-codex/).

## Required prevention protocol

### A. Stop patching and write four executable invariants

Before another implementation edit, record these as acceptance criteria and
tests:

1. **MONEY-EXACT:** For every accepted amount, the editable value, review Amount
   row, review/voice sentence, stored cents, confirmed activity row, and totals
   all represent exactly the same integer number of cents.
2. **TOTAL-SEMANTICS:** A line describing money received, tendered, paid, cash,
   or change is never confidently proposed as the payable total. Accent loss,
   case, and reasonable OCR punctuation do not change that outcome.
3. **IDENTIFIER-NOT-DATE:** A date-shaped token attached to an identifier label
   is never proposed as a receipt date, across supported spacing and punctuation
   variants. A later genuine date on the same line remains discoverable.
4. **CONFIRM-ONCE:** One confirmation intent creates at most one transaction and
   one stable outbox identity across every success, ambiguous commit, retry,
   Back/Edit, field edit, cancellation, refresh failure, and restart transition.

These are behavioral contracts. Function names and current implementation
details must not appear in the assertion side of the tests.

### B. Centralize each representation

- Parse an amount into canonical integer cents once.
- Format integer cents without first dividing into a floating-point decimal.
- Build review text, review rows, activity rows, and totals from that formatter.
- Do not independently call `Number(draft.amount)` on a financial display path.
- Normalize OCR token separators and accents once before classification.
- Represent confirmation as an explicit state machine with one stable intent id.

JavaScript's `Number` safe-integer boundary does not make decimal division exact;
precision depends on magnitude. MDN documents both the `2^53 - 1` integer limit
and the precision caveat. See [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).

### C. Test families, not only specimens

For each repaired case, require the following closure matrix:

| Test kind | Money example | OCR/parser example |
| --- | --- | --- |
| Reported case | `.93` persists exactly | `ENCAISSE`, `N °` |
| Adjacent member | same magnitude with `.01`, `.99` | `PERCU`, `N. °` |
| Equivalent spelling | leading zeros, comma decimal | accent/case loss |
| Boundary | maximum accepted cent and first rejected cent | zero/one/many separators |
| Inverse | invalid/too-large amount rejected | later real date still found |
| User-visible flow | review equals stored and activity value | review shows abstention |
| Mutation | reintroduce division/`Number` and see failure | weaken semantic guard and see failure |

Property-based testing is a good fit because it asserts relationships across
generated values rather than enumerating a few examples. `fast-check` supports
Jest, reproducible seeds, shrinking, model-based state-machine tests, and async
scheduling. See the [fast-check project](https://github.com/dubzzz/fast-check).

Metamorphic tests should derive new cases from every reported case:

- add or remove accents without changing semantic classification;
- insert OCR spacing or punctuation inside an identifier marker;
- switch decimal point and comma where the locale permits it;
- add leading zeros without changing cents;
- insert a tendered line without changing the payable total; and
- reorder unrelated lines without changing the selected evidence.

This follows the original idea of deriving follow-up cases whose outputs must
maintain a defined relation to a successful source case. See
[Metamorphic Testing](https://www.cse.ust.hk/faculty/scc/publ/CS98-01-metamorphictesting.pdf).

### D. Add one vertical test per financial invariant

A rendered React Native test must perform the user's actual path:

1. enter or recover the draft amount;
2. inspect both review displays;
3. confirm;
4. read the persisted transaction;
5. return to activity; and
6. assert exact equality by canonical cents at every step.

This test would have caught the fifth blocker immediately. Testing Library's
guiding principle is that tests resembling actual use give more confidence than
tests of implementation details; it has a React Native implementation. See
[Testing Library](https://testing-library.com/docs/).

### E. Prove that tests can fail

For high-risk guards, temporarily reintroduce the old defect or run targeted
mutation testing. The check passes only if at least one relevant test fails.
Stryker describes a mutation that survives a green suite as evidence that the
tests do not enforce the changed behavior. See
[Stryker mutation testing](https://stryker-mutator.io/docs/).

Required mutation targets for this slice:

- decimal-string-to-cents conversion;
- cents-to-display formatting;
- tendered-line exclusion/context classification;
- identifier normalization;
- ambiguous commit reconciliation; and
- stable confirmation identity.

### F. Separate implementation fixtures from holdout review fixtures

- The implementation set contains reported reproductions and ordinary boundary
  cases.
- A fresh review worker creates a small holdout set of synonyms, punctuation,
  reordered lines, amount boundaries, and recovery transitions before reading
  the patch's tests.
- The implementation worker does not use the holdout set to choose the design.
- The holdout result is disclosed after local verification and before the formal
  gate review.
- Every escaped holdout becomes a permanent regression/eval case.

OpenAI recommends continuous evaluation and growing eval datasets with discovered
edge cases. That principle applies here even though the artifact under test is
ordinary application code rather than an LLM prompt.

### G. Use an explicit design-reset threshold

Apply this mechanical rule:

> If a remediation review discovers a second unhandled member of the same
> semantic or state-transition family, stop direct patches. Reopen the design,
> replace the abstraction, and require family-level plus vertical tests before
> requesting another independent review.

Under this rule, `PERÇU` after `ENCAISSE` and `N. °` after `N °` both force a
parser-design reset. They are not eligible for one-word or one-character fixes.

### H. Tighten evidence language

Use these claim levels:

- **Reproduction closed:** the exact reported input now passes.
- **Family covered:** named equivalence classes and generators pass.
- **User outcome covered:** a rendered vertical test proves the visible and
  persisted result.
- **Independently reviewed:** a fresh reviewer found no blocking contradiction.
- **Device validated:** the installed build passed the physical-device script.

Never use "fixed," "complete," or "Gate 2 ready" when the evidence supports
only the first level.

## Proposed next delivery shape

Do not submit a fifth narrow remediation. Split the recovery into bounded steps:

1. **Invariant and impact map only:** no production code; enumerate consumers,
   state transitions, equivalence classes, and test oracles.
2. **Exact-money vertical slice:** one cents representation and formatter used by
   draft review, TTS text, persistence, activity, and totals; add property and
   rendered round-trip tests.
3. **Parser classification redesign:** semantic tendered/payable handling and
   identifier normalization; add generated/metamorphic cases.
4. **Confirmation-state verification:** retain the now-closed duplicate logic and
   exercise it with model-based transition tests rather than modifying it unless
   a test fails.
5. **Fresh local adversarial review:** review the behavior's impact cone, not only
   the diff; run targeted mutations.
6. **One independent Component Gate 2 review.** If a same-family issue remains,
   stop again rather than beginning another synonym patch.
7. **Physical-device gate** remains separate and outstanding.

## Tool and model disposition

### Recommended tools

- Keep Jest and React Native Testing Library.
- Evaluate `fast-check` for money, OCR variation, and confirmation state-machine
  properties.
- Evaluate targeted StrykerJS mutation runs on the high-risk modules; it need not
  run over the whole application on every edit.
- Maintain a checked-in synthetic receipt/eval corpus containing every reviewer
  counterexample plus generated-family seeds. No real receipt data is required.

These are recommendations, not authorization to add dependencies.

### Model guidance

The installed standard-research workflow maps the `balanced-standard` role to
`gpt-5.6-terra`. Current OpenAI Docs describes Terra as the balance of
intelligence and cost; this session is already using the more capable
`gpt-5.6-sol`. The session model was not changed. See the current
[GPT-5.6 Terra model page](https://developers.openai.com/api/docs/models/gpt-5.6-terra).

Changing models is not the primary remediation. The failures occurred despite a
strong model and extensive reasoning. The higher-leverage change is an executable
harness that makes incomplete reasoning fail before an external gate review.
Best-of-N or a stronger model can be useful for the **holdout reviewer**, but only
after the invariant and oracle are independent of the implementation.

## Unknowns and decisions still required

- Whether `fast-check` and StrykerJS are acceptable new development dependencies
  in the component repository. Adding them needs component-repository approval.
- Whether the product should support amounts close to JavaScript's safe-cent
  limit or impose a much smaller business maximum. That is a product decision;
  rejecting values that cannot be displayed exactly is still mandatory.
- Which semantic receipt labels and OCR transformations are sufficiently common
  in Haitian retail output. Synthetic families can improve safety now, but real
  camera/device evidence remains necessary.
- Whether the project wants the design-reset rule and evidence-level vocabulary
  made mandatory in component `AGENTS.md` and the SDD workflow. This note
  recommends it but does not change policy.

## Bottom line

The reviewers are not finding unrelated bad luck. They are repeatedly exposing
the same two process defects: duplicated correctness logic and patches scoped to
examples instead of invariants. The next step is not to try the same loop more
carefully. It is to change the loop so that exact money, parser semantics, and
confirmation identity are each represented once and automatically challenged
across their whole behavioral family before Gate 2 is requested again.
