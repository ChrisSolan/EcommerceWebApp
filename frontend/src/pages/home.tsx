import { useState, useEffect} from "react"
import { useCookies } from 'react-cookie';
import axios from "axios"
import { useShoppingContext, ShoppingItem } from "../contexts/shoppingContext"

export const Home = () => {
    const { addCart } = useShoppingContext();
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const [cookies ,] = useCookies(["access_token"]);
    const userID = window.localStorage.getItem("userID");

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

    const handleAddCart = async (shoppingItemID: string) => {
        try {
            await axios.put('http://localhost:3010/shoppingItems/cart', {
                userID,
                shoppingItemID 
            },
            {headers: { authorization: cookies.access_token } }
        );
        const cartItem = shoppingItems.find(item => item.id === shoppingItemID); //returns the shoppingItem if it is found
        if (cartItem) {
            addCart(cartItem);
        }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="home">
            <h1>TEST HOMEPAGE</h1>
            <ul>
                {shoppingItems.map(shoppingItem => (
                    <li key={shoppingItem.id}>
                        <img src={shoppingItem.itemImg} alt={shoppingItem.name}/>
                        <h2>{shoppingItem.name}</h2>
                        <h3>${shoppingItem.price}</h3>
                        <h3>{shoppingItem.dealPrice}</h3>
                        <button onClick={() => handleAddCart(shoppingItem.id)}>ADD TO CART</button>
                        <hr/>
                    </li>
                ))}  
            </ul>
        </div>
    )
}