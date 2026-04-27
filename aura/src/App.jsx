import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Trending from "./pages/Trending";
import CaptionGenerator from "./pages/CaptionGenerator";
import HashtagGenerator from "./pages/HashtagGenerator";
import Analytics from "./pages/Analytics";
import Ideas from "./pages/Ideas";
import Pricing from "./pages/Pricing";
import Features from "./components/Features";

export default function App(){
return(
<BrowserRouter>
<Routes>
<Route path='/' element={<Home/>}/>
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
)
}