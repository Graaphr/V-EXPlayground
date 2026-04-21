"use client";
// icon & react
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react';

// asset
import ProjectCard, { type ProjectCard as TProject } from '@/components/dashboard/ProjectCard';
import SelectProdi, { ProdiType } from "@/components/dashboard/SelectProdi";
import SelectTahun, { TahunType } from "@/components/dashboard/SelectTahun";
import SelectSemester, { SemesterType } from "@/components/dashboard/SelectSemester";

// Contoh Tanggal yang nanti ambil dari db
const tanggalSekarang = new Date().toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Contoh Pameran Karya yang nanti ambil dari db
const ALL_PROJECTS: TProject[] = [
  { id: 1, date: tanggalSekarang, title: "1 Inovasi: Karya Masa Depan Mahasiswa", category: "Teknik Informatika", image: "/image/BG1.jpg", likes: 100, karya: 200 },
  { id: 2, date: tanggalSekarang, title: "2 Inovasi: Karya Masa Depan Mahasiswa", category: "Rekayasa Keamanan Siber", image: "/image/BG1.jpg", likes: 100, karya: 200 },
  { id: 3, date: tanggalSekarang, title: "3 Inovasi: Karya Masa Depan Mahasiswa", category: "Teknik Rekayasa Multimedia", image: "/image/BG1.jpg", likes: 100, karya: 200 },
  { id: 4, date: tanggalSekarang, title: "2 Inovasi: Karya Masa Depan Mahasiswa", category: "Teknik Geomatika", image: "/image/BG1.jpg", likes: 100, karya: 200 },
  { id: 5, date: tanggalSekarang, title: "2 Inovasi: Karya Masa Depan Mahasiswa", category: "Animasi", image: "/image/BG1.jpg", likes: 100, karya: 200 },
  { id: 6, date: tanggalSekarang, title: "2 Inovasi: Karya Masa Depan Mahasiswa", category: "Teknologi Rekayasa Perangkat Lunak", image: "/image/BG1.jpg", likes: 100, karya: 200 },
  { id: 7, date: tanggalSekarang, title: "12 Inovasi: Karya Masa Depan Mahasiswa", category: "Teknologi Rekayasa Perangkat Lunak", image: "/image/BG1.jpg", likes: 100, karya: 200 },
];

// Carousel
export default function PameranPage() {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false });

  const renderCategory = (categoryName: string) => {
    return ALL_PROJECTS
      .filter(p => p.category === categoryName)
      .map(project => <ProjectCard key={project.id} project={project} />);
  };

  //Select Prodi
  const [selectedProdi, setSelectedProdi] = useState<ProdiType | null>(null);

  // Select Tahun 
  const [selectedTahun, setSelectedTahun] = useState<TahunType | null>(null);

  // Select Semester 
  const [selectedSemester, setSelectedSemester] = useState<SemesterType | null>(null);

  // Main
  return (
    <div className="min-h-screen bg-secondary-color text-black font-poppins">
      {/* Main */}
      <section className="py-[30px] pt-[10px] rounded-b-[40px] bg-main-blue">
        <div className="autoMid">
          <div className="flex w-full gap-4 pt-[30px] pb-[20px] justify-between items-center">

            {/* filter list */}
            <div className='w-[35%] flex justify-between'>
{/* Filter Prodi */}
              <div>
                <SelectProdi selected={selectedProdi}
                  onChange={setSelectedProdi} />
              </div>
{/* Filter Tahun */}
              <div>
                <SelectTahun selected={selectedTahun}
                  onChange={setSelectedTahun} />
              </div>

{/* Filter Semester */}
              <div>
                <SelectSemester selected={selectedSemester}
                  onChange={setSelectedSemester} />
              </div>

            </div>

            {/* search section */}
            <div className='w-[50%] relative flex items-center justify-start text-black'>
              <input 
              type="text" 
              placeholder="Cari..." 
              className="w-full p-2 pl-[50px] bg-white rounded-full text-sm flex-1 border-2 border-transparent shadow-xl/20 focus:outline-none focus:border-main-blue" />

              <FaSearch className='absolute left-4 opacity-80 text-[22px]' />
            </div>
          </div>

          {/* main */}
          <h2 className="mb-6 text-[40px] text-white font-poppins font-semibold  border-b-3">SEGERA HADIR</h2>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 ">

              {/* Carousel */}
              {ALL_PROJECTS.slice(0, 5).map((project) => (
                <div key={project.id} className="min-w-0 text-white flex-[0_0_80%] md:flex-[0_0_30%] ">
                  <div className="p-1 rounded-2xl text-white backdrop-blur-sm">
                    <ProjectCard className='' project={project} />
                  </div>
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

        {/* Teknologi Rekayasa Perangkat Lunak  */}
        <section>
          <h2 className="text-xl font-poppins font-medium mb-4 border-b pb-2">Teknologi Rekayasa Perangkat Lunak </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {renderCategory("Teknologi Rekayasa Perangkat Lunak")}
          </div>
        </section>

      </main>
    </div>
  );
}
