"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { FaCloudUploadAlt } from "react-icons/fa";

import ALL_EXHIBITIONS from "@/public/data/Pameran.json";

export default function EditPameran() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const data =
    ALL_EXHIBITIONS.find(
      (item) => item.id === id
    );

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState<string | null>(
      null
    );

  const [form, setForm] =
    useState({
      prodi: "",
      title: "",
      publishDate: "",
      endDate: "",
      prepareStart: "",
      prepareEnd: "",
      description: "",
      image:
        null as File | null,
    });

  const toInputDate = (
    value?: string
  ) => {
    if (!value) return "";

    const [
      day,
      month,
      year,
    ] = value.split("/");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!data) return;

    setForm({
      prodi:
        data.stats
          ?.studyLevel || "",

      title:
        data.title || "",

      publishDate:
        toInputDate(
          data.stats
            ?.startDate
        ),

      endDate:
        toInputDate(
          data.stats
            ?.endDate
        ),

      prepareStart:
        toInputDate(
          data.stats
            ?.prepareStartDate
        ),

      prepareEnd:
        toInputDate(
          data.stats
            ?.prepareEndDate
        ),

      description:
        data.description?.[0]
          ?.content || "",

      image: null,
    });

    setPreview(
      data.bannerImage
    );
  }, [data]);

  const handleChange = (
    e: any
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (
    e: any
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(
      URL.createObjectURL(
        file
      )
    );
  };

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "id",
          id
        );

        formData.append(
          "prodi",
          form.prodi
        );

        formData.append(
          "title",
          form.title
        );

        formData.append(
          "publishDate",
          form.publishDate
        );

        formData.append(
          "endDate",
          form.endDate
        );

        formData.append(
          "prepareStart",
          form.prepareStart
        );

        formData.append(
          "prepareEnd",
          form.prepareEnd
        );

        formData.append(
          "description",
          form.description
        );

        if (form.image) {
          formData.append(
            "image",
            form.image
          );
        }

        const res =
          await fetch(
            "/api/pameran",
            {
              method: "PUT",
              body: formData,
            }
          );

        const result =
          await res.json();

        if (
          result.success
        ) {
          alert(
            "Pameran berhasil diupdate!"
          );

          router.push(
            "/admin/pameran"
          );

          router.refresh();
        } else {
          alert(
            "Gagal update."
          );
        }
      } catch (error) {
        console.log(
          error
        );

        alert(
          "Terjadi error."
        );
      } finally {
        setLoading(false);
      }
    };

  if (!data) {
    return (
      <div className="p-10">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-color select-none pb-38 md:pb-30">
      <section className="autoMid pb-20">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT */}
          <div className="w-full lg:w-[40%]">
            <p className="text-xl mt-10">
              Thumbnail
            </p>

            <label
              htmlFor="file"
              className="cursor-pointer h-[220px] md:h-[320px] w-full flex items-center justify-center bg-gray-200 border-2 border-gray-400 rounded-lg mt-2 overflow-hidden"
            >
              {preview ? (
                <img
                  src={
                    preview
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <FaCloudUploadAlt className="text-5xl mx-auto mb-3 text-gray-500" />

                  <p>
                    Klik upload
                  </p>
                </div>
              )}

              <input
                id="file"
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={
                  handleImage
                }
              />
            </label>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[60%] mt-10 flex flex-col gap-5">

            <div>
              <p className="text-lg">
                Program Studi
              </p>

              <select
                name="prodi"
                value={
                  form.prodi
                }
                onChange={
                  handleChange
                }
                className="w-full md:w-[50%] p-2 rounded-lg border mt-2"
              >
                <option>
                  Animasi
                </option>
                <option>
                  Teknik Informatika
                </option>
                <option>
                  Teknologi Rekayasa Perangkat Lunak
                </option>
                <option>
                  Rekayasa Keamanan Siber
                </option>
                <option>
                  Teknologi Permainan
                </option>
                <option>
                  Teknologi Rekayasa Multimedia
                </option>
                <option>
                  Teknik Geomatika
                </option>
              </select>
            </div>

            <div>
              <p className="text-lg">
                Judul Pameran
              </p>

              <input
                type="text"
                name="title"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
                className="w-full p-2 rounded-lg border mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  Tanggal Mulai Pameran
                </p>

                <input
                  type="date"
                  name="publishDate"
                  value={
                    form.publishDate
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full p-2 border rounded-lg mt-2"
                />
              </div>

              <div>
                <p>
                  Tanggal Berakhir Pameran
                </p>

                <input
                  type="date"
                  name="endDate"
                  value={
                    form.endDate
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full p-2 border rounded-lg mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  Mulai Persiapan
                </p>

                <input
                  type="date"
                  name="prepareStart"
                  value={
                    form.prepareStart
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full p-2 border rounded-lg mt-2"
                />
              </div>

              <div>
                <p>
                  Berakhir Persiapan
                </p>

                <input
                  type="date"
                  name="prepareEnd"
                  value={
                    form.prepareEnd
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full p-2 border rounded-lg mt-2"
                />
              </div>
            </div>

            <div>
              <p>
                Deskripsi
              </p>

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                className="w-full p-2 border rounded-lg h-[140px] mt-2"
              />
            </div>

            {/* BUTTON SAMA KAYAK ADD */}
            <div className="flex justify-end">
              <button
                onClick={
                  handleSubmit
                }
                disabled={
                  loading
                }
                className="bg-main-blue hover:scale-101 hover:bg-main-blue/40 text-white px-6 py-2 rounded-lg duration-400 ease-in-out transition-all"
              >
                {loading
                  ? "Menyimpan..."
                  : "Simpan"}
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}