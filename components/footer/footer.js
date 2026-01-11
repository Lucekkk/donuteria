import classes from './footer.module.css';
export default function Footer(){
    return(
        <footer className={classes.footer}>
           
                <h3>Słodki Donut</h3>
                <p className={classes['bottom-space']}>Rzemieślnicze donuty wypiekane codziennie.</p>
             
                <p className={classes['bottom-space']}>Strona główna · O nas · Składy donutów · Nasze piekarnie · Logowanie</p>
                
                <p>Kontakt:</p>
                <p>Tel.: +48 654 678 765</p> 
                <p>E-mail: kontakt@slodkidonut.pl</p> 
                <p>ul. Szkolna 17 C </p> 
                <p className={classes['bottom-space']}>00-126 Warszawa</p>

                <p>Godziny otwarcia:</p> 
                <p>pn-pt: 7:00-18:00</p> 
                <p className={classes['bottom-space']}>sb-nd: 8:00-16:00</p> 

                <p>2026 Słodki Donut</p>
            

           
        </footer>
    );
}