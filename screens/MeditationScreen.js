import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  AsyncStorage
} from "react-native";

import NumberChooser from "../components/NumberChooser";
import IntervalTimer from "../IntervalTimer";

import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'

import toHHMMSS from "../Tools"; //toHHMMSS is used

var globalStyle = require("../style");
/**
 * MeditationScreen has a timer which counts down.
 * A bell is played at the start and at the end of the meditation
 * Each time a meditation is started, stopped or completed it is logged.
 *
 * TODO:
 * Create stats with the recorded data,
 * the data is just being logged, a better structure is required for stats
 */
export default class MeditationScreen extends React.Component {
  static navigationOptions = {
    title: "Meditation"
  };

 
  constructor(props) {
    super(props);
    this.savedLogsKey = "SivanandaSavedLogs";
    this.BACKGROUND_TIMER_TASK = 'background-timer';
    this.state = {
      meditationLength: 5, 
      meditationCounter: 0, //the counter will count from the meditation length to 0
      started: false,
      logHolder: this.logs
    };

    this.logs = [];

    //the logs are stored as [{timestamp1, message1}, {timestamp2, message2}, ...]
    this.getLogs();

    this.soundObject = new Audio.Sound();
    let soundAsset = {
      uri: FileSystem.documentDirectory + "bell.mp3"
    };
    this.soundObject.loadAsync(soundAsset);

    
    // TaskManager.defineTask(BACKGROUND_TIMER_TASK, () => {
    //   try {
        
    //   } catch (error) {
    //   }
    // });
    this.counterTimer = new IntervalTimer("Counter", this.tick, 1000, null);
  }

  async getLogs() {
    const value = await AsyncStorage.getItem(this.savedLogsKey);
    //console.log("logs value " + value);
    if (value != null) {
      this.logs = JSON.parse(value);

      this.setState({ logHolder: [...this.logs] });
    }
  }
  async startStopMeditation() {
    if (!this.state.started) {
      this.logMessage(
        "Meditation started for " + this.state.meditationLength + " min"
      );
      //start the timer
      let counter = this.state.meditationLength * 60;
      this.setState({ meditationCounter: counter, started: true });
      this.counterTimer.start();

      await this.soundObject.playAsync();
    } else {
      //stop
      this.counterTimer.stop();
      await this.soundObject.stopAsync();
      this.setState({ meditationCounter: 0, started: false });
      this.logMessage("Meditation stopped early!");
    }
  }

  async logMessage(message) {
    var date = new Date().getDate().toString(); //Current Date
    date = date.replace(/\b(\d{1})\b/g, "0$1"); //this line just adds a 0 in front if the value is a single digit
    var month = (new Date().getMonth() + 1).toString(); //Current Month
    month = month.replace(/\b(\d{1})\b/g, "0$1");
    var year = new Date().getFullYear().toString(); //Current Year
    var hours = new Date().getHours().toString(); //Current Hours
    hours = hours.replace(/\b(\d{1})\b/g, "0$1");
    var min = new Date().getMinutes().toString(); //Current Minutes
    min = min.replace(/\b(\d{1})\b/g, "0$1");
    var sec = new Date().getSeconds().toString(); //Current Seconds
    sec = sec.replace(/\b(\d{1})\b/g, "0$1");

    let dateStr =
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec;

    //add the latest value to the top of the array,
    //so that the user sees the latest entries at the top
    this.logs.unshift({
      key: dateStr + message,
      time: dateStr,
      message: message
    });
    //limit the size of the log to 100
    if (this.logs.length > 100) {
      this.logs.length = 100;  
    }

    this.setState({ logHolder: [...this.logs] });

    await AsyncStorage.setItem(this.savedLogsKey, JSON.stringify(this.logs));
  }

  tick = () => {
    if (this.state.meditationCounter == 0) {
      this.counterTimer.stop();
      this.logMessage("Meditation complete!");
      this.replaySound();
      //console.log("should play sound")
      this.setState({ meditationCounter: 0, started: false });
    }
    this.setState({
      meditationCounter: this.state.meditationCounter - 1
    });
  };
 
  async replaySound(){
    await this.soundObject.stopAsync();
    await this.soundObject.playAsync();
  }
  render() {
    let elapsedTimeStr = "00:00:00";
    let startStopButtonText = "Start";
    if (this.state.started) {

      let elapsedTime = this.state.meditationCounter;
      if (elapsedTime > 0) {
        elapsedTimeStr = elapsedTime.toString().toHHMMSS();
      }
      startStopButtonText = "[Stop] Remaining " + elapsedTimeStr;
    }

    return (
      <ScrollView style={globalStyle.mainContainer}>
        <View style={globalStyle.sectionContainer}>
          <View>
            <Text style={globalStyle.headerLabel}>Meditation Length (min)</Text>
            <View style={styles.numberChooser}>
              <NumberChooser
                onValueChange={itemValue => {
                  this.setState({ meditationLength: itemValue });
                }}
                initialValue={this.state.meditationLength}
                minValue={5}
                incrementValue={5}
              />
            </View>
          </View>
          <TouchableOpacity
            style={globalStyle.button}
            onPress={() => this.startStopMeditation()}
          >
            <Text style={globalStyle.buttonText}>{startStopButtonText}</Text>
          </TouchableOpacity>
          {/* <Text style={styles.timeText}>Remaining Time : {elapsedTimeStr}</Text> */}
        </View>

        <View style={globalStyle.sectionContainer}>
          <Text style={globalStyle.headerLabel}>Log</Text>
          <FlatList
            style={styles.list}
            data={this.state.logHolder}
            renderItem={({ item }) => (
              <View style={globalStyle.horizontalContainer}>
                <Text style={styles.listRowTime}>{item.time} : </Text>
                <Text style={styles.listRowMessage}>{item.message}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  numberChooser: {
    alignItems: "center",
    margin: 10
  },
  list: {
    margin: 10
  },
  timeText: {
    margin: 10,
    fontSize: 18
  }
});
