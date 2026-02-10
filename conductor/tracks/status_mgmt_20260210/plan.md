# Implementation Plan: Ticket Status Management System (Task 5.3)

This plan outlines the steps to implement the context-aware status management system, including the visual updater, history tracking, and state machine logic.

## Phase 1: Foundation & State Machine Logic
- [x] Task: Define Status Transition Logic
    - [x] Write unit tests for status transition validator (Skipped per user request)
    - [x] Implement `isValidTransition(current, next)` logic (Green Phase)
    - [x] Verify test coverage for transition logic (Skipped per user request)
- [ ] Task: Status History Service
    - [ ] Write unit tests for status history persistence (Red Phase)
    - [ ] Implement `logStatusChange` function in `ticketService.ts` (Green Phase)
    - [ ] Verify test coverage for history logging
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation' (Protocol in workflow.md)

## Phase 2: Context-Aware UI Components
- [ ] Task: Implement `StatusUpdater` Component
    - [ ] Write unit tests for component role-based visibility (Red Phase)
    - [ ] Implement component with context-aware Action Buttons (Green Phase)
    - [ ] Verify test coverage for the UI component
- [ ] Task: Implement `StatusHistoryTimeline` Component
    - [ ] Write unit tests for timeline data rendering (Red Phase)
    - [ ] Implement vertical timeline display (Green Phase)
    - [ ] Verify test coverage for the timeline component
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI Components' (Protocol in workflow.md)

## Phase 3: Integration & Validation
- [ ] Task: Mandatory Reason Validation
    - [ ] Write unit tests for "Reason for Change" requirement on negative transitions (Red Phase)
    - [ ] Implement validation logic and modal trigger (Green Phase)
    - [ ] Verify test coverage for validation
- [ ] Task: Final Integration & Mobile Polish
    - [ ] Integrate `StatusUpdater` into Ticket Detail pages (Admin & Subcontractor)
    - [ ] Verify responsive behavior and touch targets on mobile
    - [ ] Perform end-to-end flow test (Assigned -> In Route -> On Site -> Complete)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration' (Protocol in workflow.md)