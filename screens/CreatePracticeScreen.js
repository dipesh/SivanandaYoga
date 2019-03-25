import React from 'react';
import AsanaListview from '../components/AsanaListview'

import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';

export default class CreatePracticeScreen extends React.Component {
    getData() {
        return [
          {
            key: '1', 
            title: 'Exercise A',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            image_url: 'https://en.wikipedia.org/wiki/Sivananda_Saraswati#/media/File:Swami_Shivananda_Liebe.jpg'
          },
          {
            key: '2',
            title: 'Exercise B',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            image_url: 'https://www.sivananda.at/images/ueber-uns/swami_vishnudevananda_portait.jpg'
          },
        ]
      }
    
    render() {
      return (
        <View style={styles.container}>
            <EditAsanaListview
                itemList={this.getData()}
            />
            <View style={styles.buttonContainer}>
                <Button
                    onPress={this.onPressAddExercise}
                    title="Add Exercise"
                    color="#841584"
                />
            </View>
        </View>
      );
    } 
    onPressAddExercise = () => {
        
    };
  }

  const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10,
      },
    container: {
      flex: 1,
      backgroundColor: '#FCFCFC',
    }
  });