"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ALL_EXHIBITIONS } from "@/app/data/Pameran";

export default function EditPameran() {
  const params = useParams();
  const id = params?.id as string;

  const data = ALL_EXHIBITIONS.find((p) => p.id === id);

  const [form, setForm] = useState({
    prodi: "",
    judul: "",
    publikasi: "",
    berakhir: "",
    mulai: "",
    selesai: "",
    deskripsi: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  // 🔥 convert tanggal
  const formatDate = (date: string) => {
    if (!date) return "";
    const [d, m, y] = date.split("/");
    return `${y}-${m}-${d}`;
  };

  // 🔥 AUTO LOAD DATA
  useEffect(() => {
    if (data) {
      setForm({
        prodi: data.stats.studyLevel || "",
        judul: data.title || "",
        publikasi: formatDate(data.stats.startDate),
        berakhir: formatDate(data.stats.endDate),
        mulai: formatDate(data.stats.startDate),
        selesai: formatDate(data.stats.endDate),
        deskripsi: data.description?.[0]?.content || "",
      });

      // 🔥 LOAD GAMBAR
      setPreview(data.posterImage);
    }
  }, [data]);

  // HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE IMAGE
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-secondary-color select-none">
      <section className="autoMid">
        <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-10 w-full">
            {/* LEFT - UPLOAD */}
            <div className="w-full lg:w-[40%]">
              <p className="font-poppins text-xl mt-10">Thumbnail</p>

              <label
                htmlFor="file"
                className="cursor-pointer h-[250px] md:h-[300px] w-full flex flex-col items-center justify-center bg-gray-200 border-2 border-gray-400 mt-2 mb-2 rounded-lg hover:bg-gray-100 transition group overflow-hidden"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-4xl md:text-5xl text-gray-500 mb-3 group-hover:text-blue-500" />
                    <p className="text-gray-600 text-sm">Klik untuk upload</p>
                  </>
                )}

                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>

              <small className="text-gray-400 text-xs leading-relaxed">
                Silakan unggah gambar PNG, JPG, atau JPEG dengan rasio 16:9
              </small>
            </div>

            {/* RIGHT - FORM */}
            <div className="mt-10 w-full lg:w-[60%] flex flex-col gap-4">
              {/* PRODI */}
              <div>
                <p className="font-poppins text-lg">Program Studi</p>
                <select
                  name="prodi"
                  value={form.prodi}
                  onChange={handleChange}
                  className="w-full md:w-[50%] p-2 rounded-lg border mt-2"
                >
                  <option value="">Pilih Prodi</option>
                  <option value="Animasi">Animasi</option>
                </select>
              </div>

              {/* JUDUL */}
              <div>
                <p className="font-poppins text-lg">Judul</p>
                <input
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
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
                    name="publikasi"
                    value={form.publikasi}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="font-poppins text-lg">Berakhir</p>
                  <input
                    type="date"
                    name="berakhir"
                    value={form.berakhir}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="font-poppins text-lg">Persiapan Mulai</p>
                  <input
                    type="date"
                    name="mulai"
                    value={form.mulai}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="font-poppins text-lg">Persiapan Selesai</p>
                  <input
                    type="date"
                    name="selesai"
                    value={form.selesai}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>
              </div>

              {/* DESKRIPSI */}
              <div>
                <p className="font-poppins text-lg">Deskripsi</p>
                <textarea
                  name="deskripsi"
                  value={form.deskripsi}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border mt-2 h-[120px]"
                  placeholder="Masukkan deskripsi..."
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end">
                <button className="bg-main-blue hover:scale-105 hover:bg-main-blue/80 text-white px-6 py-2 rounded-lg duration-300 transition-all">
                  {id ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
