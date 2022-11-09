import React, { useState } from 'react';
import { Image, ScrollView, ActivityIndicator, TouchableOpacity, Text, StyleSheet, View, TextInput, Alert} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function DocSignUp(){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async() => {
    if(!name || !phone || !email || !password){
      return Alert.alert(
        `Invalid Input`,
        "Please fill all fields to continue.",
      )
    }
    if(!loading){
      setLoading(true);
      const data = { name: name, phone: phone, email: email, password: password, doctor: true }
      axios.post(`${url}authenticate/get-started`, data)
      .then(res => {
        if(res.data.stat){
          loadAsync(res.data.token);
          setTimeout(() => setLoading(false), 1000);
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

  const loadAsync = async(token) => {
    const user = { token: token, doc: true }
    await AsyncStorage.setItem('userToken', JSON.stringify(user));
    navigation.navigate('EditProfile');
  }

  return(
    <View style={styles.container}>
      <View style={{ width: '100%', height: '40%' }}>
        <Image source={require('../../Assets/woman.jpg')} style={{ width: '100%', height: '100%', borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} />
      </View>
      <ScrollView style={{ marginTop: '-20%', width: '94%', padding: 10, paddingBottom: 20, borderRadius: 8, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: 'white', elevation: 5 }}>
        <Text style={styles.headertext}>Welcome.</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Full Name"
            onChangeText={e => setName(e)}
            underlineColorAndroid='transparent'
            keyboardType = 'ascii-capable'
            style={styles.textinput}
          />
          <TextInput
            placeholder="Phone Number"
            onChangeText={e => setPhone(e)}
            underlineColorAndroid='transparent'
            keyboardType = 'phone-pad'
            style={styles.textinput}
          />
          <TextInput
            placeholder="Email Address"
            onChangeText={mail => setEmail(mail)}
            underlineColorAndroid='transparent'
            keyboardType = 'email-address'
            style={styles.textinput}
          />
          <TextInput
            placeholder="Password"
            onChangeText={e => setPassword(e)}
            underlineColorAndroid='transparent'
            secureTextEntry={true}
            style={styles.textinput}
          />

          <TouchableOpacity onPress={() => handleSignUp()} style={styles.btn}>
            {loading?<ActivityIndicator size={'small'} color="white" />:<Text style={styles.btntxt}>Create Account</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DocSignIn')} style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={{fontSize: 16}}>Already have an account? <Text style={{fontWeight: 'bold'}} >Sign In.</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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