import products from "../data/products";
import ProductGrid from "../components/ProductGrid";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useState } from "react";
import ProductImageModal from "../components/ProductImageModal";

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
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
