import { StyleSheet, Text, View, Image, } from 'react-native';
import React, {useContext, useState} from 'react';
import UserContext from '../UserContext';

const Adress = () => {
    const {toggleCheckBox, setToggleCheckBox} = useState(false);
    const { userData } = useContext(UserContext);


  return (
    <View style={styles.body}>
      <View style={styles.titleCont}>
        <Image
            style={styles.icon}
            source={require('../assets/icons/homeIcon.png')}
        />
        <Text style={styles.adressTitle}>Home</Text>
      </View>

      <View style={styles.adressCont}>
        <Text>{userData.location}</Text>
        <View style={styles.checkBox}>
            <View style={styles.checkBoxDot}></View>
        </View>
      </View>

      
    </View>
  )
}

export default Adress

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    },
    
    body: {
        width: '100%',
        height: 60,
        borderColor: '#3A3A3A', //black
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    },
    titleCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    adressTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 5
    },
    checkBox: {
        width: 20,
        height: 20,
        backgroundColor: '#F99746',//Orange
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxDot: {
        width: 8,
        height: 8,
        backgroundColor: '#F8F9F9', //white
        borderRadius: 4
    },
    adressCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})