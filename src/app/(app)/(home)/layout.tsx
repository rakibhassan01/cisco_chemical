import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
