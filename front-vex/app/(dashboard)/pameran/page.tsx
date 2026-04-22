"use client";
// icon & react
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
// asset
import ProjectCard from '@/components/dashboard/ProjectCard';
import SelectProdi, { ProdiType } from "@/components/dashboard/SelectProdi";
import SelectTahun, { TahunType } from "@/components/dashboard/SelectTahun";
import SelectSemester, { SemesterType } from "@/components/dashboard/SelectSemester";
// Dummy data
import { ALL_EXHIBITIONS } from '@/app/data/Pameran';

// Load Data Pameran
export default function PameranPage() {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false });
  const renderCategory = (categoryName: string) => {
    return ALL_EXHIBITIONS
      .filter(p => p.category === categoryName)
      .map(project => (
        <Link href={`/pameran/${project.id}`} key={project.id} className="block transition-transform hover:scale-[1.02]">
          <ProjectCard project={project} />
        </Link>
      ));
  };

  // Filtering
  const [selectedProdi, setSelectedProdi] = useState<ProdiType | null>(null);
  const [selectedTahun, setSelectedTahun] = useState<TahunType | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<SemesterType | null>(null);

  return (
    <div className="min-h-screen bg-secondary-color text-black font-poppins">
      <section className="py-[30px] pt-[10px] rounded-b-[40px] bg-main-blue">
        <div className="autoMid">
          <div className="flex w-full gap-4 pt-[30px] pb-[20px] justify-between items-center">
            {/* search section */}
            <div className='w-[50%] relative flex items-center justify-start text-black'>
              <input type="text" placeholder="Cari..." className="w-full p-2 pl-[50px] bg-white rounded-full text-sm focus:outline-none focus:border-main-blue" />
              <FaSearch className='absolute left-4 opacity-80 text-[22px]' />
            </div>

            {/* filter list */}
            <div className='w-[40%] gap-[30px] flex justify-between'>
              <SelectProdi selected={selectedProdi} onChange={setSelectedProdi} />
              <SelectTahun selected={selectedTahun} onChange={setSelectedTahun} />
              <SelectSemester selected={selectedSemester} onChange={setSelectedSemester} />
            </div>
          </div>

          {/* main Carousel menggunakan data dari ALL_EXHIBITIONS */}
          <h2 className="mb-6 text-[40px] text-white font-poppins font-semibold border-b-3">SEGERA HADIR</h2>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 ">
              {ALL_EXHIBITIONS.slice(0, 5).map((project) => (
                <div key={project.id} className="min-w-0 text-white flex-[0_0_80%] md:flex-[0_0_30%] ">
                  <Link href={`/pameran/${project.id}`}>
                    <div className="p-1 rounded-2xl text-white backdrop-blur-sm cursor-pointer hover:opacity-80 transition-all">
                      <ProjectCard project={project} />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="autoMid py-[30px] pb-20 space-y-12">
        {/* Teknik Informatika */}
        <section>
          <h2 className="text-xl font-poppins font-medium mb-4 border-b pb-2">Teknik Informatika</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCategory("Teknik Informatika")}
          </div>
        </section>

        {/* Teknologi Rekayasa Multimedia */}
        <section>
          <h2 className="text-xl font-poppins font-medium mb-4 border-b pb-2">Teknik Rekayasa Multimedia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCategory("Teknik Rekayasa Multimedia")}
          </div>
        </section>

        {/* Teknik Geomatika */}
        <section>
          <h2 className="text-xl font-poppins font-medium mb-4 border-b pb-2">Teknik Geomatika</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCategory("Teknik Geomatika")}
          </div>
        </section>

        {/* Animasi */}
        <section>
          <h2 className="text-xl font-poppins font-medium mb-4 border-b pb-2">Animasi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCategory("Animasi")}
          </div>
        </section>

        {/* Rekayasa Keamanan Siber */}
        <section>
          <h2 className="text-xl font-poppins font-medium mb-4 border-b pb-2">Rekayasa Keamanan Siber</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCategory("Rekayasa Keamanan Siber")}
          </div>
        </section>

        {/* Teknologi Rekayasa Perangkat Lunak */}
        <section>
          <h2 className="text-xl font-poppins font-medium mb-4 border-b pb-2">Teknologi Rekayasa Perangkat Lunak</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCategory("Teknologi Rekayasa Perangkat Lunak")}
          </div>
        </section>
      </main>
    </div>
  );
}