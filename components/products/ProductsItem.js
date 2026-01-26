/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Image from "next/image";
import classes from './ProductsItem.module.css';
import groceryCartImg from '@/assets/grocery-store.png';

export default function ProductsItem({
        id, 
        nazwa, 
        cena_brutto, 
        opis, 
        obrazek, 
        opis_obrazka, 
        czas_oczekiwania_na_wykonanie, 
        opakowanie_sup,ilosc_w_opakowaniu, 
        waga, 
        sklad, 
        alergeny, 
        dodatkowe_info}
    ){
        let backgroundColor = null;
        let boxShadow = null;
        if(id === 1){
            backgroundColor = '#F793AF';
            boxShadow = '-6px 0 10px -3px #F793AF, 0 -6px 10px -3px #F793AF';
        }else if(id === 3){
            backgroundColor = '#78B5CF';
            boxShadow = '-6px 0 10px -3px #78B5CF, 0 -6px 10px -3px #78B5CF';
        }else if(id === 4){
            backgroundColor = '#C9ADA0';
            boxShadow = '-6px 0 10px -3px #C9ADA0, 0 -6px 10px -3px #C9ADA0';
        }


    return(
        <article className={classes.article} style={{boxShadow:`${boxShadow}`}}>
            <div className={classes.ImgContainer}>
                <Image src={obrazek} alt={opis_obrazka} fill/>
            </div>
            <div className={classes.productTextContainer}>
                <h2>{nazwa}</h2>
                <p className={classes.description}>{opis}</p>
                <h3 className={classes.price}>{cena_brutto}zł /szt.</h3>
                <div className={classes.productBtnContainer}>
                    <button style={{ backgroundColor: `${backgroundColor}` }}><span>
                        <Image src={groceryCartImg} alt="shopping cart icon" priority={id === 1 ? true : false} fill/></span><p>Dodaj do koszyka</p></button>
                </div>
                <p className={classes.waitingTime}>Czas oczekiwania na wykonanie: {czas_oczekiwania_na_wykonanie}</p>
                <h3 className={classes.aboutMoreProds}>Więcej o produkcie</h3>
                <p>Opakowanie sup: {opakowanie_sup}</p>
                <p>Ilość w opakowaniu: {ilosc_w_opakowaniu} szt.</p>
                <p className={classes.weight}>Waga: {waga}</p>
                <p>Skład: {sklad}</p>
                <p>Alergerny: {alergeny}</p>
                <p>{dodatkowe_info}</p>
            </div>
        </article>
    );
}