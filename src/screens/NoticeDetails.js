import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import BackHeader from '../components/BackHeader';




const NoticeDetails = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container} >
      <BackHeader label={'Notice'}  onPress={()=> navigation.goBack()} />
      <ScrollView style={{ padding: 8 }}>
        <View style={styles.swiming}>
          <Image style={styles.poolimg} source={require('../assets/images/pmsby.jpg')} />
          <Text style={styles.swimingTxt} >Pradhan Mantri Suraksha Bima Yojana:</Text>
          <Text style={styles.txt}>Pradhan Mantri Suraksha Bima Yojana aims to provide accident insurance cover to the people of India. People in the age group of 18 years to 70 years who have an account in a bank can avail benefit from this scheme.</Text>
        </View>
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
    width: '100%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 20
  },
  swiming: {
    height: 'auto', width: '95%', justifyContent: 'center',
     backgroundColor: '#fff', padding: 10,
    alignSelf: 'center', borderRadius: 10, shadowColor: 'blue',
    elevation: 7,
    shadowRadius: 10,
    marginTop:10
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

export default NoticeDetails;

