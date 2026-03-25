import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { syncUser } from '@/lib/syncUser'

export default async function RootLayout({ children }) {
    await syncUser()
  return (
    <html lang="en">
      <body className="flex flex-row">
        <ClerkProvider>
          <Navbar />
            <div className="w-full flex flex-col">
            <Header/>
          {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
    
  );
}
