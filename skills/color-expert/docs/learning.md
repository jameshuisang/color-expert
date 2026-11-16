# Inspectable learning, not model retraining

`scripts/learning.mjs` implements a local, append-only feedback ledger in `.color-learning/events/`. It does not train model weights, call a model, infer user satisfaction, or promote its own critiques. It stores no examples or preferences in the real project by default. Tests use temporary, explicitly synthetic records and remove them afterward.

## Exact synchronous API

```js
import {recordFeedback, listMemories, revokeMemory} from './scripts/learning.mjs';
```

`recordFeedback(root, feedback)` returns the appended event. Required feedback schema:

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

Each event has a UUID, timestamp, schema version, sequence number, revision and SHA-256 predecessor chain. A complete temp file is linked atomically to a unique event path without overwrite, then the temp file is removed. A write lock serializes writers; a busy/stale lock raises an error rather than guessing it is safe to clear. Directories/events reject symlinks and records have size/count limits. Existing root must exist. No input is interpreted as a path.

Integrity checks detect accidental edits/deletions within the chain, not malicious users who can rewrite the ledger and recompute hashes; this is not cryptographic identity or tamper-proof storage. A crash may leave a lock or pending file; inspect after establishing no writer is active. Filesystem-level fsync/power-loss durability is not guaranteed. Retrieval never silently accepts a broken chain.

## Validation

`node --test tests/learning.test.mjs` exercises empty storage, scoped retrieval, revision history, revocation, invalid/unattested/model feedback, path/instruction rejection, integrity failure, symlink/lock rejection and scope-preserving updates. No genuine user feedback has been recorded by these tests.
