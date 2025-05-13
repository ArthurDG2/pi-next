"use client";
import Link from "next/link";
import { useState } from "react";

import {
  Home,
  User,
  Bookmark,
  MessageCircle,
  AlertCircle,
  Settings,
  MapPin,
} from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/map", label: "Mapa", icon: MapPin },
    { href: "/saved", label: "Salvos", icon: Bookmark },
    { href: "/complaints", label: "Reclamação", icon: AlertCircle },
    { href: "/comments", label: "Comentários", icon: MessageCircle },
    { href: "/conta", label: "Minha Conta", icon: User },
  ];

  const mobileMenuClasses = [
    "md:hidden",
    "absolute",
    "top-full",
    "left-0",
    "right-0",
    "bg-gray-300",
    "w-full",
    "p-4",
    "gap-4",
    "flex-col",
    "transition-all",
    "duration-300",
    "origin-top",
    "overflow-hidden",
    isOpen ? "opacity-100 scale-y-100 max-h-[500px] flex" : "opacity-0 scale-y-0 max-h-0 pointer-events-none",
  ].join(" ");

  const desktopMenuClasses = "hidden md:flex gap-6";

  return (
    <nav className="bg-white text-black p-4 sm:p-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold hover:text-gray-600 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          InfoBus
        </Link>
        
        {/* Desktop Menu */}
        <div className={desktopMenuClasses}>
          {menuLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="hover:text-gray-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-400 transition-colors"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={mobileMenuClasses}>
        {menuLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-gray-600 transition-colors py-2 flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}

      </div>
    </nav>
  );
};