// import Counter from "@/components/Counter";
import {getThreeProducts} from "@/app/api/threeProducts/route";
import ThreeProducts from "@/components/products-home/Three-products";
import { Suspense } from "react";
import Fallback from "@/components/fallback/Fallback";


async function HomeProducts(){
   const products = await getThreeProducts();
    return <ThreeProducts products={products}/>

}

export default function Home() {
 

  return( 
        
    <Suspense fallback={<Fallback/>}>
       <HomeProducts/>
    </Suspense>
    
    );
}
