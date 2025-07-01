"use client";

import { useState, useEffect } from "react";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  PlusCircle,
  Bell,
  BadgeCheck,
  Clock,
  X,
  Search,
  MessageSquare,
} from "lucide-react";
import plans from "@/Data/plans.json";
import Image from "next/image";

const BillingSectionPage = () => {
  const [bills, setBills] = useState([]);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateBill, setShowCreateBill] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [calculatedBill, setCalculatedBill] = useState("");
  const [messageBox, setMessageBox] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const snap = await getDocs(collection(db, "members"));
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMembers(list);
    };
    fetchMembers();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = members.filter(
      (m) =>
        m.name?.toLowerCase().includes(term.toLowerCase()) ||
        m.email?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const selectMember = (member) => {
    setSelectedMember(member);
    fetchBills(member.id);
    setSearchTerm("");
    setFilteredMembers([]);
    setShowCreateBill(false);
    setSelectedPackage("");
    setSelectedDuration("");
    setCalculatedBill("");
  };

  const fetchBills = async (memberId) => {
    const snap = await getDocs(collection(db, "members", memberId, "bills"));
    const billsArray = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBills(
      billsArray.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
    );
  };

  const createBill = async () => {
    if (
      !selectedMember ||
      !selectedPackage ||
      !selectedDuration ||
      !calculatedBill
    )
      return alert("Please select package and duration");

    await addDoc(collection(db, "members", selectedMember.id, "bills"), {
      amount: calculatedBill,
      packageName: selectedPackage,
      duration: selectedDuration,
      status: "unpaid",
      timestamp: new Date(),
    });

    await addDoc(
      collection(db, "members", selectedMember.id, "notifications"),
      {
        message: `Your ${selectedDuration} bill of ₹${calculatedBill} for ${selectedPackage} has been generated.`,
        timestamp: new Date(),
      }
    );

    setShowCreateBill(false);
    setSelectedPackage("");
    setSelectedDuration("");
    setCalculatedBill("");
    fetchBills(selectedMember.id);
    alert("Bill generated & notification sent");
  };

  const markAsPaid = async (billId) => {
    await updateDoc(doc(db, "members", selectedMember.id, "bills", billId), {
      status: "paid",
    });
    fetchBills(selectedMember.id);
  };

  const sendCustomMessage = async () => {
    if (!customMessage) return alert("Enter message");
    await addDoc(
      collection(db, "members", selectedMember.id, "notifications"),
      {
        message: customMessage,
        timestamp: new Date(),
      }
    );
    setMessageBox(false);
    setCustomMessage("");
    alert("Message sent");
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 p-4 md:p-10 w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-[400px] bg-white/40 rounded-2xl p-4 md:p-6 shadow-2xl h-[40%] md:h-[90%] overflow-y-auto space-y-6">
        <h2 className="text-2xl text-center md:text-3xl font-bold text-red-400">
          Gym Billing
        </h2>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-full p-3 rounded-xl bg-white/30 border shadow"
          />
          <Search className="absolute right-4 top-3 text-gray-500" />

          {filteredMembers.length > 0 && (
            <div className="absolute bg-white/90 mt-2 w-full rounded-xl shadow max-h-60 overflow-y-auto z-50">
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  onClick={() => selectMember(m)}
                  className="p-3 hover:bg-red-100 cursor-pointer border-b"
                >
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white/40 rounded-2xl p-4 md:p-6 h-full md:h-[90%] overflow-y-auto">
        {selectedMember ? (
          <div className="space-y-6">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedMember.image || "/img1.jpg"}
                    alt="profile"
                    width={64}
                    height={64}
                    className="rounded-full object-cover border shadow"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">
                      {selectedMember.name}
                    </h3>
                    <p className="text-gray-500">{selectedMember.email}</p>
                  </div>
                </div>
                <MessageSquare
                  className="text-blue-500 cursor-pointer hover:scale-110"
                  onClick={() => setMessageBox(true)}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600">
                <p>
                  <b>Age:</b> {selectedMember.age || "-"}
                </p>
                <p>
                  <b>Weight:</b> {selectedMember.weight || "-"}
                </p>
                <p>
                  <b>Height:</b> {selectedMember.height || "-"}
                </p>
                <p>
                  <b>Joined:</b>{" "}
                  {selectedMember.joinedOn?.seconds
                    ? new Date(
                        selectedMember.joinedOn.seconds * 1000
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
                <p>
                  <b>Monthly Bill:</b> ₹{selectedMember.monthlyBill || "-"}
                </p>
                <p>
                  <b>Package:</b> {selectedMember.packageName || "-"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-red-400">
                Previous Bills
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {bills.length ? (
                  bills.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          ₹{b.amount} - {b.packageName} ({b.duration})
                        </p>
                        <p className="text-sm text-gray-500">
                          {b.timestamp?.seconds
                            ? new Date(
                                b.timestamp.seconds * 1000
                              ).toLocaleString()
                            : ""}
                        </p>
                      </div>
                      {b.status === "paid" ? (
                        <BadgeCheck className="text-green-500" />
                      ) : (
                        <button onClick={() => markAsPaid(b.id)}>
                          <Clock className="text-yellow-500" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No bills found.</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowCreateBill(true)}
              className="fixed bottom-6 right-6 bg-red-500 p-4 rounded-full shadow-xl hover:bg-red-600"
            >
              <PlusCircle className="text-white" />
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select a member to view details.</p>
        )}

        {showCreateBill && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white/90 w-full max-w-2xl md:max-w-3xl rounded-2xl p-4 md:p-8 space-y-6 shadow-xl max-h-[90vh] overflow-y-auto relative">
              <X
                className="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-red-400"
                onClick={() => setShowCreateBill(false)}
              />

              <h3 className="text-xl md:text-2xl font-bold text-red-400 text-center">
                Generate Bill
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="border p-4 rounded-xl shadow bg-white space-y-3"
                  >
                    <p className="font-bold text-lg">{pkg.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(pkg.duration).map(
                        ([durationLabel, price]) => (
                          <button
                            key={durationLabel}
                            onClick={() => {
                              setSelectedPackage(pkg.name);
                              setSelectedDuration(durationLabel);
                              setCalculatedBill(price);
                            }}
                            className={`px-3 py-1 rounded-xl border shadow transition ${
                              selectedPackage === pkg.name &&
                              selectedDuration === durationLabel
                                ? "bg-red-400 text-white"
                                : "bg-gray-100 hover:bg-red-100"
                            }`}
                          >
                            {durationLabel} - ₹{price}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={createBill}
                className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white font-bold shadow-lg"
              >
                Confirm Bill & Notify
              </button>
            </div>
          </div>
        )}

        {messageBox && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white/90 p-4 md:p-6 rounded-xl space-y-4 w-[95%] max-w-md shadow relative">
              <X
                className="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-red-400"
                onClick={() => setMessageBox(false)}
              />
              <h3 className="text-lg md:text-xl font-bold text-red-400">
                Send Message
              </h3>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 rounded-xl bg-white text-gray-700 border shadow placeholder:text-red-300"
              />
              <button
                onClick={sendCustomMessage}
                className="w-full bg-red-400 hover:bg-red-600 py-2 rounded-xl text-white font-bold shadow"
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingSectionPage;
