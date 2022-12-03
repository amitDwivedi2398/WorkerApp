import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, } from 'react-native';
import { color } from 'react-native-reanimated';
import BackHeader from '../../components/BackHeader';
import CustomButton from '../../components/CustomButton';

const DoctorAbout = ({ navigation,route }) => {
    const {id} = route.params;
    console.log("ID ??",id);
    const [doctor, setDoctor] = useState([])
    
    const getDocter = async () => {
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/doctorlist1/${id}`,
            )
            .then(response => {
                console.log("Docter About  <<<<<", response.data.data);
                const res = response.data.data
                setDoctor(res[0])
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getDocter();
    }, []);
    return (
        <SafeAreaView style={styles.container} >
            <BackHeader TitleName={'name'} onPress={() => navigation.navigate('OtpSchame')} />
            <View style={styles.mainContainer} >
                <Image style={styles.img} source={{ uri: `${doctor.image}` }} />
                <Text style={styles.docName} >{doctor.doctor_name}</Text>
                <Text style={styles.subTitle} >{doctor.designation}
                </Text>
                <View style={styles.row} >
                    <Text style={styles.rowtxt} >Patients</Text>
                    <Text style={styles.rowtxt}>Experience</Text>
                    <Text style={styles.rowtxt}>Fees</Text>
                </View>
                <View style={styles.rowTwo}>
                <Text style={[styles.txt,]} >{doctor.patients}</Text>
                    <Text style={styles.txt}>{doctor.experiance}</Text>
                    <Text style={[styles.txt,{marginRight:3}]}>{doctor.fees}</Text>
                </View>
                <View>
                    <Text style={styles.about} >About Doctor</Text>
                    <Text style={{color:'#6A6A6A'}} >{doctor.about_doctor}</Text>
                </View>
                <View>
                    <Text style={styles.about} >OPD Schedule</Text>
                    <Text style={{color:'#6A6A6A'}} >{doctor.opd_schedule}</Text>
                </View>
            </View>

            <View style={{width:'90%',alignSelf:'center'}} >
            <CustomButton label={'SEND ENQUIRY'} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        alignSelf: 'center'
    },
    img: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    docName: {
        color: '#4584FF',
        fontFamily: 'Roboto-Medium',
        fontSize: 25,
        marginTop: 10,
        lineHeight: 25,
        alignSelf: 'center'
    },
    subTitle: {
        color: '#6A6A6A',
        fontFamily: 'Roboto-Medium',
        lineHeight: 20,
        alignSelf: 'center',
        fontSize: 15
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:50,
    },
    rowtxt:{
        color:'#6A6A6A',
        fontFamily: 'Roboto-Medium',
        fontSize:17,

    },
    txt:{
        color:'#4584FF',
        fontFamily: 'Roboto-Bold',
        fontSize:17,
    },
    rowTwo:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginLeft:10,
    },
    about:{
        color:'#4584FF',
        marginTop:20,
        fontFamily: 'Roboto-Bold',
        fontSize:18,
    }
})

export default DoctorAbout;
