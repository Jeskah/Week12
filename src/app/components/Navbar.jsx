import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col bg-amber-500 text-center items-center pt-50 align-center h-full-100% relative">
      <div className="flex flex-col gap-5 uppercase w-50">
        <Link href="/profile">profile</Link>
        <Link href="/">home</Link>
        <Link href="/meals">meals</Link>
        <Link href="/pantry">pantry</Link>
        <Link href="/saved">saved</Link>
        <Link href="/favourites">loved</Link>
      </div>
    </nav>
  );
}
