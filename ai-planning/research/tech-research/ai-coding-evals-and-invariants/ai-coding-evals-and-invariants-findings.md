# Learning evals and invariants for AI-assisted coding

Date: 2026-09-05
Depth: quick learning guide
Purpose: beginner-friendly resources and a practical way to use them before the
next receipt-capture remediation

## Start here

An **invariant** is a promise that must always stay true. For example: "the
amount shown to confirm is exactly the amount that gets saved."

An **eval** is a deliberate set of checks that proves whether those promises
hold in normal, unusual, and hostile-looking cases. In ordinary software, evals
are usually a combination of unit tests, user-flow tests, sample inputs, and
review checks. For AI-assisted development, they also provide the proof an agent
must pass before it can call its work complete.

Evals are related to test-driven development (TDD), but they are broader:

| Practice | Main question | Example |
| --- | --- | --- |
| TDD | Does this small piece of code do its job? | Does decimal text convert to cents? |
| Eval | Does the feature meet the user promise across real situations? | Does entered money match the review screen, saved record, and activity row? |

Use both. TDD helps build a correct part; evals keep the whole feature honest.

## Recommended reading order

### 1. Learn the basic eval loop — 20 minutes

Read [OpenAI's Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices).

Focus on the five steps:

1. state what success means;
2. collect examples that represent the work;
3. decide how to judge pass or fail;
4. run the checks; and
5. add new failures to the set so the same mistake cannot quietly return.

For the receipt feature, success is not "the parser test passes." It is "the
user never confirms one amount and saves another."

### 2. See what an eval is made of — 20 minutes

Read [OpenAI's Working with evals guide](https://developers.openai.com/api/docs/guides/evals).

The important idea is simple: an eval has inputs, an expected result, and a clear
way to decide pass or fail. The OpenAI page uses AI-output examples, but the same
shape works for ordinary code:

| Part | Receipt example |
| --- | --- |
| Input | Enter `90071992547309.93` |
| Expected result | Every display and stored record represents `.93` |
| Judge | Compare canonical cents, not rounded display numbers |

### 3. Learn why tests must follow the person, not the helper — 10 minutes

Read [Testing Library's introduction](https://testing-library.com/docs/).

Its useful principle is: the more a test resembles how someone uses the software,
the more confidence it gives. That is why the financial test should enter an
amount, read the review screen, confirm, reopen the activity list, and inspect
the saved record—not merely call one conversion function.

### 4. Learn how to test a whole family of variations — 30 minutes

Read the [fast-check introduction](https://github.com/dubzzz/fast-check).

This is called property-based testing. Instead of writing only:

```text
"PERCU 1500.00" must not become the total.
```

you write a rule such as:

```text
For all supported spellings and accent variants of "money received",
that line must never be confidently chosen as the payable total.
```

The tool tries many variations and, when it finds a failure, reduces it to a
small reproducible example.

### 5. Learn how to test the tests — 15 minutes

Read [Stryker's mutation-testing introduction](https://stryker-mutator.io/docs/).

Mutation testing deliberately weakens a rule in the code and runs the tests. If
the tests still pass, they did not actually protect that rule. This is useful
after a fix that looks well-covered but may only be covered by a similar
implementation assumption.

### 6. Learn the method that fits noisy OCR — optional, 30 minutes

Read [Metamorphic Testing](https://www.cse.ust.hk/faculty/scc/publ/CS98-01-metamorphictesting.pdf).

The name is technical; the idea is not. Start with one valid case, change it in
a way that should not change the answer, then check that the answer stays right.

For example:

```text
N ° 14-03-2026   -> not a receipt date
N. ° 14-03-2026  -> still not a receipt date
Nº 14-03-2026    -> still not a receipt date
```

## The four invariants for this receipt feature

These are proposed acceptance rules for the next implementation. They are not
yet approved requirements or production changes.

1. **Exact money:** the entered amount, review row, review sentence, stored
   cents, and activity row must all mean the same amount.
2. **Correct total:** a line saying money was received, tendered, paid, or
   change given back must not be confidently selected as the receipt total.
3. **Correct date:** a receipt number that happens to look like a date must not
   become the transaction date.
4. **One confirmation, one record:** a single confirmation attempt must not
   create two expenses, even after an error, retry, Back/Edit action, or restart.

The full root-cause note explains why these were selected and how to test them:
[Preventing repeated AI coding remediation loops](/Users/joerice/git/joericearchitect/home-roots-reinvest-in-growth/ai-planning/research/tech-research/preventing-repeat-ai-coding-remediation-loops/preventing-repeat-ai-coding-remediation-loops-findings.md).

## A small eval card to use before coding

For each change, write this before editing production code:

```text
User promise:
  What must always be true for the person using the app?

Invariant:
  Write one sentence that must remain true on every supported path.

Examples:
  Include the reported bug, an ordinary case, an edge case, and a nearby variation.

User-flow proof:
  State the taps/screens/storage result that demonstrate the promise.

Break-the-test check:
  Describe one small bad change that the tests must catch.

Completion rule:
  This change is not "done" until all listed checks pass and a fresh reviewer
  sees no contradiction in the same behavior family.
```

For example, the large-money repair card would say:

```text
User promise: I can see exactly the amount I am about to save.
Invariant: All display and storage paths represent the same integer cents.
Examples: 12.34; 1250; 90071992547309.93; first rejected amount.
User-flow proof: enter -> review both displays -> confirm -> activity -> reopen.
Break-the-test check: restore a floating-point conversion; the rendered test fails.
Completion rule: unit, rendered, boundary, and mutation checks pass.
```

## How AI-assisted coding should use this guide

OpenAI's [Harness engineering](https://openai.com/index/harness-engineering/)
and [How OpenAI uses Codex](https://openai.com/business/guides-and-resources/how-openai-uses-codex/)
both point toward the same practice: give the coding agent a clear, bounded job
and a reliable way to prove it. The agent should receive the eval card first,
then implement only after the expected outcome and checks are explicit.

The safe completion order is:

1. agree on the invariant and eval card;
2. add failing or missing tests that express it;
3. implement the smallest coherent change;
4. run the full eval set and the ordinary project checks;
5. use a fresh reviewer with nearby cases the implementer did not choose; and
6. only then describe the implementation as ready for the next gate.

## Recommended resources at a glance

| Resource | Best for | Difficulty |
| --- | --- | --- |
| [OpenAI Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Starting an eval plan | Beginner |
| [OpenAI Working with evals](https://developers.openai.com/api/docs/guides/evals) | Inputs, expected outputs, and pass/fail criteria | Beginner/intermediate |
| [Testing Library](https://testing-library.com/docs/) | User-visible tests | Beginner |
| [fast-check](https://github.com/dubzzz/fast-check) | Many input variations and state paths | Intermediate |
| [Stryker](https://stryker-mutator.io/docs/) | Checking that tests really protect a rule | Intermediate |
| [Metamorphic Testing](https://www.cse.ust.hk/faculty/scc/publ/CS98-01-metamorphictesting.pdf) | OCR and parser variation families | Advanced but useful |
| [OpenAI Harness engineering](https://openai.com/index/harness-engineering/) | Designing an AI coding process that is dependable | Beginner/intermediate |

## Evidence labels

- **Source-reported claims:** the linked OpenAI, testing-tool, and research
  sources describe their own guidance or capabilities.
- **Assistant inferences:** applying those methods to the receipt feature and
  selecting its four invariants.
- **Unknowns:** this guide does not decide whether to add new test dependencies
  to the mobile repository; that requires explicit approval.
- **Recommendations:** use the eval card and approval gate before the next code
  remediation.

## Model-guidance provenance

The research workflow's quick-scan role maps to `gpt-5.6-luna` as a cost-saving
recommendation. This guide was created in the current session without switching
models. Exact model recommendations can change, and model choice does not replace
the required eval and review process.
