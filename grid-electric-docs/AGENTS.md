# Grid Electric Services - Agent Development Guide

## CRITICAL: READ THIS FIRST

**Before starting ANY work on this project, you MUST:**

1. **Read the Master Build Instructions** (`MASTER_BUILD_INSTRUCTIONS.md`)
2. **Check the Progress Tracker** (Section 2 of Master Instructions)
3. **Verify what's already completed** - NEVER duplicate work
4. **Update the Progress Tracker** after completing ANY task

---

## Quick Status Overview

### Current Phase: **PHASE 1 - FOUNDATION (Week 1 Complete)**
### Overall Progress: **8% Complete**

| Component | Status |
|-----------|--------|
| Project Setup | ✅ Complete |
| Dependencies | ✅ Complete |
| Type Definitions | ✅ Complete |
| Configuration | ✅ Complete |
| Database SQL | ✅ Complete |
| PWA Setup | ✅ Complete |
| Supabase Setup | ⏳ Ready to Start |
| Authentication | ⏳ Pending |
| Onboarding | ⏳ Pending |

---

## What Has Been Completed

### ✅ Phase 1, Week 1: Project Setup (COMPLETE)

**Date Completed:** 2026-02-07

1. **Project Initialization**
   - Next.js 14 + React 19 + TypeScript initialized
   - Tailwind CSS configured
   - Location: `C:\Users\david\Desktop\Grid2\grid-electric-app`

2. **Dependencies Installed (80+ packages)**
   - Core: next, react, react-dom, typescript
   - UI: tailwindcss, shadcn/ui (24 components), lucide-react
   - State: zustand, @tanstack/react-query
   - Backend: @supabase/supabase-js, @supabase/ssr
   - Offline: dexie, dexie-react-hooks
   - Maps: mapbox-gl
   - Media: exifreader, browser-image-compression, tesseract.js
   - Forms: react-hook-form, @hookform/resolvers, zod
   - Utilities: date-fns, crypto-js, uuid

3. **shadcn/ui Components (24 installed)**
   - Button, Card, Input, Select, Dialog, Dropdown Menu
   - Table, Tabs, Badge, Avatar, Skeleton, Sonner
   - Calendar, Form, Label, Textarea, Checkbox
   - Radio Group, Switch, Sheet, Separator, Scroll Area
   - Popover, Command

4. **Folder Structure Created**
   - 52 screen folders organized by route groups
   - Component folders (ui, common, features, providers)
   - Library folders (config, supabase, db, services, utils)
   - Stores, types, sql, public directories

5. **TypeScript Type Definitions**
   - `types/index.ts` - All app interfaces (User, Ticket, TimeEntry, etc.)
   - `types/database.ts` - Supabase database types

6. **Configuration Files**
   - `lib/config/appConfig.ts` - All app constants, enums
   - `lib/supabase/client.ts` - Browser Supabase client
   - `lib/supabase/server.ts` - Server Supabase client
   - `.env.example` - Environment variables template

7. **Utility Functions**
   - `lib/db/dexie.ts` - IndexedDB offline storage
   - `lib/utils/formatters.ts` - Date, currency, format helpers
   - `lib/utils/validators.ts` - Form validation schemas
   - `stores/authStore.ts` - Zustand auth state

8. **Database Schema SQL (10 files)**
   - `sql/01_enums.sql` - 12 PostgreSQL enum types
   - `sql/02_core_tables.sql` - Profiles, subcontractors
   - `sql/03_ticket_tables.sql` - Tickets, status history
   - `sql/04_time_expense_tables.sql` - Time entries, expenses
   - `sql/05_assessment_tables.sql` - Damage assessments
   - `sql/06_financial_tables.sql` - Invoices, 1099 tracking
   - `sql/07_media_audit_tables.sql` - Media assets, audit logs
   - `sql/08_rls_policies.sql` - Row Level Security policies
   - `sql/09_triggers.sql` - Database triggers & functions
   - `sql/10_seed_data.sql` - Reference data (wire sizes, equipment)

9. **PWA Configuration**
   - `app/manifest.ts` - PWA manifest with icons config

---

## What Remains (Next Tasks)

### ⏳ Phase 1, Week 2: Authentication & Database

**Priority: HIGH**

1. **Supabase Project Setup**
   - Create Supabase project at supabase.com
   - Run SQL migration files (01-10) in order
   - Configure authentication providers (email/password, magic link)
   - Set up storage buckets for photos
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 2.1
   - **SQL Location:** `sql/`

2. **Authentication Screens**
   - Login page (`app/(auth)/login/page.tsx`)
   - Forgot Password page (`app/(auth)/forgot-password/page.tsx`)
   - Reset Password page (`app/(auth)/reset-password/page.tsx`)
   - Magic Link page (`app/(auth)/magic-link/page.tsx`)
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 2.2
   - **Wireframes:** `03-WIREFRAMES.md` Section 3

3. **Auth Components**
   - LoginForm component
   - ForgotPasswordForm component
   - MagicLinkForm component
   - ProtectedRoute wrapper
   - AuthProvider context
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 2.3
   - **Location:** `components/features/auth/`

4. **Database Connection Testing**
   - Test Supabase connection
   - Verify RLS policies working
   - Test auth triggers
   - Test real-time subscriptions
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 2.4

### ⏳ Phase 1, Week 3: Onboarding Flow

**Priority: HIGH (after auth complete)**

1. **Onboarding Layout & Navigation**
   - Onboarding layout with progress indicator
   - Step navigation logic
   - OnboardingProgress component
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 3.1
   - **Wireframes:** `03-WIREFRAMES.md` Section 4

2. **Onboarding Screens (12 total)**
   - Welcome, Personal Info, Business Info
   - Insurance, Credentials, Banking
   - Rates, Agreements, Training
   - Profile Photo, Review, Pending Approval
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 3.2-3.3
   - **Location:** `app/(onboarding)/`

3. **Onboarding Components**
   - PersonalInfoForm, BusinessInfoForm
   - InsuranceUpload (multi-file)
   - CredentialsForm, BankingForm
   - RateAgreement, AgreementSignature
   - TrainingVideo, ProfilePhotoCapture
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 3.4
   - **Location:** `components/features/onboarding/`

### ⏳ Phase 1, Week 4: Admin Setup

**Priority: MEDIUM**

1. **Admin Dashboard Shell**
   - Admin layout with sidebar
   - AdminDashboard page
   - DashboardMetrics, RecentTickets, ActivityFeed
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 4.1

2. **Subcontractor Management**
   - SubcontractorList, SubcontractorDetail
   - SubcontractorApproval page
   - DataTable, StatusBadge components
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 4.2

3. **Shared Layout Components**
   - AppShell, Sidebar, BottomNav, TopBar, PageHeader
   - **Reference:** `MASTER_BUILD_INSTRUCTIONS.md` Task 4.3
   - **Location:** `components/common/layout/`

---

## Critical Files to Reference

### Must Read Before Any Work
1. **`MASTER_BUILD_INSTRUCTIONS.md`** - Source of truth for all tasks
2. **`01-TECHNICAL-PRD.md`** - Product requirements
3. **`03-WIREFRAMES.md`** - Screen designs (when building UI)
4. **`02-DATABASE-SCHEMA.md`** - Database design (when working with data)

### Key Project Locations
```
C:\Users\david\Desktop\Grid2\
├── grid-electric-docs/          # All documentation
│   ├── MASTER_BUILD_INSTRUCTIONS.md  <-- START HERE
│   ├── AGENTS.md                # This file
│   └── 01-*.md through 10-*.md  # Technical docs
│
└── grid-electric-app/           # Actual project code
    ├── app/                     # Next.js app router
    ├── components/              # React components
    ├── lib/                     # Utilities & config
    ├── stores/                  # Zustand stores
    ├── types/                   # TypeScript types
    └── sql/                     # Database migrations
```

---

## How to Update Progress

### After Completing ANY Task:

1. **Open** `MASTER_BUILD_INSTRUCTIONS.md`
2. **Find** the task in Section 2 (Progress Tracker)
3. **Mark** the checkbox: `[x]` instead of `[ ]`
4. **Add** completion date
5. **Add** your agent identifier

### Example Update:
```markdown
##### Task 2.1: Supabase Project Setup
- [x] Create Supabase project
- [x] Run all SQL migration files (01-10)
- **Date Completed:** 2026-02-08
- **Agent:** Agent-2
```

---

## Development Rules

### DO:
- ✅ Read MASTER_BUILD_INSTRUCTIONS.md first
- ✅ Check what's already completed
- ✅ Follow the phase order (1 → 2 → 3 → 4)
- ✅ Update progress tracker after each task
- ✅ Use existing components from `components/ui/`
- ✅ Follow the design system (`04-DESIGN-SYSTEM.md`)
- ✅ Test offline functionality when building features

### DON'T:
- ❌ Skip reading the master instructions
- ❌ Duplicate work already completed
- ❌ Skip phases or jump ahead
- ❌ Forget to update progress tracker
- ❌ Create new components that already exist in shadcn/ui
- ❌ Ignore the design system colors/typography
- ❌ Forget to handle offline scenarios

---

## Need Help?

### Documentation References by Topic

| Topic | Primary Doc | Secondary Doc |
|-------|-------------|---------------|
| Requirements | `01-TECHNICAL-PRD.md` | `08-PROJECT-ROADMAP.md` |
| Database | `02-DATABASE-SCHEMA.md` | `09-DATA-FLOW-ANALYSIS.md` |
| UI/UX | `03-WIREFRAMES.md` | `04-DESIGN-SYSTEM.md` |
| API | `05-API-SPECIFICATIONS.md` | `06-COMPONENT-ARCHITECTURE.md` |
| Offline | `07-OFFLINE-PWA-STRATEGY.md` | `10-IMPLEMENTATION-CHECKLIST.md` |

---

## Project Summary

**Grid Electric Services** is a Progressive Web App (PWA) for managing independent subcontractor crews performing utility damage assessments.

- **52 Screens** across 4 portals (Auth, Onboarding, Admin, Subcontractor)
- **24 Database Tables** with full RLS security
- **16-Week MVP** roadmap
- **Offline-First** architecture
- **GPS-Verified** time tracking and photo capture

**Current Status:** Foundation Phase - Infrastructure Complete, Ready for Supabase Setup

---

**Last Updated:** 2026-02-07  
**Next Milestone:** Supabase Project Setup & Authentication Screens
