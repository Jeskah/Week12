import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer border">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>

          <div className="flex">
          <Navbar />

          <div className="flex-1 flex flex-col">
          <Header />

          <main className="bg-black min-h-screen text-white">
            {children}
          </main>
        </div>
      </div>
      </ClerkProvider>
    </body>
  </html>
  );
}
