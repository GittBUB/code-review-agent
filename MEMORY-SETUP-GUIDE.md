# Copilot Memory Setup Guide

## Understanding Copilot Memory

Copilot Memory is a powerful feature that allows the Code Review Agent to learn from your team's actual code patterns and preferences over time. However, it has specific requirements that are critical for demo planning.

### How Memory Works

**Key Facts:**
- ✅ Memory learns from **merged** pull requests only
- ❌ Memory does NOT learn from open/unmerged PRs
- ⏱️ Memory requires **24-48 hours** to process and integrate patterns after a PR is merged
- 🔄 Memory is **repository-scoped** (patterns learned in one repo don't transfer to others)
- 📊 Memory learns from code patterns, test structures, review feedback, and team conventions

**What This Means for Demos:**
You cannot create 5 PRs sequentially during a demo and expect Memory to show progressive learning. The PRs must be merged beforehand with sufficient processing time.

---

## Demo Preparation: Three Approaches

Choose the approach that best fits your timeline and demo style.

### Approach 1: Pre-Seed Memory (Recommended for Best Experience)

**Timeline: Start 2 weeks before demo**

This creates the most authentic demonstration of Memory learning.

#### Week 1: Merge Example PRs

1. **Merge 2-3 PRs with excellent test coverage** (at least 7-10 days before demo)
   
   Example PRs to merge:
   - PR with comprehensive pytest tests using fixtures
   - PR with Jest/React Testing Library tests
   - PR demonstrating parametrized tests or edge case handling

2. **Ensure PRs demonstrate patterns you want Memory to learn:**
   ```python
   # Example: Flask test pattern
   @pytest.fixture
   def client():
       app.config['TESTING'] = True
       with app.test_client() as client:
           yield client
   
   def test_create_user(client):
       response = client.post('/users', json={'name': 'Test'})
       assert response.status_code == 201
   ```

3. **Add descriptive commit messages and PR descriptions** that explain the patterns

#### Week 2: Verify Memory Learning

4. **Wait 48-72 hours** after merging

5. **Create a test PR** similar to your demo PRs (e.g., endpoint without tests)

6. **Trigger Code Review** and check if feedback references the merged PRs:
   - Look for: "Like the pattern used in PR #X..."
   - Look for: "Similar to the test fixtures in [filename]..."
   - Look for: Specific references to merged code patterns

7. **Document what Memory learned:**
   - Screenshot review comments showing Memory references
   - Note which patterns are being referenced
   - Save these as backup materials for demo

#### Day of Demo

8. **Create demo PRs** (the 5 test-missing PRs) during the demo

9. **Narrative during demo:**
   - "We merged several PRs with good test patterns over the past couple weeks..."
   - "Watch how Memory references those actual patterns in these new reviews..."
   - Show live reviews that reference the pre-seeded patterns

**Pros:** Most authentic, shows real Memory learning, impressive to customers
**Cons:** Requires 2 weeks advance planning, depends on Memory actually learning

---

### Approach 2: Stage the Demo (Middle Ground)

**Timeline: Start 3-4 days before demo**

Create and merge 2 PRs early, then create remaining PRs during the demo.

#### 3-4 Days Before Demo

1. **Create and merge PR #1** (e.g., POST /users endpoint with excellent tests)
2. **Create and merge PR #2** (e.g., data transformer with comprehensive tests)
3. **Wait 48 hours** for Memory to process

#### 1 Day Before Demo

4. **Create PR #3** (but don't merge) to test if Memory references PRs #1-2
5. **Verify Memory learning** appears in PR #3 review
6. **Capture screenshots** of Memory references for backup

#### Day of Demo

7. **Recreate PRs #3-5** live during the demo
8. **Show how Memory references the earlier merged PRs**

**Narrative:**
- "Earlier this week, we merged a couple of PRs with good test patterns..."
- "Now let's see how Memory helps with these new PRs..."

**Pros:** Less advance planning, still shows real Memory learning
**Cons:** Less impressive progression (only 2 seeded PRs), timing is tighter

---

### Approach 3: Use Pre-Captured Progression (Safest)

**Timeline: Start 1 week before demo**

Create all PRs over several days, capture the actual Memory progression, then use screenshots/video during the demo.

#### Day 1-2

1. **Create and merge PR #1** with tests
2. **Wait 48 hours**

#### Day 3-4

3. **Create and merge PR #2**, capture review showing Memory references to PR #1
4. **Wait 48 hours**

#### Day 5-6

5. **Create PRs #3-5**, capture reviews showing progressive Memory learning
6. **Create comprehensive backup materials:**
   - Screenshots of each review with Memory references highlighted
   - Screen recording of creating a PR and getting Memory-enhanced feedback
   - Side-by-side comparison showing progression

#### Day of Demo

7. **Walk through the progression using captured materials**
8. **Explain:** "Let me show you how Memory learned over several days..."
9. **Optional:** Create one new PR live to show current Memory state

**Narrative:**
- "I set this up over the past week to show you the progression..."
- "Here's PR #1 - basic feedback. Then we merged it..."
- "48 hours later, PR #2's review references PR #1's patterns. Watch..."

**Pros:** Eliminates live demo risk, shows actual Memory progression, can create polished materials
**Cons:** Less "wow factor" without live demonstration, more prep work, may feel less authentic

---

## What If Memory Doesn't Learn?

Despite following the steps, Memory may not show obvious references to merged PRs. This is normal - Memory learning is not guaranteed to be explicit in every review.

### Fallback Strategy

**Still demonstrate value without explicit Memory references:**

1. **Focus on instructions-based improvements:**
   - "Our instructions ensure consistent test coverage detection across all 5 PRs"
   - "Notice how specific the feedback is - that comes from our detailed instruction examples"

2. **Explain Memory's role conceptually:**
   - "Memory works in the background, learning patterns from merged PRs"
   - "While you may not see explicit 'Like PR #X' references, Memory influences the feedback style and specificity"
   - "Teams typically see more obvious Memory learning after 10-20 merged PRs"

3. **Pivot to other features:**
   - Spend more time on Coding Agent automation
   - Emphasize pre-commit review workflow
   - Show security vulnerability detection

4. **Be transparent:**
   - "Memory learning can be subtle. The real value accumulates over weeks as your team's patterns become ingrained"
   - "Instructions provide immediate value, Memory amplifies over time"

---

## Verification Checklist

Before your demo, verify Memory is ready:

- [ ] **Merged PRs:** At least 2-3 PRs with good patterns merged 48+ hours ago
- [ ] **Memory Enabled:** Confirm in organization/repository settings
- [ ] **Test PR Created:** Create a test PR and verify review quality
- [ ] **Memory References Captured:** Screenshot any "Like PR #X" or pattern references
- [ ] **Backup Materials Ready:** Screenshots/video of Memory learning (if it appeared)
- [ ] **Fallback Plan:** Know how to pivot if Memory doesn't show explicit learning
- [ ] **Narrative Adjusted:** Demo script reflects "merged earlier" not "merging now"

---

## Best Practices for Memory Learning

To maximize Memory's effectiveness (for your team, not just the demo):

### 1. Merge High-Quality PRs First
Memory learns from what you merge. Start with PRs that exemplify your best practices.

### 2. Include Diverse Examples
- Different test frameworks (pytest, Jest, etc.)
- Various patterns (fixtures, mocks, parametrized tests)
- Different file types (APIs, utilities, components)

### 3. Add Good Descriptions
PR descriptions and commit messages help Memory understand context:
```markdown
## Changes
Added POST /users endpoint with comprehensive test coverage

## Testing
- Unit tests for endpoint logic
- Integration tests with Flask test client
- Edge cases: invalid input, duplicate emails, null values
```

### 4. Review and Iterate
After merging a few PRs, create test PRs to see what Memory learned. Adjust your patterns if needed.

### 5. Be Patient
Memory's value compounds over time. Initial learning may be subtle, but after 20-30 merged PRs, you'll see significant pattern recognition.

---

## Troubleshooting

### "I merged PRs but Memory isn't referencing them"

**Possible causes:**
1. **Not enough time passed:** Wait full 48 hours, sometimes takes 72
2. **Memory not enabled:** Check org/repo settings
3. **PRs too different:** New PR should be similar to merged ones for Memory to connect them
4. **Learning is subtle:** Memory may influence feedback without explicit references

**Solutions:**
- Create a PR that's very similar to a merged one (same file type, same kind of change)
- Check Memory UI in GitHub settings to see what patterns it has stored
- Try merging more PRs with consistent patterns

### "Memory UI shows no learned patterns"

**Check:**
- Is Memory feature enabled in your license?
- Are you looking at the correct repository?
- Have you waited 48+ hours after merging?

**Contact GitHub support** if Memory feature should be available but isn't working

### "Reviews are inconsistent even with Memory"

**Remember:**
- AI responses are non-deterministic
- Memory influences but doesn't guarantee exact phrasing
- Instructions provide baseline consistency, Memory adds team-specific flavor

---

## Summary: Memory Timeline

| Event | When | What Happens |
|-------|------|--------------|
| **PR Merged** | Day 0 | PR merged to main branch |
| **Processing** | Days 0-2 | GitHub processes the PR for Memory learning |
| **Memory Updated** | Day 2-3 | Patterns available for future reviews |
| **Visible Learning** | Day 3+ | New PR reviews may reference the merged PR |
| **Compounding Effect** | Weeks 2-4 | After 10-20 PRs, Memory patterns become robust |

**Critical Takeaway for Demos:** You need merged PRs + 48 hours BEFORE the demo to show Memory learning.

---

## Questions?

**Q: Can I merge PRs to a demo branch instead of main?**
A: Memory learns from PRs merged to your default branch (typically main). Merging to other branches won't trigger learning.

**Q: Does Memory learn from my own PR reviews (human comments)?**
A: Yes! Memory learns from code patterns, test structures, AND the feedback provided (both human and Copilot). Good human reviews help Memory learn what matters to your team.

**Q: Can I "reset" Memory if it learns bad patterns?**
A: Memory doesn't have a manual reset. It continuously updates, so merging good PRs will gradually improve patterns. Focus on merging high-quality PRs.

**Q: How do I know what Memory has learned?**
A: Check the Memory section in your GitHub repository settings. It shows stored patterns and context. You can also create test PRs to see what feedback references.

**Q: Does Memory work across repositories?**
A: No, Memory is repository-scoped. Each repo builds its own Memory based on that repo's merged PRs.
