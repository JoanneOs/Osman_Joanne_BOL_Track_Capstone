import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Trucking BOL</Link>
      <div className="nav-links">
        <Link to="/bols" className="nav-link">All BOLs</Link>
        <Link to="/bols/add" className="nav-link">Add New</Link>
      </div>
    </nav>
  );
}