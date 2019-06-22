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
          sound: require("../assets/sounds/120minYogaClass/01.mp3")
        },
        {
          key: "1",
          title: "02 Breathing Exercises - Pranayama",
          sound: require("../assets/sounds/120minYogaClass/02.mp3")
        },
        {
          key: "2",
          title: "03 Sun Salutation - Surya Namaskar",
          sound: require("../assets/sounds/120minYogaClass/03.mp3")
        },
        {
          key: "3",
          title: "04 Leg Exercises",
          sound: require("../assets/sounds/120minYogaClass/04.mp3")
        },
        {
          key: "4",
          title: "05 Introduction",
          sound: require("../assets/sounds/120minYogaClass/05.mp3")
        },
        {
          key: "5",
          title: "06 Headstand & Scorpion",
          sound: require("../assets/sounds/120minYogaClass/06.mp3")
        },
        {
          key: "6",
          title: "07 Shoulderstand",
          sound: require("../assets/sounds/120minYogaClass/07.mp3")
        },
        {
          key: "7",
          title: "08 Plough, Bridge, Wheel",
          sound: require("../assets/sounds/120minYogaClass/08.mp3")
        },
        {
          key: "8",
          title: "09 Fish",
          sound: require("../assets/sounds/120minYogaClass/09.mp3")
        },
        {
          key: "9",
          title: "10 Sitting Forward Bend & Inclined Plane",
          sound: require("../assets/sounds/120minYogaClass/10.mp3")
        },
        {
          key: "10",
          title: "11 Cobra, Locus, Bow",
          sound: require("../assets/sounds/120minYogaClass/11.mp3")
        },
        {
          key: "11",
          title: "12 Half Spinal Twist",
          sound: require("../assets/sounds/120minYogaClass/12.mp3")
        },
        {
          key: "12",
          title: "13 Crow - Peacock",
          sound: require("../assets/sounds/120minYogaClass/13.mp3")
        },
        {
          key: "13",
          title: "14 Standing Forward Bend & Triangle",
          sound: require("../assets/sounds/120minYogaClass/14.mp3")
        },
        {
          key: "14",
          title: "15 Final Relaxation & Final Prayer",
          sound: require("../assets/sounds/120minYogaClass/15.mp3")
        }
      ];
    } else if (this.currentClass == 90) {
      this.asanaArray = [
        {
          key: "0",
          title: "01 Starting Prayer",
          sound: require("../assets/sounds/90minClass/01.mp3")
        },
        {
          key: "1",
          title: "02 Kapalabhati",
          sound: require("../assets/sounds/90minClass/02.mp3")
        },
        {
          key: "2",
          title: "03 Anuloma Viloma",
          sound: require("../assets/sounds/90minClass/03.mp3")
        },
        {
          key: "3",
          title: "04 Surya Namaskar",
          sound: require("../assets/sounds/90minClass/04.mp3")
        },
        {
          key: "4",
          title: "05 Single Leg Raises",
          sound: require("../assets/sounds/90minClass/05.mp3")
        },
        {
          key: "5",
          title: "06 Double Leg Raises",
          sound: require("../assets/sounds/90minClass/06.mp3")
        },
        {
          key: "6",
          title: "07 Headstand",
          sound: require("../assets/sounds/90minClass/07.mp3")
        },
        {
          key: "7",
          title: "08 Shoulderstand",
          sound: require("../assets/sounds/90minClass/08.mp3")
        },
        {
          key: "8",
          title: "09 Plough",
          sound: require("../assets/sounds/90minClass/09.mp3")
        },
        {
          key: "9",
          title: "10 Fish",
          sound: require("../assets/sounds/90minClass/10.mp3")
        },
        {
          key: "10",
          title: "11 Sitting Forward Bend",
          sound: require("../assets/sounds/90minClass/11.mp3")
        },
        {
          key: "11",
          title: "12 Inclined Plane",
          sound: require("../assets/sounds/90minClass/12.mp3")
        },
        {
          key: "12",
          title: "13 Cobra",
          sound: require("../assets/sounds/90minClass/13.mp3")
        },
        {
          key: "13",
          title: "14 Locust",
          sound: require("../assets/sounds/90minClass/14.mp3")
        },
        {
          key: "14",
          title: "15 Bow",
          sound: require("../assets/sounds/90minClass/15.mp3")
        },
        {
          key: "15",
          title: "16 Half Spinal Twist",
          sound: require("../assets/sounds/90minClass/16.mp3")
        },
        {
          key: "16",
          title: "17 Crow - Peacock",
          sound: require("../assets/sounds/90minClass/17.mp3")
        },
        {
          key: "17",
          title: "18 Standing Forward Bend",
          sound: require("../assets/sounds/90minClass/18.mp3")
        },
        {
          key: "18",
          title: "19 Triangle",
          sound: require("../assets/sounds/90minClass/19.mp3")
        },
        {
          key: "19",
          title: "20 Final Relaxation",
          sound: require("../assets/sounds/90minClass/20.mp3")
        },
        {
          key: "20",
          title: "21 Final Prayer",
          sound: require("../assets/sounds/90minClass/21.mp3")
        }
      ];
    } else if (this.currentClass == 60) {
      //track is 62 min long
      this.asanaArray = [
        {
          key: "0",
          title: "01 Starting Prayer",
          sound: require("../assets/sounds/90minClass/01.mp3")
        },
        {
          key: "1",
          title: "02 Surya Namaskar",
          sound: require("../assets/sounds/90minClass/04.mp3")
        },
        {
          key: "2",
          title: "03 Headstand",
          sound: require("../assets/sounds/90minClass/07.mp3")
        },
        {
          key: "3",
          title: "04 Shoulderstand",
          sound: require("../assets/sounds/90minClass/08.mp3")
        },
        {
          key: "4",
          title: "05 Plough",
          sound: require("../assets/sounds/90minClass/09.mp3")
        },
        {
          key: "5",
          title: "06 Fish",
          sound: require("../assets/sounds/90minClass/10.mp3")
        },
        {
          key: "6",
          title: "07 Sitting Forward Bend",
          sound: require("../assets/sounds/90minClass/11.mp3")
        },
        {
          key: "7",
          title: "08 Inclined Plane",
          sound: require("../assets/sounds/90minClass/12.mp3")
        },
        {
          key: "8",
          title: "09 Cobra",
          sound: require("../assets/sounds/90minClass/13.mp3")
        },
        {
          key: "9",
          title: "10 Locust",
          sound: require("../assets/sounds/90minClass/14.mp3")
        },
        {
          key: "10",
          title: "11 Bow",
          sound: require("../assets/sounds/90minClass/15.mp3")
        },
        {
          key: "11",
          title: "12 Half Spinal Twist",
          sound: require("../assets/sounds/90minClass/16.mp3")
        },
        {
          key: "12",
          title: "13 Triangle",
          sound: require("../assets/sounds/90minClass/19.mp3")
        },
        {
          key: "13",
          title: "14 Final Relaxation",
          sound: require("../assets/sounds/90minClass/20.mp3")
        },
        {
          key: "14",
          title: "15 Final Prayer",
          sound: require("../assets/sounds/90minClass/21.mp3")
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
    this.soundObject.stopAsync().then().catch(this.failureCallback);;
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
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();
  }

  asanaClicked(item) {
    this.jumpToAsana(item.key);
  }
  async jumpToAsana(rowNumber) {
    if (this.currentAsanaRow == -1) {
    } else {
    }
    await this.soundObject
      .stopAsync()
      .then()
      .catch(this.failureCallback);
    this.currentAsanaRow = rowNumber;
    this.asanaArray.forEach(element => {
      element.isSelected = false;
    });

    this.asanaArray[rowNumber].isSelected = true;
    await this.playAsanaSound();

    this.setState({ started: true });

    this.setState({ arrayHolder: [...this.asanaArray] });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeepAwake />

        <View style={styles.headerView}>{this.renderStartPauseButton()}</View>
        <ScrollView style={styles.container}>
          {/* <View style={styles.imageView}>{this.renderImage()}</View> */}
          <FlatList
            data={this.state.arrayHolder}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </ScrollView>
      </View>
    );
  }

  renderStartPauseButton() {
    let text = "Start";
    if (this.state.started) {
      text = "Pause";
    }
    return (
      <TouchableOpacity
        onPress={() => this.startPause()}
        style={styles.headerButton}
      >
        <Text style={styles.headerButtonButtonText}>{text}</Text>
      </TouchableOpacity>
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
        <Text style={styles.customClassRow}>{item.title}</Text>
      </TouchableOpacity>
      
    );
  };
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  },
  customClassRow: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 18
  },
  rowDescription: {
    marginLeft: 40,
    marginBottom: 5,
    fontSize: 12
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textHeaderView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  headerButtonButtonText: {
    textAlign: "center"
  },
  headerButton: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "powderblue",
    padding: 10,
    margin: 10
  }
});
