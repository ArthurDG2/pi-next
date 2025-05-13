"use client";

import { Search } from "lucide-react";

export const Map = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="flex bg-white rounded-md absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-11/12 max-w-md border border-black">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar localização..."
            className="w-full pl-10 p-3 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Mapa em iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29385.675969309987!2d-47.23247!3d-23.08164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b4811322d7b7%3A0x4d1efbf0d05b7f3c!2sIndaiatuba%2C%20SP!5e0!3m2!1sen!2sbr!4v1651234567890!5m2!1sen!2sbr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>

  );
};
