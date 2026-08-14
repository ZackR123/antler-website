import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ProductImageModal from "../components/ProductImageModal";

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }

    loadProducts();
  }, []);
  return (
    <>
      <Hero />

      <main>
        <section id="products">
          <h2>Featured Antlers</h2>
          <ProductGrid products={products} onImageClick={setSelectedProduct} />
          <ProductImageModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </section>

        <AboutSection />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default Home;
