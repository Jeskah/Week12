import "./globals.css";
<<<<<<< HEAD
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
=======
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { syncUser } from '@/lib/syncUser'
>>>>>>> main

export default async function RootLayout({ children }) {
    await syncUser()
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="flex flex-row min-h-screen">
        <ClerkProvider>
          <Navbar />
          <div className="w-full flex flex-col flex-start flex-wrap">
            <Header />
            {children}
=======
      <body className="flex flex-row">
        <ClerkProvider>
          <Navbar />
            <div className="w-full flex flex-col">
            <Header/>
          {children}
>>>>>>> main
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
