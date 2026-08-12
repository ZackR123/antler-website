import products from "../data/products";
import ProductGrid from "../components/ProductGrid";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <>

      <Hero />

      <main>
        <section id="products">
          <h2>Featured Antlers</h2>
          <ProductGrid products={products} />
        </section>

        <AboutSection />

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default Home;
