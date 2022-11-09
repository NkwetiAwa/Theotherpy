import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Avatar } from 'react-native-elements';
import axios from 'axios';

export default function GroupChat(props){
  const navigation = useNavigation();
  const convos = [1, 2, 3, 4];

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <ScrollView style={styles.main}>
        {convos.map((i, j) => {
          return (
            <>
            <TouchableOpacity onPress={() => navigation.navigate("GroupConvo")} style={styles.convo}>
              <Avatar title={'Group Name'} width={60} height={60} rounded source={require('./../../Assets/person.jpg')} avatarStyle={{ borderRadius: 30 }} />
              <View style={styles.info}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Family Group</Text>
                <Text>Hey bro what's up with you?</Text>
                <View style={styles.samples}>
                  <Image source={require('./../../Assets/person.jpg')} style={styles.sub} />
                  <Image source={require('./../../Assets/person.jpg')} style={styles.sub} />
                  <Image source={require('./../../Assets/person.jpg')} style={styles.sub} />
                  <View style={[styles.sub, { backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={{ color: '#dbdbdb', fontSize: 10 }}>+4</Text>
                  </View>
                </View>
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
      <TouchableOpacity onPress={() => navigation.navigate('NewGroupChat')} style={styles.fab}>
        <Image source={require('./../../Assets/icons/group.png')} style={{ width: 35, height: 35 }} />
      </TouchableOpacity>
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
    height: 65,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  info: {
    flex: 1,
    marginLeft: 15,
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
  },
  samples: {
    flexDirection: 'row',
    marginTop: 5,
  },
  sub: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: -3,
    borderWidth: 1,
    borderColor: '#dbdbdb'
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 15,
    backgroundColor: '#28A7E3',
    position: 'absolute',
    bottom: 35,
    right: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});