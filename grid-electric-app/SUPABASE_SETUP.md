# Grid Electric Services - Supabase Setup Guide

## Overview
This guide walks you through setting up the Supabase project for the Grid Electric Services platform.

**Estimated Time:** 30-45 minutes  
**Prerequisites:** Supabase account (free tier works)

---

## Step 1: Create Supabase Project

### 1.1 Sign Up / Log In
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"

### 1.2 Project Configuration
Fill in the project details:
```
Organization: [Your Organization]
Project Name: grid-electric-services
Database Password: [Generate a strong password - SAVE THIS!]
Region: [Choose closest to your users - e.g., us-east-1]
```

Click "Create New Project" and wait for provisioning (2-3 minutes).

### 1.3 Get Connection Details
Once created, go to Project Settings → API:

Copy these values (you'll need them for `.env.local`):
```
Project URL: https://xxxxxxxxxxxxxxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIs... [Long string]
service_role: eyJhbGciOiJIUzI1NiIs... [Long string - SECRET!]
```

---

## Step 2: Run Database Migrations

### 2.1 Open SQL Editor
1. In Supabase Dashboard, click "SQL Editor" in left sidebar
2. Click "New Query"

### 2.2 Run SQL Files in Order

Execute each SQL file in the `sql/` folder in this exact order:

#### File 1: 01_enums.sql
```sql
-- Copy entire contents of sql/01_enums.sql
-- Paste into SQL Editor
-- Click "Run"
```
**Expected Result:** 12 enum types created successfully.

#### File 2: 02_core_tables.sql
```sql
-- Copy entire contents of sql/02_core_tables.sql
-- This creates: profiles, subcontractors, credentials, rates, banking
```
**Expected Result:** 5 tables created with RLS enabled.

#### File 3: 03_ticket_tables.sql
```sql
-- Copy entire contents of sql/03_ticket_tables.sql
-- This creates: tickets, ticket_status_history, ticket_routes
```
**Expected Result:** 3 tables created.

#### File 4: 04_time_expense_tables.sql
```sql
-- Copy entire contents of sql/04_time_expense_tables.sql
-- This creates: time_entries, expense_reports, expense_items, expense_policies
```
**Expected Result:** 4 tables created.

#### File 5: 05_assessment_tables.sql
```sql
-- Copy entire contents of sql/05_assessment_tables.sql
-- This creates: equipment_types, hazard_categories, damage_assessments, equipment_assessments, wire_sizes
```
**Expected Result:** 5 tables created.

#### File 6: 06_financial_tables.sql
```sql
-- Copy entire contents of sql/06_financial_tables.sql
-- This creates: subcontractor_invoices, invoice_line_items, tax_1099_tracking
```
**Expected Result:** 3 tables created.

#### File 7: 07_media_audit_tables.sql
```sql
-- Copy entire contents of sql/07_media_audit_tables.sql
-- This creates: media_assets, audit_logs, notification_logs, sync_queue
```
**Expected Result:** 4 tables created.

#### File 8: 08_rls_policies.sql
```sql
-- Copy entire contents of sql/08_rls_policies.sql
-- This creates: Row Level Security policies
```
**Expected Result:** RLS policies applied to all tables.

#### File 9: 09_triggers.sql
```sql
-- Copy entire contents of sql/09_triggers.sql
-- This creates: Auto-updated_at, status logging, 1099 tracking triggers
```
**Expected Result:** Triggers and functions created.

#### File 10: 10_seed_data.sql
```sql
-- Copy entire contents of sql/10_seed_data.sql
-- This inserts: Wire sizes, equipment types, hazards, expense policies
```
**Expected Result:** Reference data populated.

### 2.3 Verify Tables
Go to Database → Tables in Supabase Dashboard. You should see:
- audit_logs
- damage_assessments
- equipment_assessments
- equipment_types
- expense_items
- expense_policies
- expense_reports
- hazard_categories
- invoice_line_items
- media_assets
- notification_logs
- profiles
- subcontractor_banking
- subcontractor_credentials
- subcontractor_invoices
- subcontractor_rates
- subcontractors
- sync_queue
- tax_1099_tracking
- ticket_routes
- ticket_status_history
- tickets
- time_entries
- wire_sizes

**Total: 24 tables**

---

## Step 3: Configure Authentication

### 3.1 Enable Email/Password Auth
1. Go to Authentication → Providers
2. Ensure "Email" provider is enabled
3. Settings:
   ```
   Confirm email: Enabled
   Secure email change: Enabled
   Mailer OTP Expiration: 3600 seconds
   ```

### 3.2 Configure Email Templates
Go to Authentication → Email Templates:

**Confirm Signup Template:**
```
Subject: Confirm your signup
Body: [Use default or customize with your branding]
```

**Reset Password Template:**
```
Subject: Reset your password
Body: [Use default or customize]
```

**Magic Link Template:**
```
Subject: Your magic link
Body: [Use default or customize]
```

### 3.3 Configure Password Requirements
Go to Authentication → Policies:
```
Minimum password length: 12
Require letters: Yes
Require numbers: Yes
Require uppercase: Yes
Require lowercase: Yes
Require special characters: Yes
```

---

## Step 4: Set Up Storage (Photos)

### 4.1 Create Storage Buckets
Go to Storage → New Bucket:

**Bucket 1: photos**
```
Name: photos
Public: TRUE (for accessing photos via URL)
File size limit: 10MB
Allowed MIME types: image/jpeg, image/png, image/webp
```

**Bucket 2: documents**
```
Name: documents
Public: FALSE
File size limit: 20MB
Allowed MIME types: application/pdf, image/*
```

**Bucket 3: receipts**
```
Name: receipts
Public: FALSE
File size limit: 10MB
Allowed MIME types: image/*
```

### 4.2 Set Storage Policies

For **photos** bucket, add these policies:

**Policy 1: Allow users to upload their own photos**
```sql
INSERT policy:
  (auth.uid() = (select auth.uid() from profiles where id = auth.uid()))
```

**Policy 2: Allow users to view their own photos**
```sql
SELECT policy:
  (auth.uid() = uploaded_by) OR 
  (auth.uid() IN (
    SELECT created_by FROM tickets WHERE id = entity_id
  ))
```

**Policy 3: Allow admins to view all photos**
```sql
SELECT policy:
  (auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
  ))
```

---

## Step 5: Configure Environment Variables

### 5.1 Create .env.local
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 5.2 Fill in Supabase Credentials
Edit `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Mapbox (if you have it)
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Replace:**
- `your-project-id` with your actual project ID
- `your-anon-key-here` with the anon/public key
- `your-service-role-key-here` with the service_role key (keep secret!)

---

## Step 6: Test Connection

### 6.1 Start Development Server
```bash
npm run dev
```

### 6.2 Run Connection Test
Create a test file `test-connection.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  // Test 1: Check connection
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  console.log('Connection test:', authError ? 'FAILED' : 'PASSED');
  
  // Test 2: Check tables
  const { data: tables, error: tablesError } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);
  console.log('Profiles table:', tablesError ? 'FAILED' : 'PASSED');
  
  // Test 3: Check wire_sizes data
  const { data: wires, error: wiresError } = await supabase
    .from('wire_sizes')
    .select('*');
  console.log('Wire sizes data:', wiresError ? 'FAILED' : `PASSED (${wires?.length} entries)`);
  
  // Test 4: Check equipment_types data
  const { data: equipment, error: equipError } = await supabase
    .from('equipment_types')
    .select('*');
  console.log('Equipment data:', equipError ? 'FAILED' : `PASSED (${equipment?.length} entries)`);
}

testConnection();
```

Run the test:
```bash
node test-connection.js
```

**Expected Output:**
```
Connection test: PASSED
Profiles table: PASSED
Wire sizes data: PASSED (24 entries)
Equipment data: PASSED (8 entries)
```

---

## Step 7: Verification Checklist

Before proceeding to authentication screens, verify:

- [ ] Supabase project created
- [ ] Project URL and keys copied to `.env.local`
- [ ] All 10 SQL files executed successfully (01-10)
- [ ] 24 tables visible in Database → Tables
- [ ] Authentication → Email provider enabled
- [ ] Storage buckets created: photos, documents, receipts
- [ ] Storage policies configured
- [ ] Development server starts without errors
- [ ] Connection test passes

---

## Troubleshooting

### Issue: SQL execution fails
**Solution:** Check error message - usually syntax issue. Ensure you're running files in order (01-10).

### Issue: "relation does not exist" error
**Solution:** You likely skipped a SQL file. Run them in order starting from 01.

### Issue: RLS policy blocks access
**Solution:** Verify policies in SQL file 08 were executed. Check Authentication → Policies.

### Issue: Can't connect from app
**Solution:** 
- Verify `.env.local` has correct values
- Ensure NEXT_PUBLIC_ prefix on client-side variables
- Check for typos in URL (should be https://...supabase.co)

### Issue: Storage upload fails
**Solution:**
- Verify storage buckets created
- Check storage policies are configured
- Ensure file size under limit (10MB for photos)

---

## Next Steps

Once Supabase setup is complete, proceed to:

1. **Task 2.2:** Authentication Screens (`MASTER_BUILD_INSTRUCTIONS.md`)
2. Create Login, Forgot Password, Reset Password, Magic Link pages
3. Implement auth forms with validation

---

## Quick Reference

| Resource | URL |
|----------|-----|
| Supabase Dashboard | https://app.supabase.com |
| Project Settings | https://app.supabase.com/project/_/settings/general |
| SQL Editor | https://app.supabase.com/project/_/sql |
| Auth Settings | https://app.supabase.com/project/_/auth/providers |
| Storage | https://app.supabase.com/project/_/storage |

---

**Setup Complete!** 🎉

Proceed to Authentication Screens implementation.
