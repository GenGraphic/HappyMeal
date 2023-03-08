import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, Alert, ActivityIndicator } from 'react-native'
import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import UserContext from '../UserContext';


const LocationScreen = () => {
  const [location, setLocation] = useState([]);
  const [locationPlaceholder, setLocationPlaceholder] = useState('Enter your location');
  const { setUserLocation } = useContext(UserContext);
  const [loadingScrenn, setLoadingScreen] = useState(false);

  const navigation = useNavigation();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if(status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service, or type the adress in the second field.',
        [{text: 'OK'}],
        {cancelable: false}
      );
    }

    setLoadingScreen(true);

    let { coords } = await Location.getCurrentPositionAsync();

    if(coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for(let item of response) {
        let adress = `${item.name}, ${item.postalCode}, ${item.city}`

        Alert.alert(
          'Did we get your adress right?',
          adress,
          [
          {text:'Yes', onPress: () => {
            setLocation(adress)
            setUserLocation(adress);
            navigation.navigate('Home')
          }}, 
          {text:'No'}
          ]
        )
      }
    }
  }

  return (
    <View style={styles.body}>
      <View style={{width:'100%'}}>
        <Image 
          style={styles.vector}
          source={require('../assets/icons/vectorLoc.jpg')}
        />
        <Text style={styles.title}>Let us know your location</Text>
        <Text style={styles.subtitle}>We need you location to deliver exactly where you are.</Text>
      </View>

      <View style={{justifyContent:'space-between', height: '20%'}}>
        <TouchableOpacity style={styles.locationBtn} onPress={getLocation}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/navigation.png')}
          />
          <Text style={{color:'#FFF', marginLeft:10}}>USE CURRENT LOCATION</Text>
        </TouchableOpacity>

        <Text style={{textAlign:'center', opacity:0.5}}>-or-</Text>

        <View style={styles.locationInput}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/search-black.png')}
          />
          <TextInput placeholder={locationPlaceholder} style={styles.locationInputField} onChangeText={(text) => setLocation(text)}/>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={{color:'#FFF'}}>Continue</Text>
        </TouchableOpacity>
      </View>

      <ActivityIndicator
      size='large'
      color='black'
      style={styles.loadingIndicator}
      animating={loadingScrenn}/>

      <StatusBar barStyle="dark-content"/>
    </View> 
  )
}

export default LocationScreen

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%'
  },



  body: {
    flex: 1,
    backgroundColor: '#EAF3FA',
    
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  vector: {
    width: '100%',
    height: 255,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
  },
  locationBtn: {
    width: 300,
    height: 50,
    backgroundColor: '#F99746',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width:2, height:4},
    shadowOpacity: 0.2
  },
  locationInput: {
    width: 300,
    height: 50,
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderRadius: 10,
  },
  locationInputField: {
    width: '100%',
    height: '100%',
    marginLeft: 10
  },
  continueBtn: {
    width: 300,
    height: 50,
    backgroundColor: '#AECDFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width:2, height:4},
    shadowOpacity: 0.2
  }
})