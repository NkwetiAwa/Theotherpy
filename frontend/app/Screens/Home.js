import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Home(){
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [token, setToken] = useState('');
  const [keyword, setKeyword] = useState('');
  const [labels, setLabels] = useState([]);
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState([]);

  useEffect(() => {
    if(focused){
      if(labels.length < 1){
        initFunction();
      }
    }
  }, [focused]);

  const initFunction = async() => {
    const tk = await AsyncStorage.getItem('userToken');
    if(tk){
      const tkn = JSON.parse(tk).token;
      setToken(tkn);
      axios.post(`${url}home`, { token: tkn })
      .then(res => {
        if(res.data.stat){
          setLoading(false);
          setLabels(res.data.labels);
          setFirst(res.data.docs[0]);
          setSecond(res.data.docs[1]);
        }else{
          initFunction();
        }
      })
      .catch(err => {
        setTimeout(() => initFunction(), 1500);
        return Alert.alert(
          `Ooops!`,
          "There seems to be a problem with your network connection, please try again",
        );
      })
    }
  }

  const searching = (e) => {
    setKeyword(e);
    if(e !== ''){
      const data = { token: token, keyword: e }
      axios.post(`${url}home/find`, data)
      .then(res => {
        if(res.data.stat){
          setFound(res.data.docs);
        }
      })
      .catch(err => console.log(err));
    }else{
      setFound([]);
    }
  }

  if(loading){
    return(
      <View style={styles.main}>
        <StatusBar backgroundColor='white' barStyle='dark-content' hidden={false} />
        <Text>Loading</Text>
      </View>
    )
  }

  const displayBox = () => {
    if(found.length > 0){
      return(
        <View style={{ position: 'absolute', top: 44, backgroundColor: 'white', width: '100%', zIndex: 2, marginHorizontal: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
          {found.map(i => (
            <TouchableOpacity id={i._id} onPress={() => navigation.navigate('Account', { accid: i._id })} style={{ paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
              {(i.pic && String(i.pic) !== 'undefined')?<Image source={{ uri: url+i.pic}} style={{ width: 30, height: 30, borderRadius: 15 }} />:<View style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbdbdb' }}><Text numberOfLines={1} style={{ fontSize: 15 }}>{i.name[0]}</Text></View>}
              <View style={{ marginLeft: 10 }}>
                <Text numberOfLines={1}>{i.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate('Search', { token: token, keyword: keyword })} style={{ alignItems: 'center', padding: 10 }}><Text>See all</Text></TouchableOpacity>
        </View>
      )
    }
  }

  return(
    <View style={styles.main}>
      <StatusBar backgroundColor='white' barStyle='dark-content' hidden={false} />
      <View style={styles.header}>
        <TextInput
          placeholder='Search therapist' 
          style={styles.input}
          keyboardType={'web-search'}
          returnKeyType={'search'}
          returnKeyLabel={'Search'}
          onChangeText={e => searching(e)}
          onSubmitEditing={() => navigation.navigate('Search', { token: token, keyword: keyword })}
        />
        {displayBox()}
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.slider}>
          <Text>Whyyyyy</Text>
        </View>
        <View style={{ marginTop: 10, paddingBottom: 25 }}>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 5 }}>In {labels[0]}</Text>
            <ScrollView horizontal>
              {first.map(i => (
                <TouchableOpacity onPress={() => navigation.navigate('Account', { accid: i._id })} id={i._id} style={styles.adoc}>
                  <Image style={styles.img} source={{ uri: url+i.pic }} />
                  <View style={styles.pad}>
                    <Text numberOfLines={1} style={{ color: 'white', fontWeight: 'bold' }}>{i.name}</Text>
                    {(i.job && String(i.job) !== 'undefined') && <Text numberOfLines={1} style={{ color: 'white' }}>{i.job}</Text>}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ paddingLeft: 10, marginTop: 25 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 5 }}>In {labels[1]}</Text>
            <ScrollView horizontal>
              {second.map(i => (
                <TouchableOpacity onPress={() => navigation.navigate('Account', { accid: i._id })} id={i._id} style={styles.adoc}>
                  <Image style={styles.img} source={{ uri: url+i.pic }} />
                  <View style={styles.pad}>
                    <Text numberOfLines={1} style={{ color: 'white', fontWeight: 'bold' }}>{i.name}</Text>
                    {(i.job && String(i.job) !== 'undefined') && <Text numberOfLines={1} style={{ color: 'white' }}>{i.job}</Text>}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.cats}>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/psycho.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Psychotherapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/meditation.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Meditation Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/art.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Art Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/dance.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Dance Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/music.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Music Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/cognitive.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Cognitive Behavioral Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/physiotherapy.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Physiotherapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/couples.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Couple's Counseling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/play.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Play Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/confession.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Confession Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/counseling.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Counseling Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/family.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Family Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/spiritual.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>Spiritual Therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hbtn}>
              <Image source={require('./../Assets/icons/more.png')} style={styles.btnicon} />
              <Text style={styles.btntxt}>More</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    borderRadius: 5,
    height: 35,
    paddingLeft: 15,
    borderColor: "#dbdbdb",
    borderWidth: 1
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  body: {
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 270,
    backgroundColor: '#424242'
  },
  adoc: {
    width: 150,
    height: 150,
    backgroundColor: '#cccccc',
    marginRight: 10,
    borderRadius: 7
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 7,
    resizeMode: 'cover'
  },
  pad: {
    width: 150,
    height: 40,
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 2,
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7
  },
  cats: {
    paddingHorizontal: 10,
    paddingTop: 35,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  hbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '46%',
    marginHorizontal: '2%',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    paddingHorizontal: 4,
    borderRadius: 7,
    marginBottom: 10
  },
  btnicon: {
    width: 27,
    height: 27,
    marginRight: 7
  },
  btntxt: {
    fontWeight: 'bold',
    flex: 1
  }
})