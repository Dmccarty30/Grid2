
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Ticket } from '@/types';
import { ticketService } from '@/lib/services/ticketService';
import { PageHeader } from '@/components/common/layout/PageHeader';
import { StatusBadge } from '@/components/common/data-display/StatusBadge';
import { TicketPriorityBadge } from '@/components/features/tickets/TicketPriorityBadge';
import { formatDate, formatAddress } from '@/lib/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';

// This is a placeholder for the detail view. 
// In a real app, we'd have more sections like comments, history, photos, etc.

export default function TicketDetailPage() {
    const params = useParams();
    const { user } = useAuthStore();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadTicket() {
            if (!params.id) return;
            try {
                const data = await ticketService.getTicketById(params.id as string);
                setTicket(data);
            } catch (error) {
                console.error('Failed to load ticket:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadTicket();
    }, [params.id]);

    if (isLoading) {
        return <TicketDetailSkeleton />;
    }

    if (!ticket) {
        return notFound();
    }

    const userRole =
        user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'TEAM_LEAD'
            ? 'admin'
            : 'subcontractor';

    return (
        <div className="space-y-6">
            <PageHeader
                title={`Ticket ${ticket.ticket_number}`}
                description={ticket.utility_client}
                backHref="/tickets"
                showBackButton={true}
            >
                <div className="flex gap-2">
                    <TicketPriorityBadge priority={ticket.priority} />
                    <StatusBadge status={ticket.status} />
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Work Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{ticket.work_description}</p>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="details">
                        <TabsList>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="assessments">Assessments</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="space-y-4 mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Location & Contact</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div>
                                        <h4 className="font-semibold text-sm">Address</h4>
                                        <p>{formatAddress(ticket.address, ticket.city ?? null, ticket.state ?? null, ticket.zip_code ?? null)}</p>
                                    </div>
                                    {ticket.client_contact_name && (
                                        <div>
                                            <h4 className="font-semibold text-sm">Client Contact</h4>
                                            <p>{ticket.client_contact_name} {ticket.client_contact_phone && `• ${ticket.client_contact_phone}`}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="assessments">
                            <div className="text-muted-foreground p-4">No assessments yet.</div>
                        </TabsContent>
                        <TabsContent value="history">
                            <div className="text-muted-foreground p-4">History placeholder.</div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Assigned To</span>
                                <p>{ticket.assigned_to ? 'Subcontractor Name (ID)' : 'Unassigned'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Created</span>
                                <p>{formatDate(ticket.created_at)}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Geofence</span>
                                <p>{ticket.geofence_radius_meters}m</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}

function TicketDetailSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-64 md:col-span-2" />
                <Skeleton className="h-64" />
            </div>
        </div>
    )
}
