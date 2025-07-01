"use client";

import { useState, useEffect } from "react";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  Trash2,
  Pencil,
  PlusCircle,
  Search,
  X,
  Mail,
  User,
} from "lucide-react";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [editMemberId, setEditMemberId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const snapshot = await getDocs(collection(db, "members"));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMembers(list);
    setFilteredMembers(list);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = members.filter(
      (m) =>
        m.name?.toLowerCase().includes(term.toLowerCase()) ||
        m.email?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const removeMember = async (id) => {
    if (confirm("Remove this member?")) {
      await deleteDoc(doc(db, "members", id));
      fetchMembers();
    }
  };

  const addMember = async () => {
    if (!newMemberName || !newMemberEmail) return alert("Enter name and email");
    await addDoc(collection(db, "members"), {
      name: newMemberName,
      email: newMemberEmail,
      packageName: "",
      monthlyBill: "",
    });
    setNewMemberName("");
    setNewMemberEmail("");
    setShowAddModal(false);
    fetchMembers();
  };

  const saveEdit = async () => {
    if (!editName || !editEmail) return alert("Enter name and email");
    await updateDoc(doc(db, "members", editMemberId), {
      name: editName,
      email: editEmail,
    });
    setEditMemberId(null);
    setEditName("");
    setEditEmail("");
    fetchMembers();
  };

  return (
    <div className="p-4 md:p-10 space-y-6 w-full md:w-[100%]">
      <h2 className="text-3xl md:text-4xl font-bold text-red-400 text-center">Gym Members</h2>

      {/* Search & Add */}
      <div className="flex items-center gap-3 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or email"
          className="border p-3 rounded-xl w-full shadow focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        {searchTerm && (
          <X
            onClick={() => handleSearch("")}
            className="absolute right-20 text-gray-400 cursor-pointer hover:text-gray-600"
          />
        )}
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-400 hover:bg-red-500 p-3 rounded-full shadow-lg"
        >
          <PlusCircle className="text-white" />
        </button>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-500 text-sm">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Package</th>
              <th className="p-3">Monthly Bill</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3">{m.packageName || "-"}</td>
                <td className="p-3">{m.monthlyBill || "-"}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditMemberId(m.id);
                      setEditName(m.name);
                      setEditEmail(m.email);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => removeMember(m.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Design */}
      <div className="space-y-4 md:hidden">
        {filteredMembers.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow p-4 space-y-2 border-l-4 border-red-400"
          >
            <div className="flex items-center gap-3">
              <User className="text-red-400" />
              <p className="font-bold text-lg">{m.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" />
              <p className="text-gray-700">{m.email}</p>
            </div>
            <div className="flex justify-between pt-2 text-sm text-gray-600">
              <span>Package: {m.packageName || "-"}</span>
              <span>Bill: ₹{m.monthlyBill || "-"}</span>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => {
                  setEditMemberId(m.id);
                  setEditName(m.name);
                  setEditEmail(m.email);
                }}
                className="text-blue-500 hover:text-blue-600"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => removeMember(m.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <Modal title="Add New Member" close={() => setShowAddModal(false)}>
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="Name"
            className="border p-3 rounded-xl w-full shadow"
          />
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Email"
            className="border p-3 rounded-xl w-full shadow"
          />
          <button
            onClick={addMember}
            className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-xl shadow"
          >
            Add Member
          </button>
        </Modal>
      )}

      {/* Edit Member Modal */}
      {editMemberId && (
        <Modal title="Edit Member" close={() => setEditMemberId(null)}>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
            className="border p-3 rounded-xl w-full shadow"
          />
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
            className="border p-3 rounded-xl w-full shadow"
          />
          <button
            onClick={saveEdit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl shadow"
          >
            Save Changes
          </button>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, close }) => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm space-y-4 relative">
      <X
        onClick={close}
        className="absolute right-4 top-4 cursor-pointer hover:text-red-400"
      />
      <h3 className="text-xl font-bold text-center text-red-400">{title}</h3>
      {children}
    </div>
  </div>
);

export default MembersPage;
