// components/FloorPlanGallery.tsx
"use client";
import Image from "next/image";
import { resolveImageSrc } from "@/lib/image-src";

export default function FloorPlan({ floorplan = [] }) {
    if (!floorplan || floorplan.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {floorplan.map((fp, idx) => (
                <Image
                    key={idx}
                    src={resolveImageSrc(fp.image, "floor_plan") ?? ""}
                    alt={`Floor plan ${idx + 1}`}
                    width={800}
                    height={600}
                    className="rounded w-full object-contain"
                />
            ))}
        </div>
    );
}