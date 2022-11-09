import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function EditProfile(){
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [pic, setPic] = useState([]);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [mfield, setMfield] = useState([]);
  const [ofield, setOfield] = useState([]);
  const [uri, setUri] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = async() => {
    const tk = await AsyncStorage.getItem('userToken');
    if(tk){
      const tkn = JSON.parse(tk).token;
      setToken(tkn);
      axios.post(`${url}profile/init`, { token: tkn })
      .then(res => {
        if(res.data.stat){
          setName(res.data.user.name);
          setUri(url+res.data.user.pic);
          setJob(res.data.user.job);
          setLocation(res.data.user.location);
          setBio(res.data.user.bio);
          setFields(res.data.fields);
          setMfield(res.data.user.fields);
          setOfield(res.data.user.fields);
        }
      })
      .catch(err => init());
    }
  }

  const handleSave = () => {
    if(!loading){
      setLoading(true);
      const data = new FormData();
      data.append('token', token);
      data.append('name', name);
      data.append('job', job);
      data.append('location', location);
      data.append('bio', bio);
      data.append('pic', pic);
      data.append('field', JSON.stringify(mfield));
      data.append('ofield', JSON.stringify(ofield));

      fetch(url+"profile/edit", {
        method: 'post',
        body: data,
        "Content-Type": 'multipart/form-data'
      })
      .then((response) => response.json())
      .then((obj) => {
        if(obj.stat){
          setLoading(false);
          navigation.navigate('Profile');
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

  const addPic = async() => {
    launchImageLibrary({ noData: true }, (response) => {
      if(response && response.assets) {
        setPic(response.assets[0]);
        setUri(response.assets[0].uri);
      }
    });
  }

  const handleField = (e) => {
    if(mfield.includes(e)){
      setMfield(mfield.filter(i => i !== e));
    }else{
      if(mfield.length < 4){
        setMfield([...mfield, e]);
      }else{
        alert("It correct so")
      }
    }
  }

  return(
    <View style={styles.main}>
      <StatusBar hidden={false} backgroundColor="white" barStyle='dark-content' />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('./../../Assets/icons/back.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Edit Profile</Text>
        </View>
        <TouchableOpacity onPress={() => handleSave()} style={styles.btn}>
          <Text style={{ fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
        <View style={styles.imgarea}>
          <TouchableOpacity onPress={() => addPic()} style={{ alignItems: 'center' }}>
            <View style={styles.img}>
              <Image source={{ uri: uri }} style={{  borderRadius: 35, width: '100%', height: '100%' }} />
            </View>
            <Text>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <View style={styles.arow}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput value={name} onChangeText={e => setName(e)} placeholder="Full Name" style={styles.inp} />
          </View>
          <View style={styles.arow}>
            <Text style={styles.label}>Job</Text>
            <TextInput value={job} onChangeText={e => setJob(e)} placeholder="Job" style={styles.inp} />
          </View>
          <View style={styles.arow}>
            <Text style={styles.label}>Location</Text>
            <TextInput value={location} onChangeText={e => setLocation(e)} placeholder="Location" style={styles.inp} />
          </View>
          <View style={styles.arow}>
            <Text style={styles.label}>Bio</Text>
            <TextInput value={bio} onChangeText={e => setBio(e)} placeholder="Describe yourself" style={[styles.inp, { height: 100, textAlignVertical: 'top' }]} />
          </View>
          <View style={styles.arow}>
            <Text style={styles.label}>Interested In</Text>
            <View style={styles.fields}>
              {fields.map(i => {
                const yam = mfield.includes(i);
                return(
                  <TouchableOpacity onPress={() => handleField(i)} style={yam?styles.afield:styles.field}>
                    <Text style={{ color: yam?"white":"black" }}>{i}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  btn: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 4
  },
  imgarea: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#dddddd',
    marginBottom: 5
  },
  form: {
    paddingHorizontal: 15,
    paddingTop: 10
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16
  },
  inp: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#dbdbdb'
  },
  arow: {
    marginBottom: 14
  },
  fields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingBottom: 35
  },
  field: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#396AE8',
    padding: 12,
    marginBottom: 10
  },
  afield: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#396AE8',
    backgroundColor: '#396AE8',
    padding: 12,
    marginBottom: 10
  }
})