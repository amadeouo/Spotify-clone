import { useAuthStore } from "@/stores/useAuthStore.ts";
import { Header } from "@/pages/admin/components/Header.tsx";
import { DashboardStats } from "@/pages/admin/components/DashboardStats.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs.tsx";
import { Album, Loader, Music } from "lucide-react";
import { SongsTabContent } from "@/pages/admin/components/SongsTabContent.tsx";
import { AlbumsTabContent } from "@/pages/admin/components/AlbumsTabContent.tsx";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore.ts";

export const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore()
  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore()

  useEffect(() => {
    fetchAlbums()
    fetchSongs()
    fetchStats()
  }, [fetchAlbums, fetchSongs, fetchStats])

  if (isLoading) return <Loader className='size-8 text-emerald-500 animate-spin'/>

  if(!isAdmin) return <div>Unauthorized</div>

  return (
    <div
      className='min-h-screen bg-gradient-to-b from-zinc-900
      via-zinc-900 to-black text-zinc-100 p-8'
    >
      <Header />
      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className='p-1 bg-zinc-800/50'>
          <TabsTrigger value="songs" className='data-[state=active]:bg-zinc-700 hover:cursor-pointer'>
            <Music className='mr-2 size-4' />
            <span>Songs</span>
          </TabsTrigger>
          <TabsTrigger value="albums" className='data-[state=active]:bg-zinc-700 hover:cursor-pointer'>
            <Album className='mr-2 size-4' />
            <span>Albums</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='songs'>
          <SongsTabContent />
        </TabsContent>
        <TabsContent value='albums'>
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};