import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { getCurrentUser } from "@/modules/auth/actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SignInPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <SignInView />;
};

export default SignInPage;
