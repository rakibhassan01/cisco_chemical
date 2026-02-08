import { Suspense } from "react";
import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import { BottomNav } from "@/modules/home/ui/components/bottom-nav";
import { getCurrentUser } from "@/modules/auth/actions";
import { User as UserType } from "@/payload-types";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Navbar user={user as UserType} />
      </Suspense>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">{children}</div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
}
