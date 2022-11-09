import React from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';

import MainApp from './app/App';


export default function App(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} />
      <MainApp />
      </View>
    </SafeAreaView>
  );
};