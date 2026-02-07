-- Grid Electric Services - Row Level Security Policies

-- Profiles RLS Policies
CREATE POLICY profiles_select_own ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY profiles_select_admin ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
    )
  );

CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Subcontractors RLS Policies
CREATE POLICY subcontractors_select_own ON subcontractors
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY subcontractors_select_admin ON subcontractors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
    )
  );

CREATE POLICY subcontractors_write_admin ON subcontractors
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
    )
  );

-- Tickets RLS Policies
CREATE POLICY tickets_select_assigned ON tickets
  FOR SELECT USING (
    assigned_to IN (
      SELECT id FROM subcontractors WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY tickets_admin ON tickets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
    )
  );

-- Time Entries RLS Policies
CREATE POLICY time_entries_own ON time_entries
  FOR ALL USING (
    subcontractor_id IN (
      SELECT id FROM subcontractors WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY time_entries_admin ON time_entries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
    )
  );

-- Expense Reports RLS Policies
CREATE POLICY expense_reports_own ON expense_reports
  FOR ALL USING (
    subcontractor_id IN (
      SELECT id FROM subcontractors WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY expense_reports_admin ON expense_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
    )
  );

-- Media Assets RLS Policies
CREATE POLICY media_select_own ON media_assets
  FOR SELECT USING (uploaded_by = auth.uid());

CREATE POLICY media_admin ON media_assets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'OPERATIONS_MANAGER')
    )
  );
