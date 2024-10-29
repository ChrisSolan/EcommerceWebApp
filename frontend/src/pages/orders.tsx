import { useState, useEffect } from "react"
import { OrdersType } from "../contexts/shoppingContext";
import api from '../axiosConfig'

export const Orders = () => {
    const [orders, setOrders] = useState<OrdersType[]>([]);
    const userID = window.localStorage.getItem("userID");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log("userID from localStorage:", userID);

                //const response = await axios.get(`http://localhost:3010/orders/${userID}`);  [REPLACED AXIOS WITH 'API']
                const response = await api.get(`/${userID}`);
                console.log("Response data: ", response.data);
                setOrders(response.data);
            } catch (err) {
                console.log(err);
            }
        };  
        fetchOrders();
    }, []);
    
    return (
        <div className="flex justify-center text-ce">
            <ul>
                {orders.length > 0  ?  (
                    orders.map(order => (
                        <li key={order.id} className="my-4">
                            <img src={order.itemImg} alt="Ordered Item" className=' h-[200px] w-[200px] rounded-full object-cover'/>
                            <h2>Order ID: {order.id}</h2>
                            <h2>Order Placed: {order.createdAt}</h2>
                        </li>
                    ))
                ) : (
                    <p>No Orders Created!</p>
                )}
            </ul>
        </div>
    )
}