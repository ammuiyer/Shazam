// src/components/ThemeToggle.js
"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check stored theme or default to dark mode
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("light-theme", storedTheme === "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light-theme", newTheme === "light");
    localStorage.setItem("theme", newTheme); // Save the theme in localStorage
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-800 text-white rounded-full focus:outline-none hover:bg-gray-700 transition"
    >
      {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}