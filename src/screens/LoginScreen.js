import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [storeddata, setStoreddata] = useState('');


  const _storeData = async id => {
    try {
      await AsyncStorage.setItem('user_id', JSON.stringify(id));
      console.log('id Saved');
    } catch (error) {
      console.log('Some error in setting id');
    }
  };
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('success');
        console.log('user_id ???????', user_id);
        setStoreddata(user_id);
        navigation.replace('Home');
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  useEffect(() => {
    getData();
  }, [storeddata]);

  const LoginUser = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Enter Details");
      return;
    }
    axios
      .post('http://hospitalmitra.in/newadmin/api/ApiCommonController/worker_loginbypassword', {
        email: email,
        password: password,
      })
      .then(function (response) {
        // handle success
        // alert(JSON.stringify(response.data));
        // save user Id
        if (response.data !== null) {
          _storeData(response.data.data.id);
          navigation.replace('Home');
        } else {
          console.log('no id!');
        }
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: 'center' }}>
            <LoginSVG
              height={300}
              width={300}
              style={{ transform: [{ rotate: '-5deg' }] }}
            />
          </View>

          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
            }}>
            Login
          </Text>

          <InputField
            label={'Email ID'}
            value={email}
            onChangeText={setEmail}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
          />

          <InputField
            label={'Password'}
            value={password}
            onChangeText={setPassword}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          // inputType="password"
          // fieldButtonLabel={"Forgot?"}
          // fieldButtonFunction={() => {}}
          />

          <CustomButton label={"Login"} onPress={LoginUser} />

          {/* <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View> */}

          {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;