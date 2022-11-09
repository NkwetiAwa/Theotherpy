import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat, Avatar } from 'react-native-gifted-chat';
import { useNavigation } from 'react-navigation-hooks';

export default function GroupConvo() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello family',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Lucas',
          avatar: "http://192.168.43.187/tamub/Profiles/ProfilePics/smith_1593761126.jpeg",
        },
      },
      {
        _id: 4,
        text: "Hello. What's up?",
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'Monroe',
          avatar: "http://192.168.43.187/tamub/Profiles/ProfilePics/okayfoods_659590667.jpeg",
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);
  

  const putAvatar = (props) => {
    return(
      <Avatar
        {...props}
      />
    )
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>Family Group</Text>
        </View>
      </View>
      <View style={styles.body}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          renderAvatar={putAvatar}
          renderAvatarOnTop = {true}
          renderUsernameOnMessage
          bottomOffset={26}
          onPressAvatar={console.log}
          showAvatarForEveryMessage
          user={{
            _id: 1,
            name: 'Aaron',
            avatar: 'https://placeimg.com/480/480/people',
          }}
        />
      </View>
    </View>
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
    backgroundColor: 'white'
  }
})