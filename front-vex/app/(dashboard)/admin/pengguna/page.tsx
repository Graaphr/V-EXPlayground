"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import NavAdmin from "@/components/dashboard/NavAdmin";
import SearchBar from "@/components/dashboard/SearchBar";
import SelectStatus, {
  StatusType,
} from "@/components/dashboard/SelectStatus";

import {
  FiChevronLeft,
  FiChevronRight,
  FiXCircle,
  FiInfo,
} from "react-icons/fi";

import {
  FaTimes,
  FaUser,
} from "react-icons/fa";

import { HiPencilAlt } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";

/* ===================== */
/* TYPE */
/* ===================== */

type UserType = {
  id: number;
  nama: string;
  role: string;
  status: string;
  email: string;
  prodi: string;
  kelas: string;
};

/* ===================== */
/* PAGE */
/* ===================== */

export default function Admin() {
  const [users, setUsers] =
    useState<UserType[]>([]);

  const [selectedUser, setSelectedUser] =
    useState<UserType | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState<StatusType | null>(
    null
  );

  const [pageMhs, setPageMhs] =
    useState(1);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [isEdit, setIsEdit] =
    useState(false);

  const [
    formData,
    setFormData,
  ] = useState<UserType | null>(
    null
  );

  const ITEMS_PER_PAGE = 12;

  /* ===================== */
  /* LOAD DATA */
  /* ===================== */

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/pengguna");

      if (!res.ok) {
        throw new Error("Gagal fetch");
      }

      const data = await res.json();

      console.log("DATA:", data);

      setUsers(data);
    } catch (error) {
      console.log("ERROR:", error);
      setUsers([]);
    }
  };

  /* sync selected */
  useEffect(() => {
    setFormData(selectedUser);
  }, [selectedUser]);

  /* ===================== */
  /* INPUT */
  /* ===================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  /* ===================== */
  /* FILTER */
  /* ===================== */

  const filterData = (
    data: UserType[]
  ) => {
    return data.filter((item) => {
      const matchName =
        item.nama
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchStatus =
        selectedStatus
          ? item.status ===
          selectedStatus.value
          : true;

      return (
        matchName &&
        matchStatus
      );
    });
  };

  const filteredKps =
    useMemo(() => {
      return filterData(
        users.filter(
          (u) => u.role === "KPS"
        )
      );
    }, [
      users,
      searchTerm,
      selectedStatus,
    ]);

  const filteredMhs =
    useMemo(() => {
      return filterData(
        users.filter(
          (u) =>
            u.role !== "KPS"
        )
      );
    }, [
      users,
      searchTerm,
      selectedStatus,
    ]);

  /* ===================== */
  /* PAGINATION */
  /* ===================== */

  useEffect(() => {
    setPageMhs(1);
  }, [
    searchTerm,
    selectedStatus,
  ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredMhs.length /
        ITEMS_PER_PAGE
      )
    );

  const paginatedMhs =
    filteredMhs.slice(
      (pageMhs - 1) *
      ITEMS_PER_PAGE,
      pageMhs *
      ITEMS_PER_PAGE
    );

  const nextPage = () =>
    setPageMhs((p) =>
      Math.min(
        p + 1,
        totalPages
      )
    );

  const prevPage = () =>
    setPageMhs((p) =>
      Math.max(p - 1, 1)
    );

  /* ===================== */
  /* CRUD */
  /* ===================== */

  const addUser = async (
    newUser: UserType
  ) => {
    await fetch(
      "/api/pengguna",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          newUser
        ),
      }
    );

    loadUsers();
  };

  const saveEdit = async () => {
    if (!formData) return;

    await fetch("/api/pengguna", {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(formData),
    });

    await loadUsers();

    setSelectedUser(formData);
    setIsEdit(false);
  };

  /* TAMBAH DI SINI */
  const toggleStatus = async (
    user: UserType
  ) => {
    const newStatus =
      user.status === "active"
        ? "inactive"
        : "active";

    await fetch("/api/pengguna", {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        ...user,
        status: newStatus,
      }),
    });

    await loadUsers();

    if (
      selectedUser?.id === user.id
    ) {
      setSelectedUser({
        ...user,
        status: newStatus,
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary-color font-poppins pb-[120px]">
      <NavAdmin
        isFormOpen={
          isFormOpen
        }
        onAddClick={() =>
          setIsFormOpen(
            (prev) => !prev
          )
        }
      />

      {/* TOP */}
      <div className="bg-main-blue rounded-b-[20px] shadow-lg">
        <div className="autoMid py-[20px] flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="w-full md:w-[70%]">
            <SearchBar
              text="Cari nama..."
              value={
                searchTerm
              }
              onChange={(
                e: any
              ) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />
          </div>

          <div className="w-full md:w-[20%]">
            <SelectStatus
              selected={
                selectedStatus
              }
              onChange={
                setSelectedStatus
              }
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="autoMid mt-6 px-2 sm:px-4">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* LEFT */}
          <div className="w-full xl:w-[30%] xl:sticky xl:top-24 h-fit">
            {isFormOpen ? (
              <FormTambahUser
                onClose={() =>
                  setIsFormOpen(
                    false
                  )
                }
                onSave={
                  addUser
                }
              />
            ) : (
              <div className="bg-white rounded-lg min-h-[420px] p-6 shadow-sm">
                {!selectedUser ? (
                  <div className="h-full min-h-[350px] flex flex-col justify-center items-center text-gray-400">
                    <FiInfo size={30} />
                    <p className="mt-3 text-sm">
                      Pilih akun
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* TOP ACTION */}
                    <div className="flex justify-end">
                      <HiPencilAlt
                        size={26}
                        className="cursor-pointer"
                        onClick={() =>
                          setIsEdit((prev) => !prev)
                        }
                      />
                    </div>

                    {/* AVATAR */}
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-main-blue flex justify-center items-center">
                      <FaUser className="text-white text-6xl" />
                    </div>

                    {/* FORM DETAIL */}
                    <div className="space-y-4 mt-6">

                      {/* NAMA */}
                      <div>
                        <p className="text-sm font-semibold mb-1 text-gray-600">
                          Nama
                        </p>

                        <input
                          name="nama"
                          value={formData?.nama || ""}
                          onChange={handleChange}
                          disabled={!isEdit}
                          className={`w-full p-2 px-4 rounded-lg ${isEdit
                            ? "border bg-white"
                            : "bg-gray-200"
                            }`}
                        />
                      </div>

                      {/* EMAIL */}
                      <div>
                        <p className="text-sm font-semibold mb-1 text-gray-600">
                          Email
                        </p>

                        <input
                          name="email"
                          value={formData?.email || ""}
                          onChange={handleChange}
                          disabled={!isEdit}
                          className={`w-full p-2 px-4 rounded-lg ${isEdit
                            ? "border bg-white"
                            : "bg-gray-200"
                            }`}
                        />
                      </div>

                      {/* PRODI */}
                      <div>
                        <p className="text-sm font-semibold mb-1 text-gray-600">
                          Program Studi
                        </p>

                        <input
                          name="prodi"
                          value={formData?.prodi || ""}
                          onChange={handleChange}
                          disabled={!isEdit}
                          className={`w-full p-2 px-4 rounded-lg ${isEdit
                            ? "border bg-white"
                            : "bg-gray-200"
                            }`}
                        />
                      </div>

                      {/* KELAS -> HANYA JIKA BUKAN KPS */}
                      {selectedUser.role !== "KPS" && (
                        <div>
                          <p className="text-sm font-semibold mb-1 text-gray-600">
                            Kelas
                          </p>

                          <input
                            name="kelas"
                            value={formData?.kelas || ""}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className={`w-full p-2 px-4 rounded-lg ${isEdit
                              ? "border bg-white"
                              : "bg-gray-200"
                              }`}
                          />
                        </div>
                      )}

                      {/* ROLE + STATUS */}
                      <div className="flex gap-2 flex-col sm:flex-row">

                        <div className="w-full">
                          <p className="text-sm font-semibold mb-1 text-gray-600">
                            Role
                          </p>

                          <input
                            name="role"
                            value={formData?.role || ""}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className={`w-full p-2 px-4 rounded-lg ${isEdit
                              ? "border bg-white"
                              : "bg-gray-200"
                              }`}
                          />
                        </div>

                        <div className="w-full">
                          <p className="text-sm font-semibold mb-1 text-gray-600">
                            Status
                          </p>

                          {isEdit ? (
                            <button
                              onClick={saveEdit}
                              className="w-full h-[42px] bg-purple-600 text-white rounded-lg"
                            >
                              Simpan
                            </button>
                          ) : (
                            <div
                              className={`w-full h-[42px] rounded-lg flex items-center justify-center ${selectedUser.status === "active"
                                ? "bg-green-500 text-white"
                                : "bg-red-100 text-red-600"
                                }`}
                            >
                              {selectedUser.status === "active"
                                ? "Aktif"
                                : "Tidak Aktif"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex-1 space-y-8">
            <section>
              <SectionHeader title="Kepala Program Studi" />

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredKps.map(
                  (
                    user
                  ) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isActive={selectedUser?.id === user.id}
                      onClick={() => setSelectedUser(user)}
                      onToggleStatus={toggleStatus}
                    />
                  )
                )}
              </div>
            </section>

            <section>
              <SectionHeader
                title="Mahasiswa"
                currentPage={
                  pageMhs
                }
                totalPages={
                  totalPages
                }
                onNext={
                  nextPage
                }
                onPrev={
                  prevPage
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {paginatedMhs.map(
                  (
                    user
                  ) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isActive={selectedUser?.id === user.id}
                      onClick={() => setSelectedUser(user)}
                      onToggleStatus={toggleStatus}
                    />
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* HEADER */
/* ===================== */

function SectionHeader({
  title,
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: any) {
  const showPagination =
    totalPages > 1;

  return (
    <div className="flex justify-between items-center mb-3 gap-3">
      <h3 className="font-semibold text-[18px] sm:text-[22px] border-b-2 w-full pb-2">
        {title}
      </h3>

      {showPagination && (
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPrev}
            disabled={
              currentPage === 1
            }
          >
            <FiChevronLeft />
          </button>

          <span>
            {currentPage}/
            {totalPages}
          </span>

          <button
            onClick={onNext}
            disabled={
              currentPage ===
              totalPages
            }
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

/* ===================== */
/* CARD */
/* ===================== */

function UserCard({
  user,
  onClick,
  isActive,
  onToggleStatus,
}: any) {
  const inactive =
    user.status === "inactive";

  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${isActive
        ? "border-main-blue shadow-md scale-[1.02]"
        : "bg-white hover:shadow-md"
        } ${inactive
          ? "bg-gray-300/60"
          : ""
        }`}
    >
      {/* kiri */}
      <div className="flex gap-3 items-center min-w-0">
        <div
          className={`w-10 h-10 rounded-full flex justify-center items-center shrink-0 ${inactive
            ? "bg-gray-400"
            : "bg-main-blue"
            }`}
        >
          <FaUser className="text-white" />
        </div>

        <div className="min-w-0">
          {/* nama 1 baris + ... */}
          <h4
            className={`text-sm font-bold truncate whitespace-nowrap overflow-hidden ${inactive
              ? "text-gray-400"
              : ""
              }`}
          >
            {user.nama}
          </h4>

          <p className="text-xs text-gray-400 truncate">
            {user.role}
          </p>
        </div>
      </div>

      {/* kanan */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleStatus(user);
        }}
        className="shrink-0 ml-2"
      >
        {inactive ? (
          <FiXCircle className="text-red-500 text-xl hover:scale-110 transition" />
        ) : (
          <FaCircleCheck className="text-green-500 text-xl hover:scale-110 transition" />
        )}
      </button>
    </div>
  );
}

/* ===================== */
/* FORM */
/* ===================== */

function FormTambahUser({
  onClose,
  onSave,
}: any) {
  const [step, setStep] =
    useState<"pilih" | "form">(
      "pilih"
    );

  const [form, setForm] =
    useState({
      nama: "",
      email: "",
      prodi: "",
      kelas: "",
      role: "",
      status: "active",
    });

  const pilihRole = (
    role: string
  ) => {
    setForm((prev) => ({
      ...prev,
      role,
    }));

    setStep("form");
  };

  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const submit = () => {
    if (
      !form.nama ||
      !form.email ||
      !form.prodi
    )
      return;

    onSave(form);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg min-h-[560px] p-5 shadow-xl">
      {/* close */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* logo profile */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-main-blue mx-auto flex justify-center items-center mt-2">
        <FaUser className="text-white text-6xl" />
      </div>

      {/* STEP 1 */}
      {step === "pilih" && (
        <div className="mt-8 space-y-4">
          <p className="text-center font-semibold text-lg">
            Pilih Jenis Akun
          </p>

          <button
            onClick={() =>
              pilihRole("KPS")
            }
            className="w-full bg-main-blue text-white py-3 rounded-lg hover:opacity-90"
          >
            Kepala Program
            Studi
          </button>

          <button
            onClick={() =>
              pilihRole(
                "Ketua PBL"
              )
            }
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:opacity-90"
          >
            Ketua PBL
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === "form" && (
        <div className="space-y-4 mt-6">
          <div className="text-center font-semibold text-lg">
            {form.role}
          </div>

          {/* Nama */}
          <div>
            <p className="text-sm font-semibold mb-1 text-gray-600">
              Nama
            </p>

            <input
              name="nama"
              value={form.nama}
              onChange={change}
              className="w-full bg-gray-200 p-2 px-4 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <p className="text-sm font-semibold mb-1 text-gray-600">
              Email
            </p>

            <input
              name="email"
              value={form.email}
              onChange={change}
              className="w-full bg-gray-200 p-2 px-4 rounded-lg"
            />
          </div>

          {/* Program Studi */}
          <div>
            <p className="text-sm font-semibold mb-1 text-gray-600">
              Program Studi
            </p>

            <input
              name="prodi"
              value={form.prodi}
              onChange={change}
              className="w-full bg-gray-200 p-2 px-4 rounded-lg"
            />
          </div>

          {/* Kelas hanya Ketua PBL */}
          {form.role === "Ketua PBL" && (
            <div>
              <p className="text-sm font-semibold mb-1 text-gray-600">
                Kelas
              </p>

              <input
                name="kelas"
                value={form.kelas}
                onChange={change}
                className="w-full bg-gray-200 p-2 px-4 rounded-lg"
              />
            </div>
          )}

          {/* Status */}
          <div>
            <p className="text-sm font-semibold mb-1 text-gray-600">
              Status
            </p>

            <select
              name="status"
              value={form.status}
              onChange={change}
              className="w-full bg-gray-200 p-2 px-4 rounded-lg"
            >
              <option value="active">
                Aktif
              </option>

              <option value="inactive">
                Tidak Aktif
              </option>
            </select>
          </div>

          {/* Button */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() =>
                setStep("pilih")
              }
              className="w-1/2 bg-gray-300 py-2 rounded-lg"
            >
              Kembali
            </button>

            <button
              onClick={submit}
              className="w-1/2 bg-green-600 text-white py-2 rounded-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}