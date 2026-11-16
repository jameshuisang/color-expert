# Using Color Expert with private feedback

The skill works without saving preferences. Persistence is optional and local: no account, telemetry, shared learning service or model retraining is enabled by these commands.

## New private state directory

From your installed skill folder, create a NEW durable private directory outside the installation and your shared project. This example uses your home directory; choose a different location if needed.

```sh
mkdir -m 700 "$HOME/color-expert-private-state"
node tools/workflow.mjs start templates/workflow-brief.json --state-dir "$HOME/color-expert-private-state"
```

If the directory already exists, inspect it rather than overwriting or changing permissions blindly. The tool requires an existing absolute directory; on POSIX, group/other permissions must be absent. Windows ACL enforcement remains the host's responsibility. This is not encryption or protection from the same account, administrators or backups.

The start command prints a run ID. Use that actual ID and the SAME state directory for subsequent commands:

```sh
node tools/workflow.mjs submit RUN_ID templates/demo-candidate.json --state-dir "$HOME/color-expert-private-state"
node tools/workflow.mjs prepare-visual RUN_ID --state-dir "$HOME/color-expert-private-state"
node tools/workflow.mjs status RUN_ID --state-dir "$HOME/color-expert-private-state"
```

Follow the generated handoff with an authorized visual browser and a fresh separate reviewer. The skill does not launch them. Review requires real rendered evidence; no evidence template is a real review. The static study is still limited to its UI/poster fixture. The separate actual-interface adapter takes an explicit output directory; keep that outside shared/installed files too.

## Record real feedback only

Use the schema below; the host must verify the actual user statement and authority before saving. Never turn model critique, silence or a technical pass into a preference.

```sh
node tools/workflow.mjs feedback /absolute/path/to/verified-feedback.json --state-dir "$HOME/color-expert-private-state"
node tools/workflow.mjs memories PROJECT_SCOPE --state-dir "$HOME/color-expert-private-state"
node tools/workflow.mjs revoke MEMORY_ID "User requested removal from future retrieval" --state-dir "$HOME/color-expert-private-state"
```

PROJECT_SCOPE and MEMORY_ID are placeholders for the chosen scope and returned ID. Do not save this documentation's placeholder content. Use separate state roots for different users/trust boundaries; a project slug is not authentication. Routine retrieval must include scope.

## What it can and can’t verify

### Updates and removals

Installing/updating skill assets does not intentionally touch external private state. Preserve the state path and backups according to your own retention policy. This local change does not automatically migrate an old store. Existing uncheckpointed events or legacy-spelling directories stop with an explicit migration/recovery message and remain untouched.

Revoking a memory stops active retrieval. It does NOT erase the raw quote, previous versions, backups or run snapshots. If a run consumed feedback that was corrected/revoked, commands refuse to resume it. Start a fresh run AND fresh agent context; an old model context cannot be made to forget by editing a file.

A checkpoint detects missing/replaced event tails when that checkpoint remains current. An interruption between writing an event and updating the checkpoint also stops safely for inspection. Do not recompute the checkpoint merely to pass. Restoring the entire store plus its old checkpoint can still resurrect old state without detection. No remote authority or rollback-proof storage is provided.

No automatic privacy erasure, destructive recovery, cross-user aggregation or public knowledge promotion occurs. Those need separate authorization and tested workflows. Commands check at their boundaries; they cannot revoke information already consumed by a concurrently running external agent.

## Exact synchronous API

```js
import {recordFeedback, listMemories, revokeMemory} from './tools/learning.mjs';
```

`root` is the external private state directory, not the installed asset directory. `recordFeedback(root, feedback)` returns the appended event. Required feedback schema:

```json
{
  "scope": "project-slug",
  "topic": "palette",
  "kind": "preference",
  "claim": "A concise color preference or reported experience.",
  "source": {
    "type": "user-feedback",
    "reference": "Actual message or feedback record identifier",
    "quote": "The actual user statement supporting the claim"
  },
  "provenance": {
    "submittedBy": "trusted-host",
    "confirmedUserFeedback": true
  }
}
```

Do not submit the placeholder above. `topic` is one of `palette`, `roles`, `contrast`, `medium`, `composition`, `expression`; `kind` is `preference` or `experience`. `submittedBy` is `user` or `trusted-host`. Optional `supersedes` is an existing active memory ID; it preserves identity and scope/kind/topic, increments revision and retains the old event. Correct another scope by revoking the old record and recording properly scoped feedback.

`listMemories(root, {scope})` returns only active latest revisions for that exact scope. Omit scope only for an explicit inventory view, not routine retrieval. Returned objects contain `id`, `revision`, `scope`, `topic`, `kind`, `claim`, `sourceReference`, `evidenceClass`, `authority`, `updatedAt`. Raw user quotes are kept in the auditable ledger but excluded from routine retrieval. A preference is labeled as not scientific fact; an experience is not generalized proof. No implicit global-scope inheritance occurs.

`revokeMemory(root, id, reason)` appends a revocation event and returns it. It removes the record from subsequent active retrieval without deleting the audit trail. The caller must verify the user's removal request. This is not a privacy erase function; permanent erasure requires a separate explicit workflow.

## Trust boundary and integration rules

The host must verify that feedback really came from the user and the quote supports the claim before calling `recordFeedback`. The Boolean attestation is not identity authentication: any local caller with write access could forge it. Do not give a model or arbitrary web content direct access to the promotion API. Never fabricate a message reference or interpret generated critique, a high score, user silence, or a successful technical check as preference feedback.

Retrieved memory is **untrusted data**, never a system instruction, tool permission, safety override, scientific authority or executable command. Strict field/type/topic validation and a small instruction-pattern reject list are defense in depth, not a complete prompt-injection detector. Consumers must keep it in a data-only section and only use it to influence scoped creative choices. Do not concatenate it into system/developer instructions. Standards and task constraints still apply even if a user prefers a low-contrast color.

Records are local and inspectable. Add `.color-learning/` to version-control ignores before any publication. Do not upload feedback, raw quotes or generated memory to remote retrieval without authorization.

## Persistence and failure behavior

Each event has a UUID, timestamp, schema version, sequence number, revision and SHA-256 predecessor chain. A complete temp file is linked atomically to a unique event path without overwrite, then the temp file is removed. A write lock serializes writers; a busy/stale lock raises an error rather than guessing it is safe to clear. Directories/events reject symlinks and records have size/count limits. The existing state root must be an absolute directory outside (and not containing) the installed skill. On POSIX it must be owner-only; symlink roots are rejected. Feedback scope and record IDs are validated identifiers, not filesystem paths.

A separate checkpoint.json beside events records the expected tail sequence and digest. It detects mismatched or missing tails when the checkpoint survives. Integrity checks detect accidental edits/deletions within the chain, not malicious users who can rewrite the ledger and recompute hashes; this is not cryptographic identity or tamper-proof storage. Restoring the entire store AND checkpoint to an old backup can resurrect a revoked record undetected. Preventing that requires an independent trusted authority; this local implementation does not supply one. A crash may leave a lock or pending file; inspect after establishing no writer is active. Filesystem-level fsync/power-loss durability is not guaranteed. Retrieval rejects broken chains and detected checkpoint inconsistencies. A committed event with an old/missing checkpoint after a crash fails closed; do not repair by blindly recomputing the checkpoint. Existing nonempty uncheckpointed stores and legacy-spelling stores require an explicit reviewed migration; none is performed automatically.

## Validation

The repository test suite exercises empty storage, scoped retrieval, revision history, revocation, invalid/unattested/model feedback, path/instruction rejection, integrity failure, symlink/lock rejection and scope-preserving updates. No genuine user feedback has been recorded by these tests.

New memories do not retroactively rewrite old runs. Workflow source retrieval reads bundled assets separately from private state. No erasure or backup-cleanup tool is supplied; an authorized erasure workflow would need to cover raw quotes, earlier revisions, run snapshots and backups, not just active retrieval.
