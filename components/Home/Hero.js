"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [showFirst, setShowFirst] = useState(true);
  const [mounted, setMounted] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return <div id="hero-section" className="w-full h-screen bg-white"></div>;

  return (
    <div id="hero-section" className="relative w-full h-screen overflow-hidden">
      
      {/* First Hero Section */}
      <div className={`absolute inset-0 flex flex-col md:flex-row w-full h-full transition-opacity duration-1000 ${showFirst ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
        
        {/* Left Text - Desktop */}
        <div className="hidden md:flex flex-col justify-center items-start pl-40 md:w-1/2 space-y-6 bg-white relative">
          <div className="flex relative">
            <p className="text-red-300 uppercase tracking-widest">Welcome to the Club</p>
            <div className="w-20 h-38 absolute left-[19rem] -bottom-5 border-10 border-red-300"></div>
          </div>

          <h1 className="text-5xl leading-tight tracking-wide">
            Get A <span className="font-black">Perfect</span> Body <br /> <span className="font-black">Figure</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-md">
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.
          </p>

          <h1 className="absolute text-[100px] font-extrabold -rotate-90 left-113 top-1/2 -translate-y-1/2 hidden md:block">
            STRENGTH
          </h1>

          <button onClick={() => router.push("/Membership")} className="mt-4 bg-red-400/80 hover:bg-red-400 text-white px-10 py-4 rounded-full transition cursor-pointer">
            Join with us
          </button>
        </div>

        {/* Image & Mobile Text */}
        <div className="relative w-full md:w-1/2 h-full flex justify-center items-center overflow-hidden">
          <Image src="/gallery6.jpg" alt="Hero Image" fill sizes="100vw" className="object-cover object-center" priority />

          <h1 className="absolute text-white text-[100px] font-extrabold -rotate-90 right-115 top-1/2 -translate-y-1/2 hidden md:block">
            STRENGTH
          </h1>

          <div className="absolute flex flex-col justify-center items-center text-center space-y-4 px-4 md:hidden">
            <p className="uppercase tracking-widest text-white">Welcome to the Club</p>
            <h1 className="text-3xl font-extrabold text-white">
              Get A <span className="font-black">Perfect</span> Body <br /> Figure
            </h1>
            <p className="max-w-xl text-white tracking-widest">
              A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.
            </p>
            <button onClick={() => router.push("/Membership")} className="mt-4 bg-red-300 hover:bg-red-400 text-white px-10 py-3 rounded-full transition cursor-pointer">
              Join with us
            </button>
          </div>
        </div>
      </div>

      {/* Second Hero Section */}
      <div className={`absolute inset-0 flex flex-col md:flex-row w-full h-full transition-opacity duration-1000 ${showFirst ? "opacity-0 z-10" : "opacity-100 z-20"}`}>
        
        {/* Left Text - Desktop */}
        <div className="hidden md:flex flex-col justify-center items-start pl-40 md:w-1/2 space-y-6 bg-white relative">
          <div className="flex relative">
            <p className="text-red-300 uppercase tracking-widest">Welcome to Club</p>
            <div className="w-20 h-38 absolute left-[19rem] -bottom-5 border-10 border-red-300"></div>
          </div>

          <h1 className="text-5xl leading-tight tracking-wide">
            Pain Is <span className="font-black">Temporary</span> But <br /> Glory is <span className="font-black">Forever</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-md">
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.
          </p>

          <h1 className="absolute uppercase text-[100px] font-extrabold -rotate-90 left-[29rem] top-1/2 md:-translate-y-1/2 hidden md:block">
            Workout
          </h1>

          <button onClick={() => router.push("/Membership")} className="mt-4 bg-red-300 hover:bg-red-400 text-white px-10 py-3 rounded-full transition cursor-pointer">
            Join with us
          </button>
        </div>

        {/* Image & Mobile Text */}
        <div className="relative w-full md:w-1/2 h-full flex justify-center items-center overflow-hidden">
          <Image src="/gallery2.jpg" alt="Hero Alt Image" fill sizes="100vw" className="object-cover object-center" priority />

          <h1 className="absolute uppercase text-white md:text-[100px] font-extrabold -rotate-90 right-[29rem] top-1/2 -translate-y-1/2 hidden md:block">
            Workout
          </h1>

          <div className="absolute flex flex-col justify-center items-center text-center space-y-4 px-4 md:hidden">
            <p className="uppercase tracking-widest text-white">Welcome to Club</p>
            <h1 className="text-3xl font-extrabold text-white">
              Pain is <span className="font-black">Temporary</span> But <br /> Glory is <span className="font-black">Forever</span>
            </h1>
            <p className="max-w-xl text-white tracking-widest">
              A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.
            </p>
            <button onClick={() => router.push("/Membership")} className="mt-4 bg-red-300 hover:bg-red-400 text-white px-10 py-3 rounded-full transition cursor-pointer">
              Join with us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
