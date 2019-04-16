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

export default class StartClassScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "uncomment" //`${navigation.state.params.item.key}`
  });

  constructor(props) {
    super(props);
    this.savedClassesKey = "SivanandaSavedClasses";
    this.soundObject = new Audio.Sound();
    this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
    this.newTimer = new IntervalTimer("dipesh", () => {}, 1000, null);

    this.activeTimer = null;

    this.currentClass = this.props.navigation.getParam("item", "");
    //for testing
    this.currentClass = {
      key: "tempName2",
      item: [
        {
          key: "0",
          title: "Opening Prayer",
          description: "Opening Prayer",
          image_url: require("../assets/images/OpeningPrayer.jpg"),
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 6,
          ratioPerRound: 5
        },
        // {
        //   key: "1",
        //   title: "Kapalabhati",
        //   description: "Shining Skull Breath",
        //   image_url: require("../assets/images/Kapalabhati.jpg"),
        //   holdTime: 30,
        //   actionsPerRound: 5,
        //   retentionLength: 10,
        //   rounds: 1,
        //   ratioPerRound: 5
        // },
        // {
        //   key: "2",
        //   title: "Anulom Viloma",
        //   description: "Alternate Nostril Breathing",
        //   image_url: require("../assets/images/AnulomViloma.jpg"),
        //   holdTime: 30,
        //   actionsPerRound: 35,
        //   retentionLength: 30,
        //   rounds: 15,
        //   ratioPerRound: 4
        // },
        {
          key: "3",
          title: "Surya Namaskar",
          description: "Sun Salutations",
          image_url: require("../assets/images/SuryaNamaskar.jpg"),
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 5,
          ratioPerRound: 5
        },
        {
          key: "4",
          title: "Single Leg Raises",
          description: "Single Leg Raises",
          image_url: require("../assets/images/SingleLegRaises.jpg"),
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 6,
          ratioPerRound: 5
        }
      ]
    };

    this.savedClassName = this.currentClass.key;
    this.asanaArray = this.currentClass.item;

    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this._retrieveData();
    });

    this.currentAsanaRow = -1;

    this.state = {
      arrayHolder: this.asanaArray,
      started: false,
      timer: null,
      counter: 0,
      totalTime: 1000
    };
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    const { didJustFinish } = playbackStatus;

    if (didJustFinish) {
      //this.audioInstance.stopAsync();
      this.nextAsana();
    }
  };

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
            //this.setTimes();
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

  // async nextSound(sound) {
  //   try {
  //     await this.soundObject.unloadAsync();
  //     await this.soundObject.loadAsync(sound);
  //     await this.soundObject.playAsync();
  //   } catch (error) {
  //     console.log("nextSound " + error);
  //   }
  // }

  async playSound() {
    try {
      await this.soundObject.playAsync();
      console.log("sound playing");
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }
  async pauseSound() {
    try {
      //await console.log(this.soundObject.getStatusAsync());
      if (this.activeTimer != null) {
        this.activeTimer.pause();
      }
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
  async startAsanas() {
    this.setState({ started: true });
    let timer = setInterval(this.tick, 1000);

    //the practice is being started for the first time
    if (this.currentAsanaRow == -1) {
      //start the timer
      this.setState({ timer });

      this.currentAsanaRow++;
      this.playAsanaSound();

      // else {
      //   this.loadPlaySound(this.asanaArray[this.currentAsanaRow].sound);
      // }
    } else {
      //resume from the last asana and time
      await this.soundObject.playAsync();
      if (this.activeTimer != null) {
        this.activeTimer.resume();
      }
    }

    //highlight the exercise
    this.asanaArray.forEach(element => {
      element.isSelected = false;
    });
    this.asanaArray[this.currentAsanaRow].isSelected = true;

    this.setState({ arrayHolder: [...this.asanaArray] });
  }
  playAsanaSound() {
    if (this.asanaArray[this.currentAsanaRow].title == "Opening Prayer") {
      this.playOpeningPrayer();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Kapalabhati") {
      this.playKapalabhati();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Anulom Viloma") {
      this.playAnulomViloma();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Surya Namaskar"
    ) {
      this.playSuryaNamaskar();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Single Leg Raises"
    ) {
      this.playSingleLegRaises();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Double Leg Raises"
    ) {
      this.playDoubleLegRaises();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Sirshasana") {
      this.playSirshasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Sarvangasana") {
      this.playSarvangasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Halasana") {
      this.playHalasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Matsyasana") {
      this.playMatsyasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Paschimothanasana"
    ) {
      this.playPaschimothanasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "InclinedPlane") {
      this.playInclinedPlane();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Bhujangasana") {
      this.playBhujangasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Salabhasana") {
      this.playSalabhasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Dhanurasana") {
      this.playDhanurasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "ArdhaMatsyendrasana"
    ) {
      this.playArdhaMatsyendrasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Kakasana") {
      this.playKakasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "PadaHasthasana"
    ) {
      this.playPadaHasthasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Trikonasana") {
      this.playTrikonasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Savasana") {
      this.playSavasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "FinalPrayer") {
      this.playFinalPrayer();
    }
  }

  async playOpeningPrayer() {
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(
      require("../assets/sounds/OpeningPrayer2.mp3")
    );
    await this.soundObject.playAsync();

    //dev
    await this.soundObject.setPositionAsync(195000);
    //return;
  }
  //#region kapalabhati
  async playKapalabhati() {
    await this.soundObject.unloadAsync();

    await this.soundObject.loadAsync(
      require("../assets/sounds/Kapalabhati2.mp3")
    );
    await this.soundObject.playAsync();

    await this.soundObject.setPositionAsync(553000);
    return;

    this.kaPumpResetPoint = 55882;
    this.kaIntroDuration = 48000;
    this.kaRoundsPassed = 0;

    //after the intro has finished
    this.kaIntroFinishTimer = new IntervalTimer(
      "kaIntroFinish",
      () => {
        this.kaIntroFinish();
      },
      1000, //this.kaIntroDuration,
      1
    );
    this.kaIntroFinishTimer.start();
    this.activeTimer = this.kaIntroFinishTimer;
  }
  async kaIntroFinish() {
    let actionsPerRound = this.asanaArray[this.currentAsanaRow].actionsPerRound;

    this.roundCounter = 0;
    this.numberOfPumps = actionsPerRound - 2;
    console.log("kaIntroFinish ");

    await this.soundObject.setPositionAsync(this.kaPumpResetPoint);
    this.kaPumpRepeatTimer = new IntervalTimer(
      "kaPumpRepeat",
      () => {
        //console.log(this.pumpCounter);
        if (this.roundCounter == this.numberOfPumps) {
          this.playEndOfPumping();
        } else {
          this.playKaPump();
          this.roundCounter++;
        }
      },
      938,
      this.numberOfPumps + 1 // 1 extra to play end of pumping
    );
    this.kaPumpRepeatTimer.start();
    this.activeTimer = this.kaPumpRepeatTimer;
    //this.newTimer2.start();
  }
  async playKaPump() {
    try {
      await this.soundObject.setPositionAsync(this.kaPumpResetPoint);
    } catch (error) {}
  }
  async playEndOfPumping() {
    await this.soundObject.setPositionAsync(116000);
    let retentionLength = this.asanaArray[this.currentAsanaRow].retentionLength;

    //end of pumpings is at 1:56, 116000, there is two final pumping then instructions before breath hold
    //start of breath retention starts at 2:25:000, 145000ms
    //silence is at 3:06:000, 186000ms
    //silence ends at 3:36:000, 216000ms
    //min retention length is 45sec

    //145000 - 116000 = 29000 (time till breath hold)
    let waitTime = 29000 + retentionLength * 1000;
    console.log("waitTime " + waitTime);
    this.endOfPumpingTimer = new IntervalTimer(
      "endOfPumpingTimer",
      () => {
        this.playWaitAndEndOfRentention();
      },
      waitTime,
      1
    );
    this.endOfPumpingTimer.start();
    this.activeTimer = this.endOfPumpingTimer;
  }
  async playWaitAndEndOfRentention() {
    this.kaRoundsPassed++;
    console.log("endOfPumpingTimer round " + this.kaRoundsPassed);

    let rounds = this.asanaArray[this.currentAsanaRow].rounds;

    if (this.kaRoundsPassed == rounds) {
      //go to end
      //end breaths is at 8:57:000, 537000ms
      await this.soundObject.setPositionAsync(537000);

      //go to next sound to play...
    } else {
      //21500 is the first deep inhale before the pumps
      let deepInhaleTime = 21500;
      let waitTime = this.kaIntroDuration - deepInhaleTime;

      //go to the deep inhales before the pumpings
      await this.soundObject.setPositionAsync(deepInhaleTime);

      //wait till the recording reaches the pumping time wait this.kaIntroDuration
      //start the pump timer again
      this.kaIntroFinishTimer = new IntervalTimer(
        "kaIntroFinish",
        () => {
          this.kaIntroFinish();
        },
        waitTime, //1000,//this.kaIntroDuration,
        1
      );
      this.kaIntroFinishTimer.start();
      this.activeTimer = this.kaIntroFinishTimer;
    }
  }
  //#endregion
  //#region Anulom Viloma
  async playAnulomViloma() {
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(
      require("../assets/sounds/AnulomViloma2.mp3")
    );
    await this.soundObject.playAsync();

    //dev
    await this.soundObject.setPositionAsync(537000);
    // return;
  }
  //#endregion
  async playSuryaNamaskar() {
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(
      require("../assets/sounds/SuryaNamaskar2.mp3")
    );
    await this.soundObject.playAsync();

    let rounds = this.asanaArray[this.currentAsanaRow].rounds;

    //one round is completed by 3m04s
    //3m04s, 184000ms the inhale arms up begin, right leg
    //4m30s800mss, 270800ms, exhale to end left leg

    //8m31s500ms, 511500ms, end instructions start

    this.roundCounter = 0;

    //wait to repeat rounds
    this.snamIntroTimer = new IntervalTimer(
      "snamIntroFinish",
      () => {
        this.playSuryaNamaskarRounds();
      },
      184000, //1000,//this.kaIntroDuration,
      1
    );
    this.snamIntroTimer.start();
    this.activeTimer = this.snamIntroTimer;
  }
  async playSuryaNamaskarRounds() {
    let roundLength = 270800 - 184000; //86800

     //after the intro and first round has finished, first round is slower
     this.snamRepeatTimer = new IntervalTimer(
       "suryaNamaskarRounds",
       () => { 
         if (this.roundCounter == this.numberOfPumps) {
           console.log("playEndOfSuryaNamaskarRounds");
           this.playEndOfSuryaNamaskarRounds();
         } else {
           console.log("playSuryaNamaskarRound");
           this.playSuryaNamaskarSingleRound();
           this.roundCounter++;
         }
       },
       this.roundLength,
       rounds - 1// -2 cause two round already played, 1 extra to play end of pumping
     );
     this.snamRepeatTimer.start()
     this.activeTimer = this.snamRepeatTimer;
  }
  async playSuryaNamaskarSingleRound() {
    await this.soundObject.setPositionAsync(184000);
  }
  async playEndOfSuryaNamaskarRounds() {
    await this.soundObject.setPositionAsync(511500);
  }
  async playSingleLegRaises() {}
  async playDoubleLegRaises() {}
  async playSirshasana() {}
  async playSarvangasana() {}
  async playHalasana() {}
  async playMatsyasana() {}
  async playPaschimothanasana() {}
  async playInclinedPlane() {}
  async playBhujangasana() {}
  async playSalabhasana() {}
  async playDhanurasana() {}
  async playArdhaMatsyendrasana() {}
  async playKakasana() {}
  async playPadaHasthasana() {}
  async playTrikonasana() {}
  async playSavasana() {}
  async playFinalPrayer() {}

  nextAsana() {
    //highlight next row
    //console.log("next asana " + this.currentAsanaRow + " " +  this.asanaArray.length)
    if (this.currentAsanaRow + 1 < this.asanaArray.length) {
      this.asanaArray[this.currentAsanaRow++].isSelected = false;
      this.asanaArray[this.currentAsanaRow].isSelected = true;
      //this.nextSound(this.asanaArray[this.currentAsanaRow].sound);
      this.playAsanaSound();
      this.setState({ arrayHolder: [...this.asanaArray] });
    }
  }
  pauseAsanas() {
    clearTimeout(this.state.timer);
    this.pauseSound();
    this.setState({ started: false });
  }

  async setTimes() {
    // this.totalTime = 0;
    // let time = 0;

    // for (i = 0; i < this.asanaArray.length; i++) {
    //   let element = this.asanaArray[i];

    //   element.isSelected = false;

    //   let newSoundObject = new Audio.Sound();
    //   await newSoundObject.loadAsync(element.sound);
    //   await newSoundObject
    //     .getStatusAsync()
    //     .then(function(result) {
    //       let timeToAdd = result.durationMillis;
    //       time += timeToAdd;
    //     })
    //     .catch(this.failureCallback);
    //   await newSoundObject.unloadAsync();

    //   //create a timestamp for when the posture should end
    //   this.totalTime = Math.floor(time / 1000);

    //   this.setState({ totalTime: this.totalTime });

    //   element.endTimeStamp = this.totalTime;
    // }

    this.totalTime = Math.floor(1000);
    this.setState({ totalTime: 1000 });
  }

  tick = () => {
    if (this.state.counter >= this.state.totalTime) {
      clearTimeout(this.state.timer);
      this.setState({
        started: false
      });
    }
    // else if (
    //   this.state.counter >= this.asanaArray[this.currentAsanaRow].endTimeStamp
    // ) {
    //   this.nextAsana();
    //   this.setState({ arrayHolder: [...this.asanaArray] });
    // }

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
        {/* 
        <TouchableOpacity
          onPress={() => this.nextSound(this.asanaArray[2].sound)}
          style={styles.headerButton}
        >
          <Text style={styles.linkText}>Next</Text>
        </TouchableOpacity> */}
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
