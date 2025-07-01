import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Programs = () => {
  const [tab, setTab] = useState("fitnessProgram");

  const tabs = [
    { key: "fitnessProgram", label: "Fitness Program" },
    { key: "fitHealthy", label: "Fit & Healthy" },
    { key: "muscleBuilding", label: "Muscle Building" },
    { key: "bikiniBody", label: "Bikini & Body" },
    { key: "cardioExercise", label: "Cardio Exercise" },
    { key: "powerYoga", label: "Power Yoga" },
    { key: "aerobicsProgram", label: "Aerobics Program" },
    { key: "crossfitProgram", label: "Crossfit Program" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <div className="md:w-1/3 bg-[#fe9492] p-6 rounded-lg">
          <ul className="flex flex-col space-y-6">
            {tabs.map(({ key, label }) => (
              <li
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center space-x-4 text-white/90 hover:text-white hover:font-semibold cursor-pointer p-2 rounded ${
                  tab === key ? "bg-white/10 font-bold" : ""
                }`}
              >
                <Image
                  src="/women.png"
                  alt="Icon"
                  width={24}
                  height={24}
                  className="invert"
                />
                <p>{label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className="w-full md:w-4/5 bg-white p-8 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Example Content: Icon + Title + Description */}
              <div className="flex justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="80"
                  width="80"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="#dd6464"
                    d="M96 64c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32v160 64 160c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-64H64c-17.7 0-32-14.3-32-32v-64c-17.7 0-32-14.3-32-32s14.3-32 32-32v-64c0-17.7 14.3-32 32-32h32V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32h-32v64c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224v-64h192z"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-semibold mb-4 capitalize">
                {tabs.find((t) => t.key === tab)?.label}
              </h2>
              <p className="text-gray-500 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur.
              </p>
              <p className="text-gray-500 mb-8 text-sm">
                Inventore fugit error iure nisi reiciendis fugiat illo pariatur quam sequi quod iusto facilis officiis nobis sit quis molestias asperiores rem, blanditiis! Commodi exercitationem vitae deserunt qui nihil ea, tempore et quam natus quaerat doloremque.
              </p>

              <button className="p-3 px-6 bg-[#fe9492] text-white rounded-full hover:bg-[#fc7f7c] transition">
                Learn More
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Programs;
