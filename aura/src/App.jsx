import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Trending from "./pages/Trending";
import CaptionGenerator from "./pages/CaptionGenerator";
import HashtagGenerator from "./pages/HashtagGenerator";
import Analytics from "./pages/Analytics";
import Ideas from "./pages/Ideas";
import Pricing from "./pages/Pricing";
import Features from "./components/Features";
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "127598352106-adpa2rmdnsg2ngda3va7b6gn31iabpsi.apps.googleusercontent.com";
  function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/dashboard" replace /> : children;
}
export default function App(){
return(
   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
<BrowserRouter>
<Routes>
<Route path='/' element={<Home/>}/>
 <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/trending' element={<Trending/>}/>
<Route path='/captions' element={<CaptionGenerator/>}/>
<Route path='/hashtags' element={<HashtagGenerator/>}/>
<Route path='/analytics' element={<Analytics/>}/>
<Route path='/ideas' element={<Ideas/>}/>
<Route path='/pricing' element={<Pricing/>}/>
<Route path='/features' element={<Features/>}/>
</Routes>
</BrowserRouter>
</AuthProvider>
</GoogleOAuthProvider>
);
}