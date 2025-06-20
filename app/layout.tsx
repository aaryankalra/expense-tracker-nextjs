import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-50">
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
          >
            <Navbar />
            <Toaster position="bottom-right" />
            <main className="container">{children}</main>
          </body>
        </html>
      </div>
    </ClerkProvider>
  );
}
