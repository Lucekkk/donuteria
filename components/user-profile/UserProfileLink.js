/* eslint-disable react/prop-types */
import Link from "next/link";
import Image from "next/image";
import classes from './UserProfileLink.module.css';


export default function UserProfileLink({href, imgSrc, alt, spanContent}){
    return(
        <Link className={classes.link} href={href}> 
                <div className={classes.imgBox}>
                    <Image src={imgSrc} alt={alt} fill/>
                </div>
                <span>{spanContent}</span> 
        </Link>
    );
}