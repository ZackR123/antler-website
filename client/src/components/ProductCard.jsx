function ProductCard({ product, onImageClick }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        onClick={() => onImageClick(product)}
      />

      <h2>{product.title}</h2>


      <p className="product-price">${product.price}</p>

      <span className={`product-status ${product.status.toLowerCase()}`}>
        {product.status}
      </span>
    </div>
  );
}

export default ProductCard;
