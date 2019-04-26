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

import { Audio } from "expo";

import toHHMMSS from "../Tools"; //toHHMMSS is used

export default class MeditationScreen extends React.Component {
  static navigationOptions = {
    title: "Meditation"
  };

  constructor(props) {
    super(props);
    this.savedLogsKey = "SivanandaSavedLogs";

    this.state = {
      meditationLength: 1,
      meditationCounter: 0,
      started: false,
      logHolder: this.logs
    };

    this.logs = [];

    this.getLogs();

    this.soundObject = new Audio.Sound();
    this.soundObject.loadAsync(require("../assets/sounds/bell.mp3"));

    this.counterTimer = new IntervalTimer("Counter", this.tick, 1000, null);
  }

  async getLogs() {
    const value = await AsyncStorage.getItem(this.savedLogsKey);
    console.log("logs value " + value);
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
    date = date.replace(/\b(\d{1})\b/g, "0$1");
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
      this.soundObject.playAsync();
    }
    this.setState({
      meditationCounter: this.state.meditationCounter - 1
    });
  };

  render() {
    let elapsedTimeStr = "00:00:00";
    let startStopButtonText = "Start";
    if (this.state.started) {
      startStopButtonText = "Stop";

      let elapsedTime = this.state.meditationCounter;
      if (elapsedTime > 0) {
        elapsedTimeStr = elapsedTime.toString().toHHMMSS();
      }
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.horView}>
          <Text style={styles.textStyle}>Meditation Length (min):</Text>
          <NumberChooser
            onValueChange={itemValue => {
              this.setState({ meditationLength: itemValue });
            }}
            initialValue={this.state.meditationLength}
            minValue={5}
            incrementValue={5}
          />
        </View>

        <TouchableOpacity onPress={() => this.startStopMeditation()}>
          <Text style={styles.linkText}>{startStopButtonText}</Text>
        </TouchableOpacity>
        <Text>Remaining Time : {elapsedTimeStr}</Text>

        <FlatList
          style={styles.list}
          data={this.state.logHolder}
          renderItem={({ item }) => (
            <View style={styles.horView}>
              <Text style={styles.listRowTime}>{item.time} : </Text>
              <Text style={styles.listRowMessage}>{item.message}</Text>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff"
  },
  horView: {
    flexDirection: "row"
  },
  textStyle: {
    marginRight: 5
  },
  list: {
    paddingTop: 10
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
    margin: 10
  }
});
