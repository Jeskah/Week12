import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-row min-h-screen">
        <ClerkProvider>
          <Navbar />
          <div className="w-full flex flex-col">
            <Header />
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
