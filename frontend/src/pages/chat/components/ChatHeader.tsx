import { useChatStore } from "@/stores/useChatStore.ts";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { AvatarFallback } from "@radix-ui/react-avatar";

export const ChatHeader = () => {
  const {selectedUser, onlineUsers} = useChatStore()

  if (!selectedUser) return null;

  return (
    <header className='p-4 border-b bg-zinc-800'>
      <div className='flex items-center gap-3'>
        <Avatar>
          <AvatarImage
            src={selectedUser.imageUrl}
            alt={selectedUser.fullName}
          />
          <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='font-medium'>{selectedUser.fullName}</h2>
          <p className='text-sm text-zinc-400'>
            {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </header>
  )
}