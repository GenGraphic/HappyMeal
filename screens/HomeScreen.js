import { StyleSheet, Text, View, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../UserContext';
import RestaurantsContext from '../RestaurantsContext';
import Restaurant from '../components/Restaurant';
import Dish from '../components/Dish';
import Menu from '../components/Menu';

const HomeScreen = () => {
  const { userData } = useContext(UserContext);
  const { restaurants } = useContext(RestaurantsContext);

  const [popularDishes, setPopularDishes] = useState([]);

  //useEffet lets you call a function on load
  useEffect(() => {
    //make a new empty list 
    let newPopularDishes = [];

    //search in all restaurant menu, object that have atribute popular = true
    //if so, push this element to the new empty lits
    restaurants.forEach(restaurant => {
      let dish = restaurant.menu.filter(elm => elm.popular === true)
      for(let i = 0; i <dish.length; i++){
        newPopularDishes.push(dish[i])
      }
    });

    //after searchinf for pupular list and append this objects to it, set the main popular dishes list the freshly made list
    setPopularDishes(newPopularDishes);
  }, [])

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.topBar}>
        <Image
          style={styles.icon}
          source={require('../assets/icons/location.png')}
        />
        <TextInput
          style={styles.txtInput}
          placeholder= {userData.location}/>
      </View>

      <View style={styles.searchBar}>
        <Image
          style={styles.icon}
          source={require('../assets/icons/search-orange.png')}
        />
        <TextInput
          style={styles.txtInput}
          placeholder='Search for Restaurants or dishes'
        />
      </View>

      <View>
        <ScrollView horizontal={true} style={{flexGrow:0}} contentContainerStyle={styles.categoryList} showsHorizontalScrollIndicator={false}>
        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/sushi.png')}
          />
          <Text>sushi</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/salad.png')}
          />
          <Text>salad</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/roasted-chicken.png')}
          />
          <Text>chicken</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/ramen.png')}
          />
          <Text>ramen</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/pizza.png')}
          />
          <Text>pizza</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/hot-pot.png')}
          />
          <Text>breakfast</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/hot.png')}
          />
          <Text>lunch</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/cake.png')}
          />
          <Text>desert</Text>
        </View>

        <View style={styles.category}>
          <Image
            style={styles.categoryImg}
            source={require('../assets/icons/food-categories/burger.png')}
          />
          <Text>fast-food</Text>
        </View>

        </ScrollView>
      </View>
      

      <View>
        <Text style={{fontSize: 16, fontWeight:'bold', marginLeft:10, marginTop: 10}}>Best rated Restaurants</Text>
        <ScrollView horizontal={true} style={{flexGrow:0}} contentContainerStyle={styles.restaurantsList} showsHorizontalScrollIndicator={false}>
          {restaurants.map((item) => {
          return(
            <Restaurant 
              restaurantKey={item.key} 
              img={item.logo}
              restaurantType={item.type}
              restaurantRating={item.ratings}
              restaurantName={item.name}
              deliveryTime={item.deliveryTime}
              objHeight={160}
              objWidth={130}
            >
            </Restaurant>
          )
          })
          }
        </ScrollView>
      </View>

      <Text style={{fontSize: 16, fontWeight:'bold', margin: 10, alignSelf:'flex-start'}}>Best rated Restaurants</Text>

      <ScrollView contentContainerStyle={{paddingBottom:100}} showsVerticalScrollIndicator={false}>
          {popularDishes.map((item) => {
            return (
              <Dish
                key={item.index}
                dishImg={item.foto}
                restaurantName={item.restaurant}
                dishName={item.name}
                dishPrice={item.price}
              >
              </Dish>
              )
            })
          }
        </ScrollView>
        <Menu></Menu>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  icon: {
    width:25,
    height:25
  },
  txtInput: {
    marginLeft: 10,
    width: '100%',
    height: '100%'
  },


  body: {
    backgroundColor: '#EAF3FA',
    alignItems: 'center',
    flex:1
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A', //dark
    padding: 5,
    width: 360
  },
  searchBar: {
    backgroundColor: '#F8F9F9', //white
    width: 360,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginTop: 10
  },
  categoryList: {
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderBottomColor: '#3A3A3A',
    borderBottomWidth: 1,
  },
  category: {
    alignItems: 'center',
    marginRight: 25
  },
  categoryImg: {
    width: 50,
    height: 50
  },
})