// components/microsite/MasterPlan.tsx
"use client";
import Image from "next/image";

export default function MasterPlanImage({ imageUrl }) {
    if (!imageUrl) return null;

    const src = imageUrl.startsWith("http")
        ? imageUrl
        : `https://realtyfocus.info/images/master_plan/${imageUrl}`;

    return (
        <div className="bg-white p-6 rounded shadow my-6" id="master-plan">
            <h2 className="text-xl font-bold mb-4 text-realty-navy">Master Plan</h2>
            <Image
                src={src}
                alt="Master Plan"
                width={1000}
                height={600}
                className="rounded w-full object-contain"
            />
        </div>
    );
}