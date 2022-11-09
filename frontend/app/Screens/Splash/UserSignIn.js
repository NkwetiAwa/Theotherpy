import React, { useState } from 'react';
import { Image, ImageBackground, ActivityIndicator, TouchableOpacity, Text, StyleSheet, View, TextInput, Alert} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function UserSignIn(){
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = () => {
    if(!mail || !pass){
      return Alert.alert(
        `Invalid Input`,
        "Please fill all fields to continue.",
      )
    }
    if(!loading){
      setLoading(true);
      const data = { mail: mail, pass: pass }
      axios.post(`${url}authenticate/login`, data)
      .then(res => {
        if(res.data.stat){
          console.log(res.data)
          loadAsync(res.data.token, res.data.doctor);
          setTimeout(() => setLoading(false), 1000);
        }else{
          setTimeout(() => setLoading(false), 1000);
          return Alert.alert(
            `Invalid Credentials`,
            "The login credentials you provided do not match any account in our system",
          );
        }
      })
      .catch(err => {
        setTimeout(() => setLoading(false), 1000);
        return Alert.alert(
          `Ooops!`,
          "There seems to be a problem with your network connection, please try again",
        );
      })
    }
  }

  const loadAsync = async(token, doc) => {
    const user = { token: token, doc: doc }
    await AsyncStorage.setItem('userToken', JSON.stringify(user));
    navigation.navigate('Home');
  }

  return(
    <View style={styles.container}>
      <View style={{ width: '100%', height: '40%' }}>
        <Image source={require('../../Assets/family.jpg')} style={{ width: '100%', height: '100%', borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} />
      </View>
      <View style={{ marginTop: '-20%', width: '94%', padding: 10, paddingBottom: 20, borderRadius: 8, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: 'white', elevation: 5 }}>
        <Text style={styles.headertext}>Welcome Back.</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Email or phone number"
            onChangeText={mail => setMail(mail)}
            underlineColorAndroid='transparent'
            keyboardType = 'email-address'
            style={styles.textinput}
          />
          <TextInput
            placeholder="Password"
            onChangeText={e => setPass(e)}
            underlineColorAndroid='transparent'
            secureTextEntry={true}
            style={styles.textinput}
          />

          <TouchableOpacity onPress={() => handleSignIn()} style={styles.btn}>
            {loading?<ActivityIndicator size={'small'} color="white" />:<Text style={styles.btntxt}>Sign In</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('UserSignUp')} style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={{fontSize: 16}}>Don't have an account yet? <Text style={{fontWeight: 'bold'}} >Sign Up.</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  headertext: {
      fontSize: 40,
      margin: 10
  },
  form: {
    width: '98%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  btn: {
    width: '100%',
    padding: 10,
    backgroundColor: '#396AE8',
    marginTop: 10,
    borderRadius: 4
  },
  btntxt: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  textinput: {
    marginBottom: 7,
    height: 45,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 3,
    paddingHorizontal: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#dbdbdb'
  },
})