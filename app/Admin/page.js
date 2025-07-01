"use client";
import { useState } from "react";
import AdminSidebar from "@/components/Admin/AdminSideBar";
import MembersPage from "@/components/Admin/MembersPage";
import BillingSectionPage from "@/components/Admin/BillingSectionPage";
import DietPlansPage from "@/components/Admin/DietPlansPage";
import ReportsPage from "@/components/Admin/ReportsPage";
import AdminDashboard from "@/components/Admin/AdminDashboard";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content area with margin only for desktop */}
      <div className="w-full md:ml-64 h-screen bg-[#FFDDDD] overflow-auto">
        {activeTab === "dashboard" && <AdminDashboard />}
        {activeTab === "members" && <MembersPage />}
        {activeTab === "billing" && <BillingSectionPage />}
        {activeTab === "diet" && <DietPlansPage />}
        {activeTab === "reports" && <ReportsPage />}
      </div>
    </div>
  );
};

export default Admin;
