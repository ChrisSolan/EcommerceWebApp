import { useState, useEffect} from "react"
import axios from "axios"
import { useShoppingContext, ShoppingItem } from "../contexts/shoppingContext"

export const Home = () => {
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

    useEffect(() => {
        const fetchShoppingItems = async () => {
            try {
                const response = await axios.get('http://localhost:3010/shoppingItems');
                setShoppingItems(response.data);
            } catch (err) {
                console.log(err);
            }
        };  
        fetchShoppingItems();
    }, []);


    return (
        <div className="home">
            <h1>TEST HOMEPAGE</h1>
            <ul>
                {shoppingItems.map(shoppingItem => (
                    <li key={shoppingItem.id}>
                        <h2>{shoppingItem.name}</h2>
                        <h3>${shoppingItem.price}</h3>
                        <h3>{shoppingItem.dealPrice}</h3>
                        <img src={shoppingItem.itemImg} alt={shoppingItem.name}/>
                    </li>
                ))}  
            </ul>
        </div>
    )
}