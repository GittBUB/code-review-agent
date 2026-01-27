# Copilot Code Review Agent Demo - Setup Guide

This guide will help you prepare and deliver the 30-minute Copilot Code Review Agent demo to your customer.

## Pre-Demo Checklist (1 hour before)

### 1. Repository Setup
- [ ] Fork or clone this repository to your GitHub account/organization
- [ ] Ensure you have GitHub Copilot Enterprise or Business license
- [ ] Enable "Use custom instructions when reviewing pull requests" in repo settings
- [ ] Enable Copilot Memory in organization settings

### 2. Services Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd code-review-agent

# Setup Python service
cd user-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pytest --cov=. --cov-report=term-missing  # Verify tests pass
cd ..

# Setup Node.js service
cd product-service
npm install
npm test  # Verify tests pass
cd ..
```

### 3. Pre-seed Copilot Memory (CRITICAL - Start 1-2 Weeks Before Demo)

**Memory learns from MERGED PRs only and requires 24-48 hours to process patterns.**

For detailed guidance, see [MEMORY-SETUP-GUIDE.md](MEMORY-SETUP-GUIDE.md). Quick overview:

#### Option A: Full Pre-Seeding (Best Results)
**Timeline: Start 2 weeks before demo**

1. **Day 1-2: Merge first example PR**
   ```bash
   git checkout -b memory-seed-pytest-fixtures
   # Add a Flask endpoint WITH comprehensive pytest tests using fixtures
   # Include parametrized tests, edge cases, clear patterns
   git commit -am "Add user endpoint with comprehensive tests"
   git push origin memory-seed-pytest-fixtures
   # Create and MERGE PR via GitHub UI
   ```

2. **Day 3-4: Merge second example PR**
   ```bash
   git checkout -b memory-seed-jest-patterns
   # Add a React component or Node.js function WITH Jest tests
   # Include mocks, async tests, React Testing Library patterns
   git commit -am "Add component with comprehensive Jest tests"
   git push origin memory-seed-jest-patterns
   # Create and MERGE PR via GitHub UI
   ```

3. **Day 5-10: Wait for Memory processing**
   - Memory needs 48 hours minimum
   - 72 hours is safer for reliable results

4. **Day 11-12: Verify Memory learning**
   ```bash
   # Create a test PR without tests (similar to demo PRs)
   git checkout -b test-memory-learning
   # Add code without tests
   git push origin test-memory-learning
   # Create PR and trigger Code Review
   ```
   
   Check review feedback for:
   - References to merged PRs: "Like the pattern in PR #X..."
   - Mentions of specific test files: "Similar to tests/test_users.py..."
   - Team-specific patterns learned from your merged code

5. **Day 13-14: Capture backup materials**
   - Screenshot reviews showing Memory references
   - If no Memory references appear, see MEMORY-SETUP-GUIDE.md for troubleshooting

#### Option B: Minimal Pre-Seeding (If Time-Constrained)
**Timeline: Start 3-4 days before demo**

Merge 2 PRs, wait 48 hours, verify, and adjust demo narrative to focus on those 2 seeded PRs.

#### Option C: No Pre-Seeding
Focus demo on instructions-only benefits. Memory becomes a "future enhancement" talking point.

**Choose your approach based on available time and demo goals.**

### 4. Create Demo PRs
Use the automated script:

```bash
./setup-demo.sh
```

Or create PRs manually using the files in `pr-branches/` directory.

### 5. Pre-capture Backup Materials
In case live Code Review is slow during demo:

```bash
# For each PR, trigger Code Review and capture:
# 1. Screenshot of review comments
# 2. Or record 30-second video of review appearing
```

**CRITICAL: Test the actual feedback quality**
- The demo script contains "typical feedback" examples, not guarantees
- Copilot's responses are non-deterministic and will vary
- You MUST test PRs 1-5 beforehand to see what feedback you actually get
- Update DEMO-SCRIPT.md with real quotes from your actual reviews
- If M**VERIFY review comments are relevant and match demo narrative**
- [ ] **If feedback differs significantly, update DEMO-SCRIPT.md with actual quotes**
- [ ] Test PRs 2-5 and capture actual Memory learning examples (if they appear)
- [ ] Test "pass to Coding Agent" flow on PR #2
- [ ] Open VS Code and test local Code Review
- [ ] Test Workspace agent delegation with sample issue

**Important:** Copilot's feedback is non-deterministic. Don't expect it to match the demo script exactly. Adapt your talking points to what you actually see.

**Note on PR Dependencies Feature:** The repository includes an experimental "PR Dependencies and Related Work" feature (Current Development Context section + PR description templates). This has NOT been verified to work with Copilot Code Review. See Part 3 of TESTING-CHECKLIST.md to test if it works in your environment. If it doesn't work, remove references to it from your demo talking points.

### 6. Test Run
Do a complete run-through:
- [ ] Open PR #1 and trigger Code Review (manually or via bot)
- [ ] Verify review comments appear and are relevant
- [ ] Test "pass to Coding Agent" flow on PR #2
- [ ] Open VS Code and test local Code Review
- [ ] Test Workspace agent delegation with sample issue

---

## Demo Delivery Checklist

### Materials to Have Open
- [ ] This repository in GitHub (PRs tab)
- [ ] VS Code with repository opened
- [ ] Terminal ready for running services
- [ ] DEMO-SCRIPT.md for talking points
- [ ] examples/before-refactoring.md ready to show
- [ ] Copilot Chat ready for refactoring demo
- [ ] Backup screenshots/videos folder
- [ ] Timer/clock visible (30-minute limit)

### Browser Tabs to Prepare
1. Repository Pull Requests page
2. GitHub Copilot Agents page (if using Coding/Workspace agent live)
3. Repository Settings > Copilot (to
6. examples/before-refactoring.md file view (for refactoring demo) show configuration)
4. .github/copilot-instructions.md file view
5. .github/instructions/ folder view

### Optional: Second Display Setup
If you have two displays:
- Display 1 (shared): GitHub, PR reviews, main content
- Display 2 (private): Demo script, timer, notes, backup materials

---

## Demo Flow

### Part 1: Introduction (0-3 min)
**Goal:** Set context and start background agent

1. Welcome and introduce topic
2. Mention customer's three pain points
3. **ACTION**: Start Copilot Coding Agent generating instructions (this runs in background)
4. While agent works, explain demo structure

**Talking Points:**
- "We'll solve your context, abstraction, and time-formatting challenges"
- "I'm starting an agent to generate instructions - it'll finish while we review PRs"

### Part 2: Test Coverage Consistency (3-10 min)
**Goal:** Show consistent, progressively specific feedback

1. Open PR #1 - Show basic test coverage feedback
2. Open PR #2 - Show Memory-enhanced feedback
3. Quick-show PR #3-5 - Highlight increasing specificity
4. Explain three-layer instruction strategy

**Key Message:**
"Consistency comes from instructions + Memory learning your patterns"

### Part 3: Automated Fix (10-15 min)
**Goal:** Demonstrate delegation to Coding Agent

1. Select PR #2 (data transformer)
2. Show Code Review feedback
3. Click "Pass to Coding Agent" or show prepared result
4. Explain how agent used instructions

**Backup Plan:**
If agent is slow, show pre-captured result: "I ran this earlier..."

### Part 4: Pre-Commit Review (15-20 min)
**Goal:** Show local VS Code usage

1. Open UserForm.jsx in VS Code
2. Trigger Copilot Code Review locally
3. Show same context-aware feedback
4. Emphasize "shift left" - catching issues early

### Part 5: Workspace Agent (20-27 min)
**Goal:** Show end-to-end autonomous work

1. Show/create GitHub issue for pagination feature
2. Delegate to Workspace agent
3. Monitor progress (or show completed work)
4. Highlight how instructions guided agent

**Backup Plan:**
Show completed workspace if live is slow

### Part 6: Reveal & ROI (27-30 min)
**Goal:** Show instruction setup, calculate value

1. Show .github/copilot-instructions.md
2. Show path-specific instructions
3. Explain three layers solving abstraction problem
4. Discuss refactoring existing docs
5. Calculate ROI for customer's team
6. Q&A

---

## Troubleshooting During Demo

### Issue: Code Review Taking Too Long
**Solution:**
- "Let me show you a review I prepared earlier..."
- Switch to backup screenshots/video
- Continue with narrative

### Issue: Agent Not Responding
**Solution:**
- "I'll show you the completed result..."
- Use pre-generated PR/workspace
- Explain what the agent did

### Issue: Instructions Not Being Applied
**Check:**
- Settings > Copilot > "Use custom instructions..." is enabled
- Files are in `.github/` directory with exact names
- Try different PR or use backup example

### Issue: Technical Difficulties
**Fallback:**
- Switch to backup materials entirely
- Walk through screenshots/videos
- Emphasize concepts over live demo
- "The process works like this..." (show prepared examples)

---

## Post-Demo Actions

### Immediate Follow-up
Send customer within 24 hours:
- [ ] Link to this demo repository (or fork)
- [ ] DEMO-README.md as setup guide
- [ ] Instruction templates for their stack
- [ ] Recording of demo session (if recorded)

### Customization for Customer
Create customized versions:
- [ ] Replace Python/JavaScript with their language stack
- [ ] Add their specific security/compliance requirements
- [ ] Include their naming conventions
- [ ] Match their testing frameworks

### Schedule Follow-up
- [ ] 1-week check-in: "How's setup going?"
- [ ] 2-week review: "Show me your instruction files"
- [ ] 1-month results: "Measure impact - time saved, issues caught"

---

## FAQ - Customer Questions

### "Does this work with [our framework]?"
**Answer:** Yes, Copilot works with any language/framework. The instruction structure stays the same - just customize the examples and patterns to match your stack.

**Show:** Path-specific instruction files can be created for any technology

### "How much maintenance do instructions need?"
**Answer:** Minimal. Instructions are high-level standards (2 pages max). Memory handles dynamic patterns. Update only when standards change, not for every code change.

**Show:** Example of stable instruction file over time

### "What if we have hundreds of repositories?"
**Answer:** Use organization-level instructions. Define once, apply everywhere. Individual repos can add repo-specific instructions as needed.

**Show:** GitHub organization settings for Copilot

### "Can we try this before committing?"
**Answer:** Yes! Start with one repository, one team. Use this demo repo as template. Expand after seeing results. No long-term commitment needed.

**Show:** Easy enable/disable in settings

### "What's the learning curve for our developers?"
**Answer:** Near zero. Developers just create PRs as normal. Copilot reviews appear automatically. No new tools or workflows to learn.

**Show:** Regular PR workflow with Copilot appearing

---

## Success Metrics to Track

Help customer measure impact:

### Week 1-2: Setup Metrics
- Number of instruction files created
- Copilot Memory enabled
- Code Review bot configured
- First automated reviews received

### Week 3-4: Adoption Metrics
- Number of PRs reviewed by Copilot
- Developer feedback collected
- Instruction refinements made

### Month 2-3: Impact Metrics
- Average review time reduction
- Issues caught before human review
- Security vulnerabilities found
- Test coverage improvements
- Developer satisfaction score

### Quarterly: ROI Metrics
- Total time saved (hours)
- Cost savings calculated
- Defects prevented
- Code quality trends

---

## Additional Resources

### GitHub Documentation
- [Code Review Agent Docs](https://docs.github.com/copilot/code-review)
- [Custom Instructions Guide](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Copilot Memory](https://docs.github.com/copilot/using-github-copilot/using-github-copilot-memory)

### Demo Materials
- `DEMO-README.md` - Repository overview and instructions
- `DEMO-SCRIPT.md` - Detailed talking points
- `demo-plan.md` - Original planning document
- `.github/copilot-instructions.md` - Repository-wide instructions
- `.github/instructions/` - Path-specific instructions

### Script Files
- `setup-demo.sh` - Automated PR creation
- All PR content in `pr-branches/` directories

---

## Quick Reference: 30-Minute Timeline

| Time | Section | Key Action |
|------|---------|------------|
| 0:00 | Intro | Start background agent, set context |
| 0:03 | Scenario 1 | Show 5 test-missing PRs, Memory learning |
| 0:10 | Scenario 2 | Delegate fix to Coding Agent |
| 0:15 | Scenario 3 | VS Code pre-commit review |
| 0:20 | Scenario 4 | Workspace agent delegation |
| 0:27 | Wrap-up | Show instructions, calculate ROI |
| 0:30 | End | Q&A, next steps |

---

## Contact & Support

For questions during demo preparation:
- Review DEMO-SCRIPT.md for detailed talking points
- Check troubleshooting section above
- Test complete flow before customer presentation

Good luck with your demo! 🚀
