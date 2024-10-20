import { useState, useEffect } from "react"
import axios from "axios"
import { OrdersType } from "../contexts/shoppingContext";

export const Orders = () => {
    const [orders, setOrders] = useState<OrdersType[]>([]);
    const userID = window.localStorage.getItem("userID");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log("userID from localStorage:", userID);

                const response = await axios.get(`http://localhost:3010/orders/${userID}`);
                console.log("Response data: ", response.data);
                setOrders(response.data);
            } catch (err) {
                console.log(err);
            }
        };  
        fetchOrders();
    }, []);
    
    return (
        <div>
            <h1>Test Orders Page</h1>
            <ul>
            {orders.map(order => (
                    <li key={order.id}>
                        <h2>Order ID: {order.id}</h2>
                        <h2>Order Placed: {order.createdAt}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )
}