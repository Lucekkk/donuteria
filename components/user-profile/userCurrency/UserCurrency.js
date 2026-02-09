/* eslint-disable react/prop-types */
import classes from "./UserCurrency.module.css";

const earnRules = `Podstawowe zasady:
1 donut zakupiony = 1 wirtualny donut 🍩
zakupy online i w piekarni liczą się tak samo
skan kodu klienta w piekarni = automatyczne naliczenie
Bonusy:
+2 🍩 za pierwsze zamówienie
+ 🍩 za zgody marketingowe
podwójne 🍩 w wybrane dni ("Sweet Friday")`;

const rewardRules = `Nagrody:
5 🍩 -> darmowy lukier / posypka
10 🍩 -> darmowy donut
20 🍩 -> 2 donuty
30 🍩 -> zestaw mini donutów
50 🍩 -> box donutów`




export default function UserCurrency({ currentUser }) {
    console.log(currentUser);
  return (
    <main className={classes.main}>
      <h1>Twoja całkowita ilość punktów: {currentUser?.donutPoints ?? 0} </h1>
      <div className={classes.FAQsContainer}>
        <div className={classes.FAQs}>
            <h2>Najczęściej zadawane pytania:</h2>
        </div>
        <div className={classes.paragraphBox}>
          <h3>Czym sa wirtualne donuty?</h3>
          <p>
            Wirtualne donuty to punkty lojalnościowe, ale podane w  &quot;słodkiej&quot;
            formie. Możesz wymienić je na nagrody.
          </p>
        </div>
        <div className={classes.preBox}>
          <h3>Jak zdobywa sie wirtualne donuty?</h3>
          <pre>{earnRules}</pre>
        </div>
        <div className={classes.preBox}>
          <h3>Jak wykorzystac wirtualne donuty?</h3>
          <pre>{rewardRules}</pre>
        </div>
        <div className={classes.paragraphBox}>
          <h3>Jak skorzystać?</h3>
          <p>Promocja jest dostępna tylko dla zalogowanych użytkowników. Po dodaniu produktów do koszyka naciśnij wykorzystaj wirtualne donuty. Wtedy zostaną odjęte od Twojego wirtualnego salda. </p>
        </div>

      </div>
    </main>
  );
}
