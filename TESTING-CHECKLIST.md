# Testing Checklist - Before Demo

## Critical Reality Check

**The demo script contains hypothetical "expected feedback" examples, not guarantees.** Copilot Code Review Agent's responses are:
- Non-deterministic (varies each time)
- Context-dependent (depends on repository state, Memory contents, etc.)
- Unpredictable (may or may not show Memory learning explicitly)

**You MUST test everything beforehand and capture actual results.**

**Critical:** Memory learns from MERGED PRs only, requiring 24-48 hours to process. See [MEMORY-SETUP-GUIDE.md](MEMORY-SETUP-GUIDE.md) for detailed guidance.

---

## Part 0: Memory Pre-Seeding (Start 1-2 Weeks Before Demo)

**This must happen BEFORE creating your demo PRs if you want to show Memory learning.**

### Week 1-2 Before Demo: Merge Seed PRs

- [ ] **Day 1-2:** Create and merge PR with pytest test patterns
  - [ ] Include Flask test client fixtures
  - [ ] Include parametrized tests
  - [ ] Include edge case handling
  - [ ] Merge to main branch (not a feature branch)
  - [ ] Document PR number: _______________

- [ ] **Day 3-4:** Create and merge PR with Jest/RTL test patterns
  - [ ] Include component tests with React Testing Library
  - [ ] Include async/await patterns
  - [ ] Include mock examples
  - [ ] Merge to main branch
  - [ ] Document PR number: _______________

- [ ] **Day 5-10:** Wait for Memory processing (48-72 hours minimum)

### Days 11-12 Before Demo: Verify Memory Learning

- [ ] **Create test PR** without tests (similar to demo PRs)
  - [ ] Push branch and create PR
  - [ ] Trigger Copilot Code Review
  - [ ] Wait for review completion

- [ ] **Check for Memory references:**
  - [ ] Does review mention "Like PR #X..."?
  - [ ] Does it reference specific merged test files?
  - [ ] Does it suggest patterns from your seeded PRs?
  - [ ] Screenshot any Memory references

- [ ] **Decision point:**
  - ✅ **If Memory learning appears:** Capture screenshots, proceed with Memory-focused demo
  - ⚠️ **If no Memory references:** See troubleshooting below

### Troubleshooting: If Memory Doesn't Show Learning

**Try these steps:**

1. [ ] **Wait longer:** Try 72 hours instead of 48
2. [ ] **Check Memory settings:** Verify Memory is enabled in org/repo settings
3. [ ] **Create more similar test PR:** Make it very close to a seeded PR
4. [ ] **Merge additional PRs:** Try 3-4 seeded PRs instead of 2

**If still no Memory learning:**

- [ ] **Adjust demo strategy:** Focus on instructions-only benefits
- [ ] **Update talking points:** "Memory learns over time, after 20-30 PRs you'll see strong patterns"
- [ ] **Use conceptual explanation:** Describe Memory's value without live demonstration
- [ ] See [MEMORY-SETUP-GUIDE.md](MEMORY-SETUP-GUIDE.md) Section "What If Memory Doesn't Learn?"

---

## Pre-Demo Testing (Required)

### Part 1: Test PR Reviews (Allow 1-2 hours)

#### PR #1: POST /users endpoint
- [ ] Create PR #1 using `setup-demo.sh` or manually
- [ ] Trigger Copilot Code Review (wait for completion)
- [ ] **Capture screenshot** of actual feedback
- [ ] **Document exact quotes** from review comments
- [ ] Verify it mentions missing tests
- [ ] Note: Does it reference instruction examples? Which ones?

#### PR #2: Data transformer
- [ ] Create PR #2
- [ ] Trigger Copilot Code Review
- [ ] **Capture screenshot** of actual feedback
- [ ] **Check for Memory references:** Does it mention the PRs you merged 1-2 weeks ago?
- [ ] **Note:** It will NOT reference PR #1 (which was just created, not merged)
- [ ] If NO Memory references to seeded PRs appear, you may need better pre-seeding
- [ ] Document exact quotes

#### PRs #3-5: Additional test-missing PRs
- [ ] Create and review each PR
- [ ] Capture screenshots
- [ ] Track progression: Does feedback get more specific?
- [ ] Document which PRs show Memory learning (if any)

### Part 2: Test Quality of Feedback

Compare actual feedback against instruction files:

- [ ] **Is feedback following instructions?** (e.g., mentions 80% coverage, pytest patterns)
- [ ] **Is feedback specific enough?** (concrete vs. generic)
- [ ] **Are examples from instructions referenced?**
- [ ] **Is Memory learning visible?** (references to previous PRs)

If feedback is too generic:
- [ ] Check instruction files are in correct location
- [ ] Verify "Use custom instructions" is enabled in settings
- [ ] Try adding more concrete examples to instructions
- [ ] Consider pre-seeding more example PRs for Memory

### Part 3: Test PR Dependencies Feature (EXPERIMENTAL - Optional)

**⚠️ This feature is experimental and unverified.** Only test if you plan to demo it.

- [ ] **Add test content to Current Development Context** in `.github/copilot-instructions.md`:
  ```markdown
  ### Current Development Context
  - **PR #999 (test-auth-refactor)**: Moving from JWT to OAuth2 - impacts `/api/auth/*` endpoints
  ```

- [ ] **Create test PR** that touches authentication code

- [ ] **Trigger Copilot Code Review** and check review feedback:
  - [ ] Does Copilot mention PR #999?
  - [ ] Does it reference the OAuth2 migration?
  - [ ] Does it suggest checking compatibility?

- [ ] **Create test PR with Related Work in description**:
  ```markdown
  ## Related Work
  - Depends on: #999 (auth refactor)
  ```

- [ ] **Check if Copilot's review references the PR description**

**Decision:**
- ✅ **If it works:** Capture screenshots, include in demo with caveat about testing
- ❌ **If it doesn't work:** Remove from demo, answer customer's question about multi-PR visibility with proven alternatives (Copilot Chat, Workspace agent)

### Part 4: Test Security PRs (PRs 6-9)

- [ ] Create security PRs (hardcoded secrets, SQL injection, XSS, weak crypto)
- [ ] Verify Copilot flags them as CRITICAL or high severity
- [ ] Capture screenshots showing security detection
- [ ] Document exact language used

### Part 4: Test Coding Agent Integration

- [ ] Select one test-missing PR (recommend PR #2)
- [ ] Trigger Code Review
- [ ] Try "Pass to Coding Agent" (if available)
- [ ] OR: Manually ask Coding Agent to generate tests
- [ ] **Verify generated tests:**
  - [ ] Follow instruction patterns?
  - [ ] Include fixtures/mocks?
  - [ ] Have good coverage?
  - [ ] Actually work when run?
- [ ] Capture screenshots/video of process
- [ ] If slow or doesn't work well, prepare backup pre-generated PR

### Part 5: Test VS Code Local Review

- [ ] Open repository in VS Code
- [ ] Open a file with issues (e.g., UserForm.jsx without tests)
- [ ] Trigger Copilot Code Review locally
- [ ] Verify feedback appears and is relevant
- [ ] Capture screenshot

### Part 6: Test Workspace Agent

- [ ] Create GitHub issue for pagination feature
- [ ] Delegate to Copilot Workspace
- [ ] Monitor progress
- [ ] Verify it follows instruction standards
- [ ] **This may take 15-30 minutes** - plan accordingly
- [ ] Capture completed work as backup

---

## Update Demo Materials

Based on your testing results:

### Update DEMO-SCRIPT.md

Replace "Expected feedback" sections with actual quotes:

```markdown
**Actual feedback from testing:**
- "Missing test coverage for create_user function"
- "Consider adding pytest fixtures for test data"
- [exact quotes from your actual reviews]
```

### Create Backup Folder

```bash
mkdir demo-backups
# Save:
# - Screenshots of all PR reviews
# - Video of Memory progression (if visible)
# - Screenshots of security issues flagged
# - Completed Coding Agent PR
# - Completed Workspace agent work
```

### Update Talking Points

If Memory learning isn't explicitly visible:
- Adjust narrative: Focus on consistency and instruction-following
- Emphasize: "Memory works behind the scenes, improving over time"
- Don't promise explicit PR references if you don't see them

If feedback is too generic:
- Adjust expectations: "Copilot provides direction, not always specifics"
- Focus on: Consistency of catching missing tests across all PRs
- Prepare: More detailed instruction examples to improve quality

---

## Decision Matrix

### If Testing Shows Strong Results:
✅ Use live demo with confidence
✅ Reference actual quotes in script
✅ Show real-time reviews (with backups ready)

### If Testing Shows Mixed Results:
⚠️ Use backup screenshots for key moments
⚠️ Adjust narrative to match reality
⚠️ Focus on what works well, downplay what doesn't

### If Testing Shows Poor Results:
❌ Don't demo live - use only backups
❌ Focus on instruction setup and ROI instead
❌ Consider improving instructions first
❌ May need to pre-seed more example PRs for Memory

---

## Reality Check Questions

Before demo, honestly answer:

1. **Does Copilot consistently detect missing tests?**
   - Yes → Great, emphasize this
   - No → Fix instructions or adjust demo

2. **Does Memory learning appear explicitly?**
   - Yes → Show it proudly
   - No → Don't promise it, focus on consistency

3. **Is feedback specific and actionable?**
   - Yes → Use real quotes in demo
   - No → Use backup examples, work on instructions

4. **Do security issues get flagged as CRITICAL?**
   - Yes → Emphasize security benefits
   - No → Verify instructions have security section

5. **Does Coding Agent generate good tests?**
   - Yes → Demo live
   - No → Use pre-generated backup

6. **Does Workspace Agent complete tasks well?**
   - Yes → Demo live or show recording
   - No → Use simpler example or skip

---

## Final Checklist

Before demo day:
- [ ] All PRs tested with actual Code Reviews
- [ ] DEMO-SCRIPT.md updated with real quotes
- [ ] Backup screenshots saved in demo-backups/
- [ ] Talking points adjusted to match reality
- [ ] Backup plan prepared for each scenario
- [ ] Honest assessment: Can I deliver on promises?

**Remember:** It's better to under-promise and over-deliver than to promise features that don't appear in your demo.

---

## Post-Testing Actions

If results don't match expectations:

### Improve Instruction Quality
- Add more concrete examples
- Make requirements more explicit
- Include specific patterns you want to see

### Pre-seed Memory Better
- Create and merge 3-5 PRs with excellent patterns
- Wait 24-48 hours for Memory to process
- Re-test PRs to see if Memory references appear

### Adjust Demo Scope
- Focus on what works well
- De-emphasize features that don't perform
- Be honest about current capabilities

### Set Realistic Expectations
- Copilot improves over time
- Initial results may be basic
- Quality improves with more examples

---

## Success Criteria

Minimum for good demo:
- ✅ Missing tests detected in all 5 PRs
- ✅ Security issues flagged (at least 3 of 4)
- ✅ Feedback references instruction examples
- ✅ Consistency across similar issues

Ideal demo results:
- ✅ All above PLUS
- ✅ Memory explicitly references previous PRs
- ✅ Feedback gets progressively more specific
- ✅ Coding Agent generates good tests
- ✅ Workspace Agent completes task successfully

**If you don't meet minimum criteria, improve instructions before demo.**
