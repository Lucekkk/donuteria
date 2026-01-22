import Link from "next/link";
import classes from './page.module.css';

export default function RegisterDone(){
    return(
        <>
            <main className={classes.main}>
                <h1>Udało ci się zarejestrować. Możesz teraz przejść do sekcji logowania.</h1>
                <Link href={'/logowanie'}>Przejdź do logowania</Link>
            </main>
            
        </>
        
    )
}