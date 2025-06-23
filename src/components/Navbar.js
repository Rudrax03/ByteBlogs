import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold text-wine dark:text-wine font-serif">
            ByteBlogs
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-base">
          <NavLinks currentPath={router.pathname} />
          <button
            onClick={toggleDarkMode}
            className="text-xl px-3 py-1 border border-wine rounded text-wine hover:bg-wine/10 dark:border-wine dark:hover:bg-wine/20"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-wine dark:text-wine"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white dark:bg-gray-900 transition-all duration-300">
          <NavLinks currentPath={router.pathname} isMobile />
          <button
            onClick={toggleDarkMode}
            className="w-full border px-3 py-2 rounded border-wine text-wine hover:bg-wine/10 dark:hover:bg-wine/20"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
}

// Links Component
function NavLinks({ currentPath, isMobile = false }) {
  const linkStyle = "hover:text-wine dark:text-white transition";
  const activeStyle = "text-wine font-semibold dark:text-wine";
  const baseClass = isMobile ? "block text-base py-1" : "";

  return (
    <>
      <Link
        href="/"
        className={`${baseClass} ${
          currentPath === "/" ? activeStyle : linkStyle
        }`}
      >
        Home
      </Link>
      <Link
        href="/add-blog"
        className={`${baseClass} ${
          currentPath === "/add-blog" ? activeStyle : linkStyle
        }`}
      >
        Create Post
      </Link>
    </>
  );
}
