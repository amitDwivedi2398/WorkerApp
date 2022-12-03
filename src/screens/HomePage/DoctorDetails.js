import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import axios from 'axios';





const DoctorDetails = ({ navigation,route }) => {
    const {id} = route.params;
    const [hospitalDetails, setHospitalDetails] = useState([])
    console.log("amit id",id);
    const [images, setimages] = useState([
        { src: require('../../assets/ResultFindDoctor/img.png'), title: 'Dr. Vishwas Madhav Thakur', key: '1' },
    ]);
    const [categoryList, setcategoryList] = useState([
        { img: require('../../assets/images/becoming-doctor.jpg'), titleName: 'What To Do For OPD', key: '1' },
        // { img: require('../../assets/images/speech-on-doctor.jpg'), titleName: 'Available Facilities', key: '2' },
        // { img: require('../../assets/images/team-of-doctors.jpg'), titleName: 'OPD Schedule', key: '3' },
        // { img: require('../../assets/images/departmentHospital.png'), titleName: 'Investigation and Intervention', key: '4' },
    ]);

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


    return (
        <SafeAreaView style={styles.container} >
            <ScrollView>
                <CustomHeader />
                
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
                    <FlatList
                        data={hospitalDetails}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1 }}>
                                <View style={styles.mainView} >
                                    <View style={styles.mainRow} >
                                        <TouchableOpacity style={styles.btn}
                                        //  onPress={() => navigation.navigate('FacilityScreen')}
                                         >
                                            <Image
                                                source={{ uri: `${item.image}` }}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    alignSelf: 'center',
                                                    marginHorizontal: 10,
                                                    borderRadius:50
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
                <Text style={styles.title} >About </Text>
                <FlatList
                    numColumns={2}
                    data={categoryList}
                    renderItem={({ item }) => (
                        <View  >
                            <View style={styles.mainContainer}>
                                <TouchableOpacity style={styles.sectonBtn} onPress={()=>navigation.navigate('ToDoOpd', {id:id})}>
                                    <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.sectionBgImage} source={item.img} resizeMode='cover'>
                                        <View style={styles.txtView}>
                                            <Text style={styles.txt} >{item.titleName}</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sectonBtn} onPress={()=> navigation.navigate('FacilityScreen',{id:id})}  >
                                    <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.sectionBgImage} source={item.img} resizeMode='cover'>
                                        <View style={styles.txtView}>
                                            <Text style={styles.txt} >Available Facilities</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainContainer}>
                                <TouchableOpacity style={styles.sectonBtn} onPress={() => navigation.navigate('OptSchameCatagiry',{id:id})}  >
                                    <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.sectionBgImage} source={item.img} resizeMode='cover'>
                                        <View style={styles.txtView}>
                                            <Text style={styles.txt} >OPD Schedule</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.sectonBtn} onPress={()=> navigation.navigate('InvestigationScreen',{id:id})} >
                                    <ImageBackground imageStyle={{ borderRadius: 10 }} style={styles.sectionBgImage} source={item.img} resizeMode='cover'>
                                        <View style={styles.txtView}>
                                            <Text style={styles.txt} >Investigation and Intervention</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                <View style={{ padding: 5, marginBottom: 10 }} >
                        <View style={styles.sliderImg}>
                            <Image style={styles.baner} source={require('../../assets/images/departmentHospital.png')} />
                        </View>
                </View>
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
        marginTop: 20
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
        marginHorizontal: 10,
        marginVertical: 10
    },
    sliderImg: {
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
        height: 100,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    mainContainer: {
        flex: 1, padding: 10, borderRadius: 10, backgroundColor: '#F3F3F3',
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    },
    sectonBtn:{
        justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between', width: '50%'
    },
    sectionBgImage:{
        height: 150, width: '95%', justifyContent: 'center', alignItems: 'center',
    },
    txtView:{
        backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', borderRadius: 10 
    },
    txt:{
        alignSelf: 'center', textAlign: 'center', color: '#fff', fontFamily: 'Inter-Bold',
    }
})

export default DoctorDetails;
