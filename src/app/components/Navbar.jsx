import Link from "next/link";
import SearchBar from "./SearchBar";
// import { useUser } from "@clerk/nextjs"

export default function Navbar() {
  // const { user } = useUser()
  return (
    <nav className="flex flex-col bg-amber-500 text-center items-center pt-50 align-center h-max-screen relative">
      <div className="flex flex-col gap-5 uppercase w-50">
        <Link href="/profile">profile</Link>
        {/* <Link href={`/users/${user?.id}`}>profile</Link> */}
        <Link href="/">home</Link>
        <Link href="/meals">meals</Link>
        <Link href="/pantry">pantry</Link>
        <Link href="/saved">saved</Link>
        <Link href="/favourites">favourites</Link>
      </div>
    </nav>
  );
}
