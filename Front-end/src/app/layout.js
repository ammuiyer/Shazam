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
      <body>
        <div className="flex h-screen">
          <div className="w-64 bg-[var(--s3)] flex flex-col justify-between items-center">
            <SidebarNav />
            <div className="flex justify-center items-center mb-10">
              <Button size="md">Developer Login</Button>
              <ThemeToggle /> {/* Add the theme toggle button here */}
            </div>
          </div>
          <div className="flex-1 bg-[var(--s4)] relative">
            <div className="w-full h-12 bg-[var(--s2)] flex justify-center items-center">
              <h1 className="text-[var(--p1)] font-bold text-2xl">
                ISO New England Chatbot
              </h1>
              <Image
                src="/isoLogo.jpg"
                alt=""
                width={40}
                height={40}
                className="rounded-full ml-5"
              />
            </div>
            <div className="flex-1 overflow-auto pb-24">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}