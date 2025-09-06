import { ProductsView } from "@/modules/products/ui/views/product-view";
import HeroBanner from "../components/hero-banner";
import { ProductsHeader } from "@/modules/products/ui/components/products-header";
import { CTA } from "@/modules/products/ui/components/CTA";

export const HomeView = () => {
  return (
    <>
      <HeroBanner />
      <ProductsHeader />
      <ProductsView />
      <CTA />
    </>
  );
};
