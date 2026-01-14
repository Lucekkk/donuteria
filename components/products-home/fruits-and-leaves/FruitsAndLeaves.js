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
    
    let itemClassName = null;
    const table = tableName === 'fruitsTable' ? [...fruitsTable] : [...leafTable];
    const elementsName = tableName === 'fruitsTable' ? 'fruit' : 'leaf';


    switch (className) {
        case 'fruitOne':
        itemClassName = classes.fruitOne;
        break;
        case 'fruitTwo':
        itemClassName = classes.fruitTwo;
        break;
        case 'fruitThree':
        itemClassName = classes.fruitThree;
        break;
        case 'leafOne':
        itemClassName = classes.leafOne;
        break;
        case 'leafTwo':
        itemClassName = classes.leafTwo;
        break;
    
        default: return;
}


    return(
        <> 
       
           { table.map((item, index) => (
            <div
              key={index}
              className={`${itemClassName} ${
                index === active
                  ? classes.active
                  : index === prevActive
                  ? classes.reverse
                  : ""
              }
                `}
            >
              <Image src={item.src} alt={`${elementsName}`} priority fill />
            </div>
          ))}
    
            
        </>
        
    );
}