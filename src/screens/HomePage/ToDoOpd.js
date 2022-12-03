import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text, SafeAreaView,Image} from 'react-native';
import CustomHeader from '../../components/CustomHeader';

const ToDoOpd = ({route}) => {
    const {id} = route.params;
    console.log("what ??",id);
    const [whatOpd, setWhatOpd] = useState([])
    const getWhatOpd = async () => {
        axios
            .get(
                `http://WorkerApp.in/newadmin/api/ApiCommonController/genralinfo/${id}`,
            )
            .then(response => {
                console.log("getWhatOpd ??", response.data.data);
                const todoOpd= response.data.data
                setWhatOpd(todoOpd[0])
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        getWhatOpd();
    }, [])
    return (
        <SafeAreaView style={{flex:1}} >
        <CustomHeader/>
        <View style={{flex:1}} >
                <Image style={{width:'100%',height:'100%'}} source={{ uri: `${whatOpd.image}` }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default ToDoOpd;
