"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoiceTemplate } from "./invoice-template";
import { Order as OrderType } from "@/payload-types";
import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DownloadInvoiceProps {
  order: OrderType;
  user: {
    name?: string | null;
    email: string;
  };
}

export const DownloadInvoice = ({ order, user }: DownloadInvoiceProps) => {
  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch by only rendering PDFDownloadLink on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button disabled className="p-2 text-gray-300">
        <Loader2 className="w-5 h-5 animate-spin" />
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<InvoiceTemplate order={order} user={user} />}
      fileName={`invoice-${String(order.id).slice(-8).toUpperCase()}.pdf`}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          className={`p-2 rounded-lg transition-all ${
            loading 
              ? "text-gray-300 cursor-not-allowed" 
              : "text-gray-400 hover:text-green-600 hover:bg-green-50"
          }`}
          title="Download Invoice PDF"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
        </button>
      )}
    </PDFDownloadLink>
  );
};
