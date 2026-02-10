"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { useActionState, useState, useEffect, useTransition } from "react";
import { cartSummary } from "@/lib/actions";
import classes from "./page.module.css";

export default function Summary() {
  const [state, formAction, isPending] = useActionState(cartSummary, {
    message: null,
    values: {},
  });

  const [isTransitioning, startTransition] = useTransition();

  // console.log(state);

  const userId = useSelector((state) => state.auth.user?.userId ?? null);

  const [mounted, setMounted] = useState(false);
  const cart = useSelector((state) => state.cart.cartData.cart);
  const totalPriceFromRedux = useSelector(
    (state) => state.cart.cartData.totalPrice,
  );

  // Calculate products price from cart items
  const prodsPrice = totalPriceFromRedux
    ? (totalPriceFromRedux * 1).toFixed(2) * 1
    : cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2) * 1;

  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(prodsPrice);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTotalPrice(prodsPrice + deliveryPrice);
    }
  }, [prodsPrice, deliveryPrice, mounted]);

  const inputHandler = (payment) => {
    const newDeliveryPrice = payment * 1;
    setDeliveryPrice(newDeliveryPrice);
    setTotalPrice(prodsPrice + newDeliveryPrice);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.append("totalPrice", totalPrice);
    formData.append("cart", JSON.stringify(cart));
    if (userId) {
      formData.append("userId", userId);
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className={classes.main}>
      <div className={classes.formContainer}>
        <div className={classes.goBackLinkContainer}>
          <Link href="/koszyk">Powrót do koszyka</Link>
        </div>

        <form onSubmit={handleFormSubmit} className={classes.form}>
          <div className={classes.leftPanel}>
            <div className={classes.userData}>
              <h2 className={classes.header}>
                {" "}
                <p>1</p>Dane
              </h2>
              <div className={classes.userDataInputsBox}>
                <div className={classes.inputBox}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={state.values?.name || ""}
                    placeholder="Imię"
                    required
                  />
                </div>

                <div className={classes.inputBox}>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    defaultValue={state.values?.surname || ""}
                    placeholder="Nazwisko"
                    required
                  />
                </div>

                <div className={classes.inputBox}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={state.values?.email || ""}
                    placeholder="Email"
                    required
                  />
                </div>

                <div className={classes.inputBox}>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={state.values?.phoneNumber || ""}
                    placeholder="Numer tel."
                    required
                  />
                </div>

                <div className={classes.inputBox}>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    defaultValue={state.values?.street || ""}
                    placeholder="Ulica i numer domu / mieszkania"
                    required
                  />
                </div>

                <div className={classes.inputBox}>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    defaultValue={state.values?.town || ""}
                    placeholder="Miejscowość"
                    required
                  />
                </div>

                <div className={classes.inputBox}>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Kod pocztowy"
                    maxLength="6"
                    inputMode="numeric"
                    defaultValue={state.values?.postalCode || ""}
                    required
                  />
                </div>
              </div>
              <div className={classes.error}>
                {state.message === "Nieodpowiednia długość znaków"
                  ? state.message
                  : null}
              </div>
              <div className={classes.error}>
                {state.message === "Wpisz poprawny email"
                  ? state.message
                  : null}
              </div>
              <div className={classes.error}>
                {state.message === "Wpisz poprawny numer telefonu"
                  ? state.message
                  : null}
              </div>
              <div className={classes.error}>
                {state.message === "Wpisz poprawny kod pocztowy"
                  ? state.message
                  : null}
              </div>
            </div>

            <div className={classes.deliveryMethod}>
              <h2 className={classes.header}>
                <p>2</p>Dostawa
              </h2>
              <div className={classes.deliveryMethodInputsBox}>
                <div className={classes.labelsAndInputsDeliveryBox}>
                  <input
                    type="radio"
                    id="DPD"
                    name="deliveryMethod"
                    defaultChecked={state.values?.deliveryMethod || false}
                    value="DPD"
                    onClick={() => {
                      inputHandler("12.99");
                    }}
                    required
                  />
                  <label htmlFor="DPD">
                    DPD <p>12.99 zł</p>
                  </label>
                </div>

                <div className={classes.labelsAndInputsDeliveryBox}>
                  <input
                    type="radio"
                    id="FedEx"
                    name="deliveryMethod"
                    defaultChecked={state.values?.deliveryMethod || false}
                    value="FedEx"
                    onClick={() => {
                      inputHandler("19.99");
                    }}
                    required
                  />
                  <label htmlFor="FedEx">
                    FedEx <p>19.99 zł</p>
                  </label>
                </div>

                <div className={classes.labelsAndInputsDeliveryBox}>
                  <input
                    type="radio"
                    id="Inpost"
                    name="deliveryMethod"
                    defaultChecked={state.values?.deliveryMethod || false}
                    value="Inpost"
                    onClick={() => {
                      inputHandler("10");
                    }}
                    required
                  />
                  <label htmlFor="Inpost">
                    Inpost <p>10 zł</p>
                  </label>
                </div>

                <div className={classes.labelsAndInputsDeliveryBox}>
                  <input
                    type="radio"
                    id="DHL"
                    name="deliveryMethod"
                    defaultChecked={state.values?.deliveryMethod || false}
                    value="DHL"
                    onClick={() => {
                      inputHandler("21.99");
                    }}
                    required
                  />
                  <label htmlFor="DHL">
                    DHL <p>21.99 zł</p>
                  </label>
                </div>
              </div>
            </div>

            <div className={classes.payMethod}>
              <h2 className={classes.header}>
                <p>3</p>Płatność
              </h2>
              <div className={classes.payMethodInputsBox}>
                <div className={classes.labelsAndInputsPayBox}>
                  <input
                    type="radio"
                    id="bankTransfer"
                    name="payMethod"
                    defaultChecked={state.values?.payMethod || false}
                    value="Przelew bankowy"
                    required
                  />
                  <label htmlFor="bankTransfer">Przelew bankowy</label>
                </div>

                <div className={classes.labelsAndInputsPayBox}>
                  <input
                    type="radio"
                    id="card"
                    name="payMethod"
                    defaultChecked={state.values?.payMethod || false}
                    value="card"
                    required
                  />
                  <label htmlFor="card">Płatność kartą</label>
                </div>

                <div className={classes.labelsAndInputsPayBox}>
                  <input
                    type="radio"
                    id="blik"
                    name="payMethod"
                    defaultChecked={state.values?.payMethod || false}
                    value="blik"
                    required
                  />
                  <label htmlFor="blik">Blik</label>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.rightPanel}>
            <div className={classes.summaryBox}>
              <h2 className={classes.headerSummary}>Podsumowanie</h2>
              <div className={classes.productsPriceBox}>
                <p> Cena produktów: </p>{" "}
                <p>{mounted ? prodsPrice.toFixed(2) : "0.00"} zł</p>
              </div>
              <div className={classes.deliveryCostBox}>
                <p>Cena przesyłki: </p> <p>{deliveryPrice.toFixed(2)} zł</p>
              </div>
              <div className={classes.totalCostBox}>
                <strong>Suma: </strong>{" "}
                <strong>{mounted ? totalPrice.toFixed(2) : "0.00"} zł </strong>
              </div>
            </div>

            <div className={classes.regulationsBox}>
              <div className={classes.inputAndLabelsRegulationsBox}>
                <input
                  type="checkbox"
                  id="regulations"
                  name="regulations"
                  defaultChecked={state.values?.isChecked || false}
                  required
                />
                <label htmlFor="regulations">
                  *Akceptuje regulamin cukierni “Słodki donut” i Politykę
                  prywatności.
                </label>
              </div>

              <div className={classes.inputAndLabelsRegulationsBox}>
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  defaultChecked={state.values?.isCheckedNewsletter || false}
                />
                <label htmlFor="newsletter">
                  Chcę zapisać się do Newsettera “Słodki donut”.
                </label>
              </div>
            </div>

            <div className={classes.error}>
              {state.message === "Uzupełnij dane" ? state.message : null}
            </div>

            <div className={classes.orderBtnBox}>
              <button>ZAMÓW I ZAPŁAĆ</button>
            </div>
          </div>
          <input
            type="hidden"
            name="orderPrice"
            value={deliveryPrice.toFixed(2)}
            readOnly
          />
        </form>
      </div>
    </main>
  );
}
