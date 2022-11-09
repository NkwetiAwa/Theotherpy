import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, ImageBackground, Image, Text, StyleSheet, Modal, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// import defpic from './../Assets/def.jpg';

export default function Profile(){
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [fields, setFields] = useState([]);
  const [pic, setPic] = useState('');

  useEffect(() => {
    if(focused){
      initFunction();
    }
  }, [focused]);

  const initFunction = async() => {
    const tk = await AsyncStorage.getItem('userToken');
    if(tk){
      const tkn = JSON.parse(tk).token;
      setToken(tkn);
      axios.post(`${url}profile`, { token: tkn })
      .then(res => {
        if(res.data.stat){
          setUser(res.data.user);
          setFields(res.data.user.fields);
        }
      });
    }
  }

  const handleLogout = async() => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Auth');
  }

  return(
    <View style={styles.main}>
      <StatusBar backgroundColor='white' barStyle='dark-content' hidden={false} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.pic}>
          {(user.pic) ? (
            <ImageBackground source={{ uri: `${url+user.pic}` }} style={styles.img}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.btn}>
                    <Image source={require('./../Assets/settings.png')} style={{ width: 25, height: 25 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} />
                <View style={styles.namearea}>
                  <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
                  {(user.job !== "" && user.job !== null && user.job && String(user.job) !== 'undefined') && <Text numberOfLines={1} style={styles.job}>{user.job}</Text>}
                  {(user.location !== "" && user.location !== null && user.location && String(user.location) !== 'undefined') && <Text numberOfLines={1} style={styles.job}>{user.location}</Text>}
                </View>
              </View>
            </ImageBackground>
          ): (
            <ImageBackground source={require('./../Assets/def.jpg')} style={styles.img}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.btn}>
                    <Image source={require('./../Assets/settings.png')} style={{ width: 25, height: 25 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} />
                <View style={styles.namearea}>
                  <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
                  {(user.job !== "" && user.job !== null && user.job && String(user.job) !== 'undefined') && <Text numberOfLines={1} style={styles.job}>{user.job}</Text>}
                  {(user.location !== "" && user.location !== null && user.location && String(user.location) !== 'undefined') && <Text numberOfLines={1} style={styles.job}>{user.location}</Text>}
                </View>
              </View>
            </ImageBackground>
          )}
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.title}>Bio</Text>
            {(user.bio !== "" && user.bio !== null && user.bio && String(user.bio) !== 'undefined') ? <Text style={styles.txt}>{user.bio}</Text> : <Text>No Bio</Text>}
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Interest</Text>
            <View style={styles.fields}>
              {fields.map(i => (
                <View style={styles.field}>
                  <Text>{i}</Text>
                </View>
              ))}
              {(fields.length<1) && <Text>No Interests</Text>}
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ padding: 20 }} onPress={() => handleLogout()}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  pic: {
    width: '100%',
    height: Dimensions.get('screen').height*0.7
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  btn: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: '#dbdbdb'
  },
  namearea: {
    paddingBottom: 10,
    paddingLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  job: {
    color: 'white'
  },
  body: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  row: {
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 7
  },
  txt: {
    color: 'black'
  },
  fields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  field: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#396AE8',
    padding: 12,
    marginBottom: 10
  }
});