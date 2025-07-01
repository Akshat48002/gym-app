import { db } from "@/services/firebase";
import { collection, doc, getDocs, query, updateDoc, where,addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { CheckCircle, Wallet, Calendar, AlertCircle, ReceiptText } from "lucide-react";

const UserBill = ({ email }) => {
  const [Bills, setBills] = useState([]);
  const [memberId, setMemberId] = useState("");

  const fetchBill = async () => {
    try {
      const memberQuery = query(collection(db, "members"), where("email", "==", email));
      const memberSnap = await getDocs(memberQuery);

      if (!memberSnap.empty) {
        const id = memberSnap.docs[0].id;
        setMemberId(id);

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
      console.error("Error fetching bills:", error.message);
    }
  };

  const markAsPaid = async (bill) => {
    try {
      const billRef = doc(db, "members", memberId, "bills", bill.id);
      await updateDoc(billRef, { status: "paid" });
      console.log("Bill marked as paid:", bill.id);
      await addDoc(collection(db, "notifications"), {
        title: "Payment Received",
        message: `${email} has paid ₹${bill.amount} for their gym bill.`,
        timestamp: new Date(),
        type: "payment",
        read: false,
      });

      fetchBill();
    } catch (error) {
      console.error("Error marking bill as paid:", error.message);
    }
  };

  useEffect(() => {
    if (email) fetchBill();
  }, [email]);

  return (
    <div className="space-y-5 max-h-[500px] overflow-y-auto px-1">
      {Bills.filter((bill) => bill.status === "unpaid").length > 0 ? (
        Bills.filter((bill) => bill.status === "unpaid").map((bill) => (
          <div
            key={bill.id}
            className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ReceiptText className="text-red-400" size={20} />
                <p className="text-lg font-semibold text-red-400">Gym Bill</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={16} />
                {new Date(bill.timestamp?.seconds * 1000).toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-2 text-gray-600 text-sm">
              <p className="flex items-center gap-2">
                <Wallet className="text-green-500" size={16} />
                <span className="font-medium">Amount:</span>
                <span className="text-black font-bold">₹{bill.amount}</span>
              </p>
              <p className="flex items-center gap-2">
                <AlertCircle className="text-yellow-500" size={16} />
                <span className="font-medium">Message:</span> {bill.message}
              </p>
              <p className="flex items-center gap-2">
                <AlertCircle className="text-yellow-500" size={16} />
                <span className="font-medium">Bill Status:</span>{" "}
                <span className="text-yellow-500 font-medium">Unpaid</span>
              </p>
              <p className="text-gray-400 text-xs">
                Transaction ID: {bill.id.slice(0, 8)}...
              </p>
            </div>

            <button
              onClick={() => markAsPaid(bill)}
              className="w-full flex justify-center items-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition active:scale-95"
            >
              <CheckCircle size={18} /> Pay Now
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-10">No unpaid bills found.</p>
      )}
    </div>
  );
};

export default UserBill;
