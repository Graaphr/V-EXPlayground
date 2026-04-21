import "@/app/globals.css";
import Image from 'next/image';
import { FaHeart, FaEye, FaCalendar, FaLock, FaUnlock } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

// Interface Data Yang Wajib Masukkan 
export interface ProjectCard {
  id: number;
  image: string;
  title: string;
  category: string;
  likes: number;
  karya: number;
  date: string;
}

// Menggabung class
interface ProjectData {
  project: ProjectCard;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectData) {
  return (
    <div className={`group relative overflow-hidden cursor-pointer ${className}`}>
      
      {/* Wrapper Gambar */}
      <div className="relative aspect-video w-full overflow-hidden rounded-sm shadow-[0px_1px_3px_rgba(0,0,0,1)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="text-white absolute inset-0 bg-gradient-to-t from-main-blue/90 via-white/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity ease-in-out duration-300 flex flex-col justify-end pb-[10px] p-[20px]">
          <div className="gap-1 flex items-center justify-between">
            
            {/* Tanggal */}
            <div className="flex items-center gap-2">
              <FaCalendar />
              <p className="text-sm">{project.date}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Gembok Merah  */}
              <span className="flex items-center justify-center bg-red-500 w-7 h-7 rounded-full shadow-md">
                <FaLock className="text-white text-xs" />
              </span>
              
              {/* Gembok Hijau */}
              <span className="flex items-center justify-center bg-green-500 w-7 h-7 rounded-full shadow-md">
                <FaUnlock className="text-white text-xs" />
              </span> 
             
            </div>

          </div>
        </div>
      </div>

      {/* Detail Proyek */}
      <div className="mt-3">
        <h3 className="text-sm font-base font-poppins line-clamp-2">
          {project.title}
        </h3>
        {/* likes dan View */}
        <div className='mt-2 flex items-center gap-4 text-xs'>
          <span className="flex items-center gap-1">
            <FaHeart /> {project.likes} likes
          </span>
          <span className="flex items-center gap-1">
            <BsStars /> {project.karya} karya
          </span>
        </div>
      </div>
      
    </div>
  );
}