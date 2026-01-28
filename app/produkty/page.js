import Image from 'next/image';
import classes from './products.module.css';
import { getAllProducts } from "../api/allProducts/route";

import ProductsGrid from "@/components/products/Products-grid";
import { Suspense } from 'react';
import Fallback from '@/components/fallback/Fallback';

import shopLeft from '@/assets/localization/shop1.png';
import shopRight from '@/assets/localization/shop2.jpg';

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
                        <a href={'#firstProd'} className={classes.link}>dodaj do koszyka na to co masz ochotę i ciesz się smakiem</a>
                        <p>albo</p>
                        <a href={'#localization'} className={classes.link}>odwiedź nasze punkty stacjonarnie i pozwól sobie na słodki moment</a>
                    </div>
            </section>
            <Suspense fallback={<Fallback />}>
             <ProdsDonuts />
            </Suspense>

            <section className={classes.localization} id="localization">
                    <div className={classes.localizationHeader}>
                        <h1>Nasze lokalizacje</h1>
                    </div>
                    <div className={classes.shopsCardContainer}>
                        <div className={classes.card}>
                            <div className={classes.ImgContainer}>
                                <Image src={shopLeft}  alt='shop with donuts' fill/>
                            </div>
                            <p>ul. Nowe Osiedla 15</p>
                                <p>70-226 Łódź</p>
                                <p>653 298 120</p>
                        </div>

                        <div className={classes.card}>
                            <div className={classes.ImgContainer}>
                                <Image src={shopRight} alt='shop with donuts' fill/>
                            </div>
                            <p>ul. Jana Pawła 33/5</p>
                                <p>08-287 Warszawa</p>
                                <p>765 345 781</p>
                        </div>
                    </div>
            </section>
       </main>
        
         
    )
}