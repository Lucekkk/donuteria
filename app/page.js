// import Counter from "@/components/Counter";
import {getThreeProducts} from "@/app/api/threeProducts/route";
import Image from "next/image";
import classes from "./page.module.css";

export default async function Home() {
  const products = await getThreeProducts();

  return( 
        
    <>
      {/* <Counter /> */}
      <div>
          {products.map(product => (
            <div key={product.id}>
                <p>{product.nazwa}</p>
                <p>{product.opis}</p>
                <div className={classes['div-image']}>
                  <Image src={product.obrazek} alt={product.opis_obrazka} sizes="(max-width: 768px) 100vw, 33vw" fill priority/>
                </div>
            </div>
          ))}
      </div>
    </>
    
    );
}
