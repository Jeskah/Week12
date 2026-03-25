import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-row min-h-screen">
        <ClerkProvider>
          <Navbar />
          <div className="w-full flex flex-col flex-start flex-wrap">
            <Header />
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
