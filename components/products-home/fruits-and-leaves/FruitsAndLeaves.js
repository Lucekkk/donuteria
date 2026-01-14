/* eslint-disable react/prop-types */
import Image from "next/image";
import classes from './FruitsAndLeaves.module.css';

import strawberry from "@/assets/strawberry.png";
import blueberry from "@/assets/blueberry.png";
import chocolate from "@/assets/chocolate.png";
const fruitsTable = [strawberry, blueberry, chocolate];


import leaf from "@/assets/leaf.png";
const leafTable = [leaf, leaf, leaf];


export default function FruitsAndLeaves({active, prevActive, className, tableName}){

    
    let fruitClassName = null;
    let leafClassName = null;

    const table = tableName === 'fruitsTable' ? [...fruitsTable] : [...leafTable];


    if(className === 'fruitOne'){
        fruitClassName = classes.fruitOne;

    }else if(className === 'fruitTwo'){
        fruitClassName = classes.fruitTwo;

    }else if((className === 'fruitThree')){
        fruitClassName = classes.fruitThree;
    }

    if(className === 'leafOne'){
        leafClassName = classes.leafOne;
    }else if(className === 'leafTwo'){
        leafClassName = classes.leafTwo;
    }

    return(
        <> 
        {tableName === 'fruitsTable' ? ( 
            table.map((fruit, index) => (
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
          ))) 
          : 
          (table.map((leaf, index) => (
            <div
              key={index}
              className={`${leafClassName} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={leaf.src} alt={"leaf"} priority fill />
            </div>
          )) )
          }
            
        </>
        
    );
}