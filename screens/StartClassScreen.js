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

export default class StartClassScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "uncomment" //`${navigation.state.params.item.key}`
  });

  constructor(props) {
    super(props);
    this.savedClassesKey = "SivanandaSavedClasses";
    this.soundObject = new Audio.Sound();

    this.currentClass = this.props.navigation.getParam("item", "");
    //for testing
    this.currentClass = {
      key: "tempName2",
      item: [
        // {
        //   key: "0",
        //   title: "Opening Prayer",
        //   description: "Opening Prayer",
        //   image_url: require("../assets/images/OpeningPrayer.jpg"),
        //   sound: require("../assets/sounds/1sec.mp3"),
        //   holdTime: 30,
        //   actionsPerRound: 35,
        //   retentionLength: 30,
        //   rounds: 6,
        //   ratioPerRound: 5
        // },
        {
          key: "1",
          title: "Kapalabhati",
          description: "Shining Skull Breath",
          image_url: require("../assets/images/Kapalabhati.jpg"),
          sound: require("../assets/sounds/Kapalabhati2.mp3"),
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 6,
          ratioPerRound: 5
        },
        {
          key: "2",
          title: "Anulom Viloma",
          description: "Alternate Nostril Breathing",
          image_url: require("../assets/images/AnulomViloma.jpg"),
          sound: require("../assets/sounds/3sec.mp3"),
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 15,
          ratioPerRound: 4
        },
        {
          key: "3",
          title: "Surya Namaskar",
          description: "Sun Salutations",
          image_url: require("../assets/images/SuryaNamaskar.jpg"),
          sound: require("../assets/sounds/4sec.mp3"),
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 20,
          ratioPerRound: 5
        },
        {
          key: "4",
          title: "Single Leg Raises",
          description: "Single Leg Raises",
          image_url: require("../assets/images/SingleLegRaises.jpg"),
          sound: require("../assets/sounds/5sec.mp3"),
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 20,
          ratioPerRound: 5
        }
      ]
    };

    this.savedClassName = this.currentClass.key;
    this.asanaArray = this.currentClass.item;
    this.setTimes();

    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this._retrieveData();
    });

    this.currentAsanaRow = -1;

    this.state = {
      arrayHolder: this.asanaArray,
      started: false,
      timer: null,
      counter: 0,
      totalTime: this.totalTime
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(this.savedClassesKey);
      //console.log(value);
      if (value !== null) {
        this.allClasses = JSON.parse(value);
        this.allClasses.forEach(element => {
          if (element.key == this.savedClassName) {
            //console.log("updated");
            this.asanaArray = element.item;
            this.setTimes();
          }
        });

        this.setState({ arrayHolder: [...this.asanaArray] });
      }
    } catch (error) {
      console.log("load error: " + error);
    }
  };

  async loadPlaySound(sound) {
    try {
      //if a sound was already loaded
      await this.soundObject.unloadAsync();
    } catch (error) {}
    try {
      await this.soundObject.loadAsync(sound);
      await this.soundObject.playAsync();
    } catch (error) {
      console.log("loadSound " + error);
    }
  }
  failureCallback(result) {
    console.log("failureCallback " + result);
  }

  async nextSound(sound) {
    try {
      await this.soundObject.unloadAsync();
      await this.soundObject.loadAsync(sound);
      await this.soundObject.playAsync();
    } catch (error) {
      console.log("nextSound " + error);
    }
  }
  // async playSound() {
  //   try {
  //     console.log("sound playing");
  //     // Your sound is playing!
  //   } catch (error) {
  //     // An error occurred!
  //     console.log(error);
  //   }
  // }
  async pauseSound() {
    try {
      //await console.log(this.soundObject.getStatusAsync());
      await this.soundObject.pauseAsync();
    } catch (error) {
      // An error occurred!
      console.log("pauseSound " + error);
    }
  }

  startPause() {
    if (this.state.started) {
      this.pauseAsanas();
    } else {
      this.startAsanas();
    }
  }
  startAsanas() {
    //start the timer
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });

    this.setState({ started: true });

    //the practice is being started for the first time
    if (this.currentAsanaRow == -1) {
      this.currentAsanaRow++;

      //highlight the exercise
      this.asanaArray.forEach(element => {
        element.isSelected = false;
      });
      this.asanaArray[this.currentAsanaRow].isSelected = true;
    } else {
      //resume from the last asana and time
    }
    if (this.asanaArray[this.currentAsanaRow].title == "Kapalabhati") {
      this.playKapalabhati();
    } else {
      this.loadPlaySound(this.asanaArray[this.currentAsanaRow].sound);
    }
    this.setState({ arrayHolder: [...this.asanaArray] });
  }
  async playKapalabhati() {
    let retentionLength = this.asanaArray[this.currentAsanaRow].retentionLength;
    let actionsPerRound = this.asanaArray[this.currentAsanaRow].actionsPerRound;
    let rounds = this.asanaArray[this.currentAsanaRow].rounds;

    await this.soundObject.unloadAsync();

    //the intro contains 7 pumps, the pump to retention has 3
    await this.soundObject.loadAsync(
      require("../assets/sounds/KapalabhatiIntro.mp3")
    ) .then(function(result) {
      let duration = result.durationMillis;
      await this.soundObject.playAsync();

      this.timeoutCheck = setTimeout(() => {
        this.setTimePassed();
        }, duration);

    })
    .catch(this.failureCallback);
    
    //this.soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    //await this.soundObject.unloadAsync();
  }

  async setTimePassed() {
    let duration = 0;
    await this.soundObject.unloadAsync();
    await this.soundObject
      .loadAsync(require("../assets/sounds/KapalabhatiPump.mp3"))
      .then(function(result) {
        duration = result.durationMillis;
      })
      .catch(this.failureCallback);
    
  }
  nextAsana() {
    //highlight next row
    this.asanaArray[this.currentAsanaRow++].isSelected = false;
    this.asanaArray[this.currentAsanaRow].isSelected = true;
    this.nextSound(this.asanaArray[this.currentAsanaRow].sound);
  }
  pauseAsanas() {
    clearTimeout(this.state.timer);
    this.pauseSound();
    this.setState({ started: false });
  }

  async setTimes() {
    this.totalTime = 0;
    let time = 0;

    for (i = 0; i < this.asanaArray.length; i++) {
      let element = this.asanaArray[i];

      element.isSelected = false;

      //TODO: add beginning and end time
      //console.log("setTime sound");
      let newSoundObject = new Audio.Sound();
      await newSoundObject.loadAsync(element.sound);
      await newSoundObject
        .getStatusAsync()
        .then(function(result) {
          //console.log("setTime getStatusAsync");
          let timeToAdd = result.durationMillis;
          time += timeToAdd;
          //console.log(timeToAdd + " " + time);
        })
        .catch(this.failureCallback);
      await newSoundObject.unloadAsync();

      //create a timestamp for when the posture should end
      this.totalTime = Math.floor(time / 1000);

      this.setState({ totalTime: this.totalTime });

      //console.log("total " + this.totalTime);
      element.endTimeStamp = this.totalTime;
    }
  }

  tick = () => {
    if (this.state.counter >= this.state.totalTime) {
      clearTimeout(this.state.timer);
      this.setState({
        started: false
      });
    } else if (
      this.state.counter >= this.asanaArray[this.currentAsanaRow].endTimeStamp
    ) {
      this.nextAsana();
      this.setState({ arrayHolder: [...this.asanaArray] });
    }

    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerView}>
          {this.renderStartPauseButton()}
          <View style={styles.textHeaderView}>
            <Text>Elapsed: {this.state.counter.toString().toHHMMSS()}</Text>
            <Text>Total: {this.state.totalTime.toString().toHHMMSS()}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.editClass()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {this.renderImage()}

        <FlatList
          data={this.state.arrayHolder}
          renderItem={({ item }) => this.renderItem(item)}
        />
        {/* <Text> {JSON.stringify(this.asanaArray)} </Text> */}

        <TouchableOpacity
          onPress={() => this.nextSound(this.asanaArray[2].sound)}
          style={styles.headerButton}
        >
          <Text style={styles.linkText}>Next</Text>
        </TouchableOpacity>
        {/* <Text> {this.soundObject.durationMillis} </Text> */}
      </ScrollView>
    );
  }
  renderImage() {
    let image = require("../assets/images/IconSivananda.png");

    if (this.currentAsanaRow >= 0) {
      image = this.asanaArray[this.currentAsanaRow].image_url;
    }
    return <Image style={{ width: 100, height: 100 }} source={image} />;
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
        onPress={() => this.exerciseClicked(item)}
      >
        <Text style={styles.customClassRow}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  exerciseClicked(item) {}

  editClass() {
    this.props.navigation.navigate("EditClassScreen", {
      key: this.currentClass.key
    });
  }
}

String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

const styles = StyleSheet.create({
  customClassRow: {
    margin: 10
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
