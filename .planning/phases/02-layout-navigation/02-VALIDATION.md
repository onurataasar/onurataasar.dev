---
phase: 2
slug: layout-navigation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | No test framework configured — visual/manual verification |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | LAY-01, LAY-02 | build + visual | `npm run build` | N/A | ⬜ pending |
| 02-01-02 | 01 | 1 | LAY-05 | build + visual | `npm run build` | N/A | ⬜ pending |
| 02-02-01 | 02 | 1 | LAY-03 | build + visual | `npm run build` | N/A | ⬜ pending |
| 02-02-02 | 02 | 1 | LAY-04 | build + visual | `npm run build` | N/A | ⬜ pending |
| 02-03-01 | 03 | 2 | LAY-06 | build + visual | `npm run build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework needed — this phase is purely visual/structural. Build verification (`npm run build`) catches TypeScript and import errors.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Full-viewport color blocks visible | LAY-01, LAY-02 | Visual layout | Scroll homepage, each section fills viewport with distinct color |
| Navigation design quality | LAY-03 | Subjective design | Desktop: oversized Syne text, active indicator. Mobile: full-screen overlay |
| Responsive layout correctness | LAY-04 | Multi-viewport | Check at 375px, 768px, 1440px — no overflow, correct stacking |
| Asymmetric layouts present | LAY-05 | Visual composition | Key sections use offset grid, not centered columns |
| Footer CTA and socials | LAY-06 | Visual + functional | Homepage: split layout with "Say hello" + socials. Other pages: compact |
| WCAG AA contrast | LAY-02 | Contrast ratio | Check text/bg combos with contrast checker tool |
| Dark mode color blocks | LAY-02 | Visual | Toggle dark mode — sections show muted variants, no broken contrast |
| Theme toggle in nav | LAY-03 | Functional | Toggle accessible on desktop nav and mobile overlay |

---

## Validation Sign-Off

- [ ] All tasks have build verification
- [ ] Sampling continuity: build runs after every commit
- [ ] Manual verifications documented for all visual requirements
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
