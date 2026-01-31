import { Link } from "react-router-dom";
import { memo } from "react";

type Props = {
  id: string
  imageUrl: string
  title: string
  artist: string
}
export const AlbumItem = memo(({ id, imageUrl, title, artist }: Props) => {
  return (
    <Link
      to={`album/${id}`}
      className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group: cursor-pointer'
    >
      <img
        src={imageUrl}
        alt='Playlist img'
        className='size-10 rounded-md flex-shrink-0 object-cover'
      />

      <div className='flex-1 min-w-0 hidden md:block'>
        <p className='text-medium font-medium truncate'>{title}</p>
        <p className='text-sm text-zinc-400 truncate'>Album • {artist}</p>
      </div>
    </Link>
  )
})