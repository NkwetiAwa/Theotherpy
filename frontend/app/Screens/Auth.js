import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "react-navigation-hooks";
// import axios from 'axios';

import Splash from './Splash';

import Url from '../resources/Url';

export default function Auth() {
  const navigation = useNavigation();

  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setTimeout(() => navigation.navigate(userToken ? 'App' : 'Auth'), 1.5*1000)
  };

  // Render any loading content that you like here
    return (
      <View style={styles.container}>
        <Url />
        <Splash />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232B3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});