import products from "./data/products";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div>
      <h1>Antler Website</h1>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;