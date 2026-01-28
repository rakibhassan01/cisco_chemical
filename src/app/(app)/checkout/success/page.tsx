"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 text-green-600"
      >
        <CheckCircle2 className="w-12 h-12" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4 max-w-md mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-gray-500 text-lg">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700 h-12 px-8 rounded-xl text-base font-bold shadow-lg shadow-green-600/20">
            <Link href="/products">
              Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-12 px-8 rounded-xl text-base font-medium border-gray-200">
            <Link href="/dashboard">
              View Order Status
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
