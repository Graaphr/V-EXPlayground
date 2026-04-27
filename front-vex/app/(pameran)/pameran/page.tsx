"use client";

// icon & react
import { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

// asset
import ProjectCard from "@/components/dashboard/ProjectCard";
import SelectProdi, {
  ProdiType,
} from "@/components/dashboard/SelectProdi";
import SelectTahun, {
  TahunType,
} from "@/components/dashboard/SelectTahun";
import SelectSemester, {
  SemesterType,
} from "@/components/dashboard/SelectSemester";
import SearchBar from "@/components/dashboard/SearchBar";

// data
import { ALL_EXHIBITIONS } from "@/app/data/Pameran";

export default function PameranPage() {
  const [emblaRef] =
    useEmblaCarousel({
      align: "start",
      loop: false,
    });

  const [
    selectedProdi,
    setSelectedProdi,
  ] = useState<ProdiType | null>(
    null
  );

  const [
    selectedTahun,
    setSelectedTahun,
  ] = useState<TahunType | null>(
    null
  );

  const [
    selectedSemester,
    setSelectedSemester,
  ] = useState<SemesterType | null>(
    null
  );

  const [search, setSearch] =
    useState("");

  /* ===================== */
  /* FILTER DATA */
  /* ===================== */
  const filteredData =
    useMemo(() => {
      return ALL_EXHIBITIONS.filter(
        (item) => {
          const cocokSearch =
            item.title
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.category
              .toLowerCase()
              .includes(search.toLowerCase());

          const cocokProdi =
            !selectedProdi ||
            item.category ===
            selectedProdi.name;

          const tahunData =
            item.date.slice(-4);

          const cocokTahun =
            !selectedTahun ||
            tahunData ===
            selectedTahun.name;

          return (
            cocokSearch &&
            cocokProdi &&
            cocokTahun
          );
        }
      );
    }, [
      search,
      selectedProdi,
      selectedTahun,
    ]);

  /* ===================== */
  /* RENDER CATEGORY */
  /* ===================== */
  const renderCategory = (
    categoryName: string
  ) => {
    const dataKategori =
      filteredData.filter(
        (p) =>
          p.category ===
          categoryName
      );

    if (
      dataKategori.length === 0
    )
      return null;

    return dataKategori.map(
      (project) => (
        <Link
          href={`/pameran/${project.id}`}
          key={project.id}
          className="block transition-transform hover:scale-[1.02]"
        >
          <ProjectCard
            project={project}
          />
        </Link>
      )
    );
  };

  return (
    <div className="min-h-screen bg-secondary-color text-black font-poppins select-none">
      {/* HERO */}
      <section className="bg-main-blue rounded-b-[25px] md:rounded-b-[40px] py-6 md:py-[30px]">
        <div className="autoMid">
          {/* SEARCH + FILTER */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 pt-4 md:pt-[30px] pb-5 items-stretch lg:items-center justify-between">
            {/* search */}
            <div className="w-full lg:w-[50%]">
              <SearchBar
                text="Cari Pameran..."
                value={search}
                onChange={(
                  e: any
                ) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
              />
            </div>

            {/* filters */}
            <div className="w-full lg:w-[40%] grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-[30px]">
              <SelectProdi
                selected={
                  selectedProdi
                }
                onChange={
                  setSelectedProdi
                }
              />

              <SelectTahun
                selected={
                  selectedTahun
                }
                onChange={
                  setSelectedTahun
                }
              />

              {/* semester nanti */}
              <SelectSemester
                selected={
                  selectedSemester
                }
                onChange={
                  setSelectedSemester
                }
              />
            </div>
          </div>

          {/* TITLE */}
          <h2 className="mb-5 md:mb-6 text-2xl sm:text-3xl md:text-[40px] text-white font-semibold border-b-2 md:border-b-3 pb-2">
            SEGERA HADIR
          </h2>

          {/* CAROUSEL */}
          <div
            className="overflow-hidden"
            ref={emblaRef}
          >
            <div className="flex gap-4 md:gap-6">
              {filteredData
                .slice(0, 5)
                .map(
                  (
                    project
                  ) => (
                    <div
                      key={
                        project.id
                      }
                      className="min-w-0 text-white flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%]"
                    >
                      <Link
                        href={`/pameran/${project.id}`}
                      >
                        <div className="p-1 rounded-2xl backdrop-blur-sm cursor-pointer hover:opacity-80 transition-all">
                          <ProjectCard
                            project={
                              project
                            }
                          />
                        </div>
                      </Link>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="autoMid py-8 md:py-[30px] pb-16 md:pb-20 space-y-10 md:space-y-12">
        <CategorySection title="Teknik Informatika">
          {renderCategory(
            "Teknik Informatika"
          )}
        </CategorySection>

        <CategorySection title="Teknologi Rekayasa Multimedia">
          {renderCategory(
            "Teknologi Rekayasa Multimedia"
          )}
        </CategorySection>

        <CategorySection title="Teknik Geomatika">
          {renderCategory(
            "Teknik Geomatika"
          )}
        </CategorySection>

        <CategorySection title="Animasi">
          {renderCategory(
            "Animasi"
          )}
        </CategorySection>

        <CategorySection title="Rekayasa Keamanan Siber">
          {renderCategory(
            "Rekayasa Keamanan Siber"
          )}
        </CategorySection>

        <CategorySection title="Teknologi Permainan">
          {renderCategory(
            "Teknologi Permainan"
          )}
        </CategorySection>

        <CategorySection title="Teknologi Rekayasa Perangkat Lunak">
          {renderCategory(
            "Teknologi Rekayasa Perangkat Lunak"
          )}
        </CategorySection>
      </main>
    </div>
  );
}

/* reusable */
function CategorySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  if (!children) return null;

  return (
    <section>
      <h2 className="text-lg sm:text-xl font-medium mb-4 border-b pb-2">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {children}
      </div>
    </section>
  );
}