import { Routes, Route } from 'react-router-dom'
import { HomePage } from "@/page/home/HomePage.tsx";
import { AuthCallbackPage } from "@/page/auth-callback/AuthCallbackPage.tsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/sso-callback'
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'}/>}
        />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
      </Routes>
    </>
  )
}

export default App
