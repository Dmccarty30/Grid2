// Grid Electric Services - Dexie.js IndexedDB Configuration

import Dexie, { Table } from 'dexie';

// Types for local database
export interface LocalTicket {
  id: string;
  ticket_number: string;
  status: string;
  priority: string;
  address: string;
  latitude?: number;
  longitude?: number;
  assigned_to?: string;
  utility_client: string;
  work_description?: string;
  synced: boolean;
  updated_at: string;
}

export interface LocalTimeEntry {
  id: string;
  subcontractor_id: string;
  ticket_id?: string;
  clock_in_at: string;
  clock_in_latitude?: number;
  clock_in_longitude?: number;
  clock_in_photo_url?: string;
  clock_out_at?: string;
  clock_out_latitude?: number;
  clock_out_longitude?: number;
  clock_out_photo_url?: string;
  work_type: string;
  work_type_rate: number;
  break_minutes: number;
  status: string;
  synced: boolean;
  sync_status: 'pending' | 'synced' | 'failed';
}

export interface LocalExpenseReport {
  id: string;
  subcontractor_id: string;
  report_period_start: string;
  report_period_end: string;
  total_amount: number;
  status: string;
  synced: boolean;
}

export interface LocalExpenseItem {
  id: string;
  expense_report_id: string;
  category: string;
  description: string;
  amount: number;
  expense_date: string;
  receipt_url?: string;
  synced: boolean;
}

export interface LocalAssessment {
  id: string;
  ticket_id: string;
  subcontractor_id: string;
  safety_observations: any;
  damage_cause?: string;
  weather_conditions?: string;
  estimated_repair_hours?: number;
  priority?: string;
  immediate_actions?: string;
  repair_vs_replace?: string;
  estimated_repair_cost?: number;
  assessed_at?: string;
  synced: boolean;
  sync_status: 'pending' | 'synced' | 'failed';
}

export interface LocalPhoto {
  id: string;
  file: Blob;
  preview: string;
  type: string;
  entity_type: string;
  entity_id: string;
  gps_latitude?: number;
  gps_longitude?: number;
  captured_at?: string;
  checksum: string;
  uploaded: boolean;
  upload_status: 'pending' | 'uploaded' | 'failed';
}

export interface SyncQueueItem {
  id: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  entity_type: string;
  entity_id: string;
  payload: any;
  retry_count: number;
  last_error?: string;
  created_at: Date;
}

export interface GPSLocation {
  id: string;
  ticket_id?: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  heading?: number;
  speed?: number;
  timestamp: Date;
  synced: boolean;
}

// Dexie Database Class
export class GridElectricDatabase extends Dexie {
  // Tables
  tickets!: Table<LocalTicket>;
  timeEntries!: Table<LocalTimeEntry>;
  expenseReports!: Table<LocalExpenseReport>;
  expenseItems!: Table<LocalExpenseItem>;
  assessments!: Table<LocalAssessment>;
  photos!: Table<LocalPhoto>;
  syncQueue!: Table<SyncQueueItem>;
  gpsLocations!: Table<GPSLocation>;

  constructor() {
    super('GridElectricDB');
    
    this.version(1).stores({
      tickets: 'id, ticket_number, status, assigned_to, synced, updated_at',
      timeEntries: 'id, subcontractor_id, ticket_id, status, synced, sync_status',
      expenseReports: 'id, subcontractor_id, status, synced',
      expenseItems: 'id, expense_report_id, synced',
      assessments: 'id, ticket_id, subcontractor_id, synced, sync_status',
      photos: 'id, entity_type, entity_id, uploaded, upload_status',
      syncQueue: 'id, entity_type, created_at',
      gpsLocations: 'id, ticket_id, timestamp, synced',
    });
  }
}

// Export singleton instance
export const db = new GridElectricDatabase();

// Helper functions for sync operations
export async function addToSyncQueue(
  operation: 'CREATE' | 'UPDATE' | 'DELETE',
  entityType: string,
  entityId: string,
  payload: any
): Promise<void> {
  await db.syncQueue.add({
    id: crypto.randomUUID(),
    operation,
    entity_type: entityType,
    entity_id: entityId,
    payload,
    retry_count: 0,
    created_at: new Date(),
  });
}

export async function getPendingSyncItems(): Promise<SyncQueueItem[]> {
  return await db.syncQueue.orderBy('created_at').toArray();
}

export async function removeFromSyncQueue(id: string): Promise<void> {
  await db.syncQueue.delete(id);
}

export async function updateSyncRetry(id: string, error: string): Promise<void> {
  const item = await db.syncQueue.get(id);
  if (item) {
    await db.syncQueue.update(id, {
      retry_count: item.retry_count + 1,
      last_error: error,
    });
  }
}

// Cache tickets for offline access
export async function cacheTickets(tickets: LocalTicket[]): Promise<void> {
  await db.tickets.bulkPut(tickets.map(t => ({ ...t, synced: true })));
}

export async function getCachedTickets(assignedTo?: string): Promise<LocalTicket[]> {
  if (assignedTo) {
    return await db.tickets.where('assigned_to').equals(assignedTo).toArray();
  }
  return await db.tickets.toArray();
}

// Photo queue management
export async function queuePhoto(photo: Omit<LocalPhoto, 'id'>): Promise<string> {
  const id = crypto.randomUUID();
  await db.photos.add({ ...photo, id });
  return id;
}

export async function getPendingPhotos(): Promise<LocalPhoto[]> {
  return await db.photos.filter(photo => !photo.uploaded).toArray();
}

export async function markPhotoUploaded(id: string): Promise<void> {
  await db.photos.update(id, { uploaded: true, upload_status: 'uploaded' });
}

// GPS tracking
export async function logGPSLocation(location: Omit<GPSLocation, 'id'>): Promise<void> {
  await db.gpsLocations.add({
    ...location,
    id: crypto.randomUUID(),
  });
}

export async function getUnsyncedGPSLocations(): Promise<GPSLocation[]> {
  return await db.gpsLocations.filter(loc => !loc.synced).toArray();
}
