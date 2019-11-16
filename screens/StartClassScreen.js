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

var globalStyle = require("../style");
import * as FileSystem from 'expo-file-system'

import { Audio } from 'expo-av'

import IntervalTimer from "../IntervalTimer";
import toHHMMSS from "../Tools"; //toHHMMSS is used
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

export default class StartClassScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.key}`,
    tabBarVisible: false
    //title: "uncomment" //`${navigation.state.params.item.key}`
  });

  constructor(props) {
    super(props);

    //this is used to make sure that multiple sound button presses don't happen if the sound functions are running
    this.buttomComplete = true;

    this.savedClassesKey = "SivanandaSavedClasses";
    this.soundObject = new Audio.Sound();
    this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);

    this.activeAsanaTimer = null;
    this.counterTimer = new IntervalTimer("Counter", this.tick, 1000, null);

    this.currentClass = this.props.navigation.getParam("item", "");
    //

    this.savedClassName = this.currentClass.key;
    this.asanaArray = this.currentClass.item;

    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      //for when the app goes from the edit screen to this screen reload the new data
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
  
  componentDidMount() {
    activateKeepAwake();
  }
  componentWillUnmount() {
    //the sound automically stops if the screen closes
    //the sound needs to be stopped when the user leaves the screen
    if (this.activeAsanaTimer != null) {
      this.activeAsanaTimer.stop();
    }

    this.soundObject
      .stopAsync()
      .then()
      .catch(this.failureCallback);
    deactivateKeepAwake();
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    const { didJustFinish, isLoaded, positionMillis } = playbackStatus;

    if (isLoaded) {
      if (didJustFinish) {
        if (this.currentAsanaRow == this.asanaArray.length - 1) {
          this.counterTimer.pause();
        }
        console.log("didJustFinish");
        this.nextAsana();
      }
    }
  };

  _retrieveData = async () => {
    try {
      //gets a list of all the saved classes
      const value = await AsyncStorage.getItem(this.savedClassesKey);
      if (value !== null) {
        this.allClasses = JSON.parse(value);
        this.allClasses.forEach(element => {
          //select the class we want
          if (element.key == this.savedClassName) {
            this.asanaArray = element.item;
          }
        });

        this.setArrayState();
      }
    } catch (error) {
      console.log("load error: " + error);
    }
  };

  setArrayState() {
    //store the index in each item, this is used when we need to jump to an asana
    for (let i = 0; i < this.asanaArray.length; i++) {
      this.asanaArray[i].rowNumber = i.toString();
    }

    this.setState({ arrayHolder: [...this.asanaArray] });
  }

  failureCallback(result) {
    console.log("failureCallback " + result);
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

  startPause() {
    if (this.state.started) {
      this.pauseAsanas();
    } else {
      this.startAsanas();
    }
  }
  async startAsanas() {
    this.setState({ started: true });
    //the practice is being started for the first time
    if (this.currentAsanaRow == -1) {
      //start the timers
      this.counterTimer.start();

      this.currentAsanaRow++;
      console.log("startAsanas currentAsanaRow" + this.currentAsanaRow);

      this.playAsanaSound();
    } else {
      //resume from the last asana and time
      await this.soundObject.playAsync();
      if (this.activeAsanaTimer != null) {
        this.activeAsanaTimer.resume();
      }
      this.counterTimer.resume();
    }

    //highlight the exercise
    this.asanaArray.forEach(element => {
      element.isSelected = false;
    });
    this.asanaArray[this.currentAsanaRow].isSelected = true;
    this.setArrayState();
  }

  //Each asana/exercise has one sound file
  //The code will jump through the file to play it so that the timings works

  async playAsanaSound() {
    console.log(
      "playAsanaSound " + this.asanaArray[this.currentAsanaRow].title
    );
    if (this.asanaArray[this.currentAsanaRow].title == "Opening Prayer") {
      await this.playOpeningPrayer();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Kapalabhati") {
      await this.playKapalabhati();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Anuloma Viloma"
    ) {
      await this.playAnulomaViloma();
    } else if (
      (await this.asanaArray[this.currentAsanaRow].title) == "Surya Namaskar"
    ) {
      await this.playSuryaNamaskar();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Single Leg Raises"
    ) {
      await this.playSingleLegRaises();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Double Leg Raises"
    ) {
      console.log("playAsanaSound playDoubleLegRaises");
      await this.playDoubleLegRaises();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Sirshasana") {
      await this.playSirshasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Sarvangasana") {
      await this.playSarvangasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Halasana") {
      await this.playHalasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Matsyasana") {
      await this.playMatsyasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Paschimothanasana"
    ) {
      await this.playPaschimothanasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Inclined Plane"
    ) {
      await this.playInclinedPlane();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Bhujangasana") {
      await this.playBhujangasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Salabhasana") {
      await this.playSalabhasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Dhanurasana") {
      await this.playDhanurasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Ardha Matsyendrasana"
    ) {
      await this.playArdhaMatsyendrasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Kakasana-Mayurasana"
    ) {
      await this.playKakasana();
    } else if (
      this.asanaArray[this.currentAsanaRow].title == "Pada Hasthasana"
    ) {
      await this.playPadaHasthasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Trikonasana") {
      await this.playTrikonasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Savasana") {
      await this.playSavasana();
    } else if (this.asanaArray[this.currentAsanaRow].title == "Final Prayer") {
      await this.playFinalPrayer();
    }
  }

  async playOpeningPrayer() {
    await this.soundObject.unloadAsync();

    let soundAsset = {
      uri: FileSystem.documentDirectory + "OpeningPrayer.mp3"
    };

    await this.soundObject.loadAsync(soundAsset); //uri: Expo.FileSystem.documentDirectory+filename
    await this.soundObject.playAsync();
    await this.soundObject.setProgressUpdateIntervalAsync(50);

    //dev
    //await this.soundObject.setPositionAsync(195000);
    return 1;
  }
  //#region kapalabhati
  async playKapalabhati() {
    await this.soundObject.unloadAsync();

    let soundAsset = { uri: FileSystem.documentDirectory + "Kapalabhati.mp3" };
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();
    //await this.soundObject.setProgressUpdateIntervalAsync(50);
    this.soundObject.setIsLoopingAsync(true);
    let jumpTime = 45000
    await this.soundObject.setPositionAsync(jumpTime);
    //return;

    this.kaPumpResetPoint = 55882;
    this.kaIntroDuration = 48183 - jumpTime;
    this.kaRoundsPassed = 0;

    //after the intro has finished
    this.kaIntroFinishTimer = new IntervalTimer(
      "kaIntroFinish",
      () => {
        this.kaIntroFinish();
      },
      this.kaIntroDuration,
      1
    );
    this.kaIntroFinishTimer.start();
    this.activeAsanaTimer = this.kaIntroFinishTimer;
  }
  async kaIntroFinish() {
    let actionsPerRound = this.asanaArray[this.currentAsanaRow].actionsPerRound;
    console.log("kaIntroFinish " + actionsPerRound);
    let roundCounter = 0;
    this.numberOfPumps = actionsPerRound - 7; //6 pumps are played at the end of recording

    await this.soundObject.setPositionAsync(this.kaPumpResetPoint);
    this.repeatTimer = new IntervalTimer(
      "kaPumpRepeat",
      () => {
        if (roundCounter == this.numberOfPumps) {
          console.log("kaIntroFinishEnd roundCounter" + roundCounter);
          this.playEndOfPumping();
        } else {
          console.log("kaIntroFinish roundCounter" + roundCounter);
          this.playKaPump();
          roundCounter++;
        }
      },
      938,
      this.numberOfPumps + 1// 1 extra to play end of pumping
    );
    this.repeatTimer.start();
    this.activeAsanaTimer = this.repeatTimer;
  }

  async playKaPump() {
    try {
      await this.soundObject.setPositionAsync(this.kaPumpResetPoint);
    } catch (error) {}
  }
  async playEndOfPumping() {
    await this.soundObject.setPositionAsync(113000); //6 pumping is played after this
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
    this.activeAsanaTimer = this.endOfPumpingTimer;
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
      this.activeAsanaTimer = this.kaIntroFinishTimer;
    }
  }
  //#endregion
  //#region Anuloma Viloma
  async playAnulomaViloma() {
    //The file  AnulomaViloma-MasterFile has all the ratios in it,
    //the timings need to be adjusted.

    //the master file may need to be split so that the transition between asana is fast,
    //the sequence must begin with hold the right nostril and inhale from left,

    //round starts with inhale thru left, hold, then ex right, then in right, hold
    //round ends on exhale left
    let ratioPerRound = this.asanaArray[this.currentAsanaRow].ratioPerRound;
    let soundAsset = null;
    let roundStart = 0;
    let roundEnd = 0;
    let soundEnd = 0;

    if (ratioPerRound == 5) {
      soundAsset = {
        uri: FileSystem.documentDirectory + "AnulomaVilomaRatio5.mp3"
      };
      roundStart = 108000; //1m48000ms starts with thru left exhale
      roundEnd = 189000; //3m09500ms ends at right inhale, then end hold
      soundEnd = 189000; //starts with thru left exhale, but the last one then the end sequence is played
    } else if (ratioPerRound == 6) {
      soundAsset = {
        uri: FileSystem.documentDirectory + "AnulomaVilomaRatio6.mp3"
      };
      roundStart = 117817; //1m57817
      roundEnd = 208766; //3m28766
      soundEnd = 208766;
    } else if (ratioPerRound == 7) {
      soundAsset = {
        uri: FileSystem.documentDirectory + "AnulomaVilomaRatio7.mp3"
      };
      roundStart = 133614; //2m13614
      roundEnd = 243770; //4m03770
      soundEnd = 243770;
    } else if (ratioPerRound == 8) {
      soundAsset = {
        uri: FileSystem.documentDirectory + "AnulomaVilomaRatio8.mp3"
      };
      roundStart = 145400; //2m25400
      roundEnd = 269250; //4m29250
      soundEnd = 269250;
    } else {
      soundAsset = { uri: FileSystem.documentDirectory + "AnulomaViloma.mp3" };
      roundStart = 94500; //starts with thru left exhale
      roundEnd = 153500; //2m33500ms ends at right inhale, then end hold
      soundEnd = 505700; //8m25700ms starts with thru left exhale, but the last one then the end sequence is played
    }

    await this.playRoundTimer(soundAsset, roundStart, roundEnd, soundEnd);
  }

  async playRoundTimer(soundAsset, roundStart, roundEnd, soundEnd) {
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();

    this.dlrIntro = new IntervalTimer(
      "roundTimer",
      () => {
        this.playRoundRepeater(roundStart, roundEnd, soundEnd);
      },
      roundStart,
      1
    );
    this.dlrIntro.start();
    this.activeAsanaTimer = this.dlrIntro;
  }

  async playRoundRepeater(roundStart, roundEnd, soundEnd) {
    let rounds = this.asanaArray[this.currentAsanaRow].rounds;
    let roundCounter = 0;
    let waitTime = roundEnd - roundStart;

    this.repeatTimer = new IntervalTimer(
      "repeatTimer",
      () => {
        if (roundCounter == rounds - 2) {
          //console.log("repeatTimer roundCounterEnd "+ (rounds - 2) +"=?"+ roundCounter);
          this.soundSetPosition(soundEnd);
        } else {
          //console.log("repeatTimer roundCounter " + roundCounter);
          this.soundSetPosition(roundStart);
          roundCounter++;
        }
      },
      waitTime,
      rounds - 1 // 1 extra to play end, -2 cause one already played
    );
    this.repeatTimer.start();
    this.activeAsanaTimer = this.repeatTimer;
  }
  async soundSetPosition(position) {
    await this.soundObject.setPositionAsync(position);
  }
  //#endregion
  async playSuryaNamaskar() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "SuryaNamaskar.mp3"
    };
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();

    //one round is completed by 3m04s
    //3m04s, 184000ms the inhale arms up begin, right leg
    //4m30s800mss, 270800ms, exhale to end left leg

    //8m31s500ms, 511500ms, end instructions start

    //await this.soundObject.setPositionAsync(183000);
    //wait to repeat rounds
    this.snamIntroTimer = new IntervalTimer(
      "snamIntroTimer",
      () => {
        this.playSuryaNamaskarRounds();
      },
      184000,
      1
    );
    this.snamIntroTimer.start();
    this.activeAsanaTimer = this.snamIntroTimer;
  }
  async playSuryaNamaskarRounds() {
    let roundLength = 270800 - 184000; //86800
    let rounds = this.asanaArray[this.currentAsanaRow].rounds;
    let roundCounter = 0;
    //after the intro and first round has finished, first round is slower
    this.snamRepeatTimer = new IntervalTimer(
      "suryaNamaskarRounds",
      () => {
        if (roundCounter == rounds - 2) {
          console.log(
            "suryaNamaskarRounds roundCounterEnd " +
              (rounds - 2) +
              "=?" +
              roundCounter
          );
          this.playEndOfSuryaNamaskarRounds();
        } else {
          console.log("suryaNamaskarRounds roundCounter " + roundCounter);
          this.playSuryaNamaskarSingleRound();
          roundCounter++;
        }
      },
      roundLength,
      rounds - 1 // -2 cause two round already played, 1 extra to play end sequnce
    );
    this.snamRepeatTimer.start();
    this.activeAsanaTimer = this.snamRepeatTimer;
  }
  async playSuryaNamaskarSingleRound() {
    await this.soundObject.setPositionAsync(184000);
  }
  async playEndOfSuryaNamaskarRounds() {
    await this.soundObject.setPositionAsync(511500); //8m31s500ms
  }
  async playSingleLegRaises() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "SingleLegRaises.mp3"
    };

    let roundStart = 63769; //right leg up
    let roundEnd = 81073; //left down
    let endTime = 160802;

    await this.playRoundTimer(soundAsset, roundStart, roundEnd, endTime);
  }
  async playDoubleLegRaises() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "DoubleLegRaises.mp3"
    };

    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();

    //the first dlr ends at 35293
    //the minimum number of raises is 3 which end at 52316
    //52316 - 60131 is a clean cycle for a dlr
    //66845 is the final dlr then play till end

    let introEnd = 35293;
    let roundStart = 52316;
    let roundEnd = 60131;
    let endingStart = 66845;

    this.dlrIntro = new IntervalTimer(
      "dlrIntro",
      () => {
        this.playdlrRoundRepeater(introEnd, roundStart, roundEnd, endingStart);
      },
      introEnd,
      1
    );
    this.dlrIntro.start();
    this.activeAsanaTimer = this.dlrIntro;
  }
  async playdlrRoundRepeater(introEnd, roundStart, roundEnd, endingStart) {
    let rounds = this.asanaArray[this.currentAsanaRow].rounds;
    let roundCounter = 0;
    let waitTime = roundEnd - roundStart;

    this.soundObject.setPositionAsync(roundStart);
    this.repeatTimer = new IntervalTimer(
      "repeatTimer",
      () => {
        if (roundCounter == rounds - 2) {
          //console.log("repeatTimer roundCounterEnd "+ (rounds - 2) +"=?"+ roundCounter);
          this.soundSetPosition(endingStart);
        } else {
          //console.log("repeatTimer roundCounter " + roundCounter);
          this.soundSetPosition(roundStart);
          roundCounter++;
        }
      },
      waitTime,
      rounds - 1 // 1 extra to play end, -2 cause one already played
    );
    this.repeatTimer.start();
    this.activeAsanaTimer = this.repeatTimer;
  }
  async startSoundAndTimers(
    soundAsset,
    postureHoldStartTime,
    silenceStartTime,
    postureEndTime
  ) {
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();

    this.postureIntroTimer = new IntervalTimer(
      "postureIntroTimer",
      () => {
        this.postureHold(silenceStartTime, postureEndTime);
      },
      postureHoldStartTime,
      1
    );
    //console.log(postureHoldStartTime)
    this.postureIntroTimer.start();
    this.activeAsanaTimer = this.postureIntroTimer;
  }
  postureHold(silenceStartTime, postureEndTime) {
    let holdTime = this.asanaArray[this.currentAsanaRow].holdTime;
    let holdCount = holdTime / 5; //the timer will loop 5 secs of silence
    let holdCounter = 0;
    //console.log("postureHold")
    this.soundObject.setPositionAsync(silenceStartTime);
    this.postureTimer = new IntervalTimer(
      "postureTimer",
      () => {
        if (holdCounter == holdCount - 1) {
          //console.log(holdCounter + "/Final " + holdCount)
          this.soundObject.setPositionAsync(postureEndTime);
        } else {
          //console.log(holdCounter + "/" + holdCount)
          this.soundObject.setPositionAsync(silenceStartTime);
          holdCounter++;
        }
      },
      5000, //silence is counted in intervals of 5 secs
      holdCount // -1 cause 5sec round already played, 1 extra to play end sequnce
    );
    this.postureTimer.start();
    this.activeAsanaTimer = this.postureTimer;
  }
  async playSirshasana() {
    let soundAsset = { uri: FileSystem.documentDirectory + "Sirshasana.mp3" };
    // posture hold starts 2:02:500, 122500
    // silence starts 3:17, 197000ms
    // posture ends at 5:50, 350000ms
    this.startSoundAndTimers(soundAsset, 122500, 197000, 350000);
  }

  async playSarvangasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Sarvangasana.mp3"
    };
    //posture hold and silence starts 1:32:500, 92500 ms
    //posture ends at 4:30, 270000 ms
    this.startSoundAndTimers(soundAsset, 92500, 92500, 270000);
  }
  async playHalasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Halasana.mp3"
    };
    //posture hold starts 0:44, 44000 ms
    //silence starts 1:05, 65000 ms
    //posture ends at 2:16:500, 134000 ms
    this.startSoundAndTimers(soundAsset, 44000, 65000, 134000);
  }
  async playMatsyasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Matsyasana.mp3"
    };
    //posture hold starts 0:55, 55000 ms
    //silence at 1:30, 90000 ms
    //posture ends at 2:16:500, 136500 ms
    this.startSoundAndTimers(soundAsset, 55000, 90000, 136500);
  }
  async playPaschimothanasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Paschimothanasana.mp3"
    };
    //posture hold starts 1:17, 77000 ms
    //silence at 2:00, 120000 ms
    //posture ends at 4:13:000, 253000 ms
    this.startSoundAndTimers(soundAsset, 77000, 120000, 253000);
  }
  async playInclinedPlane() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "InclinedPlane.mp3"
    };
    //posture hold starts 0:21, 21000 ms
    //silence at 0:30, 30000 ms
    //posture ends at 1:06:000, 66000 ms
    this.startSoundAndTimers(soundAsset, 21000, 30000, 66000);
  }
  async playBhujangasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Bhujangasana.mp3"
    };
    //posture hold starts 36300 ms
    //silence at 60000 ms
    //posture ends at 1:27:500, 87500 ms
    this.startSoundAndTimers(soundAsset, 36300, 60000, 87500);
  }
  async playSalabhasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Salabhasana.mp3"
    };
    //posture hold starts 76879 ms
    //silence at 93292 ms
    //posture ends at 98259 ms
    this.startSoundAndTimers(soundAsset, 76879, 93292, 98259);
  }
  async playDhanurasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Dhanurasana.mp3"
    };
    //posture hold starts 39358 ms
    //silence at 116000 ms
    //posture ends at 69948 ms
    this.startSoundAndTimers(soundAsset, 39358, 116000, 69948);
  }
  async playArdhaMatsyendrasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "ArdhaMatsyendrasana.mp3"
    };
    //posture hold right start 40000 ms
    //silence at 103809 ms
    //right end left start at 120000 ms
    //left end at 182500
    let postureRightHoldStartTime = 40000;
    let silenceStartTime = 103809;
    let rightEndLeftStart = 120000;
    let leftPostureEndTime = 182500;

    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();

    //this.soundObject.setPositionAsync(120500);
    //postureHoldStartTime = 2000;

    this.postureIntroTimer = new IntervalTimer(
      "postureIntroTimer",
      () => {
        this.ArdhaMatsyendrasanaRightHold(silenceStartTime, rightEndLeftStart);
      },
      silenceStartTime,
      1
    );
    //console.log(postureHoldStartTime)
    this.postureIntroTimer.start();
    this.activeAsanaTimer = this.postureIntroTimer;
  }

  ArdhaMatsyendrasanaRightHold(silenceStartTime) {
    let holdTime = this.asanaArray[this.currentAsanaRow].holdTime;
    let holdCount = holdTime / 5; //the timer will loop 5 secs of silence
    let holdCounter = 0;
    //console.log("ArdhaMatsyendrasanaRightHold");
    this.soundObject.setPositionAsync(silenceStartTime);
    this.postureTimer = new IntervalTimer(
      "postureTimer",
      () => {
        if (holdCounter == holdCount - 1) {
          //console.log(holdCounter + "/Final " + holdCount)
          this.ArdhaMatsyendrasanaLeftStart();
        } else {
          //console.log(holdCounter + "/" + holdCount)
          this.soundObject.setPositionAsync(silenceStartTime);
          holdCounter++;
        }
      },
      5000, //silence is counted in intervals of 5 secs
      holdCount // -1 cause 5sec round already played, 1 extra to play end sequnce
    );
    this.postureTimer.start();
    this.activeAsanaTimer = this.postureTimer;
  }
  async ArdhaMatsyendrasanaLeftStart() {
    //left posture is starting

    //console.log("ArdhaMatsyendrasanaLeftStart");
    let silenceStartTime = 103809;
    let rightEndLeftStart = 120000;
    let leftPostureEndTime = 172000;
    let postureEndSequenceTime = 182500;
    let waitTime = leftPostureEndTime - rightEndLeftStart;
    this.soundObject.setPositionAsync(rightEndLeftStart);

    this.postureIntroTimer = new IntervalTimer(
      "postureIntroTimer",
      () => {
        this.postureHold(silenceStartTime, postureEndSequenceTime);
      },
      waitTime,
      1
    );
    //console.log(postureHoldStartTime)
    this.postureIntroTimer.start();
    this.activeAsanaTimer = this.postureIntroTimer;
  }
  async playKakasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Kakasana.mp3"
    };
    //posture hold starts 34500 ms
    //silence at 50000 ms
    //posture ends at 59000 ms
    this.startSoundAndTimers(soundAsset, 34500, 50000, 59000);
  }
  async playPadaHasthasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "PadaHasthasana.mp3"
    };
    //posture hold starts 40000 ms
    //silence at 76000 ms
    //posture ends at 85000 ms
    this.startSoundAndTimers(soundAsset, 40000, 76000, 85000);
  }
  async playTrikonasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Trikonasana.mp3"
    };
    let postureRightHoldStartTime = 55000;
    let silenceStartTime = 120000;

    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();

    this.postureIntroTimer = new IntervalTimer(
      "postureIntroTimer",
      () => {
        this.trikonanasaRightHold(silenceStartTime);
      },
      postureRightHoldStartTime,
      1
    );
    this.postureIntroTimer.start();
    this.activeAsanaTimer = this.postureIntroTimer;
  }

  trikonanasaRightHold(silenceStartTime) {
    let holdTime = this.asanaArray[this.currentAsanaRow].holdTime;
    let holdCount = holdTime / 5; //the timer will loop 5 secs of silence
    let holdCounter = 0;
    this.soundObject.setPositionAsync(silenceStartTime);
    this.postureTimer = new IntervalTimer(
      "postureTimer",
      () => {
        if (holdCounter == holdCount - 1) {
          this.triconasanaLeftStart();
        } else {
          this.soundObject.setPositionAsync(silenceStartTime);
          holdCounter++;
        }
      },
      5000, //silence is counted in intervals of 5 secs
      holdCount // -1 cause 5sec round already played, 1 extra to play end sequnce
    );
    this.postureTimer.start();
    this.activeAsanaTimer = this.postureTimer;
  }
  triconasanaLeftStart() {
    let silenceStartTime = 120000;
    let rightEndLeftStart = 86000;
    let leftPostureEndTime = 109500;
    let postureEndSequenceTime = 119500;
    let waitTime = leftPostureEndTime - rightEndLeftStart;
    this.soundObject.setPositionAsync(rightEndLeftStart);

    this.postureIntroTimer = new IntervalTimer(
      "postureIntroTimer",
      () => {
        this.postureHold(silenceStartTime, postureEndSequenceTime);
      },
      waitTime,
      1
    );
    //console.log(postureHoldStartTime)
    this.postureIntroTimer.start();
    this.activeAsanaTimer = this.postureIntroTimer;
  }
  async playSavasana() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "Savasana.mp3"
    };
    // await this.soundObject.unloadAsync();
    // await this.soundObject.loadAsync(soundAsset);
    // await this.soundObject.playAsync();

    //posture hold starts 480000 ms
    //silence at 480000 ms
    //posture ends at 535000 ms
    this.startSoundAndTimers(soundAsset, 480000, 480000, 535000);
  }
  async playFinalPrayer() {
    let soundAsset = {
      uri: FileSystem.documentDirectory + "FinalPrayer.mp3"
    };
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(soundAsset);
    await this.soundObject.playAsync();
  }

  nextAsana() {
    if (this.currentAsanaRow < this.asanaArray.length - 1) {
      //highlight next row
      this.asanaArray[this.currentAsanaRow++].isSelected = false;
      this.asanaArray[this.currentAsanaRow].isSelected = true;
      this.playAsanaSound()
        .then()
        .catch(this.failureCallback);
      this.setArrayState();
    }
  }
  editClass = async () => {
    //await this.foo();

    if (this.activeAsanaTimer != null) {
      this.activeAsanaTimer.stop();
    }

    this.soundObject
      .stopAsync()
      .then()
      .catch(this.failureCallback);

    this.props.navigation.navigate("EditClassScreen", {
      key: this.currentClass.key
    });
  };

  // async foo() {
  //   let promise = new Promise((resolve, reject) => {
  //     setTimeout(() => resolve("done!"), 1000);
  //   });
  //   let result = await promise; // wait till the promise resolves (*)
  //   console.log(result); // "done!"
  // }
  asanaClicked(item) {
    this.jumpToAsana(item.rowNumber);
  }
  async jumpToAsana(rowNumber) {
    // this.flatListRef.scrollToIndex({
    //   animated: true,
    //   index:  rowNumber,
    //   viewPosition: 0
    // });

    //console.log("jump to asana start");
    if (this.buttomComplete) {
      if (this.currentAsanaRow == -1) {
        this.counterTimer.start();
      } else {
        this.counterTimer.resume();
      }
      this.buttomComplete = false;
      if (this.activeAsanaTimer != null) {
        this.activeAsanaTimer.stop();
      }

      //console.log("jumpToAsana " + rowNumber + "/" + this.asanaArray.length);
      this.currentAsanaRow = rowNumber;
      this.asanaArray.forEach(element => {
        element.isSelected = false;
      });

      this.asanaArray[rowNumber].isSelected = true;

      this.setArrayState();

      this.setState({ started: true });
      this.buttomComplete = true;

      //let indexToScroll =;

      // if (this.currentAsanaRow == this.asanaArray.length - 1) {
      //   console.log("jumpToAsana jumptoEnd");

      //   this.flatListRef.scrollToEnd(true);
      // } else {
      //

      //}
      await this.soundObject
        .stopAsync()
        .then()
        .catch(this.failureCallback);
      await this.playAsanaSound();
    }
  }

  pauseAsanas() {
    this.counterTimer.pause();
    this.pauseSound();
    this.setState({ started: false });
  }

  tick = () => {
    if (this.state.counter >= this.state.totalTime) {
      clearTimeout(this.state.timer);
      this.setState({
        started: false
      });
    }
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    return (
      <View style={globalStyle.mainContainer}>
        <View style={[globalStyle.sectionContainer, globalStyle.buttonRow]}>
          {this.renderStartPauseButton()}
          <View style={styles.textHeaderView}>
            <Text style={styles.elapsedTimeText}>Elapsed Time</Text>
            <Text style={styles.elapsedTimeText}>
              {this.state.counter.toString().toHHMMSS()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.editClass()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={globalStyle.sectionContainer}>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            keyExtractor={(item, index) => item.rowNumber}
            initialScrollIndex={0}
            data={this.state.arrayHolder}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </ScrollView>
      </View>
    );
  }
  renderImage() {
    let image = require("../assets/images/IconSivananda.png");

    if (this.currentAsanaRow >= 0) {
      image = this.asanaArray[this.currentAsanaRow].image_url;
    }
    return <Image style={styles.image} source={image} />;
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
    let description = "";

    if (item.title == "Opening Prayer") {
      if (item.isSelected) {
        description =
          "Gajananam Bhutagaanadi Sevitam\nKapittha Jambu Phala Saara Bhakshakam\nUma Sutam Shokavinaasha Kaaranam\nNamaami Vigneshvara Paada Pankajam\n\nShadananam Kumkuma Raktavarnam\nMahaamatim Divya Mayura Vaahanam\nRudrasya Sunam Surasainya Natham\nGuhaam Sadaaham Sharanam Prapadye\n\nYaa Kundendu Tushaara Haara Dhavalaa\nYaa Shubhra Vastraavritaa\nYaa Vina Varadanda Mantita Karaa\nYaa Shvetaa Padmaasanaa\nYaa Brahmaachyuta Shankara Prabhritibhi\nDevaihi Sadaa Pujitaa\nSaa Maam Paatu Saraswati Bhagavati\nNishesha Jaadyaapahaa\n\nOm Namah Shivaaya Gurave\nSat-chit-ananda Murtaye\nNishprapanchaaya Shaantaaya\nSri Sivanandaya Te Namaha\nSri Vishnudevanandaya Te Namaha\n\nOm Sarve Mangala Mangalye\nShive Sarvartha Sadhike\nSharanye Trayambake Gauri\nNaaraayani Namostute\nNaaraayani Namostute\n\nOm Shanti, Shanti, Shanti";
      }
    } else if (item.title == "Final Prayer") {
      if (item.isSelected) {
        description =
          "Om Tryambakam Yajamahe\nSugandhim Pushtivardhanam\nUrvarukamiva Bandhanan\nMrityor Mukshiya Maamritat (repeat 3 times)\n\nOm Sarvesham Svastir Bhavatu\nSarvesham Shantir Bhavatu\nSarvesham Purnam Bhavatu\nSarvesham Mangalam Bhavatu\n\nSarve Bhavantu Sukhinah\nSarve Santu Niramayaah\nSarve Bhadrani Pasyantu\nMa Kaschid-Dukha-Bhag-Bhavet\n\nAsato Ma Sat Gamaya\nTamaso Ma Jyotir Gamaya\nMrityor Mamritam Gamaya\n\nOm Purnamadah Purnamidam\nPurnat Purnamudachyate\nPurnasya Purnamadaya\nPurnameva Vashishyate\n\nOm Shantih Shantih Shantih\nOm Peace Peace Peace\n\n";
      }
    } else if (item.title == "Savasana") {
      description = "Tension release and guided relaxation followed by rest for " + item.holdTime + " seconds ";
    } else if (item.title == "Kapalabhati") {
      description =
        item.rounds +
        " rounds of " +
        item.actionsPerRound +
        " pumpings and " +
        item.retentionLength +
        " sec retention";
    } else if (item.title == "Anulom" || item.title == "Anuloma Viloma") {
      description =
        item.rounds + " rounds with count of " + item.ratioPerRound + " secs";
    } else if (item.title == "Surya Namaskar") {
      description = item.rounds + " rounds x 2";
    } else if (
      item.title == "Single Leg Raises" ||
      item.title == "Double Leg Raises"
    ) {
      description = item.rounds + " rounds";
    } else {
      description = "Hold for " + item.holdTime + " seconds ";
    }

    return (        
      <TouchableOpacity
        style={{ backgroundColor: color }}
        onPress={() => this.asanaClicked(item)}
      >
        <Text style={styles.customClassRow}>{item.title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>

        <View style={globalStyle.separator} />
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  elapsedTimeText: {
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  },
  customClassRow: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 18
  },
  rowDescription: {
    marginLeft: 40,
    marginBottom: 5,
    fontSize: 14
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  row: {
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
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold"
  },
  headerButton: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "#72c9ba",
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    margin: 10
  }
});
