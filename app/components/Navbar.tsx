import checkUser from "@/lib/checkUser";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const user = checkUser();

  return (
    <>
      <nav className="">
        <div className="py-6 px-5 sm:px-12 md:px-36 nav">
          <div className="navbar-start">
            <Link href="/">
              <h1 className="text-3xl font-bold hover:cursor-pointer">
                <span className="text-black">Expense</span>
                <span className="text-purple-800">Tracker</span>
              </h1>
            </Link>
          </div>
          <div className="navbar-end">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-purple-800 hover:bg-purple-900 py-2 px-5 rounded-md text-md text-center font-medium hover:cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
