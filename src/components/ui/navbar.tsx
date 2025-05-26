"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 md:px-16">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/PrintEz.svg" alt="logo" width={89} height={45} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <a href="/#about" className="text-gray-600 hover:text-black">
            Tentang Kami
          </a>
          <a href="/#services" className="text-gray-600 hover:text-black">
            Layanan
          </a>
          <a href="/#contact" className="text-gray-600 hover:text-black">
            Contact
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pb-4 gap-4 bg-white border-t border-gray-200">
          <a
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            Tentang Kami
          </a>
          <a
            href="/#services"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            Layanan
          </a>
          <a
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
