import { useShoppingContext } from "../contexts/shoppingContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const ShoppingCart = () => {
    const { cartItems, removeCartItem, cartTotal, resetCart} = useShoppingContext();
    const [cookies ,] = useCookies(["access_token"]);
    const shopperId = window.localStorage.getItem("userID");
    const navigate = useNavigate();

    const handleRemove = (shoppingItemID: string) => {
        const cartItem = cartItems.find(item => item.id === shoppingItemID); //returns the shoppingItem if it is found
        if(cartItem) {
            removeCartItem(cartItem);
        }
    }

    const createOrder = async () => {
        //const { shopperId, items } = req.body; //frontend must send both a shopperId and items in the body
        const items =  cartItems;
        try {
            await axios.post('http://localhost:3010/orders/', {
                shopperId,
                items
            }, {headers: { authorization: cookies.access_token } }
        );
        alert("Order Created!");
        resetCart();

        } catch (err) {
            console.log(err);
        }
        navigate('/orders');

    
    }

    return (
        <div>
            <h1>Shopping Cart: </h1>
            <ul>
                {cartItems.map(shoppingItem => (
                    <li key={shoppingItem.id}>
                        <img src={shoppingItem.itemImg} alt={shoppingItem.name}/>
                        <h2>{shoppingItem.name}</h2>
                        <h3>${shoppingItem.price}</h3>
                        <button onClick={() => handleRemove(shoppingItem.id)}>REMOVE FROM CART</button>

                    </li>
                ))}
            </ul>
            <h3>Estimated Total: ${cartTotal}</h3>
            <button onClick={() => createOrder()}>CHECKOUT</button>
        </div>
    )
}