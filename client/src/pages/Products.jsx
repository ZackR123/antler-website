import { useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";
import { useState } from "react";
import ProductImageModal from "../components/ProductImageModal";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const category = searchParams.get("category");

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: selectedCategory });
    }
  }

  return (
    <main>
      <h1>Available Antlers</h1>

      <div className="product-controls">
        <label htmlFor="category-filter">Filter by category:</label>

        <select
          id="category-filter"
          value={category || "all"}
          onChange={handleCategoryChange}
        >
          <option value="all">All Products</option>
          <option value="kitchen-knobs">Kitchen Knobs</option>
          <option value="kitchen">Kitchen</option>
          <option value="cabinet-pulls">Cabinet Pulls</option>
          <option value="furniture-pulls">Furniture Pulls</option>
          <option value="drawer-pulls">Drawer Pulls</option>
        </select>

        {category && (
          <button onClick={() => setSearchParams({})}>View All Products</button>
        )}
      </div>

      <ProductGrid
        products={filteredProducts}
        onImageClick={setSelectedProduct}
      />
      <ProductImageModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

export default Products;
