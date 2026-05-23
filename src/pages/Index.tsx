import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PriceSection from "@/components/PriceSection";
import ContactsSection from "@/components/ContactsSection";

const PRICE_URL =
  "https://functions.poehali.dev/29d70dcb-46e1-4a15-b050-9a8523af6c85";

interface PriceItem {
  id: number;
  name: string;
  unit: string;
  price: string;
}
interface PriceCategory {
  id: number;
  name: string;
  items: PriceItem[];
}

const Index = () => {
  const [priceData, setPriceData] = useState<PriceCategory[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(PRICE_URL)
      .then((r) => r.json())
      .then((d) => {
        if (d.categories) setPriceData(d.categories);
      });
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      <Navbar scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <PriceSection priceData={priceData} scrollTo={scrollTo} />
      <ContactsSection scrollTo={scrollTo} />
    </div>
  );
};

export default Index;
