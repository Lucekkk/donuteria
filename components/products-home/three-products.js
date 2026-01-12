"use client";
import Image from "next/image";
import classes from "./three-products.module.css";
import { useState } from "react";
import Link from "next/link";

export default function ThreeProducts({ products }) {
  const [active, setActive] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#EA7BBE");
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
  const [donutBtn, setDonutBtn] = useState(
    products.map((prod, index) => (
      <button
        key={prod.id}
        onClick={() => donutHandler(index)}
        className={
          index === 0
            ? `${classes.donutsBtn} ${classes.active}`
            : classes.donutsBtn
        }
      >
        <Image src={prod.obrazek} alt={prod.opis_obrazka} priority fill />
      </button>
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
    if (newIndex === 0) {
      setBackgroundColor("#EA7BBE");
    } else if (newIndex === 1) {
      setBackgroundColor("#4ABAF0");
    } else {
      setBackgroundColor("#974F2D");
    }

    setDonutBtn(
      products.map((prod, index) => (
        <button
          key={prod.id}
          onClick={() => donutHandler(index)}
          className={
            index === newIndex
              ? `${classes.donutsBtn} ${classes.active}`
              : classes.donutsBtn
          }
        >
          <Image src={prod.obrazek} alt={prod.opis_obrazka} priority fill />
        </button>
      ))
    );
  };
  return (
    <main className={classes.main}>
      <div className={classes.leftPanel}>
        <div className={classes.viewport}>
          <div
            className={classes.slider}
            style={{ transform: `translateY(-${active * 150}px)` }}
          >
            {products.map((product) => (
              <h1
                key={product.id}
                className={`${classes.slide} ${"balooFont"}`}
              >
                {product.nazwa}
              </h1>
            ))}
          </div>
        </div>

        <div className={classes.descriptionBox}>{description}</div>

        <div className={classes.links}>
          <Link href="/" style={{ backgroundColor: `${backgroundColor}` }}>
            Zamów teraz
          </Link>
          <Link href="/" style={{ backgroundColor: `${backgroundColor}` }}>
            Więcej
          </Link>
        </div>

        <div className={classes.donutsBtnsContainer}>{donutBtn}</div>
      </div>
      <div className={classes.rightPanel}>
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`${classes.donutContainer} ${ index === active ? classes.active : ""}`}
          >
            <Image src={product.obrazek} alt={product.opis_obrazka} priority fill/>
          </div>
        ))}
      </div>
    </main>
  );
}
