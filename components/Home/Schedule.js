"use client";
import React, { useState } from "react";
import Image from "next/image";

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = [
    { day: "Monday", program: "Fitness Program" },
    { day: "Tuesday", program: "Crossfit Program" },
    { day: "Wednesday", program: "Aerobic Program" },
    { day: "Thursday", program: "Yoga Classes" },
    { day: "Friday", program: "Fitness Program" },
    { day: "Saturday", program: "Cardio Blast" },
    { day: "Sunday", program: "Rest Day" },
  ];

  const cardsData = [
    {
      time: "08:00 AM - 10:00 AM",
      title: "Body Building",
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      trainer: "Mark Harlem",
      img: "/img5.jpg",
    },
    {
      time: "10:00 AM - 12:00 PM",
      title: "Cardio Classes",
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      trainer: "Anna Smith",
      img: "/img5.jpg",
    },
    {
      time: "02:00 PM - 04:00 PM",
      title: "Yoga Session",
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      trainer: "John Doe",
      img: "/img5.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col px-6 md:px-10 py-20 items-center bg-[#FFDDDD]">
      <p className="uppercase tracking-widest text-xl text-red-300">Schedule</p>
      <p className="text-4xl text-center">Training Schedule</p>
      <p className="text-black/50 text-sm tracking-wider mt-5 max-w-xl text-center">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
      </p>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mt-10 gap-6 md:gap-0">
        
        {/* Left Day List */}
        <div className="w-full md:w-[28%] space-y-2">
          {days.map(({ day, program }) => (
            <div
              key={day}
              className={`p-6 space-y-2 cursor-pointer relative transition-all ${
                selectedDay === day
                  ? "bg-red-400 text-white"
                  : "bg-white text-black hover:bg-red-400/80 hover:text-white"
              }`}
              onClick={() => setSelectedDay(day)}
            >
              <p className="text-xl">{day}</p>
              <p className="text-sm">{program}</p>
              {selectedDay === day && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
              )}
            </div>
          ))}
        </div>

        {/* Right Cards */}
        <div className="flex flex-col w-full md:w-[72%] space-y-6 md:pl-10 transition-opacity duration-500 ease-in-out">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-5 bg-white p-6 rounded-xl shadow-md hover:scale-[1.02] transition"
            >
              <div className="w-[100px] h-[100px] relative overflow-hidden rounded-full">
                <Image src={card.img} alt="Profile" fill className="object-cover" />
              </div>
              <div className="text-black/70 space-y-2 text-center sm:text-left">
                <p className="text-sm">{card.time}</p>
                <p className="text-xl text-black font-semibold">{card.title}</p>
                <p>{card.desc}</p>
                <p>
                  — <span className="text-red-400">{card.trainer}</span>, Health Expert
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Schedule;
