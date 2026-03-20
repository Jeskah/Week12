import Link from "next/link"


export default function Navbar() {
    return (
        <nav className="flex flex-col h-screen w-50 bg-amber-500 text-center items-center p-10">

            <div className="flex flex-col max-h-max bg-amber-500 gap-10">
                <div className="p-10">
            </div>


            <div className=" flex flex-col w-20 h-20 bg-amber-800 rounded-full justify-center align-center ">


                <p>:)</p>

                <div>
                <Link href='/profile'>profile</Link>
                </div>
            
                </div>
                <Link href='/'>home</Link>
                <Link href='/meals'>meals</Link>
                <Link href='/pantry'>pantry</Link>
                <Link href='/saved'>saved</Link>
                <Link href='/favourites'>favourites</Link>
            </div>
        </nav>
    )
}