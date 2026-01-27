# Quick Reference Card - 30-Minute Demo

## Pre-Demo Checklist (30 min before)
- [ ] Services running: `user-service` (5000) & `product-service` (3000)
- [ ] All 15 PRs created via `./setup-demo.sh`
- [ ] Browser tabs open: PRs page, Settings, instruction files
- [ ] VS Code open with repository
- [ ] Backup screenshots ready in case of delays
- [ ] Timer/clock visible

---

## Minute-by-Minute Flow

### 0-3 MIN: Introduction
**Say:** "Today I'll show you how to solve your three challenges: context understanding, abstraction levels, and formatting time."

**Do:**
1. Start Copilot Coding Agent generating instructions (background)
2. Show repository structure
3. Explain three-layer approach

**Key Point:** "This agent will finish while we review PRs - no manual formatting needed"

---

### 3-10 MIN: Scenario 1 - Test Coverage
**Say:** "You have 15 PRs in your backlog. Watch how Copilot consistently catches missing tests..."

**Do:**
1. Open PR #1 → Show basic "missing tests" feedback
2. Open PR #2 → Point out "based on previous PRs, use pytest parametrize"
3. Quick-show PR #3-5 → Highlight increasing specificity

**Key Point:** "Memory learns your patterns. By PR #5, feedback is very specific."

**Expected feedback examples:**
- PR1: "Missing unit tests for create_user endpoint"
- PR2: "Like previous PRs, add pytest with fixtures"
- PR5: "Add validators.test.js with test.each for edge cases"

---

### 10-15 MIN: Scenario 2 - Automated Fix
**Say:** "Now let's delegate the fix to Copilot..."

**Do:**
1. Select PR #2 (data transformer)
2. Show Code Review feedback identifying missing tests
3. Click "Pass to Coding Agent" → Show automated test generation
4. **Backup:** If slow, show pre-generated result

**Key Point:** "Agent understands our testing standards from instructions. Generated tests match our style."

**Show:** `test_transformer.py` with fixtures, parametrize, edge cases

---

### 15-20 MIN: Scenario 3 - VS Code Pre-Commit
**Say:** "As a developer, you want feedback before creating a PR..."

**Do:**
1. Open `UserForm.jsx` in VS Code
2. Trigger Copilot Code Review (local)
3. Show same context-aware feedback

**Key Point:** "Same instructions, same quality, but catching issues earlier - before GitHub."

---

### 20-27 MIN: Scenario 4 - Workspace Agent
**Say:** "You have a ticket assigned to you. Let's delegate it..."

**Do:**
1. Show GitHub issue: "Add pagination to /products endpoint with tests and docs"
2. Delegate to Workspace agent
3. Monitor progress (or show completed work if pre-run)

**Key Point:** "Agent follows instruction standards automatically. You work on other tasks while this completes."

**Show:** Completed endpoint with tests and documentation

---

### 27-30 MIN: Reveal & ROI
**Say:** "Here's what made this all work..."

**Do:**
1. Show `.github/copilot-instructions.md` → High-level standards
2. Show `python.instructions.md` → Technical patterns
3. Show `javascript.instructions.md` → Framework specifics
4. **LIVE:** Open `examples/before-refactoring.md` and use Copilot Chat to refactor it (30 sec)

**Explain Three Layers:**
- Repository: "80% coverage required" (WHAT)
- Path-specific: "pytest fixtures syntax" (HOW)
- Memory: "Examples from your PRs" (LEARNED)

**Calculate ROI:**
```
100 PRs/month × 15 min saved = 1,500 min = 25 hours
= 1 developer week saved every month
```

**Address Their Pain Points:**
1. ✅ Context: Instructions + Memory provide deep understanding
2. ✅ Abstraction:refactors existing docs in 30 seconds (just showed live!)

**Live Demo Prompt Used:**
"Refactor this file: keep under 2 pages, use clear sections, add examples, remove vague directives"
3. ✅ Time: Agent generates instructions in 15 min vs hours

**Q&A:** "Questions?"

---

## Emergency Phrases (if something breaks)

### If Code Review is slow:
"Let me show you a review I prepared earlier..."
→ Switch to backup screenshot

### If Agent doesn't respond:
"I'll show you the completed result..."
→ Use pre-generated PR/workspace

### If Instructions not working:
"Let me show you how this typically works..."
→ Use backup examples

---

## Key Messages to Emphasize

1. **"Consistency from instructions"** (PRs 1-5)
2. **"Memory learns your patterns"** (Progressive specificity)
3. **"Agent eliminates manual work"** (Auto-generation)
4. **"Works everywhere"** (GitHub, VS Code, Workspace)
5. **"Three layers solve abstraction"** (High → Specific → Learned)
6. **"Measurable ROI"** (25 hours/month saved)

---

## What to Show vs. What to Say

### SHOW (Visual proof):
- ✅ 5 PRs with consistent feedback
- ✅ Memory-enhanced suggestions ("like previous PRs")
- ✅ Agent generating test file
- ✅ Instruction files structure
- ✅ Calculator or ROI math on screen

### SAY (Talking points):
- ✅ "This solves your context problem..."
- ✅ "Three layers provide appropriate detail..."
- ✅ "15 minutes to generate vs hours manually..."
- ✅ "Works across any language/framework..."
- ✅ "Saves 25 hours per month for your team..."

---

## Demo Success Checklist

By end of demo, customer should understand:
- [ ] How three-layer instructions solve their problems
- [ ] How Memory makes feedback progressively better
- [ ] How to auto-generate instruction files (agent)
- [ ] How to refactor their existing docs quickly
- [ ] Concrete ROI for their team size
- [ ] Next steps to try it themselves

---

## Post-Demo Actions (Within 24 hours)

Send customer:
- [ ] Link to this repository (or your fork)
- [ ] SETUP-GUIDE.md for them to try
- [ ] Instruction templates for their tech stack
- [ ] Recording of demo session (if recorded)
- [ ] Schedule 1-week follow-up call

---

## Common Q&A (Quick Answers)

**Q: "Does this work with [our language]?"**
A: Yes. Customize path-specific instructions for your stack.

**Q: "How much maintenance?"**
A: Minimal. 2-page instructions + Memory handles rest.

**Q: "Can we try first?"**
A: Yes! Start with one repo. Fork this as template.

**Q: "Learning curve?"**
A: Near zero. Developers just create PRs normally.

**Q: "What if reviews inconsistent?"**
A: More specific examples = more consistency. Normal AI variance exists.

**Q: "Works with hundreds of repos?"**
A: Yes. Organization-level instructions apply everywhere.

---

## Your Confidence Boosters

You've got:
- ✅ Complete working repository
- ✅ 15 realistic demo PRs ready
- ✅ Comprehensive documentation
- ✅ Minute-by-minute script
- ✅ Backup materials for any failures
- ✅ Clear answers to common questions

**You're prepared!** Follow this card and DEMO-SCRIPT.md, and you'll deliver an excellent demo.

---

**Print this card or keep it on second screen during demo!**