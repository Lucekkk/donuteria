import NavLink from "./nav-link";
import classes from './header-main.module.css';

export default function HeaderMain(){
    return(
        <header className={classes.header}>
            
                <h1 className='balooFont'>Słodki donut</h1>
             
            <nav className={classes.nav}>
                <ul>
                    <li><NavLink href="/">Strona główna</NavLink></li>
                    <li><NavLink href="/o-nas">O nas</NavLink></li>
                    <li><NavLink href="/produkty">Nasze produkty</NavLink></li>
                    <li><NavLink href="/koszyk">Koszyk</NavLink></li>
                    <li><NavLink href="/logowanie">Logowanie</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}