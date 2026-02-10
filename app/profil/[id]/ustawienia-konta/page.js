import { getCurrentUser } from "@/lib/auth";
import UserSettingsClient from "@/components/user-profile/userSettings/UserSettingsClient";
import { redirect } from "next/navigation";

export default async function ProfileSettings() {
  const currentUser = await getCurrentUser();

  if (currentUser?.role === "admin") {
    return redirect(`/profil/${currentUser.userId}`);
  }

  return <UserSettingsClient currentUser={currentUser} />;
}
