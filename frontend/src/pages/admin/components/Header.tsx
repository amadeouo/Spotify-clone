import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className='flex items-center justify-between w-full mb-6'>
      <div className='flex items-center gap-2'>
        <Link to={'/'} className='flex items-center gap-2'>
          <img
            className='size-12'
            src="/spotify.png"
            alt="Spotify logo"
            loading="lazy"
          />
        </Link>
        <div className='flex flex-col gap-3 ml-4'>
          <h1 className='text-5xl font-bold'>Music Manager</h1>
          <p className='text-zinc-400'>Manage your music catalog</p>
        </div>
      </div>
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "w-13 h-13",
            userButtonBox: "p-2",
            userButtonPopoverTrigger: "scale-105"
        }}}
      />
    </header>
  );
};