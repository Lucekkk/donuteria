import UserCurrency from "@/components/user-profile/userCurrency/UserCurrency";
import { getCurrentUser } from "@/lib/auth";

export default async function Donuts(){
    const currentUser = await getCurrentUser();


    return <UserCurrency currentUser={currentUser}/>
}