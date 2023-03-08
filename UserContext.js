import {createContext, useState} from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userData, setUserData] = useState({
        name: 'there...',
        location: 'Enter your location',
        email: 'Your Email...',
        phoneNumber: 'Your phone number...'
    })

    //set User name
    const setUserName = (newName) => {
        const newUserData = userData;

        newUserData.name = newName

        setUserData(newUserData);
    }

    //set user location
    const setUserLocation = (newLocation) => {
        const newUserData = userData;

        newUserData.location = newLocation

        setUserData(newUserData);
    }

    //set user Email
    const setUserPhoneNumber = (newNumber) => {
        const newUserData = userData;

        newUserData.phoneNumber = newNumber

        setUserData(newUserData);
    }

    return (
        <UserContext.Provider value={{userData, setUserData, setUserPhoneNumber, setUserName, setUserLocation}}>{ children }</UserContext.Provider>
    )
}

export default UserContext;