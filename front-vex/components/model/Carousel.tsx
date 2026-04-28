"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";


export interface SlideItem {
  src: string;
  title: string;
}

interface CarouselProps {
  data: SlideItem[];
  className?:string;
}

export default function Carousel({ data = [],className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (data.length === 0) {
    return <div className="h-[400px] flex items-center justify-center bg-gray-200 rounded-xl font-medium">Tidak ada foto ditemukan</div>;
  }

  return (
    <div className="relative group max-w-5xl mx-auto">

      <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100" ref={emblaRef}>
        <div className="flex">
          {data.map((item, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-[450px] relative">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <p className="text-white font-semibold text-xl tracking-wide">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-500/30 hover:bg-black-500/50 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      ><BiSolidLeftArrow className="text-xl" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500/30 hover:bg-gray-500/50 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      ><BiSolidRightArrow className="text-xl" />
      </button>

    </div>
  );
}