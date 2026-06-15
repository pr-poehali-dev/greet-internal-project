import { useState } from "react";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Прайс", href: "#price" },
  { label: "Контакты", href: "#contacts" },
];

interface NavbarProps {
  scrollTo: (href: string) => void;
}

const Navbar = ({ scrollTo }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (href: string) => {
    scrollTo(href);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b-2 border-[#2d6e2d]">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <span className="font-oswald text-white text-xl font-bold tracking-widest uppercase">
          ФАНЕРА365
        </span>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="font-roboto text-sm text-gray-300 hover:text-[#4a9e4a] transition-colors uppercase tracking-wider"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleScroll("#contacts")}
            className="bg-[#2d6e2d] text-white font-oswald px-5 py-2 text-sm uppercase tracking-wider hover:bg-[#4a9e4a] transition-colors border border-[#4a9e4a]"
          >
            Заказать
          </button>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-[#2d6e2d] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="text-left font-roboto text-gray-300 hover:text-[#4a9e4a] uppercase tracking-wider text-sm"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
