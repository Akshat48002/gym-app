"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setUser(auth.currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) setDropdown(false);
    };
    if (dropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdown(false);
      setMenuOpen(false);
      router.push("/Auth");
    } catch (err) {
      console.error("Sign out error:", err.message);
    }
  };

  useEffect(() => {
    if (pathname !== "/") {
      setScrolled(true);
      return;
    }
    const heroSection = document.getElementById("hero-section");
    const observer = new IntersectionObserver(
      (entries) => {
        setScrolled(!entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroSection) observer.observe(heroSection);
    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, [pathname]);

  if (!mounted) return null; 

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/0"
      }`}
    >
      <h1
        onClick={() => router.push("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        SLIM
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex items-center gap-6">
          {["Home", "About", "Contact", "Blog", "Gallery","Diets","Nutrition", "Membership"].map(
            (item) => (
              <li key={item}>
               {item === "Membership" ? (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    if (!user) {
                      router.push("/Auth");
                    } else {
                      router.push("/Membership");
                    }
                  }}
                  className="text-lg font-semibold cursor-pointer hover:text-red-400 transition"
                >
                  {item}
                </a>
              ) : (
                <Link href={`/#${item}`} className="text-lg font-semibold">
                  {item}
                </Link>
              )}
              </li>
            )
          )}
        </ul>

        {user ? (
          <div className="relative profile-dropdown">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="w-10 h-10 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center uppercase font-bold"
            >
              {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 z-50">
                <p className="font-bold text-black">
                  {user.displayName || "No Name"}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/Auth")}
            className="bg-red-400 px-4 py-2 rounded-xl text-white hover:bg-red-500 transition"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 w-60 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 z-40 md:hidden">
          {["Home", "About", "Contact", "Blog", "Gallery", "Membership", "Diets", "Nutrition"].map(
            (item) => (
              <Link
                key={item}
                href={item === "Membership" ? "/Membership" : `/#${item}`}
                onClick={() => setMenuOpen(false)}
                className="text-lg"
              >
                {item}
              </Link>
            )
          )}

          {user ? (
            <div className="relative profile-dropdown">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="w-10 h-10 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center uppercase font-bold"
              >
                {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 z-50">
                  <p className="font-bold text-black">
                    {user.displayName || "No Name"}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/Auth");
              }}
              className="bg-red-400 px-4 py-2 rounded-xl text-white hover:bg-red-500 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
