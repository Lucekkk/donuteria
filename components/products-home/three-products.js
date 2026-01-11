'use client';
import Image from "next/image";
import classes from "./three-products.module.css";
import { useState } from "react";
import Link from "next/link";
 

export default function ThreeProducts({products}){
     const [active, setActive] = useState(0);
     const [description, setDescription] = useState(
    products.map((product, index) => (
      <p
        key={product.id}
        className={
          index === 0
            ? `${classes.description} ${classes.active}`
            : classes.description
        }
      >
        {product.opis}
      </p>
    ))
  );

  const donutHandler = (newIndex) => {
    setActive(newIndex);

    setDescription(
      products.map((product, index) => (
        <p
          key={product.id}
          className={
            index === newIndex
              ? `${classes.description} ${classes.active}`
              : classes.description
          }
        >
          {product.opis}
        </p>
      ))
    );
  };
    return(
         

      <main className={classes.main}>
        <div className={classes.leftPanel}>
            <div className={classes.viewport}>
                <div
                className={classes.slider}
                style={{ transform: `translateY(-${active * 150}px)` }}
                >
                    {products.map(product => (
                        <h1 key={product.id} className={`${classes.slide} ${'balooFont'}`}>{product.nazwa}</h1>
                    ))}
                </div>
            </div>

             <div className={classes.descriptionBox}>
                {description}
             </div>

             <div className={classes.links}>
                <Link href='/'>Zamów teraz</Link>
                <Link href='/'>Więcej</Link>
             </div>

            <div className={classes.donutsBtnsContainer}>
                    {products.map((prod, index) => (
                        <button key={prod.id} onClick={() => donutHandler(index)}>
                            <Image src={prod.obrazek} alt={prod.opis_obrazka} priority fill/>
                        </button>
                    ))}
            </div>
            
        </div>
        <div className={classes.rightPanel}></div>

      </main>
   
    )
}