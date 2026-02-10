import UserCurrency from "@/components/user-profile/userCurrency/UserCurrency";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Donuts() {
  const currentUser = await getCurrentUser();

  let donutPoints = currentUser?.donutPoints ?? 0;
  if (currentUser?.userId) {
    const [rows] = await db.query(
      "SELECT punkty FROM uzytkownicy WHERE id = ?",
      [currentUser.userId],
    );
    donutPoints = rows?.[0]?.punkty ?? donutPoints;
  }

  const userWithPoints = {
    ...currentUser,
    donutPoints,
  };

  return <UserCurrency currentUser={userWithPoints} />;
}
