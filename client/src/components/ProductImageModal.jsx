import { useEffect, useState } from "react";

function ProductImageModal({ product, onClose }) {
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (product) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) {
    return null;
  }

  function handleMouseMove(event) {
    const image = event.currentTarget;
    const rect = image.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  }

  return (
    <div className="image-modal" onClick={onClose}>
      <div
        className="image-modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="image-modal-close"
          onClick={onClose}
          aria-label="Close image"
        >
          ×
        </button>

        <div className="image-zoom-source">
          <img
            src={product.image}
            alt={product.title}
            className="image-modal-image"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          />
          {isZooming && (
            <div
              className="image-zoom-panel"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          )}

          <p className="zoom-hint">Hover image to zoom</p>
        </div>

        <div className="image-modal-details">
          <h2>{product.title}</h2>

          <p className="image-modal-description">{product.description}</p>

          <p className="product-price">${product.price}</p>

          <span className={`product-status ${product.status.toLowerCase()}`}>
            {product.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductImageModal;
