import { LibraryIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton.tsx";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { NavMenu } from "@/layout/components/NavMenu.tsx";
import { AlbumItem } from "@/layout/components/AlbumItem.tsx";

export const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore(
    useShallow(state => ({
      albums: state.albums, isLoading: state.isLoading, fetchAlbums: state.fetchAlbums
    }))
  )

  useEffect(() => {
    fetchAlbums()
  }, [fetchAlbums])

  // data fetching => zustand

  return (
    <div className='h-full flex flex-col gap-2'>
      {/* Navigation menu */}
      <NavMenu />

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
                <AlbumItem
                  id={album._id}
                  key={album._id}
                  imageUrl={album.imageUrl}
                  title={album.title}
                  artist={album.artist}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};