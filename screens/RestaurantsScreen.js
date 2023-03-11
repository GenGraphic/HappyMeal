import { StyleSheet, Text, View, Image, TextInput,SafeAreaView, ScrollView, FlatList } from 'react-native';
import React, {useContext} from 'react';
import UserContext from '../UserContext';
import RestaurantsContext from '../RestaurantsContext';
import Restaurant from '../components/Restaurant';
import Menu from '../components/Menu';

const RestaurantsScreen = () => {
  const { userData } = useContext(UserContext);
  const { restaurants } = useContext(RestaurantsContext);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.topBar}>
        <Image
          style={styles.icon}
          source={require('../assets/icons/location.png')}
        />
        <TextInput
          style={styles.locationInput}
          placeholder={userData.location}
        />
        <Image
          style={styles.icon}
          source={require('../assets/icons/filter.png')}
        />
      </View>

      <FlatList
        data={restaurants}
        keyExtractor={restaurants.index}
        renderItem={({item}) => {
          return(
            <Restaurant 
              restaurantKey={item.key} 
              img={item.logo}
              restaurantType={item.type}
              restaurantRating={item.ratings}
              restaurantName={item.name}
              deliveryTime={item.deliveryTime}
              objHeight={170}
              objWidth={160}
            >
            </Restaurant>
          )
        }}
        horizontal={false}
        numColumns={2}
        style={{width:'100%', padding:5}}
      />
      <Menu colorHome={'#000'} colorLocation={'#F99746'}></Menu>
    </SafeAreaView>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  },
  body: { 
    backgroundColor: '#EAF3FA',
    flex:1,
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9F9',
    width: 350,
    height: 50,
    borderRadius: 10,
    padding:10
  },
  locationInput: {
    flex:1,
    marginLeft: 10
  },
})