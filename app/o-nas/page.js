import classes from './page.module.css';
import Image from 'next/image';

import filipImg from '@/assets/O-nas/Filip.png';
import magdalenaImg from '@/assets/O-nas/Magdalena.png';
import employeesImg from '@/assets/O-nas/employees.png';
import shopImg from '@/assets/O-nas/shop.png';

export default function ONas(){
    return(
       <main>
            <h1 className={`${classes.h1} balooFont`}>O nas</h1>
            <section className={classes.cardBox}>
                <div className={classes.card}>
                    <div className={classes.ImgBox}>
                        <Image src={magdalenaImg} alt={'Magda'} priority fill/>
                    </div>
                        
                    <p className={classes.name}>Magdalena</p>
                </div>
                <div className={classes.card}>
                    <div className={classes.ImgBox}>
                        <Image src={filipImg} alt={'Filip'} priority fill/>
                    </div>
                    <p className={classes.name}>Filip</p>
                </div>
            </section>
            <article className={classes.article}>
                <p>Słodki Donut to miejsce stworzone z pasji do prostych, rzemieślniczych wypieków i wyrazistych smaków. Od początku naszym celem było tworzenie donutów, które zachwycają świeżością, jakością składników i dopracowaną recepturą, bez kompromisów i zbędnych dodatków.</p>
                <p>Każdego dnia przygotowujemy donuty na miejscu, ręcznie, według sprawdzonych receptur. Korzystamy wyłącznie z wysokiej jakości składników, dbając o to, aby każdy donut był miękki, puszysty i pełen smaku. Wierzymy, że najlepsze wypieki powstają z połączenia tradycyjnych metod i nowoczesnego podejścia do smaku.</p>
            </article>
            <section className={classes.descriptionBox}>
                <p>
                    Stawiamy na uczciwość, powtarzalność i dbałość o detale. Nie używamy mrożonych półproduktów ani sztucznych aromatów — liczy się dla nas naturalność i autentyczność tego, co trafia do naszych klientów.
                Słodki Donut to przestrzeń dla wszystkich, którzy cenią dobrą jakość, klasyczne i owocowe smaki oraz chwilę przyjemności w ciągu dnia. Zapraszamy do naszych piekarni i do poznania donutów, które tworzymy z pasją każdego dnia.
                </p>
                <div className={classes.descriptionImgBox}>
                     <Image src={employeesImg} alt={'Pracownicy stojący obok siebie'}  fill/>
                </div>
            </section>
            <section className={classes.shopSection}>
                <Image src={shopImg} alt={'donuteria'} fill/>
            </section>
             
       </main>
    )
}