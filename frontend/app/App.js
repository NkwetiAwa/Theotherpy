import React from 'react';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { AsyncStorage, Image, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation-tabs';

import Auth from './Screens/Auth';

import SecondStepper from './Screens/Splash/SecondStepper';
import UserSignIn from './Screens/Splash/UserSignIn';
import UserSignUp from './Screens/Splash/UserSignUp';
import DocSignIn from './Screens/Splash/DocSignIn';
import DocSignUp from './Screens/Splash/DocSignUp';

import Home from './Screens/Home';
import Chat from './Screens/Chat';
import Profile from './Screens/Profile';
import Notifications from './Screens/Notifications';

import EditProfile from './Screens/Profile/EditProfile';

import Search from './Screens/Home/Search';
import Account from './Screens/Home/Account';


const customTextProps = {
  style: {
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    color: "black"
    // color: 'white'
  }
};

const customTextInputProps = {
  placeholderTextColor: "gray",
  style: {
    borderWidth: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: "#424242"
  }
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

const HomeStack = createStackNavigator({
  Home: Home,
  Search: Search,
  Account: Account
},{
  defaultNavigationOptions: {
    headerShown: false
  }
});

const ChatStack = createStackNavigator({
  Chat: Chat,
//   NewGroupChat: NewGroupChat,
//   UserConvo: UserConvo,
//   GroupConvo: GroupConvo
// },{
//   defaultNavigationOptions: {
//     headerShown: false
//   }
});

const ProfileStack = createStackNavigator({
  Profile: Profile,
  EditProfile: EditProfile
},{
  defaultNavigationOptions: {
    headerShown: false
  }
});


const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/homed.png') :  require('./Assets/pics/home.png')}
              style={{ width: 25, height: 25, marginTop: 10}} />
            {focused ? <Text style={{ color: '#28A7E3', fontSize: 10 }}>Home</Text> : <Text style={{ color: '#AAAAAA', fontSize: 10 }}>Home</Text>}
          </View>
        )
      }
    },
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/chatd.png') : require('./Assets/pics/chat.png') }
              style={{ width: 25, height: 25, marginTop: 10 }} />
            {focused ? <Text style={{ color: '#28A7E3', fontSize: 10 }}>Chat</Text> : <Text style={{ color: '#AAAAAA', fontSize: 10 }}>Chat</Text>}
          </View>
        )
      }
    },
    Notification: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/belld.png') : require('./Assets/pics/bell.png') }
              style={{ width: 25, height: 25, marginTop: 10 }} />
              {focused ? <Text style={{ fontSize: 10, color: '#28A7E3' }}>Notifications</Text> : <Text style={{ fontSize: 10, color: '#AAAAAA' }}>Notifications</Text>}
          </View>
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/userd.png') : require('./Assets/pics/user.png') }
              style={{ width: 25, height: 25, marginTop: 10 }} />
              {focused ? <Text style={{ fontSize: 10, color: '#28A7E3' }}>My</Text> : <Text style={{ fontSize: 10, color: '#AAAAAA' }}>My</Text>}
          </View>
        )
      }
    },
  },
  {
    defaultNavigationOptions: () => ({
      swipeEnabled: true,
      adaptive: true,
      // tabBarVisible: (navigation.state.index > 0) ? false : true
    })
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0) {
    tabBarVisible = false;
  };

  return {
    tabBarVisible,
  };
};

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0) {
    tabBarVisible = false;
  };

  return {
    tabBarVisible,
  };
};

ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0) {
    tabBarVisible = false;
  };

  return {
    tabBarVisible,
  };
};


const AuthStack = createStackNavigator(
  {
    Second: SecondStepper,
    UserSignIn: UserSignIn,
    UserSignUp: UserSignUp,
    DocSignIn: DocSignIn,
    DocSignUp: DocSignUp
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        display: 'none',
      },
      headerShown: false
    },
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: Auth,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
