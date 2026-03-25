import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function Header() {
    return (
    <header className="w-full bg-white h-50 gap-10 justify-items-end p-20">


        <div className="flex flex-col h-50 absolute left-38 gap-3 top-10">
            <SignUpButton className="bg-[#000000] text-white rounded-sm font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-2 cursor-pointer uppercase ">
        Sign Up
            </SignUpButton>
            <SignInButton
            className="bg-[#000000] text-white rounded-sm font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-2 cursor-pointer uppercase"/>
            
            <UserButton />
            </div>
    <h1 className="text-black text-2xl font-bold">PartyPantry</h1>     
    </header>
    )
}