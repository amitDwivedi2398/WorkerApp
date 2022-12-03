import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const BranchesViewAll = ({ navigation }) => {
    const [images, setimages] = useState([
        { src: require('../../assets/catagiry/home.png'), title: 'Sir Sunder Lal Modern Medicine', key: '1' },
        { src: require('../../assets/catagiry/Ayurvedic.png'), title: 'Ayurvedic', key: '2' },
        { src: require('../../assets/catagiry/dantal.png'), title: 'Dental', key: '3' },
        { src: require('../../assets/catagiry/Homeopathic.png'), title: 'Homeopathic', key: '4' },
        { src: require('../../assets/catagiry/Neurosurgery.png'), title: 'Neurosurgery', key: '5' },
        { src: require('../../assets/catagiry/home.png'), title: 'Sir Sunder Lal Modern Medicine', key: '6' },
    ]);
    const [branch, setBranch] = useState([]);
    const [cityId, setCityId] = useState([]);
    const [storeddata, setStoreddata] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [search, setSearch] = React.useState('');




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
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/newbranchapi/${storeddata}`,
            )
            .then(response => {
                console.log("branch list <<<<<", response.data.data);
                const branchData = response.data.data
                setBranch(branchData)
                setfilterData(branchData)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getBranch();
    }, [cityId]);

    const searchFilterFuntion = (text) => {
        if (text) {
            const newData = branch.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            console.log(`new Data =` + JSON.stringify(newData));
            setfilterData(newData);
            setSearch(text);
        } else {
            setfilterData(branch);
            setSearch(text);
        }
    }
    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader TitleName={'All Branches'} />
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
            <View>
                <FlatList
                    numColumns={2}
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <View style={styles.mainView} >
                                <View style={styles.mainRow} >
                                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CenterNameScreen',{id:item.id}  )} >
                                        <Image
                                            source={{ uri: `${item.image}` }}
                                            style={{
                                                width: 60,
                                                height: 50,
                                                alignSelf: 'center',
                                            }}
                                        />
                                        <Text style={styles.txt} >{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchWrapperStyle: {
        backgroundColor: "#4584FF",
        flexDirection: "row",
    },
    iconStyle: {
        marginTop: 12,
        marginHorizontal: 8,
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    mainRow: {
        width: '90%',
        height: 110,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'blue',
        elevation: 7,
        shadowRadius: 10,
    },
    btn: {
        flex: 1,
        justifyContent: 'center'
    },
    txt: {
        alignSelf: 'center', marginTop: 5, textAlign: 'center', color: 'black', fontFamily: 'Roboto-Medium'
    }
})

export default BranchesViewAll;
