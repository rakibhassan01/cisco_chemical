import { Suspense } from "react";
import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Navbar />
      </Suspense>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </>
  );
}
