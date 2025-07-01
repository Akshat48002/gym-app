import { db } from "@/services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BadgeCheck, CalendarDays, MessageCircle, CreditCard, ReceiptText } from "lucide-react";

const UserPaidBills = ({ email }) => {
  const [Bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const memberQuery = query(collection(db, "members"), where("email", "==", email));
      const memberSnap = await getDocs(memberQuery);

      if (!memberSnap.empty) {
        const id = memberSnap.docs[0].id;
        const billsRef = collection(db, "members", id, "bills");
        const billsSnap = await getDocs(billsRef);

        const billsArray = billsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBills(billsArray);
      } else {
        console.log("No member found with this email");
      }
    } catch (error) {
      console.error("Error fetching paid bills:", error.message);
    }
  };

  const getPlanName = (amount) => {
    switch (amount) {
      case "9000":
        return "Basic Fitness Plan";
      case "12000":
        return "Standard Gym Plan";
      case "20000":
        return "Premium Body Transformation";
      case "25000":
        return "VIP Personal Training";
      default:
        return "Custom Plan";
    }
  };

  useEffect(() => {
    if (email) fetchBills();
  }, [email]);

  return (
    <div className="space-y-5 h-[450px] overflow-y-auto p-5 custom-scrollbar">
      {Bills.filter((bill) => bill.status === "paid").length > 0 ? (
        Bills.filter((bill) => bill.status === "paid").map((bill) => {
          const dateObj = bill.timestamp?.seconds
            ? new Date(bill.timestamp.seconds * 1000)
            : null;

          const formattedDate = dateObj
            ? dateObj.toLocaleDateString()
            : "N/A";

          const formattedTime = dateObj
            ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "N/A";

          const billMonth = dateObj
            ? dateObj.toLocaleString("default", { month: "long", year: "numeric" })
            : "N/A";

          return (
            <div
              key={bill.id}
              className="bg-green-50 rounded-2xl shadow-md p-6 space-y-4 border border-green-200 hover:shadow-xl hover:scale-[1.02] transition duration-300"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-green-500 flex items-center gap-2">
                  <ReceiptText size={18} /> Payment Receipt
                </p>
                <p className="text-sm text-gray-500">{formattedDate} • {formattedTime}</p>
              </div>

              <div className="space-y-3 text-gray-600 text-sm">
                <p className="flex items-center gap-2">
                  <CreditCard size={16} className="text-green-500" />
                  <span className="font-medium">Amount Paid:</span>
                  <span className="text-black font-bold">₹{bill.amount}</span>
                </p>

                <p className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-green-500" />
                  <span className="font-medium">Billing Month:</span>
                  <span>{billMonth}</span>
                </p>

                <p className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-green-500" />
                  <span className="font-medium">Admin Message:</span>
                  <span>{bill.message || "No message provided"}</span>
                </p>

                <p className="flex items-center gap-2">
                  <span className="font-medium">Package:</span>
                  <span className="text-black">{getPlanName(bill.amount)}</span>
                </p>

                <p className="flex items-center gap-2">
                  <span className="font-medium">Transaction ID:</span>
                  <span className="text-xs text-gray-400">{bill.id.slice(0, 8)}...</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <BadgeCheck size={18} /> Paid Successfully
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center py-10">No paid bills found.</p>
      )}
    </div>
  );
};

export default UserPaidBills;
