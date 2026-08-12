import products from "../data/products";
import ProductGrid from "../components/ProductGrid";

function Home() {
  return (
    <main>
      <h1>Antler Website</h1>
      <p>Creating Individual or Sets of Cabinet Knobs | Kitchen Knobs | Kitchen Cabinet Pulls | Furniture Pulls | Drawer Pulls</p>
      <ProductGrid products={products} />
    </main>
  );
}

export default Home;