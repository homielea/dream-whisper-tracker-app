# Software-factory pilot

Opening an issue whose title begins with `[Factory]` triggers the implementation workflow.

The worker must use a branch, run the repository checks, and open a pull request. It is
not allowed to merge or deploy.

## Required repository secret

The workflow reads `CLAUDE_CODE_OAUTH_TOKEN`. Add it as an Actions repository secret
before running the first pilot task. The token must never be committed to the repository.

## Pilot success criteria

1. A qualifying issue starts the Software Factory workflow.
2. The worker creates a dedicated branch.
3. CI runs lint and build on the resulting pull request.
4. The PR explains progress, blockers, and decisions needed.
5. Nothing merges without Lea's explicit review.
