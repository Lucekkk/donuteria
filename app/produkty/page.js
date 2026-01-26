 
import classes from './products.module.css';
import { getAllProducts } from "../api/allProducts/route";

import ProductsGrid from "@/components/products/Products-grid";
import { Suspense } from 'react';
import Fallback from '@/components/fallback/Fallback';

 export async function ProdsDonuts(){
     const prods = await getAllProducts();
        return <ProductsGrid prods={prods}/>

}


 export default function Produkty(){
    return(
       <main className={classes.main}>
            <section className={classes.section}>       
                    <div>
                        <h1>Chwila słodyczy zaczyna się tutaj...</h1>
                    </div>
                    <div className={classes.linkSection}>
                        <a href={'#first'} className={classes.link}>dodaj do koszyka na to co masz ochotę i ciesz się smakiem</a>
                        <p>albo</p>
                        <a className={classes.link}>odwiedź nasze punkty stacjonarnie i pozwól sobie na słodki moment</a>
                    </div>
            </section>
            <Suspense fallback={<Fallback />}>
             <ProdsDonuts />
            </Suspense>
       </main>
        
         
    )
}