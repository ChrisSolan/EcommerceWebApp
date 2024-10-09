import { useState, useContext, createContext, ReactNode } from "react";

//defines what a shopping item is
export interface ShoppingItem {
    id: string;
    name: string;
    price: number;
    dealPrice?: number; //? because its optional
    itemImg: string;
}

//defines the types for states and functions included in the shopping context
interface ShoppingContextType {
    //shopping cart items
}

//creating the context with typing to avoid errors, default is null
const ShoppingContext = createContext<ShoppingContextType | null>(null);


export const ShoppingProvider = ({children}: {children: ReactNode}) => {
    //All states & functions defined in ShoppingContextType go here and what they should do and hold


    return (
        <ShoppingContext.Provider value={null}>
            {children}
        </ShoppingContext.Provider>
    );
};

export const useShoppingContext = () => useContext(ShoppingContext);