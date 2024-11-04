// src/app/layout.js
import "./globals.css";
import SidebarNav from "./components/SidebarNav";
import Button from "./components/Button";
import Image from "next/image";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "ISO New England Chatbot",
  description: "Chat interface for ISO New England",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        <div className="w-64 bg-[var(--s2)] flex flex-col justify-between sidebar">
          {/* Sidebar Navigation */}
          <SidebarNav />
          
          {/* Bottom area of sidebar with login and theme toggle */}
          <div className="flex flex-col justify-center items-center mb-10 space-y-4">
            <Button size="md">Developer Login</Button>
            <ThemeToggle /> {/* Theme toggle button */}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col bg-[var(--s4)]">
          {/* Header section */}
          <div className="w-full h-12 bg-[var(--s2)] flex justify-center items-center header">
            <h1 className="text-[var(--p1)] font-bold text-2xl">
              ISO New England Chatbot
            </h1>
            <Image
              src="/isoLogo.jpg"
              alt="ISO Logo"
              width={40}
              height={40}
              className="rounded-full ml-5"
            />
          </div>

          {/* Content area with overflow handling */}
          <div className="flex-1 overflow-auto pb-24 chat-area">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}