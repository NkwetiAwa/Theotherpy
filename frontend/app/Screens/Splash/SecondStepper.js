import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function SecondStepper(){
  const navigation = useNavigation();

  return(
    <ImageBackground source={require('./../../Assets/doctor.jpg')} style={styles.main}>
      <StatusBar hidden />
      <View style={styles.overlay}>
      <Text style={styles.heading}>Continue as...</Text>

      <View style={{ width: '100%', marginTop: 25 }}>
        <TouchableOpacity onPress={() => navigation.navigate('UserSignIn')} style={styles.jumpbtn}>
          <Text style={styles.btntxt}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DocSignIn')} style={styles.tbtn}>
          <Text style={styles.tbtntxt}>Therapist</Text>
        </TouchableOpacity>
      </View>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay:{
    height: 250,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(360,360,360,0.8)',
    padding: 10,
    paddingHorizontal: 40,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center'
  },
  heading: {
    color: 'black',
    fontFamily: 'sans-serif',
    marginTop: 30,
    fontSize: 20
  },
  jumpbtn: {
    width: '100%',
    backgroundColor: '#396AE8',
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 5,
    elevation: 10,
    shadowColor: '#396AE8'
  },
  tbtn: {
    width: '100%',
    backgroundColor: 'rgba(360, 360, 360, 0.5)',
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 5,
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  tbtntxt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'sans-serif'
  }
})