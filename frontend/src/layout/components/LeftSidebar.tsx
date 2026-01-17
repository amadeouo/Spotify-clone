import { Link } from "react-router-dom";
import { HomeIcon, LibraryIcon, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton.tsx";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";

export const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore()

  useEffect(() => {
    fetchAlbums()
  }, [fetchAlbums])

  // data fetching => zustand

  return (
    <div className='h-full flex flex-col gap-2'>
      {/* Navigation menu */}
      <div className='rounded-lg bg-zinc-900 p-4'>
        <div className='space-y-2'>
          <Link
            to={'/'}
            className={cn(buttonVariants({
              variant: 'ghost',
              className: 'w-full justify-start text-white hover:bg-zinc-800',
            }))}
          >
            <HomeIcon className='mr-2 size-5' />
            <span className='hidden md:inline'>Home</span>
          </Link>

          <SignedIn>
            <Link
              to={'/chat'}
              className={cn(buttonVariants({
                variant: 'ghost',
                className: 'w-full justify-start text-white hover:bg-zinc-800',
              }))}
            >
              <MessageCircle className='mr-2 size-5' />
              <span className='hidden md:inline'>Chat</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library sections */}
      <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center text-white px-2'>
            <LibraryIcon className='mr-2 size-5' />
            <span className='hidden md:inline'>Playlists</span>
          </div>
        </div>

        <ScrollArea
          className='h-[calc(100vh-300px)]'
        >
          <div className='space-y-2'>
            {isLoading ? ( <PlaylistSkeleton /> ) : (
              albums.map((album) => (
                <Link
                  to={`album/${album._id}`}
                  key={album._id}
                  className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group: cursor-pointer'
                >
                  <img
                    src={album.imageUrl}
                    alt='Playlist img'
                    className='size-10 rounded-md flex-shrink-0 object-cover'
                  />

                  <div className='flex-1 min-w-0 hidden md:block'>
                    <p className='text-medium font-medium truncate'>{album.title}</p>
                    <p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};