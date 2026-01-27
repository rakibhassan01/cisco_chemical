import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { getCurrentUser } from "@/modules/auth/actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SignUpPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <SignUpView />;
};

export default SignUpPage;
