import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h1>Quality Antlers Available</h1>

      <p>Browse naturally shed antlers currently available for sale.</p>

      <div className="hero-categories">
        <Link to="/products?category=kitchen-knobs">Kitchen Knobs | </Link>

        <Link to="/products?category=kitchen">Kitchen | </Link>

        <Link to="/products?category=cabinet-pulls">Cabinet Pulls | </Link>

        <Link to="/products?category=furniture-pulls">Furniture Pulls | </Link>

        <Link to="/products?category=drawer-pulls">Drawer Pulls</Link>
      </div>

      <Link to="/products" className="hero-button">
        View Available Antlers
      </Link>
    </section>
  );
}

export default Hero;