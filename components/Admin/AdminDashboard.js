"use client";

import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Users, Bell, BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";
import plans from "@/Data/plans.json";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showPlansMobile, setShowPlansMobile] = useState(false);

  useEffect(() => {
    fetchMembers();
    fetchNotifications();
  }, []);

  const fetchMembers = async () => {
    const snap = await getDocs(collection(db, "members"));
    const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMembers(list);
  };

  const fetchNotifications = async () => {
    const snap = await getDocs(collection(db, "notifications"));
    const list = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNotifications(list.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
  };

  const totalMembers = members.length;

  const getPlanCount = (planName) =>
    members.filter(
      (m) => m.packageName?.toLowerCase() === planName.toLowerCase()
    ).length;

  return (
    <div className="w-full p-4 md:p-8 space-y-8">
      <h2 className="text-2xl text-center md:text-4xl font-bold text-red-400">Admin Dashboard</h2>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Members Card */}
        <div
          className="bg-white p-4 rounded-2xl shadow flex items-center justify-between gap-4 hover:scale-105 transition transform cursor-pointer"
          onClick={() => setShowPlansMobile(!showPlansMobile)}
        >
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full shadow">
              <Users className="text-red-400" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Members</p>
              <p className="text-2xl font-bold">{totalMembers}</p>
            </div>
          </div>

          {/* Toggle Icon on Mobile */}
          <div className="block md:hidden">
            {showPlansMobile ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>

        {/* Plans on Desktop */}
        <div className="hidden md:flex flex-wrap gap-4 col-span-full">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              color={plan.color}
              count={getPlanCount(plan.name)}
            />
          ))}
        </div>
      </div>

      {/* Plans inside Total Members Card (Mobile) */}
      {showPlansMobile && (
        <div className="space-y-3 mt-2 md:hidden">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white p-3 rounded-xl shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                <p className="font-medium">{plan.name}</p>
              </div>
              <p className="font-bold">{getPlanCount(plan.name)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Notifications */}
      <div className="bg-white p-4 rounded-2xl shadow space-y-4">
        <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
          <Bell className="text-red-400" /> Previous Notifications
        </h3>

        {notifications.length ? (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-gray-50 p-3 rounded-xl shadow flex justify-between items-center"
              >
                <p className="text-gray-700">{n.message}</p>
                <p className="text-xs text-gray-400">
                  {n.timestamp?.seconds
                    ? new Date(n.timestamp.seconds * 1000).toLocaleString()
                    : ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

const PlanCard = ({ name, color, count }) => (
  <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4 hover:scale-105 transition transform min-w-[200px]">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    <div>
      <p className="text-gray-600 text-sm">{name}</p>
      <p className="text-xl font-bold">{count} Members</p>
    </div>
  </div>
);

export default AdminDashboard;
