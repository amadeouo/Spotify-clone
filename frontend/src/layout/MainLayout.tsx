import { Outlet } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import { LeftSidebar } from "@/layout/components/LeftSidebar.tsx";
import { FriendsActivity } from "@/layout/components/FriendsActivity.tsx";
import { AudioPlayer } from "@/layout/components/AudioPlayer.tsx";
import { PlaybackControls } from "@/layout/components/PlaybackControls.tsx";
import { useEffect, useState } from "react";

export const MainLayout = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <Group
        orientation='horizontal'
        className='flex-1 flex h-full p-2'
      >
        <AudioPlayer />
        {/* left sidebar */}
        <Panel
          defaultSize='20%'
          minSize={isMobile ? '0%' : '10%'}
          maxSize='30%'
        >
          <LeftSidebar />
        </Panel>

        <Separator className='w-2 rounded-lg transition-colors outline-0' />

        <Panel
          defaultSize={isMobile ? '80%' : '60%'}
        >
          <Outlet />
        </Panel>

        {!isMobile && (
          <>
            <Separator className='w-2 rounded-lg transition-colors outline-0' />

            {/* right sidebar*/}
            <Panel
              defaultSize='20%'
              minSize='0%'
              maxSize='25%'
            >
              <FriendsActivity />
            </Panel>
          </>
        )}
      </Group>
      <PlaybackControls />
    </div>
  );
};