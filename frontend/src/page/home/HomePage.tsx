import { Topbar } from "@/components/Topbar.tsx";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import { useEffect } from "react";
import { FeaturedSection } from "@/page/home/components/FeaturedSection.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { SectionGrid } from "@/page/home/components/SectionGrid.tsx";

export const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
    trendingSongs,
    madeForYouSongs,
    isLoading,
  } = useMusicStore()

  useEffect(() => {
    fetchFeaturedSongs()
    fetchTrendingSongs()
    fetchMadeForYouSongs()
  }, [fetchMadeForYouSongs, fetchTrendingSongs, fetchFeaturedSongs])

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