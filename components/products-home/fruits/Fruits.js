/* eslint-disable react/prop-types */
import Image from "next/image";
import classes from './Fruits.module.css';

import strawberry from "@/assets/strawberry.png";
import blueberry from "@/assets/blueberry.png";
import chocolate from "@/assets/chocolate.png";
const fruitsTable = [strawberry, blueberry, chocolate];

export default function Fruits({active, prevActive, className}){

    let fruitClassName = null;
    if(className === 'fruitOne'){
        fruitClassName = classes.fruitOne;

    }else if(className === 'fruitTwo'){
        fruitClassName = classes.fruitTwo;

    }else{
        fruitClassName = classes.fruitThree;
    }

    return(
        <>
            {fruitsTable.map((fruit, index) => (
            <div
              key={index}
              className={`${fruitClassName} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={fruit.src} alt={"fruit"} priority fill />
            </div>
          ))}
        </>
        
    );
}