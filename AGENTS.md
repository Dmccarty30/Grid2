# Grid Electric Services — AI Agent Guide

## Project Overview

This is the **Grid Electric Services Damage Assessment Platform** — a Progressive Web Application (PWA) for managing independent 1099 subcontractor crews performing utility damage assessments for government contracts.

**Business Context:**
- **Prime Contractor:** Grid Electric Services
- **Workforce Model:** Independent 1099 subcontractors (not employees)
- **Client Base:** Power utility companies with government contracts
- **Compliance Level:** FISMA/FedRAMP moderate

**Core Purpose:** Enable efficient dispatch, tracking, and billing of damage assessment crews while maintaining strict compliance with government contract standards and independent contractor legal requirements.

---

## Technology Stack

### Frontend
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 14 (App Router) |
| Language | TypeScript | 5.x |
| UI Library | React | 18 |
| Styling | Tailwind CSS | 3.4 |
| UI Components | shadcn/ui | 40+ components |
| State Management | Zustand | Latest |
| Server State | TanStack Query | Latest |
| Offline Storage | Dexie.js (IndexedDB) | Latest |
| Maps | Mapbox GL JS | Latest |

### Backend
| Component | Technology |
|-----------|------------|
| BaaS | Supabase |
| Database | PostgreSQL 15+ |
| Auth | Supabase Auth (email/password, magic link) |
| Storage | Supabase Storage |
| Real-time | Supabase Realtime |
| Security | Row-Level Security (RLS) |

### External Services
| Service | Purpose |
|---------|---------|
| Mapbox | Maps, routing, geocoding |
| OSRM (self-hosted) | Free unlimited routing |
| Web Push API | PWA notifications |
| Supabase Storage | Photos, documents, PDFs |

---

## Project Structure

```
grid-electric-docs/           # Technical documentation package
├── 01-TECHNICAL-PRD.md       # Product requirements & architecture
├── 02-DATABASE-SCHEMA.md     # Supabase PostgreSQL schema
├── 03-WIREFRAMES.md          # ASCII wireframes for 52 screens
├── 04-DESIGN-SYSTEM.md       # Blue/yellow theme specifications
├── 05-API-SPECIFICATIONS.md  # REST API documentation
├── 06-COMPONENT-ARCHITECTURE.md  # React component structure
├── 07-OFFLINE-PWA-STRATEGY.md    # Service worker & IndexedDB
├── 08-PROJECT-ROADMAP.md     # 16-week development timeline
├── 09-DATA-FLOW-ANALYSIS.md  # Ticket lifecycle & validation
├── 10-IMPLEMENTATION-CHECKLIST.md # Step-by-step build guide
└── README.md                 # Documentation index

app/                          # Next.js application (to be created)
├── app/                      # App Router
│   ├── (auth)/               # Authentication routes
│   ├── (onboarding)/         # 12-step onboarding flow
│   ├── (admin)/              # Admin portal (18 screens)
│   ├── (subcontractor)/      # Subcontractor portal (16 screens)
│   └── api/                  # API routes
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── common/               # Shared components
│   ├── features/             # Feature-specific components
│   └── providers/            # Context providers
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities & configuration
│   ├── supabase/             # Supabase clients
│   ├── db/                   # Database helpers
│   ├── services/             # External services
│   ├── utils/                # Utility functions
│   └── constants/            # App constants
├── types/                    # TypeScript type definitions
├── stores/                   # Zustand stores
└── public/                   # Static assets
```

---

## Build and Development Commands

### Initial Setup
```bash
# 1. Initialize project
npx create-next-app@latest grid-electric --typescript --tailwind --app

# 2. Install shadcn/ui
npx shadcn-ui@latest init

# 3. Install core dependencies
npm install @supabase/supabase-js zustand @tanstack/react-query dexie dexie-react-hooks mapbox-gl date-fns zod

# 4. Install additional dependencies for field operations
npm install exifreader browser-image-compression tesseract.js react-signature-canvas html5-qrcode @hookform/resolvers react-hook-form date-fns-tz crypto-js uuid
```

### Development
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

### Environment Variables
Create `.env.local` with:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MAX_TIME_ENTRY_HOURS=12
NEXT_PUBLIC_GEOFENCE_RADIUS_METERS=500
NEXT_PUBLIC_MAX_PHOTO_SIZE_MB=10
NEXT_PUBLIC_MIN_PHOTOS_REQUIRED=4
```

---

## Code Style Guidelines

### File Naming Conventions
| Type | Pattern | Example |
|------|---------|---------|
| Pages | `page.tsx` | `app/(admin)/dashboard/page.tsx` |
| Layouts | `layout.tsx` | `app/(admin)/layout.tsx` |
| Components | PascalCase | `TicketList.tsx`, `TimeClock.tsx` |
| Hooks | camelCase with `use` prefix | `useTickets.ts`, `useGeolocation.ts` |
| Utilities | camelCase | `formatters.ts`, `validators.ts` |
| Types | PascalCase | `Ticket.ts`, `TimeEntry.ts` |
| Constants | SCREAMING_SNAKE_CASE | `TICKET_STATUSES`, `WORK_TYPES` |

### Component Structure
```typescript
// 1. Imports (ordered: React, libs, components, hooks, utils, types)
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/lib/utils/formatters';
import { Ticket } from '@/types/ticket';

// 2. Type definitions
interface TicketCardProps {
  ticket: Ticket;
  onStatusChange?: (id: string, status: string) => void;
}

// 3. Component
export function TicketCard({ ticket, onStatusChange }: TicketCardProps) {
  // Implementation
}

// 4. Default export (if needed)
export default TicketCard;
```

### Import Order
1. React/Next.js imports
2. Third-party library imports
3. shadcn/ui components (`@/components/ui/*`)
4. Custom components (`@/components/*`)
5. Hooks (`@/hooks/*`)
6. Utilities (`@/lib/*`)
7. Types (`@/types/*`)
8. Constants (`@/lib/constants/*`)

---

## Core Features & Requirements

### 1. User Roles
| Role | Permissions |
|------|-------------|
| SUPER_ADMIN | Full system access |
| OPERATIONS_MANAGER | Tickets, assignments, approvals |
| FIELD_SUBCONTRACTOR | Own tickets, time, expenses only |
| AUDITOR | Read-only access to all data |

### 2. Ticket Lifecycle (13 Statuses)
```
DRAFT → ASSIGNED → IN_ROUTE → ON_SITE → IN_PROGRESS → COMPLETE → 
PENDING_REVIEW → APPROVED/NEEDS_REWORK → CLOSED
```

### 3. GPS Requirements
- **Accuracy threshold:** < 100 meters
- **Geofence radius:** 500 meters (configurable)
- **Clock-in photo:** Required with GPS verification
- **Update frequency:** 30s (IN_ROUTE), 5min (ON_SITE)

### 4. Photo Requirements
- **Minimum per assessment:** 4 photos
- **Mandatory types:** Overview, Equipment, Damage, Safety
- **GPS tagging:** Required (extracted from EXIF)
- **Minimum resolution:** 1920×1080
- **Maximum file size:** 10MB per photo
- **Format:** JPEG (quality: 85%)
- **Integrity:** SHA-256 checksum on upload

### 5. Time Tracking Rules
- **Max duration:** 12 hours per entry
- **Warning threshold:** 8 hours
- **GPS verification:** Required at clock in/out
- **Photo verification:** Required at clock in/out
- **Work types:** STANDARD_ASSESSMENT, EMERGENCY_RESPONSE, TRAVEL, STANDBY, ADMIN, TRAINING

---

## Database Schema Overview

### Core Tables
| Table | Purpose |
|-------|---------|
| profiles | User accounts (extends auth.users) |
| subcontractors | Business info, 1099 tracking |
| subcontractor_credentials | Insurance, licenses with expiration alerts |
| subcontractor_rates | Hourly rates by work type |
| subcontractor_banking | Encrypted bank account info |
| tickets | Work orders with GPS tracking |
| ticket_status_history | Audit trail of status changes |
| time_entries | Clock in/out with GPS verification |
| expense_reports | Expense report headers |
| expense_items | Individual expense line items |
| damage_assessments | Assessment forms |
| equipment_assessments | Equipment-specific damage details |
| equipment_types | Catalog of equipment |
| media_assets | Photos with EXIF/GPS data |
| subcontractor_invoices | Automated billing |
| sync_queue | Offline sync tracking |
| audit_logs | Compliance audit trail |

### Security
- **RLS enabled** on all tables
- **Column-level encryption** for SSN, bank accounts
- **Audit logging** for all changes
- **Soft deletes** with trigger-based archiving

---

## Offline-First Architecture

### Storage Hierarchy
| Layer | Technology | Purpose |
|-------|------------|---------|
| React State | useState/useReducer | UI state (session only) |
| Zustand Store | Zustand | App state (memory + partial persist) |
| React Query Cache | TanStack Query | Server state (memory + cache) |
| IndexedDB | Dexie.js | Local database (persistent) |
| Cache API | Service Worker | Static assets (persistent) |

### Sync Strategy
1. **Optimistic UI updates** — UI updates immediately
2. **Local-first data** — All data originates in IndexedDB
3. **Background sync** — Queue operations for when connectivity returns
4. **Conflict resolution** — Server timestamp priority with user prompts

### Offline Capabilities
| Feature | Online | Offline |
|---------|--------|---------|
| View tickets | Full | Cached (read-only) |
| Update ticket status | Real-time | Queued |
| Clock in/out | Real-time | Queued |
| Take photos | Upload | Stored locally |
| Submit assessment | Real-time | Queued |
| View map | Full | Cached area |

---

## Testing Instructions

### Critical Test Scenarios
| Scenario | Expected Result |
|----------|-----------------|
| Contractor clocks in outside geofence | Error: "Must be within 500m of site" |
| Photo without GPS | Error: "Enable location services" |
| Submit assessment with 3 photos | Error: "Minimum 4 photos required" |
| Time entry > 12 hours | Auto-clock out + admin flag |
| Duplicate photo uploaded | Flag for admin review |
| GPS spoofing detected | Flag for admin review |
| Offline assessment submission | Queued for sync |

### Performance Targets
- Page load (initial): < 2s
- Page load (subsequent): < 1s
- API response: < 200ms
- Photo upload: < 5s per MB
- Map initialization: < 3s

---

## Security Considerations

### Authentication
- Password policy: 12+ chars, complexity requirements
- Failed login lockout: 5 attempts = 15 min lockout
- Session timeout: 8 hours idle, 24 hours max
- MFA: Optional for MVP, required for admins post-MVP

### Data Encryption
| Layer | Method |
|-------|--------|
| Data at rest | AES-256 (Supabase default) |
| Data in transit | TLS 1.3 |
| Sensitive fields | Column-level encryption |
| File storage | Server-side encryption |

### Audit Logging
All actions logged with:
- User ID
- Timestamp (UTC)
- Action type
- IP address
- Device fingerprint
- Before/after values (for changes)

---

## Development Phases (16-Week MVP)

### Phase 1: Foundation (Weeks 1-4)
- Project setup, Auth system, Database schema
- 12-step subcontractor onboarding flow
- Admin approval workflow

### Phase 2: Core Features (Weeks 5-8)
- Ticket system with 13-status lifecycle
- GPS workflow with Mapbox integration
- Photo capture with EXIF/GPS extraction
- Offline storage foundation

### Phase 3: Operations (Weeks 9-12)
- GPS-verified time tracking
- Expense management with OCR
- Damage assessment forms
- Invoice generation & 1099 tracking

### Phase 4: Polish & Launch (Weeks 13-16)
- Testing & QA (target: >70% coverage)
- Background sync & conflict resolution
- Documentation & training
- Production deployment

---

## Key Dependencies to Install

```bash
# Core
npm install @supabase/supabase-js zustand @tanstack/react-query dexie dexie-react-hooks mapbox-gl date-fns zod

# Image & OCR
npm install exifreader browser-image-compression tesseract.js

# Forms & Validation
npm install @hookform/resolvers react-hook-form

# Utilities
npm install date-fns-tz crypto-js uuid

# UI Components (via shadcn)
npx shadcn add button card input select dialog dropdown-menu table tabs badge avatar skeleton toast calendar
```

---

## External Documentation References

- **Next.js 14:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Supabase:** https://supabase.com/docs
- **TanStack Query:** https://tanstack.com/query/latest
- **Zustand:** https://docs.pmnd.rs/zustand
- **Dexie.js:** https://dexie.org/docs
- **Mapbox GL JS:** https://docs.mapbox.com/mapbox-gl-js
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## Notes for AI Agents

1. **This is a documentation package, not a working application.** The actual code needs to be implemented following these specifications.

2. **Compliance is critical.** All changes must maintain FISMA/FedRAMP moderate compliance requirements, especially:
   - Audit logging
   - Data encryption
   - Access controls (RLS)
   - 1099 tracking accuracy

3. **Offline-first is a core requirement.** Field subcontractors work in areas with poor cellular coverage. Always implement features with offline capability in mind.

4. **GPS validation is mandatory.** All time entries and photos require GPS verification. Never disable or bypass GPS checks.

5. **Photo integrity is legally important.** All photos require:
   - EXIF GPS data
   - Server timestamp (not device time)
   - SHA-256 hash for deduplication
   - Minimum 4 photos per assessment

6. **Use the existing documentation.** The `grid-electric-docs/` folder contains detailed specifications for every feature. Refer to it before implementing any functionality.

---

*Last Updated: February 7, 2026*
*Documentation Version: 1.0*
