# Pull Request Description Template

**⚠️ EXPERIMENTAL FEATURE:** This template is designed to help Copilot Code Review understand dependencies, but this has not been verified to work. It will definitely help human reviewers coordinate. Test with Copilot before relying on this for automated reviews.

Use this template for PRs to help with review coordination and context.

---

## Description
[Brief description of what this PR does]

## Changes
- [List key changes]
- [Include files modified]
- [Highlight important technical decisions]

## Related Work
<!-- Remove this section if no dependencies exist -->
- **Depends on:** #XXX (description of dependency)
- **Blocks:** #XXX (description of what this blocks)
- **Related to:** #XXX (description of relationship)

## Context for Reviewers
<!-- Explain how this PR relates to other work -->
[If there are active migrations, refactors, or parallel development, explain the relationship]

Example:
- "This PR assumes the new `role` column from #123 is available"
- "Coordinates with #125 OAuth2 migration - uses new auth flow"
- "Part of larger epic #100 - handles backend, frontend comes in #130"

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Coverage meets 80% threshold

## Testing Notes
[Describe how to test this PR, any special setup required, edge cases covered]

## Checklist
- [ ] Code follows project standards
- [ ] Tests pass locally
- [ ] Documentation updated (if needed)
- [ ] No security vulnerabilities introduced
- [ ] Performance impact considered
- [ ] Related Work section completed (if applicable)

---

## Why This Helps Reviews

**Note:** This approach is experimental for Copilot Code Review. It definitely helps human reviewers, but needs testing to confirm Copilot uses this information.

**Potential benefits** (if Copilot reads this context):
- Flag potential conflicts with other PRs
- Verify compatibility with ongoing migrations
- Suggest coordination points with related changes
- Check merge order dependencies

**Confirmed benefits** (for human reviewers):
- Quick visibility into PR relationships
- Better coordination across teams
- Clear documentation of dependencies

**Before relying on this:** Test by creating PRs with Related Work sections and checking if Copilot's review feedback references them. Keep the "Current Development Context" section in `.github/copilot-instructions.md` updated regardless—it helps both humans and potentially Copilot.
