import { Link } from "react-router-dom";
import { HomeIcon, MessageCircle } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";

export const NavMenu = () => {
  return (
    <div className='rounded-lg bg-zinc-900 p-4'>
      <div className='space-y-2'>
        <Link
          to={'/'}
          className='flex w-full justify-start text-white hover:bg-zinc-800 p-3 rounded-lg'
        >
          <HomeIcon className='flex mr-2 size-5' />
          <span className='hidden md:inline'>Home</span>
        </Link>

        <SignedIn>
          <Link
            to={'/chat'}
            className='flex w-full justify-start text-white hover:bg-zinc-800 p-3 rounded-lg'
          >
            <MessageCircle className='flex mr-2 size-5' />
            <span className='hidden md:inline'>Chat</span>
          </Link>
        </SignedIn>
      </div>
    </div>
  )
}