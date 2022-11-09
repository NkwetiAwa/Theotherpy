import React from 'react';
import { View, Dimensions, Image } from 'react-native';

export default function Splash(){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#232B3B', Width: Dimensions.get('screen').width }}>
      <Image style={{ width: 200, height: 100, resizeMode: 'stretch' }} source={require('./../Assets/Logo/icone.png')} />
    </View>
  )
}