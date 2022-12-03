import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import BackHeader from '../components/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




const Booking = ({ navigation }) => {
  const [images, setimages] = useState([
    { src: require('../assets/images/FarCry6.png'), title: 'Farcry', key: '1' },
    { src: require('../assets/images/departmentHospital.png'), title: 'Detal', key: '2' },
    { src: require('../assets/images/FarCry6.png'), title: 'Farcry', key: '3' },
    { src: require('../assets/images/FarCry6.png'), title: 'Farcry', key: '4' },
    { src: require('../assets/images/departmentHospital.png'), title: 'Detal', key: '5' },
  ]);
  
  const [blogs, setBlogs] = useState([]);
  const [storeddata, setStoreddata] = useState('');
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
  const getBlogs = async () => {
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/blogboard/${storeddata}`,
      )
      .then(response => {
        console.log("Blogs list <<<<<",response.data.data);
        setBlogs(response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData()
   getBlogs()
  }, [storeddata])

  return (
    <SafeAreaView style={styles.container} >
      <BackHeader label={'Blogs'}  onPress={() => navigation.openDrawer()} />
      <ScrollView style={{ padding: 8 }}>
        <View style={styles.searchWrapperStyle}>
          <Ionicons size={18} name="search-outline" color="white" style={styles.iconStyle} />
          <TextInput
            style={{ flex: 1 }}
            underlineColorAndroid='transparent'
            placeholder='Search Here'
            placeholderTextColor={'#fff'}
            placeholderColor={'#fff'}
            color={'#fff'}
          />
        </View>
        <View>
          <Text style={styles.title} >Categories</Text>
          <FlatList
            horizontal={true}
            data={images}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <View style={styles.mainView} >
                  <View style={styles.mainRow} >
                    <TouchableOpacity style={styles.btn}  >
                      <ImageBackground
                        imageStyle={{ borderRadius: 20, }}
                        source={item.src}
                        style={{
                          width: 100,
                          height: 140,
                          justifyContent: 'flex-end',
                          alignItems: 'center',

                        }}>
                        <Text style={styles.text} >{item.title}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        {blogs?.map((item)=>(
        <View>
        <Text style={styles.title} >Recommended For You</Text>
        <View style={styles.swiming}>
          <Image style={styles.poolimg} source={{uri: `${item.image}`}} />
          <Text style={styles.swimingTxt} >{item.title}</Text>
          <Text style={styles.txt}>{item.description}</Text>
        </View>
        <View style={[styles.secondSection]}>
          <Image style={{
            width: 100,
            height: 150,
            borderRadius:15
             }} source={{uri: `${item.image}`}} />
             <View style={ styles.leftSection}>
             <Text style={styles.swimingTxt}>{item.title}</Text>
             <Text style={styles.txt}>{item.description}</Text>
             </View>
        </View>
        
        </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  searchWrapperStyle: {
    backgroundColor: "#4584FF",
    flexDirection: "row",
    borderRadius: 25,
  },
  iconStyle: {
    marginTop: 15,
    marginHorizontal: 8,
  },
  mainView: {

  },
  mainRow: {

  },
  btn: {
    padding: 5,
  },
  addresh: {
    marginTop: 5
  },
  rightView: {
    justifyContent: 'center',
  },
  title: {
    padding: 8, color: '#4584FF', fontFamily: 'Roboto-Bold', fontSize: 16
  },
  text: {
    marginBottom: 10, color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 17, textAlign: 'center'
  },
  poolimg: {
    width: '95%',
    height: 130,
    alignSelf: 'center',
    borderRadius: 20,
    resizeMode: 'stretch'
  },
  swiming: {
    height: 'auto', width: '95%',
     backgroundColor: '#fff',
      padding: 10,
    borderRadius: 10, 
    shadowColor: 'blue',
    elevation: 7,
    shadowRadius: 10,
    alignSelf:'center'
  },
  swimingTxt: {
    color: '#4584FF',
    fontFamily: 'Roboto-Medium'
  },
  txt: {
    color: 'black',
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondSection:{
    height: 'auto',
     width: '95%',
     backgroundColor: '#fff', 
     padding: 10,
    alignSelf: 'center', 
    borderRadius: 10, 
    shadowColor: 'blue',
    elevation: 7,
    shadowRadius: 10,
    flexDirection:'row',
    marginVertical:10,
    justifyContent:'space-between',
    alignItems:'center'
    
  },
  leftSection:{
    height: 'auto', width: '75%', padding: 10,
  }
})

export default Booking;
