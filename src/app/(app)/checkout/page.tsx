import { CheckoutView } from "@/modules/checkout/ui/views/checkout-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Cisco Chemical",
  description: "Complete your purchase securely.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
