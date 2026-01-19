import Link from "next/link";

export default function Logowanie(){
    return(
        <>
            <h1>Logowanie</h1>
            <p>Nie masz konta? zarejestruj się tu:</p><Link href="/rejestracja">Rejestracja</Link>
        </>
    )
}