// components/microsite/ImageGallery.tsx
"use client";
import Image from "next/image";

export default function Gallery({ urls }) {
    if (!urls || urls.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {urls.map((url, index) => (
                <Image
                    key={index}
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    width={800}
                    height={600}
                    className="rounded w-full object-contain"
                />
            ))}
        </div>
    );
}