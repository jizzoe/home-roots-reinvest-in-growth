# M1 Receipt Feature — Cleanup and Restart Plan

Status: Cleanup steps 1-5 completed and verified 2026-09-04; step 6 recorded
Date: 2026-09-04
Owner: Joe Rice
Purpose: Explain in plain language what happened to the receipt-photo feature work, and give exact steps to get both project folders into a clean, trustworthy state before the feature is built again.

---

## 1. What happened, in plain language

The last remaining piece of the M1 prototype is the receipt feature: the person
photographs a paper receipt, the app reads the text off it automatically,
suggests amounts, and the person corrects and confirms before anything is
saved.

That feature was built and tested in August. On 2026-08-18 an installable
Android test app was produced from it.

The problem is where the work was done. It was written in a temporary folder
(`/private/tmp/m1-receipt-capture-ocr-mobile`). Mac clears that location on
restart. The changes were saved into the project's history *inside that
temporary folder*, but were never uploaded to GitHub. When the folder was
cleared, the code went with it.

### Proof that the work existed

The build service still has the record, even though the code is gone:

| Detail | Value |
| --- | --- |
| Build reference | `50639a3f-8077-43c3-8a17-865e7e567077` |
| Date | 2026-08-19 00:30 UTC (2026-08-18 evening, local) |
| Built from saved change | `3f1efb93` — "docs: record receipt OCR local validation" |
| Everything saved at build time? | Yes — the build service confirms nothing was left unsaved |
| Started by | `joericearchitect` |

That saved change, `3f1efb93`, does not exist in the project folder or on
GitHub.

### Everywhere we looked for the code

| Where | Result |
| --- | --- |
| The mobile project folder, every version line and every saved change | Not found |
| Every loose object in the project's internal storage | Not found |
| Set-aside/parked work | None |
| GitHub | "No commit found for SHA 3f1efb93" — it never reached GitHub |
| Other copies of the project on this Mac | Only one copy exists |
| Trash | Empty |
| IntelliJ's own file history (both versions) | No receipt-related content |
| The installable test app file on the build service | Deleted from storage — returns "not found" |
| Installable test app files on this Mac | Only the earlier manual-entry one |

### Why it could not be recovered

Two safety nets were missing at the same time, and either one alone would have
saved the work.

The folder was registered as a proper worktree of the mobile project — but that
registration was created 2026-08-19 at 20:12, a full day *after* the build on
2026-08-18 at 20:30. At build time the folder was a self-contained clone: its
own complete copy of the project history, stored inside itself.

That distinction decides recoverability:

- A **linked worktree** shares the parent project's stored history. Changes
  saved in it land in the real project folder and survive the temporary folder
  being deleted. Had it been one, the work would have been recoverable.
- A **separate clone** carries its own history inside itself. Delete the
  folder, delete the history.

Automatic cleanup is *not* the cause. The mobile project has never run one —
276 loose objects and a single pack from 2026-08-16 remain untouched, so
nothing was pruned. The lost change simply was never stored there.

So: a self-contained clone in a folder macOS clears, never uploaded, then the
folder was cleared. Both copies died together.

### What this means

The code has to be written again. **The thinking does not.** The approved
written plans survived completely, and they are specific: which photo library
to use, which on-device text-recognition approach, how the suggestions must be
kept separate from confirmed amounts, and how the save path reuses the existing
expense flow. Rebuilding means following an approved plan, not re-deciding
anything.

Also worth knowing: the earlier claim that "there is one bug" no longer applies.
That bug was in code that no longer exists.

---

## 2. Why cleanup is needed before rebuilding

There are four loose ends. Each one would cause a real problem if we started
building on top of it.

### Loose end 1 — Two competing versions of the plan exist

There are two versions of the receipt plan on this Mac.

**The approved version** lives on the working line named
`chore/prototype-receipt-capture-ocr-review`. It contains nine documents,
including the written approval to proceed, the planning review, the tracking
file, and the instruction sheet that was formally sent to the mobile project.
Its checklist shows the first three planning steps completed and approved.

**A second, unapproved version** is sitting loose in the central project
folder. It was written from scratch about 25 minutes after the approved
version. It has only five documents. It is missing the approval record, the
planning review, the tracking file, and the instruction sheet. Its checklist
shows *nothing* completed — including the steps that were genuinely approved.

If we started from that second version, we would silently throw away a real
approval and break the reference number that the mobile project's own plan
points back to.

**Decision: the version on `chore/prototype-receipt-capture-ocr-review` is the
real one. The loose copy gets saved aside as a keepsake, then removed.**

### Loose end 2 — The central project folder is showing the wrong version line

The central project folder is currently showing `main`, which does not contain
the receipt plan, the approval, or the tracking file at all. None of the
approved receipt work is visible from where the folder currently sits.

### Loose end 3 — Leftover pointers to the deleted temporary folder

The mobile project still has a registration pointing at the temporary folder
that no longer exists, plus a duplicate local working line
(`work/m1-receipt-capture-ocr-mobile`) that is an exact copy of one already on
GitHub. Both are clutter that make it easy to start work in the wrong place —
which is exactly how the code was lost the first time.

### Loose end 4 — An untraceable test build sits in the project record

Build `50639a3f` exists in the project's build history with no surviving source
code behind it. This project's own governance requires every record to trace
back to its source and evidence. Leaving it undocumented means the final
review at the end of this feature would hit an unexplained build. It needs to
be written down honestly as a known gap.

---

## 3. Step-by-step cleanup

Run these in order. **The order matters:** steps 1 and 2 must happen before
step 3, because the loose copy sits at exactly the same file paths as the
approved version, and the switch in step 3 will refuse to run while it is
there.

### Step 1 — Save a keepsake copy of the loose version

```bash
cp -R \
  /Users/joerice/git/joericearchitect/home-roots-reinvest-in-growth/openspec/changes/prototype-receipt-capture-ocr-review \
  /Users/joerice/git/joericearchitect/_receipt-draft-backup-2026-09-04
```

Stored outside both project folders on purpose, so it can never be confused
with real project content.

### Step 2 — Remove the loose version from the central project folder

```bash
cd /Users/joerice/git/joericearchitect/home-roots-reinvest-in-growth
rm -rf openspec/changes/prototype-receipt-capture-ocr-review
git status --short
```

Expected: `git status --short` prints nothing at all.

### Step 3 — Point the central project folder at the approved version line

```bash
cd /Users/joerice/git/joericearchitect/home-roots-reinvest-in-growth
git checkout chore/prototype-receipt-capture-ocr-review
git status
```

Expected: "On branch chore/prototype-receipt-capture-ocr-review", "up to date
with origin", "nothing to commit, working tree clean".

After this, the approved plan, the approval record, the tracking file, and the
instruction sheet are all visible in the folder.

### Step 4 — Clear the dead temporary-folder registration in the mobile project

```bash
cd /Users/joerice/git/joericearchitect/hrf-reinvest-in-growth/hrf-reinvest-to-grow-mobile-app
git worktree prune
git worktree list
```

Expected: only one line, the main project folder itself. The
`/private/tmp/...` line is gone.

### Step 5 — Remove the duplicate local working line and switch to the real one

```bash
cd /Users/joerice/git/joericearchitect/hrf-reinvest-in-growth/hrf-reinvest-to-grow-mobile-app
git branch -D work/m1-receipt-capture-ocr-mobile
git checkout feat/m1-receipt-capture-ocr-review
git status
```

Safe to delete: that line points at exactly the same saved change as the copy
already stored on GitHub, so nothing is lost.

Expected: "On branch feat/m1-receipt-capture-ocr-review", tracking the GitHub
copy, "nothing to commit, working tree clean".

### Step 6 — Write the lost build into the tracking file

On the central project's approved version line, add an entry to the "Residual
Gaps" section of
`openspec/changes/prototype-receipt-capture-ocr-review/linkage.md` recording:

- Android build `50639a3f-8077-43c3-8a17-865e7e567077` was produced on
  2026-08-19 from saved change `3f1efb93`.
- That change was saved locally in a temporary folder, never uploaded to
  GitHub, and is unrecoverable — confirmed against the project folder's full
  internal storage, GitHub, other copies on the Mac, the Trash, IntelliJ's file
  history, and the build service's own file storage.
- No device-testing evidence was recorded from that build, so no claim of
  completion anywhere depends on it.
- The feature will be rebuilt from the approved plan; the reference number
  `77884c2` stays valid and unchanged.

Then save and upload that change:

```bash
git add openspec/changes/prototype-receipt-capture-ocr-review/linkage.md
git commit -m "docs: record unrecoverable receipt build as residual gap"
git push
```

---

## 4. How to confirm you have a clean slate

All six must be true before any building starts.

| # | Check | Command | Expected |
| --- | --- | --- | --- |
| 1 | Central folder on the approved version line | `git branch --show-current` | `chore/prototype-receipt-capture-ocr-review` |
| 2 | Central folder has nothing loose or unsaved | `git status --short` | no output |
| 3 | Mobile folder on the receipt version line | `git branch --show-current` | `feat/m1-receipt-capture-ocr-review` |
| 4 | Mobile folder has nothing loose or unsaved | `git status --short` | no output |
| 5 | No dead folder registrations | `git worktree list` | one line only |
| 6 | Plan documents pass their own format check | `openspec validate --all --strict --no-interactive` | passes |

---

## 5. What comes after cleanup (not part of this document)

For context only. Each stage has its own approval requirements.

1. **Build the feature again** in the mobile project, following the already
   approved plan: photo capture and selection, durable local file storage,
   on-device text reading with no internet use, suggestion screen with
   corrections, and confirmation routed through the existing expense-saving
   path.
2. **Check the work and report back** — run the project's own test and quality
   checks, then record the results in the central tracking file.
3. **Test on the real Android phone** — requires a separate, specific approval
   before any build is made. Results recorded at
   `ai-planning/evidence/m1-receipt-capture-ocr-e2e.md`.
4. **Central review and second approval** — confirm every requirement has
   matching evidence.
5. **Close out** — fold the confirmed behavior into the permanent specification,
   file the change away, and only then run the M1 completion check.

### One habit change that prevents a repeat

The two finished features were built with progress saved and uploaded as work
went along. The receipt feature was built in a disposable temporary folder with
nothing uploaded. The rule is: **either upload, or work in a linked worktree of the real
project.** Either one alone is enough. Rebuild inside the project folder
itself, on `feat/m1-receipt-capture-ocr-review`, and upload to GitHub at every
meaningful stopping point — that gives you both.

---

## 6. Glossary

Terms used in this project's tooling and documents, in plain language.

**Repository (or "repo")** — one project folder whose full history is tracked.
This project has two: the central planning one, and the mobile app one.

**Clone** — a complete copy of a repository on your computer.

**Working folder** — the files you can actually see and open right now in a
repository. It shows one version line at a time.

**Commit (a "saved change")** — one recorded snapshot of the project, with a
message describing it and a unique reference code like `3f1efb93`.

**Branch (a "version line")** — a named line of work. `main` is the official
one. Feature work happens on a separate line so unfinished work never disturbs
the official version. Here: `chore/prototype-receipt-capture-ocr-review`
(central planning) and `feat/m1-receipt-capture-ocr-review` (mobile app).

**Push (upload) / Pull (download)** — sending your saved changes to GitHub, or
bringing GitHub's down. **Work only exists in one place until it is pushed.**
That is the entire reason the receipt code was lost.

**Untracked (or "loose") files** — files sitting in the folder that the project
has never been told to record. They exist only on your Mac and vanish with the
folder.

**Worktree** — a second folder showing a different version line of the same
repository. The receipt work was done in one of these, placed in a temporary
location that got cleared.

**Prune** — deleting a stale registration pointing at something that no longer
exists.

**Pull request (PR)** — a proposal on GitHub to fold one version line into
another, with a chance to review first.

**OpenSpec** — the system this project uses to write down what will be built,
get it approved, and prove it was built as agreed, before any code is written.

**Change (an OpenSpec "change")** — one folder of documents covering a single
piece of work: why, what, how, the checklist, and the evidence.

**Slice** — one small, complete piece of user-visible behavior delivered end to
end. M1 has three: manual entry, speech, and receipts.

**Milestone** — a group of slices. M0 was groundwork; M1 is the working
prototype; later ones cover infrastructure, accounts, and reporting.

**Specification (or "spec")** — the written description of how something must
behave. A **delta spec** is the description of what one change adds or alters,
before it is folded into the permanent version.

**Requirement / Scenario** — a rule the software must follow, and a concrete
situation demonstrating that rule holds.

**Ledger** (the file `linkage.md`) — the tracking sheet for one piece of work
spanning both repositories. It records which plan version was agreed, what was
sent to the mobile project, what came back, who does the device testing, and
what is still missing.

**Pin (or "contract pin")** — the exact reference code of the approved plan, so
the mobile project can prove which version it built against. Here: `77884c2`.

**Dispatch / Handoff** — the written instruction sheet sent from central
planning to the mobile project: build this, these are the limits, return this
evidence.

**Return** — the evidence the mobile project sends back when finished.

**Gate 1 / Gate 2** — the two approval checkpoints. Gate 1 approves the plan
before building. Gate 2 approves the finished result before it is made
official.

**Residual gap** — something known to be missing or unproven, written down
honestly rather than quietly ignored.

**Verify** — checking that what was built matches what was agreed, with
evidence for every point.

**Sync** — folding confirmed behavior from a change into the permanent
specification.

**Archive** — filing a finished change away as a completed record.

**Scope map** — the document listing everything planned for Version 1, broken
into milestones. Its **header** is the status line at the top saying which
milestones are done. Here:
`ai-planning/design-briefs/V1 Scope Map and Milestone Plan.md`.

**Control brief** — an approved document setting the boundaries for a
milestone; it outranks older notes when they disagree.

**Evidence** — a dated record proving something was actually checked, stored in
`ai-planning/evidence/`.

**Synthetic data** — made-up example data. Real participant information is
never permitted in the prototype.

**EAS (Expo Application Services)** — the online service that turns the mobile
source code into an installable Android app.

**APK** — the installable Android app file EAS produces.

**Internal distribution** — an app shared privately with named testers only,
not published to any public app store.

**OCR (optical character recognition)** — reading text out of a photograph.
Here it must run entirely on the phone, with no internet use, and its output is
always a suggestion the person can correct — never a saved financial record.

**Outbox** — the local waiting list of confirmed entries held on the phone
until there is a server to send them to. M1 has the waiting list but no server
yet.

**Offline-first** — the app must fully work with no internet connection.
