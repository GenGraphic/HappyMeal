import { createContext, useState } from "react";

const RestaurantsContext = createContext();

export function RestaurantsProvider({ children }) {
    const [restaurants, setRestaurants] = useState([
        {
            key: 123,
            name: '4EverFood',
            type: 'Indian',
            ratings: 4.7,
            deliveryTime: ['07:00-11:00', '12:00-17:00', '18:00-22:00'],
            menu:[
                {
                    name: 'Sushi',
                    foto: require('./assets/popular-food/sushi.jpg'),
                    price: 12.5,
                    popular: true,
                    restaurant: '4EverFood',
                },
                {
                    name: 'Ramen',
                    foto: require('./assets/popular-food/ramen.jpg'),
                    price: 14.5,
                    popular: false,
                    restaurant: '4EverFood'
                },
                {
                    name: 'Ice-cream',
                    foto: require('./assets/popular-food/ice-cream.jpg'),
                    price: 14.5,
                    popular: true,
                    restaurant: '4EverFood'
                },
            ],
            logo: require('./assets/restaurantsLogo/4ever-logo.png'),
            website: 'www.4everfood.com'
        },
        {
            key: 321,
            name: 'Deja Vu',
            type: 'Indian',
            ratings: 4.6,
            deliveryTime: ['08:00-12:00', '12:00-15:00', '16:00-20:00'],
            menu:[
                {
                    name: 'Salad',
                    foto: require('./assets/popular-food/salad.jpg'),
                    price: 11.5,
                    popular: true,
                    restaurant: 'Deja Vu'
                },
                {
                    name: 'Rice',
                    foto: require('./assets/popular-food/rice.jpg'),
                    price: 8,
                    popular:false,
                    restaurant: 'Deja Vu'
                },
            ],
            logo: require('./assets/restaurantsLogo/dejavu-logo.png'),
            website: 'www.dejaVu.com'
        },
        {
            key: 213,
            name: 'Snack',
            type: 'Indian',
            ratings: 4.3,
            deliveryTime: ['07:30-13:00', '13:00-17:00', '17:00-21:00'],
            menu:[
                {
                    name: 'Pizza',
                    foto: require('./assets/popular-food/pizza.jpg'),
                    price: 12.5,
                    popular:false,
                    restaurant: 'Snack'
                },
                {
                    name: 'Burger',
                    foto: require('./assets/popular-food/fast-food.jpg'),
                    price: 13,
                    popular: true,
                    restaurant: 'Snack'
                },
            ],
            logo: require('./assets/restaurantsLogo/snack-logo.png'),
            website: 'www.snack.com'
        }
    ]);

    return (
        <RestaurantsContext.Provider value={{restaurants}}>{ children }</RestaurantsContext.Provider>
    )
}

export default RestaurantsContext;