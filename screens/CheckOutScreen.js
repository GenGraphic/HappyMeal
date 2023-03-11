import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import Adress from '../components/Adress';
import ShoppingCartContext from '../ShoppingCartContext';
import DishItem from '../components/DishItem';


const CheckOutScreen = () => {
  const { itemsList } = useContext(ShoppingCartContext);
  const { setItemsList } = useContext(ShoppingCartContext);
  const [itemsPrice, setItemsPrice] = useState(0);
 
  
  const calculateTotal = () => {
    let newTotal = 0;

    for(let i = 0; i < itemsList.length; i++) {
      const quantity = itemsList[i].quantity
      const price = itemsList[i].price

      let total = price * quantity

      newTotal = newTotal + total
    }

    setItemsPrice(newTotal)
  }
  useEffect(() => {
    calculateTotal();
  }, [itemsList])

  const placeOrder = () => {
    //fisrt send email to info@happymeals.com

    //second empty the list of items
    setItemsList([]);

    //give user a thank you alert
    Alert.alert('Your order has beed placed succesfully.')
  }

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.body}>
      <View style={styles.adressCont}>
        <Text style={styles.titleAdress}>Where should we deliver?</Text>

        <View style={styles.adressesObjects}>  
          <Adress></Adress>
        </View>

        <View style={styles.adressForm}>
          <Text style={{fontSize: 16, fontWeight: '500', alignSelf: 'flex-start'}}>New Adress</Text>

          <View style={{flexDirection: 'row', gap:10}}>
            <TextInput
              style={styles.adressInput}
              placeholder='City'
            />
            <TextInput
              style={styles.adressInput}
              placeholder='Postal code'
            />
          </View>
          <TextInput
              style={styles.streetInput}
              placeholder='Street name and house number'
            />
        </View>
      </View>

      <ScrollView style={{width:'100%'}}>
        <View style={styles.cartList}>
          <Text style={styles.titleAdress}>Items:</Text>
          {itemsList.length === 0 ? //if list is empty than render the text that says that
            <View style={styles.ifEmptyList}>
              <Image
              source={require('../assets/icons/nothing-hier.png')} 
              style={styles.ifEmptyListImg}/>
              <Text style={{textAlign: 'center', margin:10, flex:1}}>There is nothing here. Go get you something.</Text>
            </View>
            : //if list is not empty, render the list
            itemsList.map((item) => {
            return (
              <DishItem
              key={item.key}
              dishName={item.name}
              dishPrice={item.price}
              dishRestaurant={item.restaurantName}
              dishKey={item.key}
              dishQuantity={item.quantity}
              calculateTotal={calculateTotal}
              >
              </DishItem>
            )
          })
          }
        </View>
      </ScrollView>

      <View style={styles.deliveryInfo}>
        <Text style={styles.titleAdress}>Is there something we need to know?</Text>

        <View style={styles.inputFieldCont}>
          <Image 
            style={styles.icon}
            source={require('../assets/icons/letter-i.png')}
          />

          <TextInput
            placeholder='Delivery instructions...'
          />
        </View>
      </View>

      <View style={styles.totalCont}>
        <View style={styles.row}>
          <Text>Total:</Text>
          <Text>{itemsPrice}€</Text>
        </View>
        
        <View style={styles.row}>
          <Text>Delivery Fee:</Text>
          <Text>Free</Text>
        </View>

        <View style={[styles.row, {borderBottomColor:'#3A3A3A', borderTopWidth: 2, marginTop: 10, marginBottom: 10}]}>
          <Text style={{fontSize:16, fontWeight: 'bold'}}>To Pay:</Text>
          <Text style={{fontSize:16, fontWeight: 'bold'}}>{itemsPrice}€</Text>
        </View>
      </View>

      <TouchableOpacity 
      onPress={placeOrder}
      style={styles.placeOrderBtn}>
        <Image 
          style={styles.iconLarge}
          source={require('../assets/icons/credit-card-white.png')}
        />
        <Text style={styles.textOrderBtn}>Place order for {itemsPrice} €</Text>
        <Image
          style={styles.iconLarge}
          source={require('../assets/icons/next-white.png')}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default CheckOutScreen

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginRight:10
  },
  iconLarge: {
    width:35,
    height: 35
  },

  body: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#EAF3FA', //light blue
    paddingBottom:10
  },
  titleAdress: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  adressCont: {
    width: '100%',
    backgroundColor: '#F8F9F9', //white
    padding: 10
  },
  adressesObjects: {
    alignItems: 'center',
    marginTop: 10
  },
  adressForm: {
    alignItems: 'center',
    marginTop: 10
  },
  adressInput: {
    height: 30,
    borderBottomColor: '#F99746', //licht black
    borderBottomWidth: 1,
    flex: 1,
  },
  streetInput: {
    alignSelf: 'flex-start',
    borderBottomColor: '#F99746',
    borderBottomWidth: 1,
    height: 50,
    width: '100%',
  },
  cartList: {
    width: '100%',
    padding: 10
  },
  deliveryInfo: {
    backgroundColor: '#F8F9F9',
    width: '100%',
    padding: 10,
  },
  inputFieldCont: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#3A3A3A',
    borderWidth: 1,
    padding: 5,
    height: 35,
    alignItems: 'center',
    marginTop: 10
  },
  ifEmptyList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '100%',
    margin: 10
  },
  ifEmptyListImg: {
    width: 100,
    height:100,
    borderRadius:50
  },
  totalCont: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F8F9F9',
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20
  },
  placeOrderBtn: {
    width: '90%',
    height: 60,
    backgroundColor: '#F99746',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {width:2, height:2},
    shadowOpacity: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  textOrderBtn: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
})