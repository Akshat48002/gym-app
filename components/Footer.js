import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-300 px-6 md:px-16 lg:px-40 py-10 md:py-20">
      
      {/* Grid Container */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-20">
        
        {/* About Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            About <span className="text-red-400">SLIM.</span>
          </h2>
          <p className="text-sm leading-relaxed tracking-wider">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
          </p>
          <div className="flex items-center gap-4 mt-4">
            {[FaTwitter, FaFacebookF, FaInstagram].map((Icon, idx) => (
              <div key={idx} className="bg-[#1f1f1f] p-2 rounded-full hover:bg-gray-800 cursor-pointer">
                <Icon className="text-white w-4 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-6">Links</h3>
          {["Home", "About", "Services", "Coaches", "Schedule", "Contact"].map((link) => (
            <p key={link} className="flex items-center gap-2 hover:text-white cursor-pointer text-sm">
              <span className="text-red-400">→</span> {link}
            </p>
          ))}
        </div>

        {/* Services Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-6">Services</h3>
          {["Gym Fitness", "Crossfit", "Yoga", "Aerobics"].map((service) => (
            <p key={service} className="flex items-center gap-2 hover:text-white cursor-pointer text-sm">
              <span className="text-red-400">→</span> {service}
            </p>
          ))}
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-6">Have a Question?</h3>
          
          <div className="flex items-start gap-3 text-sm">
            <MapPinIcon className="text-red-400 w-5 h-5 mt-1" />
            <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <PhoneIcon className="text-red-400 w-5 h-5" />
            <p>+2 392 3929 210</p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <EnvelopeIcon className="text-red-400 w-5 h-5" />
            <p>info@yourdomain.com</p>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500 mt-12">
        © 2025 All rights reserved | Made with <span className="text-red-400">❤</span> by Developer
      </p>
    </footer>
  );
};

export default Footer;
