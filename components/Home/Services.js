import React from "react";
import Image from "next/image";

const Services = () => {
  return (
    <div className="py-20 px-6 md:px-16 flex flex-col items-center justify-center bg-black/2 text-center">
      
      {/* Header */}
      <p className="text-red-300 uppercase tracking-widest mb-3">Sexy & Healthy</p>
      <h2 className="text-4xl md:text-4xl tracking-wider mb-4">Get a Perfect Body</h2>
      <p className="max-w-2xl mx-auto text-gray-500 mb-16">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 max-w-7xl mx-auto">
        
        {/* Service 1 */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <Image src="/women.png" alt="Body Icon" width={60} height={60} />
          <h3 className="font-semibold text-lg">Make Your Body Harmonic</h3>
          <p className="text-gray-500 text-sm max-w-[220px]">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
        </div>

        {/* Service 2 */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <Image src="/diet.png" alt="Weight Loss Icon" width={60} height={60} />
          <h3 className="font-semibold text-lg">Weight Loss Program</h3>
          <p className="text-gray-500 text-sm max-w-[220px]">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
        </div>

        {/* Service 3 */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <Image src="/running-shoes.png" alt="Group Icon" width={60} height={60} />
          <h3 className="font-semibold text-lg">Group Personal Trainings</h3>
          <p className="text-gray-500 text-sm max-w-[220px]">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
        </div>

        {/* Service 4 */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <Image src="/diet.png" alt="Diet Icon" width={60} height={60} />
          <h3 className="font-semibold text-lg">Optimal Diet Selection</h3>
          <p className="text-gray-500 text-sm max-w-[220px]">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
        </div>

        {/* Service 5 */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <Image src="/women.png" alt="Training Icon" width={60} height={60} />
          <h3 className="font-semibold text-lg">Individual Training Programs</h3>
          <p className="text-gray-500 text-sm max-w-[220px]">
            A small river named Duden flows by their place and supplies it with the necessary regelialia.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Services;
