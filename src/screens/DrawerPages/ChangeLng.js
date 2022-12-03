import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import BackHeader from '../../components/BackHeader';
import RNRestart from 'react-native-restart';



const ChangeLng = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [language] = useState(
    [
      'Hindi',
      'English',
    ]
  )


  const getSetLng = async (id) => {
    axios.post(`http://WorkerApp.in/newadmin/api/ApiCommonController/updatelanguage`,
      {
        lang: selectedLanguage
      },
      {
        headers: {
          id: await AsyncStorage.getItem('user_id'),
        },
      },)
      .then(response => {
        console.log('////////', response.data);
        RNRestart.Restart()
      })
      .catch(error => {
        console.log(error);
      })
  }
  return (
    <View>
    <BackHeader label={'Language'} onPress={() => navigation.openDrawer()} />
      <Picker
      style={styles.picer}
        selectedValue={selectedLanguage}
        onValueChange={(itemVal) => {
          setSelectedLanguage(itemVal);
        }}
      >
        {
          language.map((l) => (
            <Picker.Item label={l} value={l} />
          ))
        }
      </Picker>
      <TouchableOpacity style={styles.btn} onPress={getSetLng}>
        <Text style={styles.txt}>APPLY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#4584FF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: 'black',
    elevation: 4,
    shadowRadius: 10,
    width:'95%',
    alignSelf:'center',
  },
  txt: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  picer:{
    backgroundColor:'#D3D3D3',
    width:'95%',
    alignSelf:'center',
    marginVertical:10
  }

})

export default ChangeLng;
