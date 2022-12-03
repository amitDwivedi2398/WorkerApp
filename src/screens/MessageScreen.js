import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert,
    Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const MessageScreen = ({ navigation }) => {

    const [stories, setStories] = useState([
        {
            userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
            username: 'Brayden Willis',
            storyImage:
                'https://images.pexels.com/photos/4726898/pexels-photo-4726898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            isSeen: false,
        },
        {
            userImage: 'https://randomuser.me/api/portraits/women/81.jpg',
            username: 'Sophie Price',
            storyImage:
                'https://images.pexels.com/photos/5257534/pexels-photo-5257534.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            isSeen: false,
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/79.jpg',
            username: 'Rick Perry',
            storyImage:
                'https://images.pexels.com/photos/3380805/pexels-photo-3380805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            isSeen: false,
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/85.jpg',
            username: 'Dave Pena',
            storyImage:
                'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            isSeen: false,
        },
        {
            userImage: 'https://randomuser.me/api/portraits/women/74.jpg',
            username: 'Layla Kennedy',
            storyImage:
                'https://images.pexels.com/photos/33287/dog-viszla-close.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            isSeen: false,
        },
    ]);


    const [currentStoryView, setCurrentStoryView] = useState(stories);
    const [storyModalVisible, setStoryModalVisible] = useState(false);
    const [chatList, setChatList] = useState([]);
    const getCity = async () => {
        axios
            .get(
                `http://hospitalmitra.in/newadmin/api/ApiCommonController/chatgetapi`,
            )
            .then(response => {
                console.log(" chat list <<<<<", response.data.data);
                const chatList = response.data.data
                setChatList(chatList)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getCity();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View
                style={{
                    height: 80,
                    backgroundColor: '#4586FF',
                }}
            >
                <View
                    style={{
                        // marginTop: Number(StatusBar.currentHeight),
                        marginTop: 30,
                        // backgroundColor: 'red',
                        // paddingVertical: 20,
                        paddingHorizontal: 10,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 14,
                            fontSize: 22,
                            color: '#fff',
                            fontFamily: 'NSExtraBold',
                        }}
                    >
                        Chats
                    </Text>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={async () => {
                        console.log('>>>>>>>>>>>');
                        await AsyncStorage.removeItem('user_id');
                        RNRestart.Restart()
                    }}>
                        <AntDesign
                            name="poweroff"
                            size={30}
                            color="#fff"
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: '#fff',
                                borderRadius: 5,
                            }}
                        />
                        <Text style={{color:'#fff',alignSelf:'center'}} >LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Chats View */}
               <View style={styles.mainView} >
               {chatList?.map((chat)=>(
                    <TouchableOpacity style={styles.chatMainBtnStyle} onPress={()=>navigation.navigate('ChatScreen',{id:chat.id})} >
                        <View style={{flex:0.7,justifyContent:'center',alignItems:'center'}} >
                            <Image style={{width:70,height:70,borderRadius:40}}
                                source={{
                  uri: chat.image,
                }}
                             />
                        </View>
                        <View style={{flex:2}}>
                            <Text style={styles.userNameStyle} >{chat.username}</Text>
                            <Text style={styles.clintNameStyle} >name</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',marginHorizontal:10}}>
                            <Text>{chat.time}</Text>
                        </View>
                    </TouchableOpacity>
                    ))}
               </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    storiesView: {
        paddingVertical: 10,
        paddingRight: 10,
        backgroundColor: '#fafafa',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    chatMainBtnStyle:{
        flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#fff',width:'95%',alignSelf:'center',
        height:90,marginVertical:10,borderRadius:10
    },
    userNameStyle:{
        color:'#333',fontSize:18,fontWeight:'600',marginHorizontal:10
    },
    clintNameStyle:{
        color:'#333',fontSize:16,marginHorizontal:10
    }
})

export default MessageScreen;
