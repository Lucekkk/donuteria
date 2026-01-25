import ProductsItem from "./ProductsItem";

export default function ProductsGrid(prods){
    return(
        <ul>
            {prods.map( prod => (
                <li key={prod.id}>
                    <ProductsItem {...prod} />
                </li>
            ))}
        </ul>
    )
        
    
}