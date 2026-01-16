import { Routes, Route } from 'react-router-dom'
import { HomePage } from "@/page/home/HomePage.tsx";
import { AuthCallbackPage } from "@/page/auth-callback/AuthCallbackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { MainLayout } from "@/layout/MainLayout.tsx";
import { ChatPage } from "@/page/chat/ChatPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/sso-callback'
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'}/>}
        />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route path='' element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
