import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react';
import RestaurantsContext from '../RestaurantsContext';
import { useNavigation } from '@react-navigation/native';
import ShoppingCartContext from '../ShoppingCartContext';

const RestaurantProfile = ({route}) => {
  const { restaurants } = useContext(RestaurantsContext);
  const { itemsList } = useContext(ShoppingCartContext);
  const { addItem } = useContext(ShoppingCartContext);

  const { restaurantKey } = route.params;
  const navigation = useNavigation();

  //this is the restaurant that has to be render.
  const restaurant = restaurants.find(elm => elm.key === restaurantKey);

  return (
    <View style={styles.body}>

      <View style={styles.checkout}>
          <TouchableOpacity
          onPress={() => navigation.navigate('CheckOut')} 
          style={styles.option}>
            <ImageBackground
            style={styles.icon}
            source={require('../assets/icons/shopping-cart.png')}>
              <View style={styles.cartItemsCont}>
                <Text style={{color:'#FFF', fontSize: 10}}>{itemsList.length}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

      <ImageBackground
      style={styles.logo}
      source={restaurant.logo}>

        <View style={styles.ratingCont}>

          <View style={styles.startBkg}>
            <Image style={styles.starImg} source={require('../assets/icons/star-white.png')}/>
          </View>

          <View style={styles.startBkg}>
            <Image style={styles.starImg} source={require('../assets/icons/star-white.png')}/>
          </View>

          <View style={styles.startBkg}>
            <Image style={styles.starImg} source={require('../assets/icons/star-white.png')}/>
          </View>

          <View style={styles.startBkg}>
            <Image style={styles.starImg} source={require('../assets/icons/star-white.png')}/>
          </View>

          <View style={styles.startBkg}>
            <Image style={styles.starImg} source={require('../assets/icons/star-white.png')}/>
          </View>

          <View style={styles.ratingNrCont}>
            <Text style={{color:'#FFF'}}>{restaurant.ratings}</Text>
          </View>

        </View>

      </ImageBackground>

      <View style={styles.infoCont}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{restaurant.name}</Text>
        <Text style={{fontSize: 14}}>{restaurant.type}</Text>
        <Text style={{textDecorationLine: 'underline'}}>{restaurant.website}</Text>

        <View>
          <Text style={{fontSize: 16, fontWeight: '500'}}>Delivery Time</Text>

          <View style={styles.deliveritimeCont}>
            <Text style={styles.boldTxt}>Breakfast:
              <Text style={{fontWeight: 'normal'}}>{restaurant.deliveryTime[0]}</Text>
            </Text>

            <Text style={styles.boldTxt}>Lunch:
              <Text style={{fontWeight: 'normal'}}>{restaurant.deliveryTime[1]}</Text>
            </Text>

            <Text style={styles.boldTxt}>Dinner:
              <Text style={{fontWeight: 'normal'}}>{restaurant.deliveryTime[2]}</Text>
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.menuList}>

        <Text style={styles.titleMenuList}>Menu:</Text>

        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        >
          {restaurant.menu.map((item) => {
            return (
              <View style={styles.itemBody}>
                <Image source={item.foto} style={styles.itemImg}/>
                
                <View style={styles.itemInfoCont}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}€</Text>
                  <Text style={styles.itemPrice}>Free delivery</Text>

                  <View style={styles.daysCont}>
                    <View style={styles.day}>
                      <Text style={{color:'#FFF'}}>M</Text>
                    </View>
                    <View style={styles.day}>
                      <Text style={{color:'#FFF'}}>M</Text>
                    </View>
                    <View style={styles.day}>
                      <Text style={{color:'#FFF'}}>M</Text>
                    </View>
                    <View style={styles.day}>
                      <Text style={{color:'#FFF'}}>M</Text>
                    </View>
                    <View style={styles.day}>
                      <Text style={{color:'#FFF'}}>M</Text>
                    </View>
                    <View style={styles.day}>
                      <Text style={{color:'#FFF'}}>M</Text>
                    </View>
                    <View style={styles.day}>
                      <Text style={{color:'#FFF'}}>M</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.addBtnCont}>
                  <TouchableOpacity style={styles.addBtn} onPress={() => addItem(item.name, item.restaurant, item.price)}>
                    <Text style={styles.plsuIcon}>+</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            )
          })
          }
        </ScrollView>
      </View>
      
    </View>
  )
}

export default RestaurantProfile

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25
  },
  boldTxt: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  body: {
    flex: 1,
    backgroundColor: '#EAF3FA'
  },
  logo: {
    height: 200,
    justifyContent: 'flex-end',
    padding: 15
  },
  starImg: {
    width: 15,
    height: 15
  },
  startBkg: {
    backgroundColor: '#000',
    margin: 3,
    borderRadius: 5,
    height: 16
  },
  ratingCont: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingNrCont: {
    backgroundColor: '#68CA44',
    padding: 5,
    marginLeft: 5,
    borderRadius: 5
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
  },
  checkout: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFF',
    width: '100%',
    padding: 10,
    paddingRight: 20,
    alignItems: 'flex-end'
  },
  infoCont: {
    height: 130,
    justifyContent: 'space-between',
    padding: 10
  },
  deliveritimeCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuList: {
    padding:10,
    backgroundColor: '#F8F9F9',
    flex:1
  },
  titleMenuList: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingBottom: 10
  },

  //syle for menu items
  itemBody: {
    width: '90%',
    height: 100,
    backgroundColor: '#EAF3FA',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: {width:4, height:4},
    shadowOpacity: 0.2,
    flexDirection: 'row'
  },
  itemImg: {
    width: 100,
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  itemPrice: {
    fontSize: 12,
    opacity: 0.7
  },
  itemInfoCont: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 5
  },
  daysCont: {
    flexDirection: 'row'
  },
  day: {
    backgroundColor: '#68CA44',
    padding: 2,
    margin: 2,
    borderRadius: 5
  },
  addBtnCont: {
    flex:1,
    alignItems: 'flex-end',
    padding: 10
  },
  addBtn: {
    backgroundColor: '#F99746',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2
  },
  plsuIcon: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20
  }
})