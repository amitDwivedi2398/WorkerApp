import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../../components/BannerSlider';
import CustomHeader from '../../components/CustomHeader';
import { sliderData } from '../../model/data';
import { windowWidth } from '../../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
};
const InvestigationScreen = ({navigation,route}) => {
    const {id} = route.params;
    const [schedule, setSchedule] = useState([])
    const [filterData, setfilterData] = useState([]);
    const [search, setSearch] = React.useState('');


    const searchFilterFuntion = (text) => {
        if (text) {
            const newData = schedule.filter(
                function (item) {
                    const itemData = item.test_name
                        ? item.test_name.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            console.log(`new Data =` + JSON.stringify(newData));
            setfilterData(newData);
            setSearch(text);
        } else {
            setfilterData(schedule);
            setSearch(text);
        }
    }
    const getSchedule = async () => {
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/investigationbyhospital/${id}`,
            )
            .then(response => {
                console.log("Schedule name list id <<<<<", response.data.data);
                const res = response.data.data
                setSchedule(res)
                setfilterData(res)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getSchedule();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView>
                <CustomHeader />
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
                    <Carousel
                        data={sliderData}
                        renderItem={renderBanner}
                        sliderWidth={windowWidth +5}
                        itemWidth={310}
                        loop={true}
                        autoplay={true}
                    />
                </View>
                <View>
                    <FlatList
                        numColumns={2}
                        data={filterData}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1 }}>
                                <View style={styles.mainView} >
                                    <View style={styles.mainRow} >
                                        <TouchableOpacity style={styles.btn} >
                                            <Image
                                                source={{ uri: `${item.image}` }}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius:40,
                                                    marginHorizontal:10
                                                }}
                                            />
                                            <Text style={styles.txt} >{item.test_name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View style={{  }} >
                    <View style={styles.sliderImg}>
                        <Image style={styles.baner} source={require('../../assets/images/departmentHospital.png')} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
    },
    mainRow: {
        backgroundColor:'#fff',
        width:'92%',
        alignSelf:'center',
        height:80,
        justifyContent:'center',
        borderRadius:10,
        shadowColor: 'blue',
        elevation: 7,
        shadowRadius: 10,
        marginVertical:10
    },
    btn: {
        flexDirection:'row',
        alignItems:'center',
    },
    txt: {
      fontSize:18,
      fontWeight:'600',
      color:'black'
    },
    sliderImg: {
        backgroundColor:'#fff',
        height:130,
        justifyContent:'center',
        width:'92%',
        alignSelf:'center',
        borderRadius:10,
        shadowColor: 'blue',
        elevation: 7,
        shadowRadius: 10,
    },
    baner: {
        width: '95%',
        height: 120,
        borderRadius: 10,
        alignSelf:'center'
    },
    searchWrapperStyle: {
        backgroundColor: "#4584FF",
        flexDirection: "row",
        marginVertical:10,
        width:'95%',
        borderRadius:25,
        alignSelf:'center',
    },
    iconStyle: {
        marginTop: 15,
        marginHorizontal: 8,
    },
})

export default InvestigationScreen;
