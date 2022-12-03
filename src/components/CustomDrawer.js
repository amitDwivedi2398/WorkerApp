import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';
import axios from 'axios';
import RNRestart from 'react-native-restart';


const CustomDrawer = props => {
  const [storeProfile, setStoreProfile] = useState('');
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [number, setNumber] = useState();
  const getDataProfile = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoreProfile(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getProfile = async () => {
    axios
      .get(`http://WorkerApp.in/newadmin/api/ApiCommonController/usersingledata/${storeProfile}`)
      .then((response) => {
        const userName = response.data.data[0].username
        setUserName(userName);
        console.log(userName);
        const userImage = response.data.data[0].image
        setUserImage(userImage);
        setNumber(response.data.data[0].mobile_no)
        console.log(userImage);
        console.log("profle ///////", res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getProfile();
    getDataProfile();
  }, [storeProfile]);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../assets/images/drawer.jpeg')}
          style={{padding: 20}}>
         <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
         <View>
         {userImage ?( <Image
         source={{
                  uri: userImage,
                }}
         style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
       />):( <Image
         source={require('../assets/images/user-profile.jpg')}
         style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
       />)}
        
         </View>
          <View>
          {userName ?(<Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {userName}
          </Text>):(<Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            User Name
          </Text>)}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
               {number}
            </Text>
            <FontAwesome5 name="phone" size={14} color="#fff" />
          </View>
          </View>
         </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            console.log('>>>>>>>>>>>');
            await AsyncStorage.removeItem('user_id');
            RNRestart.Restart()
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'red'} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: 'red',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
