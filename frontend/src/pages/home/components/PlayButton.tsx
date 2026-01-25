import type { Song } from "@/types";
import { usePlayerStore } from "@/stores/usePlayerStore.ts";
import { Button } from "@/components/ui/button.tsx";
import { Pause, Play } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  song: Song
};
export const PlayButton = ({ song }: Props) => {
  const {
    currentSong,
    isPlaying,
    setCurrentSong,
    togglePlay
  } = usePlayerStore(useShallow((state) => ({
    currentSong: state.currentSong,
    isPlaying: state.isPlaying,
    setCurrentSong: state.setCurrentSong,
    togglePlay: state.togglePlay
  })))
  const isCurrentSong = currentSong?._id === song._id

  const handlePlay = () => {
    if (isCurrentSong) togglePlay()
    else setCurrentSong(song)
  }
  return (
    <Button
      size={"icon"}
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className='size-5 text-black' />
      ) : (
        <Play className='size-5 text-black' />
      )}
    </Button>
  );
};