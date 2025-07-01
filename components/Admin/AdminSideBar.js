"use client";

import { useState } from "react";
import { Home, Users, DollarSign, Bell, Salad, BarChart2, LogOut, Menu, X } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  const handleLogOut = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await signOut(auth);
      router.push("/");
    }
  };

  return (
    <>
      {/* Menu Icon for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-red-500 p-2 rounded-full text-white shadow-xl"
        onClick={() => setShowSidebar(true)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl p-6 space-y-4 z-50 transition-transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close icon on mobile */}
        <div className="flex justify-between items-center md:hidden mb-4">
          <h1 className="text-2xl font-bold text-red-400">Admin</h1>
          <X className="cursor-pointer" onClick={() => setShowSidebar(false)} />
        </div>

        {/* Title on desktop */}
        <h1 className="hidden md:block text-2xl font-bold text-red-400 mb-6">Admin</h1>

        <NavItem icon={<Home size={18} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); setShowSidebar(false); }} />
        <NavItem icon={<Users size={18} />} label="Members" active={activeTab === "members"} onClick={() => { setActiveTab("members"); setShowSidebar(false); }} />
        <NavItem icon={<DollarSign size={18} />} label="Billing" active={activeTab === "billing"} onClick={() => { setActiveTab("billing"); setShowSidebar(false); }} />
        <NavItem icon={<Salad size={18} />} label="Diet Plans" active={activeTab === "diet"} onClick={() => { setActiveTab("diet"); setShowSidebar(false); }} />
        <NavItem icon={<BarChart2 size={18} />} label="Reports" active={activeTab === "reports"} onClick={() => { setActiveTab("reports"); setShowSidebar(false); }} />

        <NavItem icon={<LogOut size={18} />} label="Logout" onClick={handleLogOut} />
      </div>
    </>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-100 transition ${
      active ? "bg-red-200 text-black" : "text-gray-600"
    }`}
  >
    {icon} {label}
  </button>
);

export default AdminSidebar;
