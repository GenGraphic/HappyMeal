import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Restaurant = ({img, restaurantType, restaurantRating, restaurantName, deliveryTime, restaurantKey, objWidth, objHeight }) => {
    const navigation = useNavigation();
    const [width, setWidth] = useState(objWidth);
    const [height, setHeight] = useState(objHeight);

    //navigate to the RestaurantProfile with a key prop.
    //this is the key prop that has the key of clicked restaurant
    const navigateToRestaurant = () => {
        navigation.navigate('RestaurantProfile',  {
            restaurantKey: restaurantKey //i use the key of the restaurant to find the right restaurant and render the items
        });
    }

  return (
    <TouchableOpacity 
    onPress={navigateToRestaurant}
    style={[styles.body, {width: width, height: height}]}>
        <ImageBackground
        style={styles.logoImg}
        source={img}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        >
            <View style={styles.type}>
                <Text style={{color:'#FFF', fontSize:12}}>{restaurantType}</Text>
            </View>


            <View style={styles.ratingCont}>
                <Image
                    style={styles.icon}
                    source={require('../assets/icons/star-white.png')}
                />
                <Text style={{color:'#FFF', margin:2, fontSize:10}}>{restaurantRating}</Text>
            </View>
        </ImageBackground>
        <Text style={styles.title}>{restaurantName}</Text>

        <View  style={styles.deliveryTime}>
            <Text style={{color:'#FFF', fontSize: 12}}>{deliveryTime[0]}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Restaurant

const styles = StyleSheet.create({
    body: {
        width: 130,
        height: 160,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#F8F9F9',
        shadowColor: 'black',
        shadowOffset: {width:4, height:4},
        shadowOpacity: 0.2
    },
    icon: {
        width:15,
        height: 15
    },
    logoImg: {
        height: 100,
        justifyContent: 'space-between'
    },
    type: {
        backgroundColor: '#F99746', //orange
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        padding:2,
        margin: 5,
        borderRadius: 5
    },
    ratingCont: {
        backgroundColor: '#68CA44', //green
        alignSelf: 'flex-end',
        flexDirection:'row',
        padding: 2,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3A3A3A',
        margin: 5
    },
    deliveryTime: {
        backgroundColor: '#68CA44',
        alignSelf: 'flex-start',
        padding:2,
        borderRadius: 5,
        marginLeft:5
    }
})