function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <h2>{product.title}</h2>

      <p className="product-description">{product.description}</p>

      <p className="product-price">${product.price}</p>

      <span className={`product-status ${product.status.toLowerCase()}`}>
        {product.status}
      </span>
    </div>
  );
}

export default ProductCard;