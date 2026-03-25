import "./globals.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en">
      <body className="flex flex-row min-h-screen">
        <Navbar />
        <div className="w-full flex flex-col flex-start flex-wrap">
        <Header/>
        {children}
        </div>
      </body>
    </html>
  );
}
