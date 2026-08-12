import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h2>Antler Website</h2>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/products" className="nav-button">
          Products
        </Link>

        <Link to="/#about" className="nav-button">
          About
        </Link>

        <Link to="/#contact" className="nav-button">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;