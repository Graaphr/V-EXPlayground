"use client";

import { useState } from "react";

import NavAdmin from "@/components/dashboard/NavAdmin";
import DetailPameran from "@/components/pameran/DetailPameran";
import EditPameran from "@/components/pameran/EditPameran";
import AddPameran from "@/components/pameran/AddPameran";


export default function AdminDetailPameran() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* NAV ADMIN */}
      <NavAdmin isFormOpen={isEditOpen} onAddClick={handleEditClick} />

      {/* CONDITIONAL RENDER */}
      {isEditOpen ? <AddPameran /> : <DetailPameran isLogin={true}/>}
    </div>
  );
}
