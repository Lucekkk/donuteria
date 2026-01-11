// import Counter from "@/components/Counter";
import {getThreeProducts} from "@/app/api/threeProducts/route";
import Image from "next/image";
import classes from "./page.module.css";
import ThreeProducts from "@/components/products-home/three-products";
import { Suspense } from "react";


async function HomeProducts(){
   const products = await getThreeProducts();
    return <ThreeProducts products={products}/>

}

export default function Home() {
 

  return( 
        
    <Suspense fallback={<div className={classes.container}><p className={classes.loading}>Oczekiwanie<span className={classes.span}>. . . .</span></p></div>}>
       <HomeProducts/>
    </Suspense>
    
    );
}
