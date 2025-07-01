"use client";
import React, { useState } from "react";
import Image from "next/image";

import Hero from "@/components/Home/Hero";
import Programs from "@/components/Home/Programs";
import Services from "@/components/Home/Services";
import Schedule from "@/components/Home/Schedule";
import About from "@/components/Home/About";
import Gallery from "@/components/Home/Gallery";
import Contact from "@/components/Home/Contact";

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <div className="bg-[#fd7877]">
        <div className="flex flex-row flex-wrap justify-center container mx-auto w-full md:w-[70%] h-auto md:h-[350px]">
          {/* Box 1 */}
          <div className="flex bg-white/20 flex-col justify-center items-center text-white p-8 space-y-8 w-full sm:w-1/2 md:w-1/3">
            <Image
              src="/women.png"
              alt="Women Image"
              width={50}
              height={50}
              className="invert"
            />
            <h1 className="font-bold text-lg">Free Lesson</h1>
            <p className="text-center text-sm tracking-widest">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia.
            </p>
          </div>

          {/* Box 2 */}
          <div className="flex  flex-col justify-center items-center text-white p-8 space-y-8 w-full sm:w-1/2 md:w-1/3">
            <Image
              src="/diet.png"
              alt="Diet Image"
              width={50}
              height={50}
              className="invert"
            />
            <h1 className="font-bold text-lg">35% Discount</h1>
            <p className="text-center text-sm tracking-widest">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia.
            </p>
          </div>

          {/* Box 3 */}
          <div className="flex bg-white/20 flex-col justify-center items-center text-white p-8 space-y-8 w-full sm:w-1/2 md:w-1/3">
            <Image
              src="/running-shoes.png"
              alt="Shoes Image"
              width={50}
              height={50}
              className="invert"
            />
            <h1 className="font-bold text-lg">Free Lesson</h1>
            <p className="text-center text-sm tracking-widest">
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia.
            </p>
          </div>
        </div>
      </div>

      <Programs />
      <Services />
      <Schedule />
      <About />
      <Contact />
      <Gallery />
    </div>
  );
};

export default HomePage;
