import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        BOL Tracker
      </Link>
      
      <div className="nav-links">
        <Link to="/bols" className="nav-link">
          All BOLs
        </Link>
        <Link to="/bols/add" className="nav-link add-new">
          Add New
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;