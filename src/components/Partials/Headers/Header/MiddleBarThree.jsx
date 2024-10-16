import { useState, useEffect } from "react";
import Navbar from "./NavbarThree";

export default function MiddlebarThree({ className }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full h-[66px] ${className} bg-[var(--primary-color)] ${
        scrolled ? "fixed z-10 mt-[31px]" : ""
      }`}
    >
      <div className="relative h-full">
        <div className="flex justify-start items-center h-full ">
          <Navbar className="quomodo-shop-nav-bar lg:block hidden" />
        </div>
      </div>
    </div>
  );
}
