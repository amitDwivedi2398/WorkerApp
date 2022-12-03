import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import Carousel from 'react-native-snap-carousel';
import { freeGames, paidGames, sliderData } from '../../model/data';
import { windowWidth } from '../../utils/Dimensions';
import BannerSlider from '../../components/BannerSlider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import ListItem from '../../components/ListItem';
import CustomSwitch from '../../components/CustomSwitch';
import ReadMore from 'react-native-read-more-text';



const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
};
const FacilityScreen = ({ navigation, route }) => {
    const [filterData, setfilterData] = useState([]);
    const [search, setSearch] = React.useState('');
    const { id } = route.params;
    console.log("Facilities ??", id);
    const [facilities, setFacilities] = useState([])
    const [hospitalDetails, setHospitalDetails] = useState([])

    const getFacilities = async () => {
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/avaliablefacility/${id}`,
            )
            .then(response => {
                console.log("getFacilities ??", response.data.data);
                const facilities = response.data.data
                setFacilities(facilities)
                setfilterData(facilities)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getFacilities();
    }, [])
    const searchFilterFuntion = (text) => {
        if (text) {
            const newData = facilities.filter(
                function (item) {
                    const itemData = item.faculty_name
                        ? item.faculty_name.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            console.log(`new Data =` + JSON.stringify(newData));
            setfilterData(newData);
            setSearch(text);
        } else {
            setfilterData(facilities);
            setSearch(text);
        }
    }
    const getHospitalDetails = async () => {
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/hospitallistbyid/${id}`,
            )
            .then(response => {
                console.log("getHospitalDetails name list id <<<<<", response.data.data);
                const res = response.data.data
                setHospitalDetails(res)
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getHospitalDetails();
    }, []);


    const Tab = createMaterialTopTabNavigator();

    const _renderTruncatedFooter = (handlePress) => {
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={{ marginTop: 5, color: '#4584FF' }} onPress={handlePress}>
              Read more
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

    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader />
            <View>
                <Carousel
                    data={sliderData}
                    renderItem={renderBanner}
                    sliderWidth={windowWidth - 20}
                    itemWidth={300}
                    loop={true}
                    autoplay={true}
                />
            </View>
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
            <ScrollView>
            <View>
                <FlatList
                    data={hospitalDetails}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <View style={styles.mainView} >
                                <View style={styles.mainRow} >
                                    <TouchableOpacity style={styles.btn}
                                    >
                                        <Image
                                            source={{ uri: `${item.image}` }}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                alignSelf: 'center',
                                                marginHorizontal: 10,
                                                borderRadius: 50
                                            }}
                                        />
                                        <View style={{ alignSelf: 'center' }} >
                                            <Text style={{ width: 200 }} >{item.name}</Text>
                                            <View style={styles.addresh}>
                                                <TouchableOpacity  >
                                                    <Text style={{ width: 200 }} >{item.address}</Text>
                                                </TouchableOpacity>
                                                <Rating style={{ marginTop: 5, alignSelf: 'flex-start' }}
                                                    imageSize={12}
                                                    tintColor='#F3F3F3'
                                                    onFinishRating={(rating) => {
                                                        Alert.alert('Star Rating: ' + JSON.stringify(rating));
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            <Text style={styles.heding} >Available Facilities</Text>
            <ScrollView>
            {filterData?.map((item)=>(
                <View style={styles.swiming}>
                        <Text style={styles.swimingTxt} >{item.faculty_name}</Text>
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={_renderTruncatedFooter}
                            renderRevealedFooter={_renderRevealedFooter}>
                            <Text style={styles.txt}>{item.description}</Text>
                        </ReadMore>
                    </View>
                ))}
            </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginBottom:10
    },
    mainRow: {
        width: '90%',
        height: 100,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        shadowColor: 'blue',
        elevation: 4,
        shadowRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    btn: {
        flexDirection: 'row'
    },
    addresh: {
        marginTop: 5
    },
    title: {
        color: '#4584FF',
        fontSize: 18,
        fontWeight: '700',
        padding: 20
    },
    text: {
    },
    heding: {
        color: '#4584FF',
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        padding: 10,
        marginLeft: 5
    },
    swiming: {
        height: 'auto', width: '95%', justifyContent: 'center',
        backgroundColor: '#fff', padding: 10,
        alignSelf: 'center', borderRadius: 10, shadowColor: 'blue',
        elevation: 7,
        shadowRadius: 10,
        marginTop: 10,
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
      searchWrapperStyle: {
        backgroundColor: "#4584FF",
        flexDirection: "row",
        borderRadius:20,
        width:'95%',
        alignSelf:'center',
        marginVertical:10
    },
    iconStyle: {
        marginTop: 15,
        marginHorizontal: 8,
    },
})

export default FacilityScreen;
