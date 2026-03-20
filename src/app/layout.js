import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en">
      <body className="flex flex-row">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
