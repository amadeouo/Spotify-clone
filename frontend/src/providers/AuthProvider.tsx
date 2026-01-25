import { useAuth } from "@clerk/clerk-react";
import { type ReactNode, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios.ts";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useChatStore } from "@/stores/useChatStore.ts";
import { useShallow } from "zustand/react/shallow";

const updateApiToken = (token: string | null) => {
  if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  else delete axiosInstance.defaults.headers.common["Authorization"];
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {getToken, userId} = useAuth()
  const [loading, setLoading] = useState(true)
  const checkAdminStatus = useAuthStore(state => state.checkAdminStatus)

  const { initSocket, disconnectSocket} = useChatStore(
    useShallow((state) => ({
      initSocket: state.initSocket,
      disconnectSocket: state.disconnectSocket
    }))
  )

  useEffect(() => {
    const initAuth = async() => {
      try {
        const token = await getToken();
        updateApiToken(token)
        if (token) {
          await checkAdminStatus()
          if (userId) initSocket(userId)
        }
      } catch (error) {
        updateApiToken(null)
        console.log("Error in AuthProvider", error);
      } finally {
        setLoading(false)
      }
    }

    initAuth();

    // clean up
    return () => disconnectSocket()
  }, [getToken, checkAdminStatus, initSocket, userId, disconnectSocket])

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className='size-8 text-emerald-500 animate-spin'/>
    </div>
  )

  return (
    <div>
      {children}
    </div>
  );
};