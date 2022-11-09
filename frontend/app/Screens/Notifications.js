import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default function Notifications(){
  return(
    <View style={styles.main}>
      <Image source={require('./../Assets/icons/error.png')} style={{ width: 70, height: 70 }} />
      <Text style={{ marginTop: 15, fontWeight: 'bold', color: 'gray', fontSize: 18 }}>You have no notifications</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});