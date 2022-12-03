import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import BackHeader from '../components/BackHeader';

const NotificationScreen = ({navigation}) => {
    const [notification, setNotification] = useState([]);
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
  const getNotification = async () => {
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/notificationmedical/${storeddata}`,
      )
      .then(response => {
        console.log("Notification list <<<<<",response.data.data);
        setNotification(response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData()
   getNotification()
  }, [storeddata])
    return (
        <SafeAreaView style={styles.container} >
            <BackHeader label={'Notification'} onPress={() => navigation.goBack()} />
            <ScrollView>
            {notification?.map((item)=>(
                <View style={styles.swiming}>
                    <Text style={styles.swimingTxt} >{item.title}</Text>
                    <Text style={styles.txt}>{item.message}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}} >
                        <Text style={{color:'#4586FF'}} >{item.created_date}</Text>
                        <Text style={{color:'#4586FF'}}>{item.time}</Text>
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
        marginTop: 10
    },
    swimingTxt: {
        color: '#4584FF',
        fontFamily: 'Roboto-Medium',
        marginBottom: 5
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
      },
      banner:{
        width:'95%',height:150,borderRadius:10,alignSelf:'center'
      }
})

export default NotificationScreen;
