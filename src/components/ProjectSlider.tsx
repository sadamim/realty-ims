"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Navigation } from "swiper/modules";

type ProjectSliderProps = {
    title: string;
    imageUrls: string[];
};

export default function ProjectSlider({
    title,
    imageUrls,
}: ProjectSliderProps) {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            className="mb-6 rounded-md overflow-hidden aspect-video"
            navigation={true}
            modules={[Navigation]}
        >
            {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <div className="relative block w-full h-full aspect-video">
                        {url && (
                            <Image
                                src={url.startsWith('https://storage.googleapis.com/') ? url : `${url}`}
                                alt={`${title} - Slide ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 700px"
                            />
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
