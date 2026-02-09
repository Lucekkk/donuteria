import { getOrders } from "@/app/api/getOrders/route";
import UserOrders from "@/components/user-profile/userOrders/UserOrders";
import { getCurrentUser } from "@/lib/auth";



export default async function Orders(){
    const userData = await getCurrentUser();
    const orders = await getOrders(userData.userId, false);
   


    return( <UserOrders orders={orders}/>)
}