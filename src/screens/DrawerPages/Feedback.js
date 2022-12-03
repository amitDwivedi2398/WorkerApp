import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import BackHeader from '../../components/BackHeader';

const Feedback = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container} >
            <BackHeader label={'Feedback'} onPress={() => navigation.openDrawer()}/>
                    <View>
                        <Text style={styles.txt} >Did you scheduled an appointment?</Text>
                        
                    </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    txt:{
        color:'#333',
        fontSize:18,
        fontFamily:'Roboto-Regular',
        marginLeft:10
    }
})

export default Feedback;
