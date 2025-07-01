import { db } from "@/services/firebase";
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Trash2, Bell, CalendarDays } from "lucide-react";

const UserNotifications = ({ email }) => {
  const [notifications, setNotifications] = useState([]);
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    if (!email) return;

    const fetchNotifications = async () => {
      try {
        const memberQuery = query(collection(db, "members"), where("email", "==", email));
        const memberSnap = await getDocs(memberQuery);

        if (!memberSnap.empty) {
          const id = memberSnap.docs[0].id;
          setMemberId(id);

          const notiRef = collection(db, "members", id, "notifications");
          const unsubscribe = onSnapshot(notiRef, (snapshot) => {
            const notiArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotifications(notiArray);
          });

          return unsubscribe;
        } else {
          console.log("No member found with this email");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      }
    };

    const unsubscribePromise = fetchNotifications();

    return () => {
      unsubscribePromise.then((unsub) => {
        if (typeof unsub === "function") unsub();
      });
    };
  }, [email]);

  const deleteNotification = async (notiId) => {
    try {
      await deleteDoc(doc(db, "members", memberId, "notifications", notiId));
      console.log("Notification deleted");
    } catch (error) {
      console.error("Error deleting notification:", error.message);
    }
  };

  return (
    <div className="space-y-4 min-h-[80%] flex flex-col  items-center overflow-y-auto px-1 custom-scrollbar">
      {notifications.length > 0 ? (
        notifications.map((noti) => {
          const formattedDate = noti.timestamp?.toDate
            ? new Date(noti.timestamp.toDate()).toLocaleString()
            : "N/A";

          return (
            <div
              key={noti.id}
              className="relative p-5 w-[90%] rounded-2xl bg-white shadow-md border border-red-200 hover:shadow-xl hover:scale-[1.02] transition duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-red-400 font-semibold flex items-center gap-2">
                    <Bell size={16} /> New Notification
                  </p>
                  <p className="text-black/80">{noti.message}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <CalendarDays size={14} className="text-gray-400" />
                    {formattedDate}
                  </p>
                </div>

                <button
                  onClick={() => deleteNotification(noti.id)}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500 transition active:scale-95"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 py-10">No notifications found.</p>
      )}
    </div>
  );
};

export default UserNotifications;
