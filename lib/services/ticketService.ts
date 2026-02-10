
import { supabase } from '@/lib/supabase/client';
import { Ticket } from '@/types';

export const ticketService = {
    async getTickets() {
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Ticket[];
    },

    async getTicketById(id: string) {
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Ticket;
    },


    async createTicket(ticket: Partial<Ticket>) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase.from('tickets') as any)
            .insert([ticket])
            .select()
            .single();

        if (error) throw error;
        return data as Ticket;
    },

    async updateTicket(id: string, updates: Partial<Ticket>) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase.from('tickets') as any)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Ticket;
    },

    async getTicketsByAssignee(assigneeId: string) {
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .eq('assigned_to', assigneeId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Ticket[];
    }
};
