import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext} from 'react';
import { format } from 'date-fns';
import ShoppingCartContext from '../ShoppingCartContext';

const DishItem = ({dishName, dishPrice, calculateTotal, dishKey, dishQuantity}) => {
    let [todayDate, setTodayDate] = useState('');
    let [quantity, setQuantity] = useState(dishQuantity);
    const [price, setPrice] = useState(dishPrice)
    const { removeItem } = useContext(ShoppingCartContext);
    const { addQuantity } = useContext(ShoppingCartContext);
    const { removeQuantity } = useContext(ShoppingCartContext);
    const { itemsList } = useContext(ShoppingCartContext);


    //on render convert date.now using format api and set the date
    useEffect(() => {
        const newDate = Date.now();

        const dateString = format(newDate, 'dd-mm-yyyy');

        setTodayDate(dateString);

    }, [])

    //increse quantity
    //multyply price
    const increaseQuantity = () => {
        addQuantity(dishKey);

        let newQuantity = itemsList.find(elm => elm.key === dishKey).quantity;

        setQuantity(newQuantity)

        const newPrice = dishPrice * newQuantity

        setPrice(newPrice)

        calculateTotal()
    }

    //decrese the quantity
    //if quytity is 0, then call function from Shopping card and remove element with key
    //calculate new price
    const decreaseQuantity = () => {
        if(quantity <= 1){
            removeItem(dishKey);
        } else {
            removeQuantity(dishKey);

            let newQuantity = itemsList.find(elm => elm.key === dishKey).quantity;
            setQuantity(newQuantity);

            const newPrice = dishPrice * newQuantity;
            setPrice(newPrice)

            calculateTotal()
        }
    }

  return (
    <View style={styles.body}>
        <Image
            style={styles.icon}
            source={require('../assets/icons/itemList.png')}
        />

        <View style={styles.infoCont}>
            <Text style={styles.title}>{dishName}</Text>
            <View>
                <Text style={styles.details}>{todayDate}</Text>
                <Text style={styles.details}>About 17:00</Text>
            </View>
            
        </View>

        <View style={styles.quantityPresCont}>
            <View style={styles.quantityCont}>
                <TouchableOpacity onPress={decreaseQuantity}>
                    <Text style={{fontSize:20}}>-</Text>
                </TouchableOpacity>
                
                <Text>{quantity}</Text>

                <TouchableOpacity onPress={increaseQuantity}>
                    <Text style={{fontSize:20}}>+</Text>
                </TouchableOpacity>
            </View>

            <Text>{price}€</Text>
        </View>
      
    </View>
  )
}

export default DishItem

const styles = StyleSheet.create({
    icon: {
        width:20,
        height: 20
    },

    body: {
        width: '100%',
        height: 65,
        backgroundColor: '#F8F9F9',
        borderRadius: 10,
        borderColor: '#68CA44',
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
    details: {
        fontSize: 12,
        color: '#3A3A3A',
    },
    infoCont: {
        marginLeft: 10,
        flex:1,
        height: '100%',
        justifyContent: 'space-between'
    },
    quantityPresCont: {
        height: '100%',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityCont: {
        flexDirection: 'row',
        backgroundColor: '#68CA44',
        width: 70,
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        borderColor: '#247D03',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOffset: {width: 1, height:1},
        shadowOpacity: 0.2
    }
})