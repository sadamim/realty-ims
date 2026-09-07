'use client';

import { useEffect, useState } from 'react';
import { fetchMicrosites, MicrositeData } from '@/lib/api';

// Utility function to capitalize each word
const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export default function MicrositeDropdowns({
    onSelectLocation,
    onSelectProject
}: {
    onSelectLocation?: (value: string) => void;
    onSelectProject?: (value: string) => void;
}) {
    const [microsites, setMicrosites] = useState<MicrositeData[]>([]);

    useEffect(() => {
        fetchMicrosites()
            .then(setMicrosites)
            .catch(err => console.error(err));
    }, []);

    // Extract and process unique, sorted, title-cased lists
    const uniqueLocations = Array.from(
        new Set(microsites.map(site => toTitleCase(site.location)))
    ).sort();

    const uniqueProjects = Array.from(
        new Set(microsites.map(site => toTitleCase(site.name)))
    ).sort();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block mb-1 font-medium">Location</label>
                <select
                    name="location"
                    className="form-input w-full input input-bordered"
                    onChange={e => onSelectLocation?.(e.target.value)}
                >
                    <option value="">Select a location</option>
                    {uniqueLocations.map((loc, idx) => (
                        <option key={idx} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block mb-1 font-medium">Project Name</label>
                <select
                    name="project"
                    className="form-input w-full input input-bordered"
                    onChange={e => onSelectProject?.(e.target.value)}
                >
                    <option value="">Select a project</option>
                    {uniqueProjects.map((proj, idx) => (
                        <option key={idx} value={proj}>{proj}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
