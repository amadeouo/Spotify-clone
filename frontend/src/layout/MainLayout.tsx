import { Outlet } from "react-router-dom";
import { Group, Panel, Separator } from "react-resizable-panels";
import { LeftSidebar } from "@/layout/components/LeftSidebar.tsx";

export const MainLayout = () => {
  const isMobile = false

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <Group
        orientation='horizontal'
        className='flex-1 flex h-full p-2'
      >
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

        <Separator className='w-2 rounded-lg transition-colors' />

        {/* right sidebar*/}
        <Panel
          defaultSize='20%'
          minSize='0%'
          maxSize='25%'
        >
          friends activity
        </Panel>
      </Group>
    </div>
  );
};