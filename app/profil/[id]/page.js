/* eslint-disable react/prop-types */
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
 
import ProfileAuthRefresh from "@/components/ProfileAuthRefresh";
 

export default async function UserProfile({ params }) {
  const { id } = await params;

  // Get current authenticated user
  const currentUser = await getCurrentUser();

  // This shouldn't happen due to middleware, but as a safety check
  if (!currentUser) {
    redirect("/logowanie");
  }

  // Double-check that the user is accessing their own profile
  if (currentUser.userId.toString() !== id) {
    redirect(`/profil/${currentUser.userId}`);
  }

  return (
    <>
    <div>
    <ProfileAuthRefresh />
          <h1>Udało ci się zalogować!</h1>
          <p>Twoje ID: {id}</p>
          <p>Login: {currentUser.login}</p>
          <p>Email: {currentUser.email}</p>
        

        
    </div>
     
    </>
  );
}
