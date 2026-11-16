# Using Color Expert with private feedback

The skill works without saving preferences. Persistence is optional and local: no account, telemetry, shared learning service or model retraining is enabled by these commands.

## New private state directory

From your installed skill folder, create a NEW durable private directory outside the installation and your shared project. This example uses your home directory; choose a different location if needed.

```sh
mkdir -m 700 "$HOME/color-expert-private-state"
node scripts/workflow.mjs start examples/workflow-brief.json --state-dir "$HOME/color-expert-private-state"
```

If the directory already exists, inspect it rather than overwriting or changing permissions blindly. The tool requires an existing absolute directory; on POSIX, group/other permissions must be absent. Windows ACL enforcement remains the host's responsibility. This is not encryption or protection from the same account, administrators or backups.

The start command prints a run ID. Use that actual ID and the SAME state directory for subsequent commands:

```sh
node scripts/workflow.mjs submit RUN_ID examples/demo-candidate.json --state-dir "$HOME/color-expert-private-state"
node scripts/workflow.mjs prepare-visual RUN_ID --state-dir "$HOME/color-expert-private-state"
node scripts/workflow.mjs status RUN_ID --state-dir "$HOME/color-expert-private-state"
```

Follow the generated handoff with an authorized visual browser and a fresh separate reviewer. The skill does not launch them. Review requires real rendered evidence; no evidence template is a real review. The static study is still limited to its UI/poster fixture. The separate actual-interface adapter takes an explicit output directory; keep that outside shared/installed files too.

## Record real feedback only

Use the schema in `docs/learning.md`; the host must verify the actual user statement and authority before saving. Never turn model critique, silence or a technical pass into a preference.

```sh
node scripts/workflow.mjs feedback /absolute/path/to/verified-feedback.json --state-dir "$HOME/color-expert-private-state"
node scripts/workflow.mjs memories PROJECT_SCOPE --state-dir "$HOME/color-expert-private-state"
node scripts/workflow.mjs revoke MEMORY_ID "User requested removal from future retrieval" --state-dir "$HOME/color-expert-private-state"
```

PROJECT_SCOPE and MEMORY_ID are placeholders for the chosen scope and returned ID. Do not save this documentation's placeholder content. Use separate state roots for different users/trust boundaries; a project slug is not authentication. Routine retrieval must include scope.

## What it can and can’t verify

### Updates and removals

Installing/updating skill assets does not intentionally touch external private state. Preserve the state path and backups according to your own retention policy. This local change does not automatically migrate an old store. Existing uncheckpointed events or legacy-spelling directories stop with an explicit migration/recovery message and remain untouched.

Revoking a memory stops active retrieval. It does NOT erase the raw quote, previous versions, backups or run snapshots. If a run consumed feedback that was corrected/revoked, commands refuse to resume it. Start a fresh run AND fresh agent context; an old model context cannot be made to forget by editing a file.

A checkpoint detects missing/replaced event tails when that checkpoint remains current. An interruption between writing an event and updating the checkpoint also stops safely for inspection. Do not recompute the checkpoint merely to pass. Restoring the entire store plus its old checkpoint can still resurrect old state without detection. No remote authority or rollback-proof storage is provided.

No automatic privacy erasure, destructive recovery, cross-user aggregation or public knowledge promotion occurs. Those need separate authorization and tested workflows. Commands check at their boundaries; they cannot revoke information already consumed by a concurrently running external agent.
