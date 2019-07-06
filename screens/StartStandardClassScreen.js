import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  AsyncStorage
} from "react-native";

import { Audio } from "expo";

import IntervalTimer from "../IntervalTimer";
import toHHMMSS from "../Tools"; //toHHMMSS is used
import { KeepAwake } from "expo";

import { FileSystem } from "expo-file-system";

var globalStyle = require("../style");

export default class StartStandardClassScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    tabBarVisible: false
  });

  constructor(props) {
    super(props);

    this.soundObject = new Audio.Sound();
    this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);

    this.currentClass = this.props.navigation.getParam("item", "");

    this.currentAsanaRow = -1; //-1 means nothing has started playing

    this.asanaArray = [];

    if (this.currentClass == 120) {
      this.asanaArray = [
        {
          key: "0",
          title: "01 Initial Relaxation & Starting Prayer",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/01.mp3"
          }
        },
        {
          key: "1",
          title: "02 Breathing Exercises - Pranayama",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/02.mp3"
          }
        },
        {
          key: "2",
          title: "03 Sun Salutation - Surya Namaskar",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/03.mp3"
          }
        },
        {
          key: "3",
          title: "04 Leg Exercises",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/04.mp3"
          }
        },
        {
          key: "4",
          title: "05 Introduction",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/05.mp3"
          }
        },
        {
          key: "5",
          title: "06 Headstand & Scorpion",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/06.mp3"
          }
        },
        {
          key: "6",
          title: "07 Shoulderstand",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/07.mp3"
          }
        },
        {
          key: "7",
          title: "08 Plough, Bridge, Wheel",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/08.mp3"
          }
        },
        {
          key: "8",
          title: "09 Fish",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/09.mp3"
          }
        },
        {
          key: "9",
          title: "10 Sitting Forward Bend & Inclined Plane",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/10.mp3"
          }
        },
        {
          key: "10",
          title: "11 Cobra, Locus, Bow",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/11.mp3"
          }
        },
        {
          key: "11",
          title: "12 Half Spinal Twist",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/12.mp3"
          }
        },
        {
          key: "12",
          title: "13 Crow - Peacock",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/13.mp3"
          }
        },
        {
          key: "13",
          title: "14 Standing Forward Bend & Triangle",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/14.mp3"
          }
        },
        {
          key: "14",
          title: "15 Final Relaxation & Final Prayer",
          sound: {
            uri: FileSystem.documentDirectory + "120minYogaClass/15.mp3"
          }
        }
      ];
    } else if (this.currentClass == 90) {
      this.asanaArray = [
        {
          key: "0",
          title: "01 Starting Prayer",
          sound: { uri: FileSystem.documentDirectory + "90minClass/01.mp3" }
        },
        {
          key: "1",
          title: "02 Kapalabhati",
          sound: { uri: FileSystem.documentDirectory + "90minClass/02.mp3" }
        },
        {
          key: "2",
          title: "03 Anuloma Viloma",
          sound: { uri: FileSystem.documentDirectory + "90minClass/03.mp3" }
        },
        {
          key: "3",
          title: "04 Surya Namaskar",
          sound: { uri: FileSystem.documentDirectory + "90minClass/04.mp3" }
        },
        {
          key: "4",
          title: "05 Single Leg Raises",
          sound: { uri: FileSystem.documentDirectory + "90minClass/05.mp3" }
        },
        {
          key: "5",
          title: "06 Double Leg Raises",
          sound: { uri: FileSystem.documentDirectory + "90minClass/06.mp3" }
        },
        {
          key: "6",
          title: "07 Headstand",
          sound: { uri: FileSystem.documentDirectory + "90minClass/07.mp3" }
        },
        {
          key: "7",
          title: "08 Shoulderstand",
          sound: { uri: FileSystem.documentDirectory + "90minClass/08.mp3" }
        },
        {
          key: "8",
          title: "09 Plough",
          sound: { uri: FileSystem.documentDirectory + "90minClass/09.mp3" }
        },
        {
          key: "9",
          title: "10 Fish",
          sound: { uri: FileSystem.documentDirectory + "90minClass/10.mp3" }
        },
        {
          key: "10",
          title: "11 Sitting Forward Bend",
          sound: { uri: FileSystem.documentDirectory + "90minClass/11.mp3" }
        },
        {
          key: "11",
          title: "12 Inclined Plane",
          sound: { uri: FileSystem.documentDirectory + "90minClass/12.mp3" }
        },
        {
          key: "12",
          title: "13 Cobra",
          sound: { uri: FileSystem.documentDirectory + "90minClass/13.mp3" }
        },
        {
          key: "13",
          title: "14 Locust",
          sound: { uri: FileSystem.documentDirectory + "90minClass/14.mp3" }
        },
        {
          key: "14",
          title: "15 Bow",
          sound: { uri: FileSystem.documentDirectory + "90minClass/15.mp3" }
        },
        {
          key: "15",
          title: "16 Half Spinal Twist",
          sound: { uri: FileSystem.documentDirectory + "90minClass/16.mp3" }
        },
        {
          key: "16",
          title: "17 Crow - Peacock",
          sound: { uri: FileSystem.documentDirectory + "90minClass/17.mp3" }
        },
        {
          key: "17",
          title: "18 Standing Forward Bend",
          sound: { uri: FileSystem.documentDirectory + "90minClass/18.mp3" }
        },
        {
          key: "18",
          title: "19 Triangle",
          sound: { uri: FileSystem.documentDirectory + "90minClass/19.mp3" }
        },
        {
          key: "19",
          title: "20 Final Relaxation",
          sound: { uri: FileSystem.documentDirectory + "90minClass/20.mp3" }
        },
        {
          key: "20",
          title: "21 Final Prayer",
          sound: { uri: FileSystem.documentDirectory + "90minClass/21.mp3" }
        }
      ];
    } else if (this.currentClass == 60) {
      //track is 62 min long
      //track is 62 min long
      //from 90 min track removed kapalabathi, anulom, single leg raises, double leg raises, crow and standing forward bend
      this.asanaArray = [
        {
          key: "0",
          title: "01 Starting Prayer",
          sound: { uri: FileSystem.documentDirectory + "90minClass/01.mp3" }
        },
        {
          key: "1",
          title: "02 Surya Namaskar",
          sound: { uri: FileSystem.documentDirectory + "90minClass/04.mp3" }
        },
        {
          key: "2",
          title: "03 Headstand",
          sound: { uri: FileSystem.documentDirectory + "90minClass/07.mp3" }
        },
        {
          key: "3",
          title: "04 Shoulderstand",
          sound: { uri: FileSystem.documentDirectory + "90minClass/08.mp3" }
        },
        {
          key: "4",
          title: "05 Plough",
          sound: { uri: FileSystem.documentDirectory + "90minClass/09.mp3" }
        },
        {
          key: "5",
          title: "06 Fish",
          sound: { uri: FileSystem.documentDirectory + "90minClass/10.mp3" }
        },
        {
          key: "6",
          title: "07 Sitting Forward Bend",
          sound: { uri: FileSystem.documentDirectory + "90minClass/11.mp3" }
        },
        {
          key: "7",
          title: "08 Inclined Plane",
          sound: { uri: FileSystem.documentDirectory + "90minClass/12.mp3" }
        },
        {
          key: "8",
          title: "09 Cobra",
          sound: { uri: FileSystem.documentDirectory + "90minClass/13.mp3" }
        },
        {
          key: "9",
          title: "10 Locust",
          sound: { uri: FileSystem.documentDirectory + "90minClass/14.mp3" }
        },
        {
          key: "10",
          title: "11 Bow",
          sound: { uri: FileSystem.documentDirectory + "90minClass/15.mp3" }
        },
        {
          key: "11",
          title: "12 Half Spinal Twist",
          sound: { uri: FileSystem.documentDirectory + "90minClass/16.mp3" }
        },
        {
          key: "12",
          title: "13 Triangle",
          sound: { uri: FileSystem.documentDirectory + "90minClass/19.mp3" }
        },
        {
          key: "13",
          title: "14 Final Relaxation",
          sound: { uri: FileSystem.documentDirectory + "90minClass/20.mp3" }
        },
        {
          key: "14",
          title: "15 Final Prayer",
          sound: { uri: FileSystem.documentDirectory + "90minClass/21.mp3" }
        }
      ];
    }

    this.asanaArray.forEach(element => {
      element.isSelected = false;
    });

    this.state = {
      arrayHolder: this.asanaArray,
      started: false,
      timer: null,
      counter: 0,
      totalTime: 1000
    };
  }

  componentWillUnmount() {
    //the sound needs to be stopped when the user leaves the screen
    this.soundObject
      .stopAsync()
      .then()
      .catch(this.failureCallback);
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    const { didJustFinish, isLoaded, positionMillis } = playbackStatus;

    if (isLoaded) {
      if (didJustFinish) {
        this.nextAsana();
      }
    }
  };

  nextAsana() {
    if (this.currentAsanaRow < this.asanaArray.length - 1) {
      this.asanaArray[this.currentAsanaRow++].isSelected = false;
      this.asanaArray[this.currentAsanaRow].isSelected = true;
      this.playAsanaSound()
        .then()
        .catch(this.failureCallback);

      this.setState({ arrayHolder: [...this.asanaArray] });
    } else {
      console.log("nextAsana done");
    }
  }

  failureCallback(result) {
    console.log("failureCallback " + result);
  }

  startPause() {
    if (this.state.started) {
      this.pauseAsanas();
    } else {
      this.startAsanas();
    }
  }
  pauseAsanas() {
    this.pauseSound();
    this.setState({ started: false });
  }

  async pauseSound() {
    try {
      if (this.activeAsanaTimer != null) {
        this.activeAsanaTimer.pause();
      }
      await this.soundObject.pauseAsync();
    } catch (error) {
      console.log("pauseSound " + error);
    }
  }

  async startAsanas() {
    this.setState({ started: true });

    //the practice is being started for the first time
    if (this.currentAsanaRow == -1) {
      this.currentAsanaRow++;
      this.playAsanaSound();
    } else {
      //resume from the last asana and time
      await this.soundObject.playAsync();
    }

    //highlight the exercise
    this.asanaArray.forEach(element => {
      element.isSelected = false;
    });
    this.asanaArray[this.currentAsanaRow].isSelected = true;

    this.setState({ arrayHolder: [...this.asanaArray] });
  }

  async playAsanaSound() {
    console.log("playAsanaSound " + this.currentAsanaRow);
    let soundAsset = this.asanaArray[this.currentAsanaRow].sound;

    await this.soundObject.unloadAsync();
    await this.soundObject
      .loadAsync(soundAsset)
      .then()
      .catch(this.failureCallback);
    await this.soundObject
      .playAsync()
      .then()
      .catch(this.failureCallback);
  }

  asanaClicked(item) {
    this.jumpToAsana(item.key);
  }
  async jumpToAsana(rowNumber) {
    // if (this.currentAsanaRow == -1) {
    // } else {
    // }

    this.currentAsanaRow = rowNumber;
    this.asanaArray.forEach(element => {
      element.isSelected = false;
    });

    this.asanaArray[rowNumber].isSelected = true;
    this.setState({ started: true, arrayHolder: [...this.asanaArray] });

    await this.soundObject
      .stopAsync()
      .then()
      .catch(this.failureCallback);
    await this.playAsanaSound();
  }

  render() {
    let text = "Start";
    if (this.state.started) {
      text = "Pause";
    }

    return (
      <View style={globalStyle.mainContainer}>
        <KeepAwake />
        <View style={globalStyle.sectionContainer}>
          <TouchableOpacity
            onPress={() => this.startPause()}
            style={globalStyle.button}
          >
            <Text style={globalStyle.buttonText}>{text}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={globalStyle.sectionContainer}>
          <FlatList
            data={this.state.arrayHolder}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </ScrollView>
      </View>
    );
  }

  renderItem = item => {
    let color = "rgba(0, 0, 0, 0)";
    if (item.isSelected) {
      color = "#eff0f1";
    }

    return (
      <TouchableOpacity
        style={{ backgroundColor: color }}
        onPress={() => this.asanaClicked(item)}
      >
        <Text style={globalStyle.listItemText}>{item.title}</Text>
        <View style={globalStyle.separator} />
      </TouchableOpacity>
    );
  };
}
