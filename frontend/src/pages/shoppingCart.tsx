import { useShoppingContext } from "../contexts/shoppingContext"

export const ShoppingCart = () => {
    const { cartItems, removeCartItem } = useShoppingContext();

    const handleRemove = (shoppingItemID: string) => {
        const cartItem = cartItems.find(item => item.id === shoppingItemID); //returns the shoppingItem if it is found
        if(cartItem) {
            removeCartItem(cartItem);
        }
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
        </div>
    )
}