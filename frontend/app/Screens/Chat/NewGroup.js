import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function NewGroupChat(){
  const navigation = useNavigation();

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>New Group</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity style={styles.pic}>
            <Image source={require('./../../Assets/icons/camera.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <View style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#28A7E3', marginTop: 60, marginLeft: -25 }}>
            <Image source={require('./../../Assets/icons/wedit.png')} style={{width: 15, height: 15}} />
          </View>
        </View>
        <View style={styles.drow}>
          <Text style={styles.label}>Name of Group</Text>
          <TextInput
            placeholder='Name of group'
            style={styles.input}
          />
        </View>
        <View style={styles.drow}>
          <Text style={{ color: '#424242' }}>Add e-mail</Text>
          <TextInput placeholder="add email" style={styles.textarea} />
        </View>
        <TouchableOpacity onPress={() => handleCreate()} style={styles.btn}>
          <Text style={{ color: 'white', fontSize: 18 }}>Add Member</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.crtbtn}>
          <Text style={{ color: 'white', fontSize: 18 }}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  back: {
    width: 20,
    height: 20
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drow: {
    marginBottom: 40,
    width: '85%',
  },
  label: {
    color: '#AAAAAA',
    fontSize: 12
  },
  input: {
    width: '100%',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 0.7,
    backgroundColor: 'transparent'
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: '10%',
    borderRadius: 20,
  },
  crtbtn: {
    width: '85%',
    height: 56,
    backgroundColor: '#28A7E3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
    marginTop: 30
  },
  textarea: {
    height: 100,
    color: 'green',
    textAlignVertical: 'top',
    padding: 6,
    alignItems: 'flex-start',
    width: '100%',
    borderColor: '#15B715',
    borderWidth: 0.7,
    marginBottom: 15,
    borderRadius: 6,
    marginTop: 5
  }
})