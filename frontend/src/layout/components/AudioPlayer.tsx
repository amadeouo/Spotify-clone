import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore.ts";

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null)
  const { currentSong, isPlaying, playNext } = usePlayerStore()

  // to handle play/pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play()
    else audioRef.current?.pause()
  }, [isPlaying])

  // handle song ends
  useEffect(() => {
    const audioElement = audioRef.current

    const handleEnded = () => {
      playNext()
    }

    audioElement?.addEventListener("ended", handleEnded)

    return () => audioElement?.removeEventListener("ended", handleEnded)
  }, [playNext]);

  // handle song change
  useEffect(() => {
    if (!audioRef.current || !currentSong) return
    const audioElement = audioRef.current

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl
    if (isSongChange) {
      audioElement.src = currentSong?.audioUrl
      // reset the playback position
      audioElement.currentTime = 0

      prevSongRef.current = currentSong?.audioUrl
      if (isPlaying) audioElement.play()
    }
  }, [currentSong, isPlaying])

  return (
    <audio ref={audioRef} />
  );
};