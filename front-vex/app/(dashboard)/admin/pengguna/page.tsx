"use client";
import React, { useState, useMemo, useEffect } from "react";
import NavAdmin from "@/components/dashboard/NavAdmin";
import SearchBar from "@/components/dashboard/SearchBar";
import SelectStatus, { StatusType } from "@/components/dashboard/SelectStatus";

import {
  FiChevronLeft,
  FiChevronRight,
  FiXCircle,
  FiInfo,
} from "react-icons/fi";
import { FaTimes, FaUser } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { FaCircleCheck } from "react-icons/fa6";

// ================= DUMMY DATA =================

const DATA_KPS = [
  {
    id: 1,
    nama: "Yani Rahmayanti",
    role: "KPS",
    status: "active",
    email: "yani@kampus.ac.id",
    prodi: "Informatika",
    kelas: "Dosen",
  },
  {
    id: 2,
    nama: "Yani Rahmayanti",
    role: "KPS",
    status: "active",
    email: "yani@kampus.ac.id",
    prodi: "Informatika",
    kelas: "Dosen",
  },
  {
    id: 3,
    nama: "Yani Rahmayanti",
    role: "KPS",
    status: "active",
    email: "yani@kampus.ac.id",
    prodi: "Informatika",
    kelas: "Dosen",
  },
  {
    id: 4,
    nama: "Happy Yugo",
    role: "KPS",
    status: "active",
    email: "happy@kampus.ac.id",
    prodi: "TRM",
    kelas: "Dosen",
  },
  {
    id: 5,
    nama: "Happy Yugo",
    role: "KPS",
    status: "active",
    email: "happy@kampus.ac.id",
    prodi: "TRM",
    kelas: "Dosen",
  },
  {
    id: 6,
    nama: "Happy Yugo",
    role: "KPS",
    status: "active",
    email: "happy@kampus.ac.id",
    prodi: "TRM",
    kelas: "Dosen",
  },
  {
    id: 7,
    nama: "Happy Yugo",
    role: "KPS",
    status: "active",
    email: "happy@kampus.ac.id",
    prodi: "TRM",
    kelas: "Dosen",
  },
];
const DATA_MAHASISWA = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nama: `Mahasiswa ${i + 1}`,
  role: "Ketua PBL",
  status: i % 2 === 0 ? "active" : "inactive",
  email: `m${i + 1}@mail.com`,
  prodi: "IF",
  kelas: `IF-${Math.ceil((i + 1) / 2)}A`,
}));

export default function Admin() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);
  const [pageMhs, setPageMhs] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(selectedUser);

  const ITEMS_PER_PAGE = 10;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterData = (data: any[]) => {
    return data.filter((item) => {
      const matchName = item.nama
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchStatus = selectedStatus
        ? item.status === selectedStatus.value
        : true;
      return matchName && matchStatus;
    });
  };

  const filteredKps = useMemo(
    () => filterData(DATA_KPS),
    [searchTerm, selectedStatus],
  );
  const filteredMhs = useMemo(
    () => filterData(DATA_MAHASISWA),
    [searchTerm, selectedStatus],
  );

  useEffect(() => {
    setPageMhs(1);
  }, [searchTerm, selectedStatus]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMhs.length / ITEMS_PER_PAGE),
  );

  const paginatedMhs = filteredMhs.slice(
    (pageMhs - 1) * ITEMS_PER_PAGE,
    pageMhs * ITEMS_PER_PAGE,
  );

  const nextPage = () => setPageMhs((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPageMhs((p) => Math.max(p - 1, 1));

  return (
    <div className="min-h-screen bg-secondary-color font-poppins w-full  pb-[120px] select-none">
      {/* NAV */}
      <NavAdmin
        isFormOpen={isFormOpen}
        onAddClick={() => setIsFormOpen((prev) => !prev)}
      />

      {/* SEARCH */}
      <div className="bg-main-blue gap-4 rounded-b-[20px] shadow-lg">
        <div className="autoMid w-full py-[20px] flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="w-full md:w-[70%]">
            <SearchBar
              text={"Cari nama..."}
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-[20%]">
            <SelectStatus
              selected={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="autoMid">
        <div className="w-full px-2 sm:px-4 pb-[100px] mt-6">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* DETAIL */}
            <div className="w-full xl:w-[30%] xl:sticky xl:top-24 h-fit">
              {isFormOpen ? (
                <FormTambahUser onClose={() => setIsFormOpen(false)} />
              ) : (
                <div className="bg-white rounded-lg min-h-[400px] flex items-center justify-center mt-6 xl:mt-12 p-6 shadow-sm">
                  {!selectedUser ? (
                    <div className="text-center">
                      <FiInfo
                        className="mx-auto text-gray-400 mb-3"
                        size={30}
                      />
                      <p className="text-gray-400 text-sm">Pilih akun</p>
                    </div>
                  ) : (
                    <div className="text-center w-full">
                      <div className="flex justify-end">
                        <HiPencilAlt
                          size={28}
                          className="cursor-pointer text-gray-500 hover:text-black"
                          onClick={() => setIsEdit((prev) => !prev)}
                        />
                      </div>

                      <div className="p-5 flex w-32 h-32 sm:w-40 sm:h-40 mx-auto justify-center items-center rounded-full bg-main-blue">
                        <FaUser size={80} className="text-white" />
                      </div>

                      <div className="space-y-3 mt-4">
                        {["nama", "email", "prodi", "kelas"].map((field) => (
                          <input
                            key={field}
                            name={field}
                            value={selectedUser?.[field] || ""}
                            disabled={!isEdit}
                            onChange={handleChange}
                            className={`px-4 w-full p-2 rounded-lg ${isEdit ? "bg-white border" : "bg-gray-200"}`}
                          />
                        ))}

                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            name="role"
                            value={selectedUser?.role || ""}
                            disabled={!isEdit}
                            onChange={handleChange}
                            className={`w-full sm:w-[50%] px-4 p-2 rounded-lg ${isEdit ? "bg-white border" : "bg-gray-200"}`}
                          />

                          {isEdit ? (
                            <button className="w-full sm:w-[50%] bg-purple-600 text-white rounded-lg">
                              Simpan
                            </button>
                          ) : (
                            <div
                              className={`w-full sm:w-[50%] p-2 rounded-lg text-center
                                                        ${
                                                          selectedUser?.status ===
                                                          "active"
                                                            ? "bg-green-400 text-white"
                                                            : "bg-red-100 text-red-600"
                                                        }`}
                            >
                              {selectedUser?.status === "active"
                                ? "Aktif"
                                : "Tidak Aktif"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* LIST */}
            <div className="flex-1 space-y-8">
              {/* KPS */}
              <section>
                <SectionHeader title="Kepala Program Studi" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filteredKps.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isActive={selectedUser?.id === user.id}
                      onClick={() => setSelectedUser(user)}
                    />
                  ))}
                </div>
              </section>

              {/* MAHASISWA */}
              <section>
                <SectionHeader
                  title="Mahasiswa"
                  currentPage={pageMhs}
                  totalPages={totalPages}
                  onNext={nextPage}
                  onPrev={prevPage}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {paginatedMhs.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isActive={selectedUser?.id === user.id}
                      onClick={() => setSelectedUser(user)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= COMPONENT =================

function SectionHeader({
  title,
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: any) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className="pb-2 font-semibold text-[18px] sm:text-[22px] w-full border-b-2">
        {title}
      </h3>

      {currentPage && (
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <FiChevronLeft />
          </button>

          <span className="text-sm text-gray-400">
            {currentPage}/{totalPages}
          </span>

          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="bg-purple-600 text-white rounded-full disabled:bg-gray-300 px-1"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

function UserCard({ user, onClick, isActive }: any) {
  const [on, setOn] = useState(user.status);
  const isInactive = on === "inactive";

  const toggleStatus = (e: any) => {
    e.stopPropagation();
    setOn((prev) => (prev === "active" ? "inactive" : "active"));
  };

  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all duration-200
            ${isActive ? "border-main-blue shadow-md scale-[1.02]" : "bg-white hover:shadow-md"}
            ${isInactive ? "bg-gray-300/60" : ""}`}
    >
      <div className="flex gap-3 items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center
                ${isInactive ? "bg-gray-400" : "bg-main-blue"}`}
        >
          <FaUser className="text-white " />
        </div>

        <div>
          <h4
            className={`text-sm font-bold ${isInactive ? "text-gray-400" : ""}`}
          >
            {user.nama}
          </h4>
          <p className="text-xs text-gray-400">{user.role}</p>
        </div>
      </div>

      <div
        onClick={toggleStatus}
        className="w-10 h-10 flex items-center justify-center"
      >
        {on === "active" ? (
          <FaCircleCheck size={20} className="text-green-500" />
        ) : (
          <FiXCircle size={20} className="text-red-500" />
        )}
      </div>
    </div>
  );
}

function FormTambahUser({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white rounded-lg min-h-[500px] flex flex-col justify-between py-4 p-4 mt-6 xl:mt-12 shadow-xl">
      <div className="flex justify-end mb-4">
        <button onClick={onClose}>
          <FaTimes className="text-black text-[24px]" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-5 flex w-32 h-32 sm:w-40 sm:h-40 mx-auto justify-center items-center rounded-full bg-main-blue">
          <FaUser size={100} className="text-white" />
        </div>

        <input
          className="px-4 bg-gray-200 w-full p-2 rounded-lg"
          placeholder="Nama"
        />
        <input
          className="px-4 bg-gray-200 w-full p-2 rounded-lg"
          placeholder="Email"
        />
        <input
          className="px-4 bg-gray-200 w-full p-2 rounded-lg"
          placeholder="Prodi"
        />
        <input
          className="px-4 bg-gray-200 w-full p-2 rounded-lg"
          placeholder="Kelas"
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <select className="w-full sm:w-1/2 p-2 rounded-lg bg-gray-200">
            <option>KPS</option>
            <option>Ketua PBL</option>
          </select>

          <select className="w-full sm:w-1/2 p-2 rounded-lg bg-gray-200">
            <option>Aktif</option>
            <option>Tidak Aktif</option>
          </select>
        </div>
      </div>

      <button className="mt-4 w-full sm:w-[40%] self-end bg-green-600 text-white py-2 rounded-lg hover:bg-green-600/60">
        Simpan
      </button>
    </div>
  );
}
