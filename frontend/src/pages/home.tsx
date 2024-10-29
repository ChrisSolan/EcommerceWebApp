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
            if(!cookies.access_token) { 
                alert('Login to add item to your shopping cart!');
                return;
            }
            
            await axios.put('http://localhost:3010/shoppingItems/cart', {
                userID,
                shoppingItemID 
            },
            {headers: { authorization: cookies.access_token } } //you have to be logged in to add items to your cart
        );
        const cartItem = shoppingItems.find(item => item.id === shoppingItemID); //returns the shoppingItem if it is found
        if (cartItem) {
            addCart(cartItem);
        }

        } catch (err) {
            console.log(err);
        }
    }

    const deals = shoppingItems.filter(item => item.dealPrice !== null);
    

    return (
        <div className="home bg-white min-h-screen py-[15px]">
            <h1 className="mx-[15px] mb-3 font-bold text-lg">Random Assortment of Items! </h1>
            <div className="overflow-x-auto px-[50px]">
                <ul className="flex items-center space-x-12 my-[15px]">
                    {shoppingItems
                    .filter(item => item.dealPrice === null)
                    .map(shoppingItem => (
                        <li key={shoppingItem.id} className="shrink-0 h-[350px] flex flex-col">
                            <div className="w-[225px] h-[225px] bg-[#f2f2f2] p-4"> {/*Controls how big the images are*/}
                             <img src={shoppingItem.itemImg} alt={shoppingItem.name} className='object-cover h-full w-full'/>
                            </div>
                            <h2 className="w-[200px]">{shoppingItem.name}</h2>
                            <h3 className="font-semibold text-lg">${shoppingItem.price}</h3>
                            <button onClick={() => handleAddCart(shoppingItem.id)} className="rounded-full bg-[#FFA69E] font-semibold px-[20px] py-[6px] text-black mt-auto self-start hover:bg-[#FF686B]">ADD TO CART</button>
                        </li>
                    ))}  
                </ul>
            </div>

            <h1 className="mx-[15px] my-3 font-bold text-lg">Items on SALE!</h1>
            <div className="overflow-x-auto px-[50px]">
                <ul className="flex items-center space-x-10 my-[15px]">
                    {deals.map(shoppingItem => (
                        <li key={shoppingItem.id} className="shrink-0 h-[350px] flex flex-col">
                            <div className="w-[225px] h-[225px] bg-[#f2f2f2] p-4"> {/*Controls how big the images are*/}
                             <img src={shoppingItem.itemImg} alt={shoppingItem.name} className='object-cover h-full w-full'/>
                            </div>
                            <h2 className="w-[200px]">{shoppingItem.name}</h2>
                            <div className="flex space-x-3">
                                <h3 className="font-semibold text-lg">${shoppingItem.dealPrice}</h3>
                                <h3 className="line-through text-gray-400">${shoppingItem.price}</h3> 
                            </div>
                            <button onClick={() => handleAddCart(shoppingItem.id)} className="rounded-full bg-[#FFA69E] font-semibold px-[20px] py-[6px] text-black mt-auto self-start hover:bg-[#FF686B]">ADD TO CART</button>
                        </li>
                    ))}  
                </ul>
            </div>

        </div>
    )
}