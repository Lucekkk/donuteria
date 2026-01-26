/* eslint-disable react/prop-types */

import ProductsItem from "./ProductsItem";
import classes from './products-grid.module.css';
export default function ProductsGrid({prods}){
    return(
        <ul className={classes.ul} id='first'>
            {prods.map(prod => (
                <li key={prod.id}>
                    <ProductsItem {...prod} />
                </li>
            ))}
        </ul>
    )
        
    
}