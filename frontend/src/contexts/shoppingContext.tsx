import { useState, useContext, createContext, ReactNode } from "react";

//defines what a shopping item is, gives the 'type' for shoppingItem to be used in other pages
export interface ShoppingItem {
    id: string;
    name: string;
    price: number;
    dealPrice?: number; //? because its optional
    itemImg: string;
}

//defines the types for states and functions included in the shopping context
interface ShoppingContextType {
    cartItems: ShoppingItem[];
    addCart: (item: ShoppingItem) => void;  //ShoppingItem is the type for item
    removeCartItem: (item: ShoppingItem) => void;
    cartTotal: number;
    cartCount: number;
    
}

//a default state for the shoppingContext, with empty arrays and functions
const defaultShoppingContext: ShoppingContextType = {
    // state and functions for the shopping cart
    cartItems: [],
    addCart: () => {},
    removeCartItem: () => {},
    cartTotal: 0,
    cartCount: 0
}

//creating the context with typing to avoid errors, default is the default context defined above
const ShoppingContext = createContext<ShoppingContextType>(defaultShoppingContext);


export const ShoppingProvider = ({children}: {children: ReactNode}) => {
    //All states & functions defined in ShoppingContextType go here and what they should do and hold
    const [cartItems, setCartItems] = useState<ShoppingItem[]>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const addCart = (item: ShoppingItem) => {
        setCartItems(prevItems => [...prevItems, item]); //adds the new 'item' to the already existing array of items in the shopping cart
        setCartTotal(cartTotal => cartTotal + item.price);
        setCartTotal(cartTotal => Math.round(cartTotal * 100) / 100); //for rounding the decimals to 2 places
    }


    const removeCartItem = (cartItem: ShoppingItem) => {
        setCartItems(cartItems => {
            return cartItems.filter(item => item.id !== cartItem.id);
        });
        setCartTotal( cartTotal => cartTotal - cartItem.price);
        setCartTotal(cartTotal => Math.round(cartTotal * 100) / 100);
    }

    const cartCount = cartItems.length;

    return (
        <ShoppingContext.Provider value={{cartItems, addCart, cartCount, removeCartItem, cartTotal}}>
            {children}
        </ShoppingContext.Provider>
    );
};

export const useShoppingContext = () => useContext(ShoppingContext);