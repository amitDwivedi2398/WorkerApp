import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const BackHeader = ({onPress,label}) => {
    const navigation = useNavigation('');
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    padding:7,
                    borderBottomWidth:1,
                    marginBottom:10,
                    borderColor:'#4584FF',
                    alignItems:'center'
                }}>
                <TouchableOpacity  onPress={onPress}>
                    <AntDesign name="left" color={'#4584FF'} size={25} />
                </TouchableOpacity>
                <Text style={{color:'#6E6E6E',fontFamily:'Roboto-Bold',fontSize:18,marginLeft:30}}>{label}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default BackHeader;
