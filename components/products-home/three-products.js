/* eslint-disable react/prop-types */
"use client";
import Image from "next/image";
import classes from "./three-products.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
 
import CustomerCard from "./customer-card/CustomerCard";
import FruitsAndLeaves from "./fruits-and-leaves/FruitsAndLeaves";

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

          <FruitsAndLeaves active={active} prevActive={prevActive} className={'fruitOne'} tableName={'fruitsTable'}/>
          <FruitsAndLeaves active={active} prevActive={prevActive} className={'fruitTwo'} tableName={'fruitsTable'}/>
          <FruitsAndLeaves active={active} prevActive={prevActive} className={'fruitThree'} tableName={'fruitsTable'}/>
          <FruitsAndLeaves active={active} prevActive={prevActive} className={'leafOne'} tableName={'leafTable'}/>
          <FruitsAndLeaves active={active} prevActive={prevActive} className={'leafTwo'} tableName={'leafTable'}/>
          
        </div>
      </main>
      <section className={classes.section}>
        <h2>Co nas wyróżnia?</h2>
        <p>Rzemieślnicze donuty wypiekane codziennie</p>
        <p>Tradycyjna receptura</p>
        <p>Lokalna produkcja</p>
      </section>
      <section className={classes.sectionClients}>
          <h1>Opinie naszych klientów:</h1>

          <div className={classes.customersBox}>
            <CustomerCard index={0} alt={'customer woman'} name={'Kamila'} opinion={'„Najlepsze donuty jakie jadłam w życiu. Wrócę na pewno.”'}/>
            <CustomerCard index={1} alt={'customer man'} name={'Marcin'} opinion={'„Rewelacyjne donuty, a obsługa bardzo miła. Zawsze bardzo pomocni.”'}/>
            <CustomerCard index={2} alt={'customer woman'} name={'Kasia'} opinion={'„Czuć naturalne składniki. Zdecydowanie polecam!”'}/>
          </div>
          
          
      </section>
    </>
  );
}
