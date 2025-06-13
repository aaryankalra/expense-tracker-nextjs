import React from "react";
import Image from "next/image";
import { SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const HeroSection = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      <section className="w-screen bg-gray-50 flex flex-col items-center justify-center pt-16">
        <div className="w-full max-w-7xl flex flex-col items-center justify-center text-center text-black">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3">
            Take Control of Your Finances
          </h1>
          <h2 className="text-md sm:text-xl">
            Track every expense. Save smarter. Stress less.
          </h2>
        </div>

        <div className="ml-18 mt-7 mb-7 flex items-center justify-center">
          <figure className="ms-auto me-20 relative z-1 max-w-full w-[300px] sm:w-[410px] md:w-[500px] h-auto shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] rounded-b-lg">
            <div className="relative flex items-center w-[300px] sm:w-[410px] md:w-[500px] bg-gray-800 rounded-t-lg py-2 px-24">
              <div className="flex gap-x-1 absolute top-2/4 start-4 -translate-y-1">
                <span className="size-2 bg-red-500 rounded-full"></span>
                <span className="size-2 bg-yellow-500 rounded-full"></span>
                <span className="size-2 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex justify-center items-center size-full bg-gray-700 text-[.25rem] text-gray-400 rounded-sm sm:text-[.5rem]">
                www.expensetracker.com
              </div>
            </div>

            <div className="bg-gray-800 rounded-b-lg">
              <Image
                className="rounded-b-lg"
                src={"/hero-img.png"}
                alt="Browser Placeholder"
                width={500}
                height={300}
              />
            </div>
          </figure>
        </div>

        <div>
          <SignUpButton mode="modal">
            <button className="bg-purple-800 hover:bg-purple-900 transition-all font-medium px-7 py-3 rounded-md cursor-pointer">
              Create Account To Get Started
            </button>
          </SignUpButton>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
