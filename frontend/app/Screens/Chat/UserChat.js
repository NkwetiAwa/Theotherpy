import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function UserChat(props){
  const navigation = useNavigation();
  const convos = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <ScrollView style={styles.main}>
        {convos.map((i, j) => {
          return (
            <>
            <TouchableOpacity onPress={() => navigation.navigate("UserConvo")} style={styles.convo}>
              <Image source={require('./../../Assets/person.jpg')} style={styles.pic} />
              <View style={styles.info}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#424242' }}>Lucas</Text>
                <Text style={{ color: '#424242' }}>Hey bro what's up with you?</Text>
              </View>
              <View style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: '#424242' }}>9h 45</Text>
                <View style={styles.badge}>
                  <Text style={{ color: 'white', fontSize: 12 }}>1</Text>
                </View>
              </View>
            </TouchableOpacity>
            {(j !== (convos.length - 1)) && (<View style={styles.line} />)}
            </>
          )
        })}
        <View style={{ width: 10, height: 100 }} />
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 7
  },
  convo: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  pic: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  info: {
    flex: 1,
    marginLeft: 15
  },
  badge: {
    backgroundColor: '#28A7E3',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  line: {
    marginHorizontal: 5,
    backgroundColor: '#dbdbdb',
    height: 0.5,
    marginBottom: 15
  }
});