"use client";

import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AddPameran() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState<string | null>(
      null
    );

  const [form, setForm] =
    useState({
      prodi: "Animasi",
      title: "",
      publishDate: "",
      endDate: "",
      prepareStart: "",
      prepareEnd: "",
      description: "",
      image: null as File | null,
    });

  /* ===================== */
  /* HANDLE INPUT */
  /* ===================== */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
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

  /* ===================== */
  /* HANDLE IMAGE */
  /* ===================== */
  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
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

  /* ===================== */
  /* RESET FORM */
  /* ===================== */
  const resetForm = () => {
    setForm({
      prodi: "Animasi",
      title: "",
      publishDate: "",
      endDate: "",
      prepareStart: "",
      prepareEnd: "",
      description: "",
      image: null,
    });

    setPreview(null);
  };

  /* ===================== */
  /* SUBMIT */
  /* ===================== */
  const handleSubmit =
    async () => {
      if (
        !form.title ||
        !form.publishDate ||
        !form.endDate ||
        !form.prepareStart ||
        !form.prepareEnd ||
        !form.description
      ) {
        alert(
          "Lengkapi semua data terlebih dahulu."
        );
        return;
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

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
              method: "POST",
              body: formData,
            }
          );

        const data =
          await res.json();

        if (data.success) {
          alert(
            "Pameran berhasil ditambahkan!"
          );

          const newId =
            data.data.id;

          resetForm();

          router.push(
            `/admin/pameran/${newId}`
          );
        } else {
          alert(
            "Gagal menambahkan pameran."
          );
        }
      } catch (error) {
        console.log(error);

        alert(
          "Terjadi kesalahan."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-secondary-color select-none pb-38 md:pb-30">
      <section className="autoMid">
        <div className="flex flex-col lg:flex-row gap-6 min-h-screen">

          <div className="flex flex-col lg:flex-row gap-10 w-full">

            {/* LEFT */}
            <div className="w-full lg:w-[40%]">

              <p className="font-poppins text-xl mt-10">
                Thumbnail
              </p>

              <label
                htmlFor="file"
                className="cursor-pointer h-[250px] md:h-[320px] w-full flex flex-col items-center justify-center bg-gray-200 border-2 border-gray-400 mt-2 mb-2 rounded-lg overflow-hidden hover:bg-gray-100 transition"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-5xl text-gray-500 mb-3" />

                    <p className="text-gray-600 text-sm">
                      Klik untuk upload
                    </p>
                  </>
                )}

                <input
                  id="file"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={
                    handleImage
                  }
                />
              </label>

              <small className="text-gray-400 text-xs">
                PNG, JPG, JPEG
              </small>
            </div>

            {/* RIGHT */}
            <div className="mt-10 w-full lg:w-[60%] flex flex-col gap-5">

              {/* PRODI */}
              <div>
                <p className="text-lg font-medium">
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
                  className="w-full md:w-[55%] p-2 rounded-lg border mt-2"
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

              {/* TITLE */}
              <div>
                <p className="text-lg font-medium">
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
                  placeholder="Masukkan judul pameran"
                  className="w-full p-2 rounded-lg border mt-2"
                />
              </div>

              {/* PAMERAN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <p className="text-lg font-medium">
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
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="text-lg font-medium">
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
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>
              </div>

              {/* PREPARE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <p className="text-lg font-medium">
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
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>

                <div>
                  <p className="text-lg font-medium">
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
                    className="w-full p-2 rounded-lg border mt-2"
                  />
                </div>
              </div>

              {/* DESC */}
              <div>
                <p className="text-lg font-medium">
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
                  placeholder="Masukkan deskripsi pameran"
                  className="w-full p-2 rounded-lg border h-[130px] mt-2 resize-none"
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end pt-2">

                <button
                  onClick={
                    handleSubmit
                  }
                  disabled={
                    loading
                  }
                  className={`px-6 py-2 rounded-lg text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-main-blue hover:scale-105"
                  }`}
                >
                  {loading
                    ? "Menyimpan..."
                    : "Simpan"}
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}