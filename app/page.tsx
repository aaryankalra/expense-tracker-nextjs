"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import HeroSection from "./components/HeroSection";
import UserDashboard from "./components/UserDashboard";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <SignedIn>
        <UserDashboard />
      </SignedIn>
      <SignedOut>
        <HeroSection />
      </SignedOut>
    </div>
  );
}
