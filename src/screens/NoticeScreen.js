import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import BackHeader from '../components/BackHeader';
import ReadMore from 'react-native-read-more-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




const NoticeScreen = ({ navigation }) => {
  const [notice, setNotice] = useState([])
  const [filterData, setfilterData] = useState([]);
  const [search, setSearch] = React.useState('');
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
  const getSchedule = async () => {
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/noticeboard/${storeddata}`,
      )
      .then(response => {
        console.log("Notice name list id <<<<<", response.data.data);
        const res = response.data.data
        setNotice(res)
        setfilterData(res)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getSchedule();
  }, [storeddata]);
  const _renderTruncatedFooter = (handlePress) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
        <Text style={{ marginTop: 5, color: '#4584FF' }} onPress={handlePress}>
          Read more
        </Text>
        <Text style={{ marginTop: 5, color: '#4584FF' }} >
          My Hospital
        </Text>
      </View>
    );
  };
  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ marginTop: 5, color: '#4584FF' }} onPress={handlePress}>
        Show less
      </Text>
    );
  }
  const searchFilterFuntion = (text) => {
    if (text) {
      const newData = notice.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
        );
      console.log(`new Data =` + JSON.stringify(newData));
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(notice);
      setSearch(text);
    }
  }
  return (
    <SafeAreaView style={styles.container} >
      <CustomHeader TitleName={'Scheme'} />
      <ScrollView style={{ padding: 8 }}>
        <View style={styles.searchWrapperStyle}>
          <Ionicons size={18} name="search-outline" color="white" style={styles.iconStyle} />
          <TextInput
            style={{ flex: 1 }}
            onChangeText={(text) => searchFilterFuntion(text)}
            value={search}
            underlineColorAndroid='transparent'
            placeholder='Search Here'
            placeholderTextColor={'#fff'}
            placeholderColor={'#fff'}
            color={'#fff'}
          />
        </View>
        {filterData?.map((item)=>(
        <View style={styles.swiming}>
          <Image style={styles.poolimg} source={{uri: `${item.image}`}} />
          <Text style={styles.swimingTxt} >{item.title}:</Text>
          <ReadMore
            numberOfLines={3}
            renderTruncatedFooter={_renderTruncatedFooter}
            renderRevealedFooter={_renderRevealedFooter}>
            <Text style={styles.txt}>{item.description}</Text>
            </ReadMore>
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
    width: '100%',
    height: 120,
    alignSelf: 'center',
    resizeMode: 'stretch'
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
    fontSize:18,
    marginVertical:4
  },
  txt: {
    color: 'black',
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondSection: {
    height: 'auto',
    width: '95%',
    backgroundColor: '#fff',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 7,
    shadowRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  leftSection: {
    height: 'auto', width: '75%', padding: 10,
  }
})

export default NoticeScreen;
