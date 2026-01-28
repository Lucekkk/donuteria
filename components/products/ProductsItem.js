"use client";
 
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/shopping-cart-slice";
import Image from "next/image";
import classes from "./ProductsItem.module.css";
import groceryCartImg from "@/assets/grocery-store.png";

export default function ProductsItem({
  id,
  prodTitle,
  price,
  description,
  image,
  imageDescription,
  waitingTime,
  packaging,
  quantityPerPackage,
  weight,
  ingredients,
  allergens,
  additionalInfo,
}) {
  const dispatch = useDispatch();


  const btnHandler = () => {
    dispatch(
      cartActions.addProduct({
        idProduct: id,
        prodTitle,
        price,
        image,
        imageDescription,
      }),
    );
  };

  let backgroundColor = null;
  let boxShadow = null;
  if (id === 1) {
    backgroundColor = "#EA7BBE";
    boxShadow = "-6px 0 10px -3px #EA7BBE, 0 -6px 10px -3px #EA7BBE";
  } else if (id === 3) {
    backgroundColor = "#4ABAF0";
    boxShadow = "-6px 0 10px -3px #4ABAF0, 0 -6px 10px -3px #4ABAF0";
  } else if (id === 4) {
    backgroundColor = "#974F2D";
    boxShadow = "-6px 0 10px -3px #974F2D, 0 -6px 10px -3px #974F2D";
  }

  return (
    <article className={classes.article} style={{ boxShadow: `${boxShadow}` }}>
      <div className={classes.ImgContainer}>
        <Image src={image} alt={imageDescription} fill />
      </div>
      <div className={classes.productTextContainer}>
        <h2>{prodTitle}</h2>
        <p className={classes.description}>{description}</p>
        <h3 className={classes.price}>{price}zł /szt.</h3>
        <div className={classes.productBtnContainer}>
          <button
            style={{ backgroundColor: `${backgroundColor}` }}
            onClick={btnHandler}
          >
            <span>
              <Image
                src={groceryCartImg}
                alt="shopping cart icon"
                priority={id === 1 ? true : false}
                fill
              />
            </span>
            <p>Dodaj do koszyka</p>
          </button>
        </div>
        <p className={classes.waitingTime}>
          Czas oczekiwania na wykonanie: {waitingTime}
        </p>
        <h3 className={classes.aboutMoreProds}>Więcej o produkcie</h3>
        <p>Opakowanie sup: {packaging}</p>
        <p>Ilość w opakowaniu: {quantityPerPackage} szt.</p>
        <p className={classes.weight}>Waga: {weight}</p>
        <p>Skład: {ingredients}</p>
        <p>Alergerny: {allergens}</p>
        <p>{additionalInfo}</p>
      </div>
    </article>
  );
}
