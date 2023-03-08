import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, StatusBar, Alert, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react';
import { auth } from '../firebase';
import { updateProfile, updateEmail, deleteUser } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import UserContext from '../UserContext';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();
  let user = auth.currentUser;
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.displayName);
  const [profileImg, setProfileImg] = useState(user.photoURL);
  const [toggleEdit, setToggleEdit] = useState(false)
  const { userData } = useContext(UserContext);
  const { setUserLocation } = useContext(UserContext);
  const { setUserPhoneNumber } = useContext(UserContext);

  const [phoneNumber, setPhonenumber] = useState('')
  const [adress, setAdress] = useState('')
  const [newEmail, setNewEmail] = useState('');

  //usign expi pickimage to update the user profile image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    });
    if(!result.canceled) {
      updateProfile(user, {
        photoURL: result.assets[0].uri
      })
    } 
    setProfileImg(result.assets[0].uri)   
  }

  
  const changeName = (text) => {
    updateProfile(user, {
      displayName: text
    })
    .then(() =>{
      setName(user.displayName)
    })
  }

  //Function that changes the name and phone number only if there are changes added to it
  //also the email is beeing change if any changes are beeing added
  const saveNewData = () => {
    if(adress !== ''){
      setUserLocation(adress);
    }
    if(phoneNumber !== ''){
      setUserPhoneNumber(phoneNumber);
    }
    
    if(newEmail) {
      updateEmail(user, newEmail)
      .then(() => {
        navigation.navigate('SignIn')
      })
      .catch(() => {
        alert('For security reason you have you log out first and come back.')
      })
    }
    //set toggle to false so the fields are dsabled
    setToggleEdit(false);
  }

  //remove user
  const removeUser = () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account? This can NOT be undone', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          deleteUser(user)
            .then(() => {
              navigation.navigate('SignUp')
            })
            .catch(() => {
              alert('For security reason you have you log out first and come back.')
            })
        }
      }
    ]);
  };

  //logout user
  const logOutUser = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate('SignIn')
      })
      .catch(error => alert(error.message))
  }


    
  return (
    <View style={styles.body}>
    <StatusBar backgroundColor='white'></StatusBar>

      <View style={styles.aboutUserCont}>
        <TouchableOpacity
        onPress={pickImage}
        style={styles.profileImageCont} 
        >
          <ImageBackground
          style={styles.profileImage}
          source={{uri: profileImg}}
          >
            <Text style={styles.editProfileImg}>Edit</Text>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.userInfoCont}>
          <Text
          style={{fontSize: 16, fontWeight: 'bold'}}
          >
            Hi, {user.displayName}</Text>
          <Text>{user.email}</Text>
        </View>
      </View>

      <View style={styles.tabsCont}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Your Order</Text>
          <Text style={styles.cardCounter}>3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Favorite Restaurants</Text>
          <Text style={styles.cardCounter}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Adresses</Text>
          <Text style={styles.cardCounter}>1</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.infoEditsCont}>
        <View style={styles.field}>
          <Text style={styles.titleField}>Name:</Text>
          <TextInput
            placeholder={user.displayName}
            editable={toggleEdit}
            style={styles.textInput}
            onChangeText={(text) => changeName(text)}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.titleField}>Email:</Text>
          <TextInput
            placeholder={user.email}
            editable={toggleEdit}
            style={styles.textInput}
            onChangeText={(text) => setNewEmail(text)}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.titleField}>Adress:</Text>
          <TextInput
            placeholder={userData.location}
            editable={toggleEdit}
            style={styles.textInput}
            onChangeText={(text) => setAdress(text)}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.titleField}>Phone Number:</Text>
          <TextInput
            placeholder={userData.phoneNumber}
            editable={toggleEdit}
            style={styles.textInput}
            onChangeText={(text) =>setPhonenumber(text)}
          />
        </View>

        <View style={styles.btnCont}>
          <TouchableOpacity
            onPress={() => setToggleEdit(true)}
            style={styles.editBtn}
          >
            <Text style={{color:'#FFF'}}>Edit</Text>
          </TouchableOpacity>

          {toggleEdit &&
            <TouchableOpacity
              onPress={saveNewData}
              style={styles.saveBtn}
            >
              <Text style={{color:'#FFF'}}>Save</Text>
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
        

      <View style={{padding: 10}}>
        <Text style={{textAlign:'center'}}>Please read our 
          <Text style={styles.underlineText}> Privicy Policy Terms </Text>and 
          <Text style={styles.underlineText}> Conditions </Text>about Refund and
          <Text style={styles.underlineText}> Cancellations Policy </Text>
        </Text>
      </View>

      <View style={styles.btnCont}>
        <TouchableOpacity
        onPress={logOutUser} 
        style={styles.logOutBtn}
        >
          <Text style={{color:'#FFF'}}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={removeUser}
        style={styles.deleteBtn}
        >
          <Text style={{color:'#FFF'}}>Delete account</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  underlineText: {
    textDecorationLine: 'underline'
  },


  body: {
    flex:1,
    alignItems: 'center',
    paddingBottom: 20
  },
  profileImageCont: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  editProfileImg: {
    color: '#FFF',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    textAlign: 'center',
    padding: 2
  },
  aboutUserCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  userInfoCont: {
    marginLeft: 10
  },
  tabsCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  card: {
    backgroundColor: '#F99746',
    height: 100,
    width: 100, 
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10,
    shadowColor: 'black',
    shadowOffset: {width:4, height: 4},
    shadowOpacity: 0.2
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardCounter: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  infoEditsCont: {
    padding: 10,
    backgroundColor: '#F8F9F9',
    marginTop: 10,
    alignItems: 'center'
  },
  field: {
    borderBottomColor: '#3A3A3A',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%'
  },
  titleField: {
    fontSize: 16,
    marginBottom: 5
  },
  editBtn: {
    backgroundColor: '#68CA44',
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  saveBtn: {
    backgroundColor: '#AECDFB',
    width: 100,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  textInput: {
    width: '100%'
  },
  btnCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  logOutBtn: {
    backgroundColor: '#68CA44',
    width: 150,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2}
  },
  deleteBtn: {
    backgroundColor: '#CA3433',
    width: 150,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2}
  }
})