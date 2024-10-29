import { useShoppingContext } from "../contexts/shoppingContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import api from '../axiosConfig';

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
        const itemImg = items.length > 0 ? items[0].itemImg : null; //if the cart is empty, the itemImg is null
        try {
            await api.post('/orders', {
                shopperId,
                items,
                itemImg
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
        <div className="min-h-screen text-center py-[15px]">
            <h1 className="mx-[15px] mb-3 font-bold text-lg">Shopping Cart: </h1>
            <ul className='flex flex-col items-center my-[15px]'>
                {cartItems.map(shoppingItem => (
                    <li key={shoppingItem.id} className='my-[15px] flex items-center space-x-4 text-left'>
                        <img src={shoppingItem.itemImg} alt={shoppingItem.name} className=' h-[150px] w-[150px] rounded-full object-cover'/>
                        <h2>{shoppingItem.name}</h2>
                        <h3>${shoppingItem.dealPrice ?? shoppingItem.price}</h3> {/* Displays deal price if it exists */}
                        <button onClick={() => handleRemove(shoppingItem.id)} className="rounded-full bg-[#FFA69E] font-semibold px-[20px] py-[6px] text-black hover:bg-[#FF686B]">REMOVE FROM CART</button>

                    </li>
                ))}
            </ul>
            <h3>Estimated Total: ${cartTotal}</h3>
            { cartItems.length > 0 ? (
                <button onClick={() => createOrder()} className="rounded-md hover:bg-[#FFA69E] font-semibold my-4 px-[20px] py-[6px] text-black bg-[#FF686B]">CHECKOUT</button>
                ) : (
                    <p>Add items to your cart!</p>
                )
            }
        </div>
    )
}