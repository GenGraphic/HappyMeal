import { StyleSheet, Text, View, Image,TouchableOpacity, ImageBackground } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import ShoppingCartContext from '../ShoppingCartContext';


//the menu recive the colors from the screen in witch the Menu is beeing rendered
const Menu = ({colorHome, colorLocation}) => {
    const [cartItems, setCartItems] = useState(0);
    const { itemsList } = useContext(ShoppingCartContext);

    //if the length of shopping list changes, change the number on top of icon cart
    useEffect(() => {
        let itemsLength = itemsList.length;
        setCartItems(itemsLength)
    }, [itemsList])


    const naviagtion = useNavigation();
    return (
        <View style={styles.body}>
            <TouchableOpacity 
            onPress={() => {naviagtion.navigate('Home')}}
            style={styles.option}>
                <Image
                style={[styles.icon, {tintColor: colorHome}]}
                source={require('../assets/icons/homeIcon.png')}
                />
                <Text style={[styles.optionTxt, {color: colorHome}]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => {naviagtion.navigate('RestaurantsList')}} 
            style={styles.option}>
                <Image
                style={[styles.icon, {tintColor: colorLocation}]}
                source={require('../assets/icons/location.png')}
                />
                <Text style={[styles.optionTxt, {color: colorLocation}]}>Kitchens</Text>
            </TouchableOpacity>

            <Image
            style={styles.logo} 
            source={require('../assets/logo-column.png')}
            />

            <TouchableOpacity
            onPress={() => naviagtion.navigate('CheckOut')} 
            style={styles.option}>
                <ImageBackground
                style={styles.icon}
                source={require('../assets/icons/shopping-cart.png')}>
                    <View style={styles.cartItemsCont}>
                        <Text style={{color:'#FFF', fontSize: 10}}>{cartItems}</Text>
                    </View>
                </ImageBackground>
                <Text style={styles.optionTxt}>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => naviagtion.navigate('UserProfile')} 
            style={styles.option}>
                <Image
                style={styles.icon}
                source={require('../assets/icons/user.png')}
                />
                <Text style={styles.optionTxt}>Account</Text>
            </TouchableOpacity>
        </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    optionTxt: {
        color: '#3A3A3A',
        fontSize: 10
    },

    body: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        width: 340,
        height: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:10,
        position: 'absolute',
        bottom: 40
    },
    icon: {
        width:25,
        height:25
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignSelf: 'flex-end'
    },
    option: {
        alignItems: 'center',
        flex:1
    },
    cartItemsCont: {
        backgroundColor: '#F99746',
        width:15,
        height:15,
        borderRadius: 7.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -10,
        top: -5
    }
})