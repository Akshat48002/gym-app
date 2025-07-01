"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import UserBill from "@/components/User/userbill";
import UserPaidBills from "@/components/User/userpaidbills";
import UserNotifications from "@/components/User/userNotificatons";
import BecomeMember from "@/components/User/becomeMember";
import { Home, CheckCircle, Bell } from "lucide-react";

const Membership = () => {
  const [member, setMember] = useState(null);
  const [tab, settab] = useState("bills");
  const [loading, setLoading] = useState(true);

  const fetchMember = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "members"), where("email", "==", user.email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) setMember(snapshot.docs[0].data());
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) fetchMember();
      else setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" bg-red-100 h-screen flex flex-col items-center justify-start pt-20 p-5 px-4">

        {loading ? (
          <p className="text-lg animate-pulse">Loading membership details...</p>
        ) : member ? (
          <div className="max-w-5xl w-full space-y-6">

            {/* Header */}
            <div className="text-center space-y-2">
              <p className="uppercase tracking-widest text-red-300">Welcome {member.name}</p>
              <h1 className="text-3xl md:text-4xl font-bold">Your <span className="text-red-300">Membership</span></h1>
              <p className="text-gray-500 text-sm">Plan: {member.packageName} | Monthly: ₹{member.monthlyBill}</p>
            </div>

            {/* Content Box */}
            <div className="bg-white shadow-xl rounded-2xl p-5 h-[500px] transition-all ">
              {tab === "bills" && <UserBill email={member.email} />}
              {tab === "paidbills" && <UserPaidBills email={member.email} />}
              {tab === "notification" && <UserNotifications email={member.email} />}
            </div>

            {/* Bottom Tab Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3 px-6 md:hidden rounded-t-3xl shadow-xl">
              <button onClick={() => settab("bills")} className={`flex flex-col items-center text-sm ${tab === "bills" ? "text-red-400" : "text-gray-500"}`}>
                <Home className="w-6 h-6" />
                Your Bills
              </button>
              <button onClick={() => settab("paidbills")} className={`flex flex-col items-center text-sm ${tab === "paidbills" ? "text-red-400" : "text-gray-500"}`}>
                <CheckCircle className="w-6 h-6" />
                Paid Bills
              </button>
              <button onClick={() => settab("notification")} className={`flex flex-col items-center text-sm ${tab === "notification" ? "text-red-400" : "text-gray-500"}`}>
                <Bell className="w-6 h-6" />
                Notifications
              </button>
            </div>

            {/* Desktop Tab Buttons */}
            <div className="hidden md:flex justify-center gap-5">
              <button onClick={() => settab("bills")} className={`px-6 py-2 rounded-full transition ${tab === "bills" ? "bg-red-300 text-black scale-105" : "bg-red-400 text-white hover:bg-red-500"}`}>
                Your Bills
              </button>
              <button onClick={() => settab("paidbills")} className={`px-6 py-2 rounded-full transition ${tab === "paidbills" ? "bg-red-300 text-black scale-105" : "bg-red-400 text-white hover:bg-red-500"}`}>
                Paid Bills
              </button>
              <button onClick={() => settab("notification")} className={`px-6 py-2 rounded-full transition ${tab === "notification" ? "bg-red-300 text-black scale-105" : "bg-red-400 text-white hover:bg-red-500"}`}>
                Notifications
              </button>
            </div>

          </div>
        ) : (
          <BecomeMember refresh={fetchMember} />
        )}

      </div>
    </>
  );
};

export default Membership;
