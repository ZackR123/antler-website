import ProductCard from "./ProductCard";

function ProductGrid({ products, onImageClick }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
