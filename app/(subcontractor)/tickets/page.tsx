'use client';

import { PageHeader } from '@/components/common/layout/PageHeader';
import { TicketList } from '@/components/features/tickets/TicketList';
import { useAuthStore } from '@/stores/authStore';

export default function SubcontractorTicketsPage() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Tickets"
                description="View and manage your assigned damage assessment tickets"
            />

            {user && (
                <TicketList 
                    userRole="subcontractor" 
                    userId={user.id} 
                />
            )}
        </div>
    );
}
