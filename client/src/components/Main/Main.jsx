import { Routes, Route } from "react-router-dom";

import Home from './Home/Home';
import Search from './Search/Search';
import Favorites from './Favorites/Favorites';

const Main = () => {
  return (
  <main>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/favorites" element={<Favorites/>}/>
    </Routes>
  </main>
  )
};

export default Main;