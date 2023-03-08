import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './UserContext';
import { RestaurantsProvider } from './RestaurantsContext';
import { ShoppingCartProvider } from './ShoppingCartContext';

//Screens
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import UserProfile from './screens/UserProfile';
import RestaurantsScreen from './screens/RestaurantsScreen';
import RestaurantProfile from './screens/RestaurantProfile';
import LocationScreen from './screens/LocationScreen';
import CheckOutScreen from './screens/CheckOutScreen';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    //user provider hold all the information about the user(name, location email)
    <UserProvider>
      <RestaurantsProvider>
        <ShoppingCartProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="SignUp" component={SignUpScreen}/>
              <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="SignIn" component={SignInScreen}/>
              <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Home" component={HomeScreen}/>
              <Stack.Screen options={{title: 'Profile'}} name="UserProfile" component={UserProfile}/>
              <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="RestaurantsList" component={RestaurantsScreen}/>
              <Stack.Screen name="RestaurantProfile" options={{title: 'Restaurant'}} component={RestaurantProfile}/>
              <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="LocationScreen" component={LocationScreen}/>
              <Stack.Screen name="CheckOut" component={CheckOutScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
        </ShoppingCartProvider>
      </RestaurantsProvider>
    </UserProvider>
  );
}

export default App;