'use client';
import Image from "next/image";
import classes from './CustomerCard.module.css'

import customerImgWoman from '@/assets/customers/woman.png';
import customerImgMan from '@/assets/customers/man.png';
import customerImgWoman2 from '@/assets/customers/woman2.png';

const customersTable = [customerImgWoman, customerImgMan, customerImgWoman2]

export default function CustomerCard({index, alt, name, opinion}){
    return(
        <div className={classes.card}>
              <div className={classes.imgAndNameBox}>
                <div className={classes.customersImgBox}>
                  <Image src={customersTable[index]} alt={alt} fill/>
                </div>
                <p>{name}</p>
              </div>
              <div className={classes.customersOpinionBox}>
                <p>{opinion}</p>
              </div>
        </div>
    )
}