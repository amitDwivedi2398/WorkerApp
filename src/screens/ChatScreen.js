import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FavoriteScreen({ navigation,route }) {
  const {id} = route.params;
    console.log(id,"chat id");
  const [storeddata, setStoreddata] = useState('');
  const [userData, setUserData] = useState([]);

  const [chatUser] = useState({
    name: 'Robert Henry',
    profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
    last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'John Doe',
  });

  const [messages, setMessages] = useState([
    { sender: 'John Doe', message: 'Hey there!', time: '6:01 PM' },
    {
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Can't wait to meet you.`,
      time: '6:03 PM',
    },
    {
      sender: 'John Doe',
      message: `That's great, when are you coming?`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `This weekend.`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Around 4 to 6 PM.`,
      time: '6:04 PM',
    },
    {
      sender: 'John Doe',
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [received, setReceived] = useState([]);

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }
  const getData = async () => {
    try {
        const user_id = await AsyncStorage.getItem('user_id');
        if (user_id !== null) {
            console.log('@@@@@@@@', user_id);
            setStoreddata(user_id);
        }
    } catch (e) {
        console.log('no Value in login');
    }
};
const getRecevied = async () => {
    axios
        .get(
            `http://WorkerApp.in/newadmin/api/ApiCommonController/chatgetbyuserid/${storeddata}`,
        )
        .then(response => {
            console.log("recevied data list <<<<<", response.data.data);
            const list = response.data.data
            setReceived(list)
        })
        .catch(error => {
            console.log(error);
        });
};
useEffect (() => {
    getRecevied();
    getData();
}, [storeddata]);
  const send = async (id)=>{
    axios.post(`http://WorkerApp.in/newadmin/api/ApiCommonController/chat`,
    {
      message:inputMessage
    },
    {
        headers: {
          user_id: await AsyncStorage.getItem('user_id'),
        },
      },)
      .then(response => {
        console.log('////////', response.data);
        if (inputMessage === '') {
          return setInputMessage('');
        }
        let t = getTime(new Date());
        setMessages([
          ...messages,
          {
            sender: currentUser.name,
            message: inputMessage,
            time: t,
          },
        ]);
        setInputMessage('');
        getRecevied()
      })
      .catch(error => {
        console.log(error);
      })    
}

const getViewChat = async () => {
  axios
      .get(
          `http://hospitalmitra.in/newadmin/api/ApiCommonController/chatgetapinew/${id}`,
      )
      .then(response => {
          console.log(" chat list <<<<<", response.data.data);
          const userChat= response.data.data
          setUserData(userChat[0])
      })
      .catch(error => {
          console.log(error);
      });
};
useEffect(() => {
  getViewChat();
}, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            // onPress={() => {
            //   navigation.openDrawer();
            // }}
          >
          {/* <AntDesign name="bars" color={'#4584FF'} size={30} /> */}
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{ uri: userData.image }}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#4584FF', fontWeight: '700', fontSize: 18 }}>
              {userData.username}
            </Text>
            <Text style={{ color: '#4584FF', fontWeight: '300' }}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
        <FlatList
          style={{ backgroundColor: '#f2f2ff' }}
          inverted={true}
          data={JSON.parse(JSON.stringify(received)).reverse()}
          renderItem={({ item }) => (
           <View>
             <TouchableWithoutFeedback>
              <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor: '#3a6ee8',
                    alignSelf:
                      item.sender === currentUser.name
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.sender === currentUser.name ? 8 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser.name ? 0 : 8,
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
           </View>
          )}
        />

        <View style={{ paddingVertical: 10 }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder='Message'
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={() => {
                send();
              }}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => send()} >
              <Ionicons size={18} name="send" color="black" style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  userProfileImage: { height: 50, aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
