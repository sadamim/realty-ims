// src/lib/api.ts
//
// Client-side data access. These now hit this app's OWN route handlers under
// /api/microsites/*, which talk to MongoDB directly (see src/lib/microsites.ts).
// The separate Express API is no longer in the path for the public site — it
// still runs for the admin panel.
//
// Server components should import from '@/lib/microsites' instead and skip the
// HTTP hop entirely.

// Same-origin by default. Only set NEXT_PUBLIC_API_BASE_URL if you deliberately
// want the client to call an external API instead.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export interface MicrositeData {
    location: string;
    name: string;
}

export async function fetchMicrosites(): Promise<MicrositeData[]> {
    const res = await fetch(`${API_BASE_URL}/microsites`);
    if (!res.ok) {
        throw new Error('Failed to fetch microsites');
    }
    return res.json();
}

export async function fetchMicrositesMain() {
    const res = await fetch(`${API_BASE_URL}/microsites/all`);
    if (!res.ok) {
        throw new Error('Failed to fetch microsites');
    }
    return res.json();
}
