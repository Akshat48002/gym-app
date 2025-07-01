"use client";
import { useState } from "react";
import { db, auth } from "@/services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { X } from "lucide-react";
import plans from "@/Data/plans.json"; 


const BecomeMember = ({ refresh }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowForm(true);
  };

  const submitMember = async () => {
    if (!name || !age || !weight || !height)
      return alert("Please fill all details");

    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    try {
      await addDoc(collection(db, "members"), {
        name,
        age,
        weight,
        height,
        image: "/img3.png", // Default image
        email: user.email,
        packageName: selectedPackage.name,
        monthlyBill: selectedPackage.duration.monthly,
        joinedOn: new Date(),
      });

      alert("Membership created successfully!");
      setShowForm(false);
      refresh();
    } catch (err) {
      console.error("Error saving member:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <p className="uppercase text-red-400 tracking-widest">Become Member of SLIM</p>
      <h2 className="text-3xl font-bold text-center">
        Choose Your <span className="text-red-400">Plan</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((pkg) => (
          <div
            key={pkg.name}
            className={`p-6 bg-white shadow-xl rounded-xl border-2 ${pkg.color} space-y-4 hover:scale-105 transition cursor-pointer`}
            onClick={() => handlePackageSelect(pkg)}
          >
            <h3 className="text-xl font-bold">{pkg.name}</h3>
            <p className="text-2xl text-red-400 font-semibold">₹{pkg.duration.monthly}/mo</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {pkg.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md space-y-4 relative">
            <X onClick={() => setShowForm(false)} className="absolute right-4 top-4 cursor-pointer hover:text-red-400" />
            <h3 className="text-xl font-bold text-red-400 text-center">Enter Your Details</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded w-full"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-3 rounded w-full"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border p-3 rounded w-full"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border p-3 rounded w-full"
            />

            <button
              onClick={submitMember}
              className="w-full bg-red-300 hover:bg-red-400 text-white py-2 rounded-xl"
            >
              Confirm Membership
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeMember;
