import {
  Card, CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import { Music } from "lucide-react";
import { SongsTable } from "@/pages/admin/components/SongsTable.tsx";
import { AddSongDialog } from "@/pages/admin/components/AddSongDialog.tsx";

export const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <CardTitle className='flex items-center gap-2'>
              <Music className='size-5 text-emerald-500'/>
              Songs library
            </CardTitle>
            <CardDescription>Manage your music tracks</CardDescription>
          </div>
          <AddSongDialog />
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  )
}