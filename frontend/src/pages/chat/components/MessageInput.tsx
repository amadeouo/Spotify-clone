import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "@/stores/useChatStore.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Send } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export const MessageInput = () => {
  const [newMessage, setNewMessage] = useState<string>('')
  const { user } = useUser()
  const { selectedUser, sendMessage } = useChatStore(useShallow((state) => ({
    selectedUser: state.selectedUser,
    sendMessage: state.sendMessage,
  })))

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage) return
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim())
    setNewMessage("");
  }

  return (
    <div className='p-4 mt-auto border-t border-zinc-800'>
      <div className='flex gap-2'>
        <Input
          placeholder='Type a message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='bg-zinc-800 bg-none'
          onKeyDown={(e) => e.key === "Enter" && handleSend() }
        />
        <Button
          size={'icon'}
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className='bg-green-500 hover:bg-green-400 cursor-pointer'
        >
          <Send className='size-4'/>
        </Button>
      </div>
    </div>
  )
}