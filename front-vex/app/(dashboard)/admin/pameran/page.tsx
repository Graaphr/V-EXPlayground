import NavAdmin from "@/components/dashboard/NavAdmin";
import { FaCloudUploadAlt } from "react-icons/fa";
import {Button} from "@/components/Componen"
export default function AddPameran() {
  return (
    <div className="min-h-screen bg-secondary-color">
      <section className="autoMid">
        <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
          
          <NavAdmin />

          {/* CONTENT */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">

            {/* LEFT - UPLOAD */}
            <div className="w-full lg:w-[40%]">
              <p className="font-poppins text-xl mt-4">Thumbnail</p>

              <label
                htmlFor="file"
                className="cursor-pointer h-[250px] md:h-[300px] w-full flex flex-col items-center justify-center bg-gray-200 border-2 border border-gray-400 mt-2 mb-2 rounded-lg hover:bg-gray-100 transition group"
              >
                <FaCloudUploadAlt className="text-4xl md:text-5xl text-gray-500 mb-3 group-hover:text-blue-500" />

                <p className="text-gray-600 text-sm">
                  Klik untuk upload
                </p>

                <input id="file" type="file" className="hidden" />
              </label>

              <small className="text-gray-400 text-xs leading-relaxed">
                Silakan unggah gambar PNG, JPG, atau JPEG dengan rasio 16:9
              </small>
            </div>

            {/* RIGHT - FORM */}
            <div className="mt-4 w-full lg:w-[60%] flex flex-col gap-4">

              {/* PRODI */}
              <div>
                <p className="font-poppins text-lg">Program Studi</p>
                <select className="w-full md:w-[50%] p-2 rounded-lg border mt-2">
                  <option>Animasi</option>
                </select>
              </div>

              {/* JUDUL */}
              <div>
                <p className="font-poppins text-lg">Judul</p>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border mt-2"
                  placeholder="Masukkan judul pameran"
                />
              </div>

              {/* TANGGAL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <p className="font-poppins text-lg">Publikasi</p>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="font-poppins text-lg">Berakhir</p>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="font-poppins text-lg">Persiapan Mulai</p>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="font-poppins text-lg">Persiapan Selesai</p>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

              </div>

              {/* DESKRIPSI */}
              <div>
                <p className="font-poppins text-lg">Deskripsi</p>
                <textarea
                  className="w-full p-2 rounded-lg border mt-2 h-[120px]"
                  placeholder="Masukkan deskripsi..."
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end">
                <button className="bg-main-blue hover:scale-101 hover:bg-main-blue/40 text-white px-6 py-2 rounded-lg duration-400 ease-in-out transition-all">
                  Simpan
                </button>
                
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}