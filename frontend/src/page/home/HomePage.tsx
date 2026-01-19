import { Topbar } from "@/components/Topbar.tsx";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";
import { FeaturedSection } from "@/page/home/components/FeaturedSection.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { SectionGrid } from "@/page/home/components/SectionGrid.tsx";
import { usePlayerStore } from "@/stores/usePlayerStore.ts";

export const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
    featuredSongs,
    trendingSongs,
    madeForYouSongs,
    isLoading,
  } = useMusicStore()

  const { initQueue } = usePlayerStore()

  useEffect(() => {
    fetchFeaturedSongs()
    fetchTrendingSongs()
    fetchMadeForYouSongs()
  }, [fetchMadeForYouSongs, fetchTrendingSongs, fetchFeaturedSongs])

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0 ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs]
      initQueue(allSongs)
    }
  }, [initQueue, featuredSongs, madeForYouSongs, trendingSongs])

  return (
    <main className='rounded-md overflow-hiddend h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <Topbar />
      <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>
            Good afternoon
          </h1>
          <FeaturedSection />

          <div className='space-y-8'>
            <SectionGrid title='Made for you' songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};