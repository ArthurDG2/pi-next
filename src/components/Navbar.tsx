"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, User, Bookmark, AlertCircle, LogIn, LogOut, Map as MapIcon } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const baseLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/onibus", label: "Rotas", icon: MapIcon },
  ];

  const authLinks = [
    { href: "/conta", label: "Minha Conta", icon: User },
  ];

  const menuLinks = isLoggedIn ? [...baseLinks, ...authLinks] : baseLinks;

  return (
    <nav className="bg-background text-foreground p-4 sm:p-6 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold transition-colors">
          InfoBus
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {menuLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors font-medium">
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2 transition-colors">
              <LogOut size={16} /> Sair
            </button>
          ) : (
            <Link href="/login" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors">
              <LogIn size={16} /> Entrar / Cadastrar
            </Link>
          )}
        </div>

        {/* Botão do Menu Mobile */}
        <button onClick={toggleMenu} className="md:hidden p-2 rounded-md hover:bg-hover-background transition-colors">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-card border-t border-b border-border shadow-lg w-full p-4 flex flex-col gap-2 transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100 max-h-[500px]' : 'opacity-0 scale-y-0 max-h-0 pointer-events-none'}`}>
        {menuLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-card-foreground hover:bg-hover-background rounded-md p-3 flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <link.icon className="w-5 h-5 text-primary" />
            <span className="font-semibold">{link.label}</span>
          </Link>
        ))}
        <hr className="border-border my-2" />
        {/* Botão de Login/Logout no Mobile Corrigido */}
        {isLoggedIn ? (
            <button onClick={handleLogout} className="w-full text-left text-red-500 hover:bg-hover-background rounded-md p-3 flex items-center gap-3">
              <LogOut size={20} className="text-red-500" /> 
              <span className="font-semibold">Sair</span>
            </button>
          ) : (
            <Link href="/login" className="text-card-foreground hover:bg-hover-background rounded-md p-3 flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <LogIn size={20} className="text-primary" />
              <span className="font-semibold">Entrar / Cadastrar</span>
            </Link>
        )}
      </div>
    </nav>
  );
};