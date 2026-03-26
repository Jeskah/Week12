"use client";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import SearchBar from "./SearchBar";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="w-full bg-white h-50 gap-10 justify-items-end p-20">
      <div className="flex flex-col h-50 absolute left-38 gap-3 top-10">
        {!isSignedIn && (
          <>
            <SignUpButton className="bg-black text-white rounded-sm font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-2 cursor-pointer uppercase">
              Sign Up
            </SignUpButton>
            <SignInButton className="bg-black text-white rounded-sm font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-2 cursor-pointer uppercase" />
          </>
        )}

        {isSignedIn && (
          <div className="flex flex-row bg-amber-500 gap-5 p-5 text-sm rounded-md">
            <UserButton />
            <SignOutButton />
          </div>
        )}
      </div>

      <h1 className="text-black text-2xl font-bold">PartyPantry</h1>
      <SearchBar />
    </header>
  );
}
