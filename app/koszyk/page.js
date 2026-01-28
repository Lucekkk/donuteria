"use client";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/shopping-cart-slice";
import Image from "next/image";
import { useState, useEffect } from "react";
import classes from "./page.module.css";
import Link from "next/link";

export default function Koszyk() {
  const cart = useSelector((state) => state.cart.cartData.cart);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

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



//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.cena * item.quantity,
//     0,
//   );

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
                <Link href='/produkty'>Kontynuuj zakupy</Link>
                <h2>Koszyk</h2>
            </div>
            <div className={classes.cart}>
                <div className={classes.infoBar}>
                    <p>Produkt</p>
                    <p>Cena</p>
                    <p>Ilość</p>
                    <p>Suma</p>
                    <p>Usuń</p>
                </div>
                <div className={classes.cartItems}>
                    {cart.map(prod => (
                        <div key={prod.idProduct} className={classes.cartItem}>
                            <div className={classes.titleAndImageContainer}>
                                <div className={classes.imageContainer}>
                                    <Image
                                    src={prod.image}
                                    alt={prod.prodTitle}
                                    fill
                                    
                                />
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
                                            onClick={() => handleQuantityChange(prod.idProduct, 'minus')}
                                        >-
                                        </button>
                                        <p className={classes.quantity}>{prod.quantity}</p>
                                        <button 
                                            className={`${classes.counterButton} ${classes.plus}`}
                                            onClick={() => handleQuantityChange(prod.idProduct, 'plus')}
                                            >+
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
                                Usuń
                                </button>    
                            
                            </div> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className={classes.summaryContainer}></div>
        </>
                )}
    </main>
   
//           <div className={classes.cartSummary}>
//             <div className={classes.summaryRow}>
//               <span>Łączna wartość:</span>
//               <strong>{totalPrice.toFixed(2)} zł</strong>
//             </div>

 
  );
  }
