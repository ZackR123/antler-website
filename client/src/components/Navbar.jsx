function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Antler Website</h2>
      </div>

      <div className="navbar-links">
        <a href="#products" className="nav-button">
          Products
        </a>

        <a href="#about" className="nav-button">
          About
        </a>

        <a href="#contact" className="nav-button">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;