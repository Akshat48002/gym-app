"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.jpg",
  "/gallery7.jpg",
  "/gallery8.jpg",
];

const Gallery = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4 overflow-hidden px-4 py-10">

      {/* Heading */}
      <p className="uppercase text-red-400 tracking-widest">Gallery</p>
      <h2 className="text-3xl md:text-4xl tracking-wider text-center mb-6">
        See the Latest Photos
      </h2>

      {/* Horizontal Scrollable Gallery */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <motion.div
          className="flex gap-6 min-w-max py-4"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 bg-white rounded-xl shadow-xl overflow-hidden w-[250px] md:w-[350px] h-[250px] md:h-[350px]"
            >
              <Image
                src={img}
                alt={`Gallery ${idx + 1}`}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Gallery;
