import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import BackHeader from '../components/BackHeader';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';



const ProfileScreen = ({navigation}) => {
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [cityId, setCityId] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [height, setHeight] = useState('');
  const [blood, setBlood] = useState('');
  const [weight, setWeight] = useState('');
  const [storeProfile, setStoreProfile] = useState('');
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  }
  const sendData =() =>{
    editData()
  }
  const getCity = async () => {
    axios
      .get(
        `http://hospitalmitra.in/newadmin/api/ApiCommonController/getcitylist`,
      )
      .then(response => {
        console.log(" city name list <<<<<??", response.data.data);
        const cityList = response.data.data;
        const cityId = response.data.data[0].id;
        setCityList(cityList)
        setCityId(cityId)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCity();
  }, []);
  const editData =async () => {
    console.log(username,email,city,mobile_no,password,cpassword);
     const img = {uri:`${image}`,name:'profile.jpg',type:'image/jpeg'}
    const formData = new FormData()
    formData.append('name',username);
    formData.append('email',email);
    formData.append('mobile_no',mobile_no);
    formData.append('password',password);
    formData.append('cpassword',cpassword);
    formData.append('city_id',city);
    formData.append('image', img)

    fetch(`http://hospitalmitra.in/newadmin/api/ApiCommonController/workerprofile`, 
    {
      method: 'POST',
      headers: {
        "Content-Type": 'multipart/form-data',
        'id': await AsyncStorage.getItem('user_id'),
      },
      body: formData
    }).then(response => {
      response.json().then(res => {
        console.log(res);
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
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
      .get(`http://hospitalmitra.in/newadmin/api/ApiCommonController/workersingledata/1${storeProfile}`)
      .then((response) => {
        console.log(" getuserDeatails <<<<<",response.data.data)
        const res = response.data.data
        {
          setUsername(res[0].name);
          setEmail(res[0].email);
          setMobile_no(res[0].mobile_no);
          setPassword(res[0].password);
          setCpassword(res[0].cpassword);
        }
        const userImage = response.data.data[0].image
        setUserImage(userImage);
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
 const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headers}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);
 
 
  return (
    <SafeAreaView style={styles.container} >
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <ScrollView>
      <Animated.View style={{
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
      <View style={styles.header} >
        <TouchableOpacity style={styles.profileBtn} onPress={() => bs.current.snapTo(0)} >
        <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {userImage?(<ImageBackground
                source={{
                  uri: userImage,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 50}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>):
              (<ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 50}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>)}
              
            </View>
          <MaterialIcons
              name="edit"
              size={20}
              color="#666"
              style={{ marginTop:30}}
            />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25,marginTop:50 }}>
        <InputField
          label={'Full Name'}
          color={'#333'}
        pcolor={'#333'}
          value={username}
          onChangeText={setUsername}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
        color={'#333'}
        pcolor={'#333'}
          label={'Enter your Email '}
          value={email}
          onChangeText={setEmail}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="text"
        />
        <View style={{flexDirection:'row',alignItems:'center',borderBottomColor: '#ccc',
        borderBottomWidth: 1,marginBottom:30}} >
       <EvilIcons
              name="location"
              size={20}
              color="#666"
              style={{}}
            />
        <Picker
        style={{width:'80%',}}
            selectedValue={city}
            onValueChange={(itemVal) => {
              setCity(itemVal);
            }}
          >
            {
              cityList.map((l) => (
                <Picker.Item label={l.cityname} value={l.id} style={{ color: '#222' }} />
              ))
            }

          </Picker>
        </View>
        <InputField
          label={'Enter your Phone No. '}
          color={'#333'}
        pcolor={'#333'}
          value={mobile_no}
          onChangeText={setMobile_no}
          icon={
            <Ionicons
              name="phone-portrait-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="text"
        />
        <InputField
          label={'Password'}
          value={password}
          color={'#333'}
        pcolor={'#333'}
          onChangeText={setPassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

        <InputField
          label={'Confirm Password'}
          value={cpassword}
          color={'#333'}
        pcolor={'#333'}
          onChangeText={setCpassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />
        <CustomButton label={'SUBMIT'} onPress={sendData} />
        </ScrollView>
        </Animated.View>
        </ScrollView>
        <View style={styles.bottom} >

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 160,
    borderRightWidth: 200,
    borderTopWidth: 150,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4584FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 30
  },
  profileBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 30,
    flexDirection:'row'
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  headers: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  bottom: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 160,
    borderRightWidth: 200,
    borderBottomWidth: 50,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4584FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProfileScreen;
