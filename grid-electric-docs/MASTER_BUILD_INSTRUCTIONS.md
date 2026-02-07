# GRID ELECTRIC SERVICES — MASTER BUILD INSTRUCTIONS

## Comprehensive E2E Development Guide

**Version:** 1.0  
**Date:** February 7, 2026  
**Status:** Source of Truth for All Development Agents  
**Project Location:** `C:\Users\david\Desktop\Grid2\grid-electric-app`

---

## DOCUMENT PURPOSE

This document serves as the **single source of truth** for building the Grid Electric Services Damage Assessment Platform. All AI agents and developers MUST reference this document before, during, and after any development work.

### Critical Rules

1. **ALWAYS check this document first** before starting any task
2. **UPDATE the progress tracker** (Section 2) after completing ANY task
3. **NEVER duplicate work** - check what's already completed
4. **Reference specific files** listed in each task
5. **Follow the exact phase order** - do not skip phases

---

## TABLE OF CONTENTS

1. [Quick Reference](#1-quick-reference)
2. [Progress Tracker](#2-progress-tracker--checklist)
3. [Phase 1: Foundation (Weeks 1-4)](#3-phase-1-foundation-weeks-1-4)
4. [Phase 2: Core Features (Weeks 5-8)](#4-phase-2-core-features-weeks-5-8)
5. [Phase 3: Operations (Weeks 9-12)](#5-phase-3-operations-weeks-9-12)
6. [Phase 4: Polish & Launch (Weeks 13-16)](#6-phase-4-polish--launch-weeks-13-16)
7. [File Reference Index](#7-file-reference-index)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. QUICK REFERENCE

### Project Overview

- **Total Screens:** 52
- **Total Database Tables:** 24
- **User Roles:** 5 (Super Admin, Operations Manager, Field Subcontractor, Auditor, Read Only)
- **Ticket Statuses:** 13 (full lifecycle)
- **MVP Duration:** 16 weeks

### Key Documentation Files

| Document | Purpose | When to Reference |
|----------|---------|-------------------|
| `01-TECHNICAL-PRD.md` | Product requirements, architecture | Feature planning |
| `02-DATABASE-SCHEMA.md` | Complete SQL schema, RLS policies | Database work |
| `03-WIREFRAMES.md` | 52 screen designs, user flows | UI implementation |
| `04-DESIGN-SYSTEM.md` | Colors, typography, components | Styling, theming |
| `05-API-SPECIFICATIONS.md` | REST API documentation | Backend integration |
| `06-COMPONENT-ARCHITECTURE.md` | React structure, hooks, stores | Component development |
| `07-OFFLINE-PWA-STRATEGY.md` | Service worker, IndexedDB | Offline functionality |
| `08-PROJECT-ROADMAP.md` | 16-week timeline, milestones | Planning, tracking |
| `09-DATA-FLOW-ANALYSIS.md` | Ticket lifecycle, validation | Data flow implementation |
| `10-IMPLEMENTATION-CHECKLIST.md` | Step-by-step build guide | Daily task reference |

### Project Structure

```
grid-electric-app/
├── app/
│   ├── (auth)/          # 6 screens - Login, forgot password, etc.
│   ├── (onboarding)/    # 12 screens - Subcontractor onboarding
│   ├── (admin)/         # 18 screens - Admin portal
│   ├── (subcontractor)/ # 16 screens - Field contractor portal
│   └── api/             # API routes
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── common/          # Shared components
│   └── features/        # Feature-specific components
├── lib/
│   ├── config/          # App configuration
│   ├── supabase/        # Database clients
│   ├── db/              # IndexedDB (Dexie)
│   ├── services/        # External services
│   └── utils/           # Helper functions
├── stores/              # Zustand stores
├── types/               # TypeScript definitions
├── sql/                 # Database migration files
└── public/              # Static assets
```

---

## 2. PROGRESS TRACKER & CHECKLIST

**INSTRUCTIONS:**

- Mark tasks as `[x]` when COMPLETE
- Update date completed
- Add initials of agent who completed it
- NEVER remove or reorder tasks

---

### OVERALL PROGRESS: 8% (Foundation Phase - Week 1 Complete)

| Phase | Progress | Status |
|-------|----------|--------|
| Phase 1: Foundation | 25% | In Progress (Week 1 ✅, Week 2 ⏳) |
| Phase 2: Core Features | 0% | Not Started |
| Phase 3: Operations | 0% | Not Started |
| Phase 4: Polish & Launch | 0% | Not Started |

---

### PHASE 1: FOUNDATION (Weeks 1-4)

#### Week 1: Project Setup & Infrastructure

##### Task 1.1: Project Initialization

- [x] Initialize Next.js project with TypeScript
- [x] Install shadcn/ui
- [x] Install all required dependencies
- [x] Create folder structure
- [x] Set up configuration files
- **Date Completed:** 2026-02-07
- **Agent:** Initial Setup
- **Files Created:**
  - `package.json` - All dependencies installed
  - `tsconfig.json` - TypeScript config
  - `tailwind.config.ts` - Tailwind CSS
  - `next.config.js` - Next.js config
  - `components.json` - shadcn config

##### Task 1.2: shadcn/ui Components Setup

- [x] Install Button, Card, Input, Select
- [x] Install Dialog, Dropdown Menu, Table, Tabs
- [x] Install Badge, Avatar, Skeleton, Sonner
- [x] Install Calendar, Form, Label, Textarea
- [x] Install Checkbox, Radio Group, Switch
- [x] Install Sheet, Separator, Scroll Area
- [x] Install Popover, Command
- **Date Completed:** 2026-02-07
- **Agent:** Initial Setup
- **Location:** `components/ui/`

##### Task 1.3: Type Definitions

- [x] Create main types file (`types/index.ts`)
- [x] Create database types (`types/database.ts`)
- [x] Define all interfaces (User, Ticket, TimeEntry, etc.)
- **Date Completed:** 2026-02-07
- **Agent:** Initial Setup

##### Task 1.4: Configuration & Utilities

- [x] Create appConfig.ts with all constants
- [x] Create Supabase client (browser)
- [x] Create Supabase client (server)
- [x] Create Dexie.js IndexedDB setup
- [x] Create formatter utilities
- [x] Create validator utilities
- [x] Create auth store (Zustand)
- **Date Completed:** 2026-02-07
- **Agent:** Initial Setup

##### Task 1.5: Database Schema SQL Files

- [x] Create 01_enums.sql
- [x] Create 02_core_tables.sql
- [x] Create 03_ticket_tables.sql
- [x] Create 04_time_expense_tables.sql
- [x] Create 05_assessment_tables.sql
- [x] Create 06_financial_tables.sql
- [x] Create 07_media_audit_tables.sql
- [x] Create 08_rls_policies.sql
- [x] Create 09_triggers.sql
- [x] Create 10_seed_data.sql
- **Date Completed:** 2026-02-07
- **Agent:** Initial Setup
- **Location:** `sql/`

##### Task 1.6: Environment & PWA Setup

- [x] Create .env.example
- [x] Create PWA manifest.ts
- [x] Create service worker (sw.ts)
- **Date Completed:** 2026-02-07
- **Agent:** Initial Setup
- **Files Created:**
  - `.env.example` - Environment variables template
  - `app/manifest.ts` - PWA manifest
  - `workers/sw.ts` - Service worker with caching, background sync, push notifications

---

#### Week 2: Authentication & Database (NOT STARTED)

##### Task 2.1: Supabase Project Setup

- [ ] Create Supabase project
- [ ] Run all SQL migration files (01-10)
- [ ] Verify all tables created
- [ ] Verify RLS policies applied
- [ ] Configure authentication providers
- **Dependencies:** Task 1.5
- **Reference:** `02-DATABASE-SCHEMA.md`, `sql/`

##### Task 2.2: Authentication Screens

- [ ] Create Login page (`app/(auth)/login/page.tsx`)
- [ ] Create Forgot Password page (`app/(auth)/forgot-password/page.tsx`)
- [ ] Create Reset Password page (`app/(auth)/reset-password/page.tsx`)
- [ ] Create Magic Link page (`app/(auth)/magic-link/page.tsx`)
- [ ] Implement auth forms with validation
- **Dependencies:** Task 2.1
- **Reference:** `03-WIREFRAMES.md` Section 3

##### Task 2.3: Auth Components

- [ ] Create LoginForm component
- [ ] Create ForgotPasswordForm component
- [ ] Create MagicLinkForm component
- [ ] Create ProtectedRoute wrapper
- [ ] Create AuthProvider context
- **Dependencies:** Task 2.2
- **Location:** `components/features/auth/`

##### Task 2.4: Database Connection Testing

- [ ] Test Supabase connection
- [ ] Test RLS policies
- [ ] Verify auth triggers working
- [ ] Test real-time subscriptions
- **Dependencies:** Task 2.1

---

#### Week 3: Onboarding Flow (NOT STARTED)

##### Task 3.1: Onboarding Layout & Navigation

- [ ] Create onboarding layout with progress indicator
- [ ] Create step navigation logic
- [ ] Create OnboardingProgress component
- **Location:** `app/(onboarding)/layout.tsx`
- **Reference:** `03-WIREFRAMES.md` Section 4

##### Task 3.2: Onboarding Screens (1-6)

- [ ] Welcome screen (`welcome/page.tsx`)
- [ ] Personal Info screen (`personal-info/page.tsx`)
- [ ] Business Info screen (`business-info/page.tsx`)
- [ ] Insurance screen (`insurance/page.tsx`)
- [ ] Credentials screen (`credentials/page.tsx`)
- [ ] Banking screen (`banking/page.tsx`)
- **Location:** `app/(onboarding)/`
- **Components:** `components/features/onboarding/`

##### Task 3.3: Onboarding Screens (7-12)

- [ ] Rates screen (`rates/page.tsx`)
- [ ] Agreements screen (`agreements/page.tsx`)
- [ ] Training screen (`training/page.tsx`)
- [ ] Profile Photo screen (`profile-photo/page.tsx`)
- [ ] Review screen (`review/page.tsx`)
- [ ] Pending Approval screen (`pending/page.tsx`)
- **Location:** `app/(onboarding)/`

##### Task 3.4: Onboarding Components

- [ ] Create PersonalInfoForm
- [ ] Create BusinessInfoForm
- [ ] Create InsuranceUpload (multi-file)
- [ ] Create CredentialsForm
- [ ] Create BankingForm (secure inputs)
- [ ] Create RateAgreement display
- [ ] Create AgreementSignature (e-signature)
- [ ] Create TrainingVideo player
- [ ] Create ProfilePhotoCapture
- **Location:** `components/features/onboarding/`

---

#### Week 4: Admin Setup & Subcontractor Management (NOT STARTED)

##### Task 4.1: Admin Dashboard Shell

- [ ] Create admin layout with sidebar
- [ ] Create AdminDashboard page
- [ ] Create DashboardMetrics component
- [ ] Create RecentTickets component
- [ ] Create ActivityFeed component
- **Location:** `app/(admin)/`, `components/features/dashboard/`
- **Reference:** `03-WIREFRAMES.md` Section 5

##### Task 4.2: Subcontractor Management

- [ ] Create SubcontractorList page
- [ ] Create SubcontractorDetail page
- [ ] Create SubcontractorApproval page
- [ ] Create DataTable component
- [ ] Create StatusBadge component
- **Location:** `app/(admin)/subcontractors/`, `components/common/data-display/`

##### Task 4.3: Shared Layout Components

- [ ] Create AppShell component
- [ ] Create Sidebar component (desktop)
- [ ] Create BottomNav component (mobile)
- [ ] Create TopBar component
- [ ] Create PageHeader component
- **Location:** `components/common/layout/`

---

### PHASE 2: CORE FEATURES (Weeks 5-8)

#### Week 5: Ticket System (NOT STARTED)

##### Task 5.1: Ticket CRUD

- [ ] Create TicketList page (admin)
- [ ] Create TicketDetail page (admin)
- [ ] Create TicketCreate page (admin)
- [ ] Create TicketList page (subcontractor)
- [ ] Create TicketDetail page (subcontractor)
- **Location:** `app/(admin)/tickets/`, `app/(subcontractor)/tickets/`

##### Task 5.2: Ticket Components

- [ ] Create TicketList component with filters
- [ ] Create TicketCard component
- [ ] Create TicketCreateForm component
- [ ] Create TicketAssign component
- [ ] Create TicketFilters component
- [ ] Create StatusBadge component
- **Location:** `components/features/tickets/`

##### Task 5.3: Status Management

- [ ] Create StatusUpdater component
- [ ] Implement status transitions
- [ ] Create status history timeline
- **Reference:** `09-DATA-FLOW-ANALYSIS.md`

---

#### Week 6: GPS Workflow & Maps (NOT STARTED)

##### Task 6.1: Map Integration

- [ ] Integrate Mapbox GL
- [ ] Create MapView component
- [ ] Create TicketMarkers component
- [ ] Create RouteOverlay component
- [ ] Create GeofenceCircle component
- **Location:** `components/features/map/`
- **Reference:** `05-API-SPECIFICATIONS.md` Mapbox section

##### Task 6.2: GPS Workflow

- [ ] Implement geofencing (500m radius)
- [ ] Create GPS validation hook
- [ ] Implement route optimization
- [ ] Create route view UI
- **Dependencies:** Task 6.1

##### Task 6.3: Status Update Flow

- [ ] Implement 3-status workflow (In Route → On Site → Complete)
- [ ] Create GPS validation at each status
- [ ] Create mobile map view (full-screen)
- **Reference:** `09-DATA-FLOW-ANALYSIS.md` Section 1

---

#### Week 7: Photo Capture & Storage (NOT STARTED)

##### Task 7.1: Photo Capture

- [ ] Create PhotoCapture component
- [ ] Implement EXIF extraction
- [ ] Implement GPS from photos
- [ ] Create photo gallery component
- [ ] Implement image compression
- **Location:** `components/features/assessments/`

##### Task 7.2: Photo Storage

- [ ] Integrate Supabase Storage
- [ ] Create photo upload pipeline
- [ ] Create thumbnail generation
- [ ] Create PhotoUploadQueue service
- **Dependencies:** Task 7.1

##### Task 7.3: Photo Validation

- [ ] Validate GPS presence in photos
- [ ] Validate file size (max 10MB)
- [ ] Calculate SHA-256 hash
- [ ] Implement duplicate detection
- **Reference:** `10-IMPLEMENTATION-CHECKLIST.md` Photo System

---

#### Week 8: Offline Storage Foundation (NOT STARTED)

##### Task 8.1: IndexedDB Setup

- [ ] Verify Dexie.js schema
- [ ] Implement ticket caching
- [ ] Implement time entry queue
- [ ] Implement photo queue
- **Location:** `lib/db/dexie.ts`
- **Reference:** `07-OFFLINE-PWA-STRATEGY.md`

##### Task 8.2: Service Worker

- [ ] Create service worker (sw.ts)
- [ ] Implement cache strategies
- [ ] Implement background sync
- [ ] Create offline banner component
- **Location:** `public/sw.js` or `workers/sw.ts`

##### Task 8.3: Sync Status UI

- [ ] Create SyncStatus component
- [ ] Create SyncProvider context
- [ ] Implement sync queue UI
- [ ] Create conflict resolution UI
- **Location:** `components/common/feedback/`

---

### PHASE 3: OPERATIONS (Weeks 9-12)

#### Week 9: Time Tracking (NOT STARTED)

##### Task 9.1: Time Clock

- [ ] Create TimeClock page
- [ ] Create TimeClock component
- [ ] Implement GPS-verified clock in/out
- [ ] Create ActiveTimer component
- [ ] Create WorkTypeSelector component
- **Location:** `app/(subcontractor)/time/`, `components/features/time-tracking/`

##### Task 9.2: Time Entry Management

- [ ] Create TimeEntryList component
- [ ] Create TimeEntryCard component
- [ ] Implement time calculations
- [ ] Create time review interface (admin)
- **Reference:** `10-IMPLEMENTATION-CHECKLIST.md` Time Tracking

---

#### Week 10: Expense Management (NOT STARTED)

##### Task 10.1: Expense Submission

- [ ] Create ExpenseList page
- [ ] Create ExpenseCreate page
- [ ] Create ExpenseForm component
- [ ] Create ExpenseItemForm component
- [ ] Create ReceiptCapture component
- **Location:** `app/(subcontractor)/expenses/`, `components/features/expenses/`

##### Task 10.2: Expense Processing

- [ ] Implement mileage calculator
- [ ] Integrate Tesseract.js OCR
- [ ] Implement policy validation
- [ ] Create expense review UI (admin)
- **Dependencies:** Task 10.1

---

#### Week 11: Damage Assessments (NOT STARTED)

##### Task 11.1: Assessment Form

- [ ] Create AssessmentForm component
- [ ] Create SafetyChecklist component
- [ ] Create EquipmentAssessment component
- [ ] Create DamageClassification component
- [ ] Create PhotoGallery component
- **Location:** `components/features/assessments/`

##### Task 11.2: Equipment Catalog

- [ ] Create EquipmentSelect component
- [ ] Create WireSizeSelect component
- [ ] Integrate equipment types from DB
- [ ] Create assessment review UI
- **Reference:** `10-IMPLEMENTATION-CHECKLIST.md` Assessment Form

---

#### Week 12: Invoicing & Reporting (NOT STARTED)

##### Task 12.1: Invoice Generation

- [ ] Create InvoiceGenerator component
- [ ] Implement auto-generation from approved entries
- [ ] Create InvoicePDFViewer component
- [ ] Create 1099 tracking display
- **Location:** `components/features/invoices/`

##### Task 12.2: Dashboard & Reports

- [ ] Complete DashboardMetrics component
- [ ] Create reports interface
- [ ] Implement data visualization
- [ ] Create export functions (CSV/Excel/PDF)

---

### PHASE 4: POLISH & LAUNCH (Weeks 13-16)

#### Week 13: Testing & QA (NOT STARTED)

##### Task 13.1: Testing Suite

- [ ] Write unit tests (Jest/Vitest)
- [ ] Write integration tests
- [ ] Perform end-to-end testing
- [ ] Test offline functionality
- [ ] Conduct security audit
- [ ] Cross-browser testing
- [ ] Mobile device testing

---

#### Week 14: Background Sync & Polish (NOT STARTED)

##### Task 14.1: Background Sync

- [ ] Implement background sync API
- [ ] Add sync retry logic
- [ ] Create conflict resolution
- [ ] Implement push notifications
- **Reference:** `07-OFFLINE-PWA-STRATEGY.md` Section 5

##### Task 14.2: UI Polish

- [ ] Add loading states (skeletons)
- [ ] Add animations & transitions
- [ ] Create error boundaries
- [ ] Implement toast notifications

---

#### Week 15: Documentation & Training (NOT STARTED)

##### Task 15.1: Documentation

- [ ] Write user documentation
- [ ] Create admin documentation
- [ ] Write API documentation
- [ ] Create troubleshooting guide

##### Task 15.2: Training Materials

- [ ] Record training videos
- [ ] Create quick start guide
- [ ] Prepare training materials

---

#### Week 16: Deployment & Launch (NOT STARTED)

##### Task 16.1: Production Deployment

- [ ] Set up production environment
- [ ] Configure domain & SSL
- [ ] Set up monitoring (Sentry)
- [ ] Configure backups
- [ ] Load testing

##### Task 16.2: Launch

- [ ] Soft launch with beta users
- [ ] Collect feedback
- [ ] Official launch

---

## 7. FILE REFERENCE INDEX

### Source Documentation

| File | Description | Key Sections |
|------|-------------|--------------|
| `01-TECHNICAL-PRD.md` | Technical requirements | Architecture, features, data models |
| `02-DATABASE-SCHEMA.md` | Database design | All tables, enums, RLS, triggers |
| `03-WIREFRAMES.md` | UI/UX designs | 52 screen wireframes |
| `04-DESIGN-SYSTEM.md` | Visual design | Colors, typography, components |
| `05-API-SPECIFICATIONS.md` | API documentation | Endpoints, requests, responses |
| `06-COMPONENT-ARCHITECTURE.md` | Frontend structure | Folder structure, patterns |
| `07-OFFLINE-PWA-STRATEGY.md` | Offline architecture | Service worker, IndexedDB |
| `08-PROJECT-ROADMAP.md` | Timeline | 16-week schedule |
| `09-DATA-FLOW-ANALYSIS.md` | Data lifecycle | Ticket flow, validation |
| `10-IMPLEMENTATION-CHECKLIST.md` | Build checklist | Step-by-step tasks |

### Project Files (grid-electric-app)

| Path | Description |
|------|-------------|
| `app/(auth)/` | Authentication screens |
| `app/(onboarding)/` | 12-step onboarding wizard |
| `app/(admin)/` | Admin portal (18 screens) |
| `app/(subcontractor)/` | Contractor portal (16 screens) |
| `components/ui/` | shadcn/ui components |
| `components/common/` | Shared components |
| `components/features/` | Feature components |
| `lib/config/appConfig.ts` | App constants |
| `lib/supabase/` | Supabase clients |
| `lib/db/dexie.ts` | IndexedDB configuration |
| `lib/utils/formatters.ts` | Formatting utilities |
| `lib/utils/validators.ts` | Validation schemas |
| `stores/authStore.ts` | Zustand auth store |
| `types/index.ts` | TypeScript types |
| `types/database.ts` | Database types |
| `sql/` | SQL migration files |

---

## 8. TROUBLESHOOTING

### Common Issues

**Issue:** Supabase connection fails

- **Solution:** Check .env.local credentials, ensure NEXT_PUBLIC_ prefix on client vars

**Issue:** RLS policies blocking access

- **Solution:** Verify policies in `sql/08_rls_policies.sql`, check user role

**Issue:** Offline sync not working

- **Solution:** Verify service worker registered, check Dexie.js schema version

**Issue:** Mapbox not loading

- **Solution:** Verify NEXT_PUBLIC_MAPBOX_TOKEN set, check for ad blockers

**Issue:** Photos not uploading

- **Solution:** Check Supabase Storage bucket permissions, verify file size < 10MB

---

## DOCUMENT CONTROL

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-02-07 | Initial creation | Agent |

---

**END OF MASTER BUILD INSTRUCTIONS**

**NEXT ACTION REQUIRED:** Update Section 2 (Progress Tracker) after every task completion.
