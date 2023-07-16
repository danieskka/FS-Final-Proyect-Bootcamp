import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search Harry Potter Info</Link></li>
        <li><Link to="/favorites">Check your Favorites</Link></li>
      </ul>
    </nav>
  )
};

export default NavBar;
