# Git Merge Strategy for PCT Admin Dashboard

## Executive Summary

Your repository has **23 local branches** with **17 branches not yet merged into master**. The current active branch `EBPtrackereDev` is **208 commits ahead** of master and appears to be your primary development branch. Master branch is outdated (last updated July 2019) and should likely be replaced by your active development branch.

---

## Current Repository State

### Branch Categories

#### ✅ Already Merged into Master (Safe to Delete)
- `ag-grid`
- `lbd-dev`
- `site-date-setup`
- `tracking`
- `user_permissions`

#### 🔥 Active Development Branches (Recent Activity)
- **`EBPtrackereDev`** (Current, 2025-10-27) - 208 commits ahead of master
- **`EBPtracker`** (2024-11-20) - Related to EBPtrackereDev
- **`SideBarChanges`** (2024-06-30) - Recent sidebar modifications

#### 🕐 Intermediate Branches (2020-2024)
- `user-menu` (2024-03-30)
- `tlc-trim-down` (2023-08-01)
- `encounter-page-cleanup` (2023-07-31)
- `MBC-dev` (2022-10-29)
- `date-range-filtering` (2021-02-25)
- `visn-national-filter` (2020-07-28)
- `explore` (2020-05-18)
- `navbar-for-sites` (2020-05-07)
- `telehealth` (2020-04-22)

#### 📦 Old Feature Branches (2018-2019)
- `Initals-last-four` (2019-11-20)
- `move-consult-to-api` (2019-10-03)
- `highcharts` (2019-01-02)
- `grid-table` (2018-05-22)
- `national-consults` (2018-05-01)

---

## Critical Findings

### 🚨 Master Branch is Outdated
- Last updated: **July 28, 2019** (over 6 years ago)
- Only 4 commits ahead of the common ancestor with EBPtrackereDev
- Contains minimal changes (README updates, conflict resolution)
- **Recommendation**: Master should be fast-forwarded or replaced with EBPtrackereDev

### 📊 Branch Relationships
```
Common Ancestor (375b047)
├── master (4 commits) - OUTDATED
└── EBPtrackereDev (208 commits) - ACTIVE DEVELOPMENT
    ├── EBPtracker (diverged earlier)
    └── SideBarChanges (diverged earlier)
```

---

## Recommended Merge Strategy

### Phase 1: Backup and Preparation (CRITICAL - DO THIS FIRST!)

```bash
# 1. Create a backup branch of current state
git branch backup-before-merge-$(date +%Y%m%d)

# 2. Ensure all local changes are committed
git status

# 3. Fetch latest from remote
git fetch --all

# 4. Create a new integration branch for testing
git checkout -b integration-test
```

### Phase 2: Evaluate Master Branch Status

**Option A: Replace Master with EBPtrackereDev (RECOMMENDED)**

Since master is 6+ years outdated and EBPtrackereDev contains all active development:

```bash
# 1. Backup current master
git branch master-backup-2019

# 2. Reset master to EBPtrackereDev
git checkout master
git reset --hard EBPtrackereDev

# 3. Force push to remote (CAUTION: Coordinate with team!)
git push origin master --force-with-lease
```

**Option B: Merge EBPtrackereDev into Master (If you must preserve master history)**

```bash
git checkout master
git merge EBPtrackereDev --no-ff -m "Merge EBPtrackereDev: 208 commits of active development"
# Resolve any conflicts
git push origin master
```

### Phase 3: Merge Related Active Branches

#### Step 1: Merge EBPtracker into EBPtrackereDev (if needed)

```bash
git checkout EBPtrackereDev

# Check for conflicts first
git merge --no-commit --no-ff EBPtracker

# If no conflicts:
git merge EBPtracker -m "Merge EBPtracker calendar fixes"

# If conflicts exist:
git merge --abort
# Manually resolve conflicts later
```

#### Step 2: Merge SideBarChanges

```bash
git checkout EBPtrackereDev
git merge SideBarChanges -m "Merge sidebar modifications for PTSD EBPs"
```

#### Step 3: Merge user-menu (2024)

```bash
git checkout EBPtrackereDev
git merge user-menu -m "Merge user menu improvements and debounce functionality"
```

### Phase 4: Evaluate and Merge Intermediate Branches (2020-2023)

For each branch, follow this process:

```bash
# 1. Check what changes exist
git log EBPtrackereDev..branch-name --oneline

# 2. Check for potential conflicts
git checkout EBPtrackereDev
git merge --no-commit --no-ff branch-name

# 3. If changes are still relevant and no major conflicts:
git merge branch-name -m "Merge branch-name: [description]"

# 4. If conflicts or outdated:
git merge --abort
# Document for manual review
```

**Recommended merge order:**
1. `tlc-trim-down` (2023-08-01)
2. `encounter-page-cleanup` (2023-07-31)
3. `MBC-dev` (2022-10-29)
4. `date-range-filtering` (2021-02-25)
5. `visn-national-filter` (2020-07-28)

### Phase 5: Handle Old Feature Branches (2018-2019)

**Recommendation**: Most likely already incorporated or obsolete.

```bash
# For each old branch, check if changes are already in EBPtrackereDev
git log EBPtrackereDev..branch-name --oneline

# If output is empty or minimal, the branch can be archived
git tag archive/branch-name branch-name
git branch -d branch-name
```

### Phase 6: Clean Up Merged Branches

```bash
# Delete already-merged branches
git branch -d ag-grid lbd-dev site-date-setup tracking user_permissions

# Delete archived branches (after tagging)
git branch -d grid-table national-consults highcharts Initals-last-four move-consult-to-api

# Push deletions to remote
git push origin --delete branch-name
```

---

## Conflict Resolution Strategy

### When Conflicts Occur:

1. **Don't Panic** - Conflicts are normal with long-lived branches

2. **Identify Conflict Type**:
   ```bash
   git status  # Shows conflicted files
   ```

3. **Common Conflict Areas** (based on your codebase):
   - `src/components/Dashboard/Views/*.vue` - Dashboard components
   - `src/store/store.js` - State management
   - `src/routes/routes.js` - Routing configuration
   - Calendar/date-related components

4. **Resolution Process**:
   ```bash
   # Open conflicted file
   # Look for conflict markers: <<<<<<<, =======, >>>>>>>
   
   # Choose resolution strategy:
   # - Keep incoming changes (from branch being merged)
   # - Keep current changes (from EBPtrackereDev)
   # - Combine both (manual editing)
   
   # After resolving:
   git add resolved-file.vue
   git commit -m "Resolve merge conflicts in [file]"
   ```

5. **Testing After Merge**:
   ```bash
   npm install  # Update dependencies
   npm run dev  # Test locally
   # Verify all features work
   ```

---

## Risk Mitigation Checklist

- [ ] **Create backup branch** before starting
- [ ] **Coordinate with team** - ensure no one else is pushing changes
- [ ] **Work in integration branch first** - test merges before touching master
- [ ] **Merge one branch at a time** - easier to identify issues
- [ ] **Test after each merge** - run application and verify functionality
- [ ] **Document conflicts** - keep notes on resolution decisions
- [ ] **Have rollback plan** - know how to revert if needed

### Rollback Commands (If Something Goes Wrong)

```bash
# Abort current merge
git merge --abort

# Reset to backup branch
git reset --hard backup-before-merge-YYYYMMDD

# Restore from reflog (last resort)
git reflog
git reset --hard HEAD@{n}  # where n is the step before merge
```

---

## Recommended Execution Plan

### Week 1: Preparation and Analysis
1. Create backups
2. Review each branch's changes
3. Identify critical vs. obsolete branches
4. Coordinate with team

### Week 2: Core Merges
1. Handle master/EBPtrackereDev relationship
2. Merge EBPtracker and SideBarChanges
3. Test thoroughly

### Week 3: Intermediate Branches
1. Merge 2023-2024 branches one at a time
2. Test after each merge
3. Document any issues

### Week 4: Cleanup
1. Archive old branches
2. Delete merged branches
3. Update documentation
4. Final testing

---

## Post-Merge Best Practices

### Going Forward:

1. **Adopt a Branching Strategy**:
   - Use `main` or `develop` as primary branch
   - Create feature branches from main
   - Merge back regularly (don't let branches live for years)

2. **Regular Integration**:
   - Merge main into feature branches weekly
   - Keep branches short-lived (days/weeks, not years)

3. **Branch Naming Convention**:
   - `feature/description`
   - `bugfix/description`
   - `hotfix/description`

4. **Delete After Merge**:
   - Remove branches after successful merge
   - Use tags for release points

---

## Quick Reference Commands

```bash
# See all branches with dates
git for-each-ref --sort=-committerdate refs/heads/ --format="%(refname:short)|%(committerdate:short)|%(subject)"

# Check if branch is merged
git branch --merged master

# See commits unique to a branch
git log master..branch-name --oneline

# Find common ancestor
git merge-base master branch-name

# Dry-run merge (no commit)
git merge --no-commit --no-ff branch-name

# Abort merge
git merge --abort

# See merge conflicts
git diff --name-only --diff-filter=U
```

---

## Questions to Answer Before Starting

1. **Is master branch still relevant?** (Likely NO - it's 6 years old)
2. **Is EBPtrackereDev your production code?** (Likely YES)
3. **Are any team members working on other branches?** (Check before merging)
4. **Do you have a test environment?** (Test merges there first)
5. **What's your rollback plan?** (Always have one!)

---

## Conclusion

Your safest path forward is:

1. **Backup everything**
2. **Make EBPtrackereDev your new master** (it's your real codebase)
3. **Selectively merge recent branches** (2023-2024) that add value
4. **Archive old branches** (2018-2019) - likely obsolete
5. **Adopt better branching practices** going forward

**Estimated Time**: 2-4 weeks depending on conflicts and testing requirements

**Risk Level**: Medium-High (due to branch age and divergence)

**Recommendation**: Consider hiring a Git expert for a pair-programming session during the critical master/EBPtrackereDev merge.