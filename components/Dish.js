import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import ShoppingCartContext from '../ShoppingCartContext';

const Dish = ({dishImg, restaurantName, dishName, dishPrice}) => {
    const { addItem } = useContext(ShoppingCartContext);


    return (
        <View style={styles.body}>
            <ImageBackground
            style={styles.dishImg}
            source={dishImg}
            borderRadius={5}
            >
                <View style={styles.topBar}>
                    <View style={styles.restaurantName}>
                        <Text style={styles.whiteTxt}>{restaurantName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => addItem(dishName, restaurantName, dishPrice)}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/add.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.dishName}>
                    <Text style={styles.whiteTxt}>{dishName}</Text>
                </View>
            </ImageBackground>
        </View>
  )
}

export default Dish

const styles = StyleSheet.create({
    whiteTxt: {
        color:'#FFF'
    },
    icon: {
        width:30,
        height:30,
        marginRight: 10
    },

    body: {
        width: 360, 
        height: 170,
        marginBottom: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    dishImg: {
        height: '100%',
        justifyContent: 'space-between'
    },
    restaurantName: {
        backgroundColor: '#F99746',
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 5,
        margin:10
    },
    dishName: {
        backgroundColor: '#68CA44',
        alignSelf: 'flex-end',
        borderRadius: 5,
        margin: 10,
        padding:5
    }
})