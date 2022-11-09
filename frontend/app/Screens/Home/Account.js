import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, ImageBackground, Image, Text, StyleSheet, Modal, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useNavigationState } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimeAgo from 'react-native-timeago';
import axios from 'axios';

export default function Account(){
  const navigation = useNavigation();
  const params = useNavigationState().params;
  const accid = params.accid;
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [fields, setFields] = useState([]);
  const [pic, setPic] = useState('');

  useEffect(() => {
    Initializer();
  }, [accid]);

  const Initializer = async() => {
    const tk = await AsyncStorage.getItem('userToken');
    const tkn = JSON.parse(tk).token;
    setToken(tkn);
    axios.post(`${url}home/account`, { token: tkn, accid: accid })
    .then(res => {
      console.log(res.data)
      if(res.data.stat){
        if(res.data.found){
          setUser(res.data.user);
          setFields(res.data.user.fields);
          if(res.data.user.pic && String(res.data.user.pic) !== 'undefined'){
            setPic(url+pic);
          }
        }
      }
    })
  }

  return(
    <View style={styles.main}>
      <StatusBar backgroundColor='white' barStyle='dark-content' hidden={true} />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.top}>
          <Image source={{ uri: url+user.pic }} style={styles.pic} />
        </View>
        <View style={styles.area}>
          <View>
            <Text style={styles.name}>{user.name}</Text>
            {(user.location && String(user.location) !== 'undefined') ? (<Text style={styles.job}>{user.location}</Text>) : (<TimeAgo time={user.timestamp} style={styles.timeago}/>)}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: '100%' }}>
              <TouchableOpacity style={[styles.callbtn, { borderTopRightRadius: 0 }]}>
                <Image source={require('./../../Assets/call.png')} style={styles.btnicon} />
              </TouchableOpacity>
            </View>
            <View style={{ height: '100%', marginLeft: 5 }}>
              <TouchableOpacity style={[styles.callbtn, { borderTopLeftRadius: 0, backgroundColor: '#075E54' }]}>
                <Image source={require('./../../Assets/text.png')} style={styles.btnicon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    height: Dimensions.get('screen').height*0.65,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: 'black',
    marginBottom: 5,
  },
  job: {
    color: '#424242'
  },
  area: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  callbtn: {
    paddingHorizontal: 10,
    backgroundColor: '#396AE8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  btnicon: {
    width: 25,
    height: 25
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
})