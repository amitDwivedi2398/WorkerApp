import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, DevSettings } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import HomeScreen from '../screens/HomeScreen';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const CustomHeader = ({ IconName, TitleName, props }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const navigation = useNavigation('');
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [storeddata, setStoreddata] = useState('');
    const [cityId, setCityId] = useState([]);

    console.log("storeddata ???",storeddata);

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
    const getNumber = async () => {
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/getuseruserid/${storeddata}`,
            )
            .then(response => {
                console.log(" city name <<<<<", response.data.data)
                const city = response.data.data[0].city
                setCity(city)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getData();
        getNumber();
    }, [storeddata]);
    const getCity = async () => {
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/getcitylist`,
            )
            .then(response => {
                console.log(" city name list <<<<<??", response.data.data);
                const cityList = response.data.data;
                setCityList(cityList)
                setCityId(response.data.data[0].id)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getCity();
    }, []);

    return (
        <View>
            <LinearGradient colors={['#4584FF', '#00ccff',]}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 7,
                        // borderBottomWidth: 1,
                        marginBottom: 10,
                        // borderColor: '#4584FF',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', marginLeft: 10 }} >
                            <Text style={{ color: '#fff' }} >Your Location</Text>
                            <View style={{ width: 120, }}>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={cityList}
                                    search
                                    maxHeight={300}
                                    labelField="city_name"
                                    valueField="city_name"
                                    placeholder={!isFocus ? city : '...'}
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setValue(
                                            axios
                                                .post(
                                                    `http://WorkerApp.in/newadmin/api/ApiCommonController/cityupdatelist`,
                                                    {
                                                        id: storeddata,
                                                        city: item.city_name,
                                                        city_id: item.id
                                                    },
                                                )
                                                .then(response => {
                                                    console.log("???", response.data);
                                                    getNumber();
                                                    RNRestart.Restart()
                                                    })
                                                    
                                                .catch(error => {
                                                    console.log(error);
                                                })
                                        );
                                        setIsFocus(false);
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')} >
                        <MaterialIcons name="notifications" color={'#fff'} size={30} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 20,
        borderRadius: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 10,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 1,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#fff'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#fff'
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: '#fff'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})

export default CustomHeader;
