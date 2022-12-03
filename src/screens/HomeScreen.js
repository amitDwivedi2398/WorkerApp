import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BannerSlider from '../components/BannerSlider';
import { windowWidth } from '../utils/Dimensions';

import { freeGames, paidGames, sliderData } from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import ListItem from '../components/ListItem';
import CustomHeader from '../components/CustomHeader';
import MarqueeView from 'react-native-marquee-view';
import strings from '../constants/lng/LocalizedStrings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [gamesTab, setGamesTab] = useState(1);
  const [branch, setBranch] = useState([]);
  const [announcement, setAnnouncement] = useState([]);
  const [topScheme, settopScheme] = useState([]);
  const [cityId, setCityId] = useState([]);
  const [topBaneer, setTopBaneer] = useState([]);
  const [bottomBaner, setBottomBaner] = useState([]);
  const [storeddata, setStoreddata] = useState('');
  const [isLoded, setIsLoded] = useState(false);



  console.log("city id ?????",cityId);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };
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
  const getCity = async () => {
    axios
        .get(
            `http://WorkerApp.in/newadmin/api/ApiCommonController/getcityppp/${storeddata}`,
        )
        .then(response => {
            console.log(" city name list id <<<<<", response.data.data);
            const idcity = response.data.data
            setCityId(idcity[0].city_id)
        })
        .catch(error => {
            console.log(error);
        });
};
useEffect(() => {
    getCity();
    getData();
}, [storeddata]);
  const getBranch = async () => {
    setIsLoded(true);
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/newbranchapi/${storeddata}`,
      )
      .then(response => {
        console.log("branch list <<<<<",response.data.data);
        setBranch(response.data.data)
        setIsLoded(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getAnnouncement = async () => {
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/noticeboard/${storeddata}`,
      )
      .then(response => {
        console.log("announcement list <<<<<",response.data.data);
        setAnnouncement(response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getScheme = async () => {
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/topscheme/${storeddata}`,
      )
      .then(response => {
        console.log("topScheme list <<<<<",response.data.data);
        settopScheme(response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getTop = async () => {
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/topbanner`,
      )
      .then(response => {
        console.log("getTop image list <<<<<",response.data.data);
        const topBanner = response.data.data[0]
        setTopBaneer(topBanner)
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getBottom = async () => {
    axios
      .get(
        `http://WorkerApp.in/newadmin/api/ApiCommonController/bottombanner`,
      )
      .then(response => {
        console.log("getBottom image list <<<<<",response.data.data);
        const bottom = response.data.data[0]
        setBottomBaner(bottom)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBranch();
    getAnnouncement();
    getScheme();
    getBottom();
    getTop();
  }, [cityId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader TitleName={'Hospital Mitra'} />

      <ScrollView style={{ padding: 10 }}>
        <Carousel
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 20}
          itemWidth={300}
          loop={true}
          autoplay={true}
        />
        <MarqueeView
          style={{ backgroundColor: '#fff', width: '100%', padding: 10 }}>
          <View style={{ backgroundColor: 'transperant', }}>
            <Text style={{ color: '#333', fontSize: 16, fontWeight: '600' }} >This is demo content</Text>
          </View>
        </MarqueeView>
        <View style={{ padding: 5 }}>
          <View style={styles.topHeding} >
            <Text style={styles.title} >{strings.TOP_BRANCHES}</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('BranchesViewAll')} >
              <Text style={styles.viewAll} >View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }} >
          {branch?.map((item)=>(
            <View style={styles.sliderImg} >
              <TouchableOpacity onPress={() => navigation.navigate('CenterNameScreen',{id:item.id}  )} >
              <ImageBackground imageStyle={{borderRadius:10}} style={styles.slider}  source={{uri: `${item.image}`}} >
                    
              </ImageBackground>
              </TouchableOpacity>
              <Text style={styles.textTilte} >{item.title}</Text>
            </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ padding: 5 }} >
        <View style={styles.topHeding} >
            <Text style={styles.title} >{strings.TOP_ANNOUNCEMENT}</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Notice')}>
              <Text style={styles.viewAll} >View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }} >
          {announcement?.map((item)=>(
            <View style={styles.sliderImg} >
              <TouchableOpacity onPress={()=> navigation.navigate('Notice')} >
              <ImageBackground imageStyle={{borderRadius:10}} style={styles.slider}  source={{uri: `${item.image}`}} >
                    
              </ImageBackground>
              </TouchableOpacity>
              <Text style={styles.textTilte} >{item.title}</Text>
            </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ padding: 5 }} >
        <View style={styles.topHeding} >
            <Text style={styles.title} >Top Scheme</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('TopSheme')}>
              <Text style={styles.viewAll} >View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{ flexDirection: 'row' }} >
          {topScheme?.map((item)=>(
            <View style={styles.sliderImg} >
              <TouchableOpacity onPress={()=> navigation.navigate('TopSheme')}>
              <ImageBackground imageStyle={{borderRadius:10}} style={styles.slider}  source={{uri: `${item.image}`}} >
                    
              </ImageBackground>
              </TouchableOpacity>
              <Text style={styles.textTilte} >{item.description}</Text>
            </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ padding: 5, marginBottom: 10 }} >
          <ScrollView  horizontal={true}  style={{ flexDirection: 'row' }} >
            <View style={styles.sliderImg1}>
              <Image style={styles.baner} source={{uri: `${bottomBaner.image1}`}} />
            </View>
            <View style={styles.sliderImg1} >
              <Image style={styles.baner} source={{uri: `${bottomBaner.image2}`}} />
            </View>
            <View style={styles.sliderImg1} >
              <Image style={styles.baner} source={{uri: `${bottomBaner.image3}`}} />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    color: '#4584FF', fontSize: 18, fontWeight: '700',
  },
  viewAll: {
    color: '#6F6F6F', fontSize: 15, fontWeight: '500'
  },
  topHeding:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
     marginBottom: 10
  },
  slider: {
    width: '97%',
    height: 100,
    borderRadius: 10,
    justifyContent:'center',
    alignSelf:'center'
  },
  sliderImg: {
    backgroundColor: '#F3F3F3',
    height: 130,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#333',
    elevation: 7,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    marginHorizontal: 5,
    width:150
  },
  sliderImg1: {
    backgroundColor: '#F3F3F3',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#333',
    elevation: 7,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    marginHorizontal: 5,
  },
  baner: {
    width: 300,
    height: 140,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  textTilte:{
    color:'black',fontFamily:'Roboto-Regular',fontSize:15,marginLeft:10,fontWeight:'700'
  }
})

