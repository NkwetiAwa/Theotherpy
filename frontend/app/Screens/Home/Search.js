import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useNavigationState } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Search(){
  const navigation = useNavigation();
  const params = useNavigationState().params;
  const token = params.token;
  const [keyword, setKeyword] = useState(params.keyword);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.post(`${url}home/search`, { token: token, keyword: keyword })
    .then(res => {
      console.log(res.data)
      if(res.data.stat){
        setDocs(res.data.docs)
      }
    })
  }, [keyword])

  return(
    <View style={styles.main}>
      <StatusBar backgroundColor='white' barStyle='dark-content' hidden={false} />
      <View style={styles.header}>
        <TextInput
          placeholder='Search therapist' 
          style={styles.input}
          value={keyword}
          keyboardType={'web-search'}
          returnKeyType={'search'}
          returnKeyLabel={'Search'}
          onChangeText={e => setKeyword(e)}
        />
      </View>
      <ScrollView style={styles.body}>
        {docs.map(i => {
          const fields = i.fields;
          return(
            <TouchableOpacity onPress={() => navigation.navigate('Account', { accid: i._id })} style={styles.adoc}>
              {(i.pic && String(i.pic) !== 'undefined')?<Image source={{ uri: url+i.pic}} style={styles.pic} />:<View style={styles.pic}><Text style={{ fontSize: 18 }}>{i.name[0]}</Text></View>}
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i.name}</Text>
                {(String(i.job) !== 'undefined') && (<Text style={{ color: '#828282' }}>{i.job}</Text>)}
                <View style={{ height: 35, marginTop: 5 }}>
                  <ScrollView style={{ width: '100%', height: 10 }} horizontal>
                    {(fields && Array.isArray(fields)) && (<>{i.fields.map(j => <View style={styles.field}><Text>{j}</Text></View>)}</>)}
                  </ScrollView>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
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
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  adoc: {
    width: '100%',
    height: 105,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2.5
  },
  pic: {
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  field: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 7,
    marginRight: 10
  }
})