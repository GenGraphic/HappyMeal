import React, {createContext, useEffect, useState} from "react";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [itemsList, setItemsList] = useState([
        //{name: 'name', preice: 'price', restaurantName: 'restName', quantity: 1}
    ]);
    //const [totalItems, setTotalItems] = useState(0)

    const addItem = (dishName, dishRestaurant, dishPrice) => {
        let newItemsList = itemsList;

        const newItem = {
            key: Math.random() * 10000,
            name: dishName,
            restaurantName: dishRestaurant,
            price: dishPrice,
            quantity: 1
        };

        newItemsList = [...newItemsList, newItem];

        setItemsList(newItemsList);
    }

    const removeItem = (key) => {
        let newItemsList = itemsList;

        newItemsList = newItemsList.filter(elm => elm.key !== key)

        setItemsList(newItemsList);
    }

    const addQuantity = (key) => {
        const newList = itemsList

        const thisItem = newList.find(elm => elm.key === key)

        thisItem.quantity++

        setItemsList(newList);
    }
    const removeQuantity = (key) => {
        const newList = itemsList

        const thisItem = newList.find(elm => elm.key === key)

        thisItem.quantity--

        setItemsList(newList);
    }

    return (
        <ShoppingCartContext.Provider value={{itemsList, setItemsList, addItem, removeItem, addQuantity, removeQuantity}}>{children}</ShoppingCartContext.Provider>
    )
}


export default ShoppingCartContext;