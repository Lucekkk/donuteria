"use client";
import Image from "next/image";
import classes from "./three-products.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

import strawberry from "@/assets/strawberry.png";
import blueberry from "@/assets/blueberry.png";
import chocolate from "@/assets/chocolate.png";
const fruitsTable = [strawberry, blueberry, chocolate];

import leaf from "@/assets/leaf.png";
const leafTable = [leaf, leaf, leaf];

export default function ThreeProducts({ products }) {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [linkBackgroundColor, setLinkBackgroundColor] = useState("#EA7BBE");
  const [bg1, setBg1] = useState("rgba(240, 77, 104, 0.55)");
  const [bg2, setBg2] = useState("rgba(255, 255, 255, 1)");

 

  const donutHandler = (newIndex) => {
    if (isAnimating) return; // Zablokuj klikanie podczas animacji

    setIsAnimating(true);
    setActive(newIndex);

     
    if (newIndex === 0) {
      setLinkBackgroundColor("#EA7BBE");
      setBg1("rgba(240, 77, 104, 0.55)");
      setBg2("rgba(255, 255, 255, 1)");
    } else if (newIndex === 1) {
      setLinkBackgroundColor("#4ABAF0");
      setBg1("rgba(74, 186, 240, 0.8)");
      setBg2("rgba(255, 255, 255, 1)");
    } else {
      setLinkBackgroundColor("#974F2D");
      setBg1("rgba(151, 79, 45, 0.55)");
      setBg2("rgba(255, 255, 255, 1)");
    }
  };

  // Uaktualnij prevActive po tym jak animacja się skończy (1s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevActive(active);
      setIsAnimating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <>
      <main
        className={classes.main}
        style={{
          "--bg1": bg1,
          "--bg2": bg2,
        }}
      >
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

          <div className={classes.descriptionBox}>
            {products.map((product, index) => (
            <p
              key={product.id}
              className={
                index === active
                  ? `${classes.description} ${classes.active}`
                  : classes.description
              }
          >
            {product.opis}
          </p>
        ))}
          </div>

          <div className={classes.links}>
            <Link
              href="/"
              style={{ backgroundColor: `${linkBackgroundColor}` }}
            >
              Zamów teraz
            </Link>
            <Link
              href="/"
              style={{ backgroundColor: `${linkBackgroundColor}` }}
            >
              Więcej
            </Link>
          </div>

          <div className={classes.donutsBtnsContainer}>
            {products.map((prod, index) => (
              <button
                key={prod.id}
                onClick={() => donutHandler(index)}
                className={
                  index === active
                    ? `${classes.donutsBtn} ${classes.active}`
                    : classes.donutsBtn
                }
                disabled={isAnimating || prevActive === index}
              >
                <Image
                  src={prod.obrazek}
                  alt={prod.opis_obrazka}
                  priority
                  fill
                />
              </button>
            ))}
          </div>
        </div>
        <div className={classes.rightPanel}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`${classes.donutContainer} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }`}
            >
              <Image
                src={product.obrazek}
                alt={product.opis_obrazka}
                priority
                fill
              />
            </div>
          ))}

          {fruitsTable.map((fruit, index) => (
            <div
              key={index}
              className={`${classes.fruitOne} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={fruit.src} alt={"fruit"} priority fill />
            </div>
          ))}

          {fruitsTable.map((fruit, index) => (
            <div
              key={index}
              className={`${classes.fruitTwo} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={fruit.src} alt={"fruit"} priority fill />
            </div>
          ))}
          {fruitsTable.map((fruit, index) => (
            <div
              key={index}
              className={`${classes.fruitThree} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={fruit.src} alt={"fruit"} priority fill />
            </div>
          ))}
          {leafTable.map((leaf, index) => (
            <div
              key={index}
              className={`${classes.leafOne} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={leaf.src} alt={"leaf"} priority fill />
            </div>
          ))}
          {leafTable.map((leaf, index) => (
            <div
              key={index}
              className={`${classes.leafTwo} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={leaf.src} alt={"leaf"} priority fill />
            </div>
          ))}
        </div>
      </main>
      <section className={classes.section}>
        <h2>Co nas wyróżnia?</h2>
        <p>Rzemieślnicze donuty wypiekane codziennie</p>
        <p>Tradycyjna receptura</p>
        <p>Lokalna produkcja</p>
      </section>
    </>
  );
}
