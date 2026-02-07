 
/* eslint-disable react/prop-types */
import { getCurrentUser } from "@/lib/auth";
import { getUser } from "@/app/api/getUser/route";
 
import UserEditData from "@/components/user-profile/userData/UserDataClient";

export default async function UserData() {
  

  const currentUser = await getCurrentUser();

//   if (!currentUser) redirect("/logowanie");

//   if (currentUser.userId.toString() !== id) {
//     redirect(`/profil/${currentUser.userId}`);
//   }

  const clientData = await getUser(currentUser?.userId);

 


  return <UserEditData currentUser={currentUser} clientData={clientData} />;
}

