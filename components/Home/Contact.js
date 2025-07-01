"use client";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black/2 flex flex-col items-center justify-center p-6 space-y-10">
      
      {/* Heading */}
      <div className="text-center space-y-6">
        <p className="uppercase text-red-400 tracking-widest">Contact</p>
        <h2 className="text-4xl ">Contact Me</h2>
        <p className="text-gray-500 tracking-wide max-w-2xl mx-auto">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
        </p>
      </div>

      {/* Flex Layout for Contact */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mt-8">
        
        {/* Left Info Box */}
        <div className="flex-1 space-y-4">
          
          <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 shadow">
            <MapPin className="text-red-400" />
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-gray-500">198 West 21th Street, Suite 721 New York NY 10016</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 shadow">
            <Phone className="text-red-400" />
            <div>
              <p className="font-semibold">Contact Number</p>
              <p className="text-red-400">+1235 2355 98</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 shadow">
            <Mail className="text-red-400" />
            <div>
              <p className="font-semibold">Email Address</p>
              <p className="text-red-400">info@yoursite.com</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 shadow">
            <Globe className="text-red-400" />
            <div>
              <p className="font-semibold">Website</p>
              <p className="text-red-400">yoursite.com</p>
            </div>
          </div>

        </div>

        {/* Right Form Box */}
        <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow space-y-4">
          
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md focus:outline-red-300"
          />
          
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md focus:outline-red-300"
          />
          
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 border rounded-md focus:outline-red-300"
          />
          
          <textarea
            placeholder="Message"
            rows="4"
            className="w-full p-3 border rounded-md resize-none focus:outline-red-300"
          />

          <button className="bg-red-300 hover:bg-red-400 text-white px-6 py-3 rounded-full transition w-full">
            Send Message
          </button>

        </div>

      </div>
    </div>
  );
};

export default Contact;
