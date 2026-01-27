import { getCurrentUser } from "@/modules/auth/actions";
import { ProfileView } from "@/modules/auth/ui/views/profile-view";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <ProfileView user={user} />;
}
