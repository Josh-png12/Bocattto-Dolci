import { useRef } from "react";
import { CartProvider } from "./cart/CartContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StickyOrderBar } from "./components/StickyOrderBar";
import { ProductSheet } from "./components/ProductSheet";
import { CartDrawer } from "./components/CartDrawer";
import { AddedToast } from "./components/AddedToast";
import { WhatsAppQuick } from "./components/WhatsAppQuick";
import { Hero } from "./sections/Hero";
import { FlavorExplorer } from "./sections/FlavorExplorer";
import { Anatomy } from "./sections/Anatomy";
import { Occasions } from "./sections/Occasions";
import { CravingQuiz } from "./sections/CravingQuiz";
import { Menu } from "./sections/Menu";
import { HowToOrder } from "./sections/HowToOrder";
import { useScrolledPast } from "./lib/useInView";

export default function App() {
  const heroSentinel = useRef<HTMLDivElement>(null);
  const pastHero = useScrolledPast(heroSentinel);

  return (
    <CartProvider>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <div ref={heroSentinel} aria-hidden="true" className="h-px" />
        <FlavorExplorer />
        <Anatomy />
        <Occasions />
        <CravingQuiz />
        <Menu />
        <HowToOrder />
      </main>
      <Footer />
      <StickyOrderBar show={pastHero} />
      <WhatsAppQuick />
      <AddedToast />
      <ProductSheet />
      <CartDrawer />
    </CartProvider>
  );
}
