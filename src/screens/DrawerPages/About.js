import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import ReadMore from 'react-native-read-more-text';

const About = () => {

    const _renderTruncatedFooter = (handlePress) =>{
        return (
            <Text style={{marginTop: 5}} onPress={handlePress}>
              Read more
            </Text>
          );
    };
    const _renderRevealedFooter = (handlePress) =>{
        return (
            <Text style={{ marginTop: 5}} onPress={handlePress}>
              Show less
            </Text>
          );
    }
    return (
        <View>
            <View>

        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}>
              <Text style={styles.cardText}>
               amit
              </Text>
            </ReadMore>
          </View>
        </View>
      </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default About;
