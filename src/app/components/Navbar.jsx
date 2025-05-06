"use client";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Conta" },
    { href: "/saved", label: "Salvos" },
    { href: "/comments", label: "Comentários" },
    { href: "/complaints", label: "Reclamação" },
    { href: "/settings", label: "Configurações" },
    { href: "/map", label: "Mapa" },
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
    isOpen ? "flex" : "hidden",
  ].join(" ");

  const desktopMenuClasses = "hidden md:flex gap-6";

  return (
    <nav className="bg-gray-300 text-black p-4 sm:p-6 sticky top-0 z-50">
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
            className="hover:text-gray-600 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};