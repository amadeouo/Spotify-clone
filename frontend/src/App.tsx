import { Routes, Route } from 'react-router-dom'
import { HomePage } from "@/page/home/HomePage.tsx";
import { AuthCallbackPage } from "@/page/auth-callback/AuthCallbackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { MainLayout } from "@/layout/MainLayout.tsx";
import { ChatPage } from "@/page/chat/ChatPage.tsx";
import { AlbumPage } from "@/page/album/AlbumPage.tsx";
import { AdminPage } from "@/page/admin/AdminPage.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/sso-callback'
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'}/>}
        />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route path='/admin' element={<AdminPage />}></Route>

        <Route path='' element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/album/:albumId' element={<AlbumPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  )
}

export default App
