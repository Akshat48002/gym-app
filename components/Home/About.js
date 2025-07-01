import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row px-6 md:px-16 py-10 items-center justify-center gap-8">
      
      {/* Image Section */}
      <div className="flex-shrink-0">
        <Image
          src="/img1.jpg"
          alt="About Background"
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="max-w-xl space-y-4">
        <p className="uppercase tracking-widest text-red-300">
          A Few Words About Us
        </p>

        <p className="text-3xl md:text-4xl leading-snug font-semibold">
          We&apos;re Functioning for Almost <span className="text-red-300">20</span> Years
        </p>

        <p className="text-black/50 text-sm tracking-wide">
          A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
        </p>

        <p className="text-black/50 text-sm tracking-wide">
          Even the all-powerful Pointing has no control about the blind texts. It is an almost unorthographic life. One day, however, a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
        </p>

        <p className="text-black/50 text-sm tracking-wide">
          A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
        </p>
      </div>
    </div>
  );
};

export default About;
