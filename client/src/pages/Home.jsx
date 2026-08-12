import products from "../data/products";
import ProductGrid from "../components/ProductGrid";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <h1>Antler Website</h1>

        <ProductGrid products={products} />
      </main>
    </>
  );
}

export default Home;
