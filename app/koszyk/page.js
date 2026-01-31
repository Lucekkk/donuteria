"use client";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/shopping-cart-slice";
import Image from "next/image";
import { useState, useEffect } from "react";
import classes from "./page.module.css";
import Link from "next/link";

export default function Koszyk() {
  const cart = useSelector((state) => state.cart.cartData.cart);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
//   const totalPriceSlice = useSelector((state) => state.cart.cartData.totalPrice);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [discountCode, setdiscountCode] = useState("021445");
  const inputCode = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemove = (idProduct) => {
    dispatch(cartActions.removeProduct(idProduct));
  };

  const handleQuantityChange = (idProduct, symbol) => {
    dispatch(
      cartActions.updateQuantity({
        idProduct,
        symbol,
      }),
    );
  };

  let totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Update total price in Redux when cart changes
  useEffect(() => {
    dispatch(cartActions.updateTotalPrice(totalPrice));
  }, [cart, dispatch, totalPrice]);


  const discountHandler = () => {
    if (inputCode.current.value !== discountCode) return;
     
      totalPrice = (totalPrice * 0.9).toFixed(2);
      setDiscountPrice(totalPrice);
      dispatch(cartActions.updateTotalPrice(totalPrice));
      setdiscountCode("already used");
    
  };
//   console.log(totalPriceSlice);
  return (
    <main className={classes.main}>
      {!mounted || cart.length === 0 ? (
        <div className={classes.emptyCart}>
          <p>Twój koszyk jest pusty</p>
          <Link href="/produkty" className={classes.shopLink}>
            Przejdź do sklepu
          </Link>
        </div>
      ) : (
        <>
          <div className={classes.cartContainer}>
            <div className={classes.header}>
              <Link href="/produkty">Kontynuuj zakupy</Link>
              <h3>Koszyk</h3>
            </div>
            <div className={classes.cart}>
              <div className={classes.infoBar}>
                <p className={classes.productTitle}>Produkt</p>
                <p className={classes.productPrice}>Cena</p>
                <p>Ilość</p>
                <p className={classes.productSum}>Suma</p>
                <p className={classes.productRemove}>Usuń</p>
              </div>
              <div className={classes.cartItems}>
                {cart.map((prod) => (
                  <div key={prod.idProduct} className={classes.cartItem}>
                    <div className={classes.titleAndImageContainer}>
                      <div className={classes.imageContainer}>
                        <Image src={prod.image} alt={prod.prodTitle} fill />
                      </div>
                      <div className={classes.prodName}>
                        <h3>{prod.prodTitle}</h3>
                      </div>
                    </div>
                    <div className={classes.prodPrice}>
                      <p>{prod.price} zł</p>
                    </div>
                    <div className={classes.quantityContainer}>
                      <div className={classes.counterBox}>
                        <button
                          className={`${classes.counterButton} ${classes.minus}`}
                          onClick={() =>
                            handleQuantityChange(prod.idProduct, "minus")
                          }
                        >
                          -
                        </button>
                        <p className={classes.quantity}>{prod.quantity}</p>
                        <button
                          className={`${classes.counterButton} ${classes.plus}`}
                          onClick={() =>
                            handleQuantityChange(prod.idProduct, "plus")
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className={classes.quantityParagraph}>szt.</p>
                    </div>
                    <div className={classes.itemTotal}>
                      <p>{(prod.price * prod.quantity).toFixed(2)} zł</p>
                    </div>
                    <div className={classes.removeProdContainer}>
                      <button
                        className={classes.removeBtn}
                        onClick={() => handleRemove(prod.idProduct)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={classes.summaryContainer}>
            <div className={classes.headerSummary}>
              <h3>Podsumowanie</h3>
            </div>

            <div className={classes.discountBox}>
              <p>Mam kupon rabatowy</p>
              <div className={classes.inputContainer}>
                <input placeholder="Wpisz kod" ref={inputCode} />
                <button onClick={discountHandler}>Zastosuj</button>
              </div>
              <div className={classes.discountSum}>
                <p>
                  Łączna wartość:
                  <strong>
                    {discountPrice === null ? (
                      `${totalPrice.toFixed(2)}zł`
                    ) : (
                      <>
                        <strike>{totalPrice.toFixed(2)} zł</strike>
                        <span className={classes.spanDiscount}>
                          {discountPrice} zł
                        </span>
                      </>
                    )}
                  </strong>
                </p>
              </div>
            </div>

            <div className={classes.linksContainer}>
              {isAuth === true ? (
                <Link
                  href="/koszyk/podsumowanie-platnosci"
                  className={classes.orderLink}
                >
                  Przejdź do płatności
                </Link>
              ) : (
                <>
                  <Link href="/logowanie" className={classes.loginLink}>
                    Zaloguj się i zbieraj wirtualne donuty{" "}
                  </Link>
                  <Link
                    href="/koszyk/podsumowanie-platnosci"
                    className={classes.orderLink}
                  >
                    Zamawiam bez logowania
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
