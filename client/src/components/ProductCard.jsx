function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>${product.price}</p>

      <p>{product.status}</p>
    </div>
  );
}

export default ProductCard;
