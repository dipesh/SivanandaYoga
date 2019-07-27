import React from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Linking,
  View,
  AsyncStorage,
  Image
} from "react-native";
import {activateKeepAwake, deactivateKeepAwake}  from 'expo-keep-awake'
import * as FileSystem from 'expo-file-system'

let appjson = require("../app.json");

var globalStyle = require("../style");

export default class HowToScreen extends React.Component {
  static navigationOptions = {
    title: "Loading"
  };

  constructor(props) {
    super(props);

    this.savedFileDownloadStatusKey = "savedFileDownloadStatusKey";
    this.savedFileDownloadStatusArray = {
      version: ""
    };

    this.state = {
      loadingText: "",
      loading: true
    };

    this.file();
  }
  componentDidMount() {
    activateKeepAwake();
  }
  componentWillUnmount(){
    deactivateKeepAwake(); 
  }
  
  async file() {
    //for testing
    //await AsyncStorage.removeItem(this.savedFileDownloadStatusKey );

    //if the app updates the version will be different and all the files will be redownloaded
    //this solution allow me not to check each file individually

    //the version will only be saved locally if the download has completed
    let currentVersion = appjson.expo.version;

    const savedFileDownloadStatusValue = await AsyncStorage.getItem(
      this.savedFileDownloadStatusKey
    );

    let downloadFiles = true;

    console.log("data " + savedFileDownloadStatusValue);
    //if the version was never saved or is different from the current version, download the files

    if (savedFileDownloadStatusValue != null) {
      this.savedFileDownloadStatusArray = JSON.parse(
        savedFileDownloadStatusValue
      );
      console.log(this.savedFileDownloadStatusArray);
      if (this.savedFileDownloadStatusArray.version == currentVersion) {
        downloadFiles = false;
      }
    }

    //this.savedFileDownloadStatusArray.version = version

    if (downloadFiles) {
      this.setState({ loadingText: "downloading sound file... v" + currentVersion });
      // let arrFiles = await FileSystem.readDirectoryAsync(
      //   FileSystem.documentDirectory
      // );

      // console.log(arrFiles + "\n" + arrFiles.length);
      // console.log(arrFiles2 + "\n" + arrFiles2.length);
      // console.log(arrFiles3 + "\n" + arrFiles3.length);
      let serverLocation =
        "https://sivanandacanada.org/camp/wp-content/uploads/2019/07/";
      let soundFiles = [
        "bell.mp3",
        "OpeningPrayer.mp3",
        "Kapalabhati.mp3",
        "AnulomaViloma.mp3",
        "AnulomaVilomaRatio5.mp3",
        "AnulomaVilomaRatio6.mp3",
        "AnulomaVilomaRatio7.mp3",
        "AnulomaVilomaRatio8.mp3",
        "SuryaNamaskar.mp3",
        "SingleLegRaises.mp3",
        "DoubleLegRaises.mp3",
        "Sarvangasana.mp3",
        "Sirshasana.mp3",
        "Halasana.mp3",
        "Matsyasana.mp3",
        "Paschimothanasana.mp3",
        "InclinedPlane.mp3",
        "Bhujangasana.mp3",
        "Salabhasana.mp3",
        "Dhanurasana.mp3",
        "ArdhaMatsyendrasana.mp3",
        "Kakasana.mp3",
        "PadaHasthasana.mp3",
        "Trikonasana.mp3",
        "Savasana.mp3",
        "FinalPrayer.mp3",
        "90minClass01.mp3",
        "90minClass02.mp3",
        "90minClass03.mp3",
        "90minClass04.mp3",
        "90minClass05.mp3",
        "90minClass06.mp3",
        "90minClass07.mp3",
        "90minClass08.mp3",
        "90minClass09.mp3",
        "90minClass10.mp3",
        "90minClass11.mp3",
        "90minClass12.mp3",
        "90minClass13.mp3",
        "90minClass14.mp3",
        "90minClass15.mp3",
        "90minClass16.mp3",
        "90minClass17.mp3",
        "90minClass18.mp3",
        "90minClass19.mp3",
        "90minClass20.mp3",
        "90minClass21.mp3",
        "120minClass01.mp3",
        "120minClass02.mp3",
        "120minClass03.mp3",
        "120minClass04.mp3",
        "120minClass05.mp3",
        "120minClass06.mp3",
        "120minClass07.mp3",
        "120minClass08.mp3",
        "120minClass09.mp3",
        "120minClass10.mp3",
        "120minClass11.mp3",
        "120minClass12.mp3",
        "120minClass13.mp3",
        "120minClass14.mp3",
        "120minClass15.mp3"
      ];

      this.fileCount = soundFiles.length;
      this.currentFileCount = 0;
      // for (let i = 0; i < soundFiles.length; i++) {
      //   console.log("deleting " + FileSystem.documentDirectory + soundFiles[i])
      //   await FileSystem.deleteAsync(FileSystem.documentDirectory + soundFiles[i], {idempotent: true});
      // }

      // await FileSystem.deleteAsync(
      //   FileSystem.documentDirectory + "fileThatDoesntExist.mp3"
      // );
      //await FileSystem.deleteAsync( FileSystem.documentDirectory + "bell.mp3", {idempotent: true})
      //await FileSystem.deleteAsync( FileSystem.documentDirectory + "Kapalabhati.mp3")

      let item_chunk_size = 1;

      //this.currentFileArr = new Array(item_chunk_size);
      // this.currentLocalFileSizeArr = new Array(item_chunk_size);

      let itemArray = [];
      for (let i = 0; i < soundFiles.length; i += item_chunk_size) {
        let myChunk = soundFiles.slice(i, i + item_chunk_size);
        itemArray.push(myChunk);
      }
      for (let i = 0; i < itemArray.length; i++) {
        let itemChunk = itemArray[i].map(async soundUri => {
          let arr = soundUri.toString().split("/");

          let filename = arr[arr.length - 1];

          this.currentFile = filename;
          //console.log(this.currentFile);
          const directoryData = await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + filename
          );
          this.currentLocalFileSize = directoryData.size;

          this.downloadResumable = await FileSystem.createDownloadResumable(
            serverLocation + soundUri,
            FileSystem.documentDirectory + filename,
            {},
            this.callback
          );
          this.currentFileCount++;
          this.setState({
            loadingText:
              "downloading sound file " +
              this.currentFileCount +
              "/" +
              this.fileCount +
              " 0%"
          });
          await this.downloadResumable.downloadAsync();
        });

        console.log("finished itemChunk");

        await Promise.all(itemChunk);
        await this.wait(1000);
      }

      //this only runs when all the files are downloaded
      this.savedFileDownloadStatusArray.version = currentVersion;
      await AsyncStorage.setItem(
        this.savedFileDownloadStatusKey,
        JSON.stringify(this.savedFileDownloadStatusArray)
      );

      console.log("finished all downloads");
    }

    //this.setState({ loading: false });
    
    console.log("nagivate to mainscreen");
    this.props.navigation.navigate("MainScreen");
  }

  wait = async ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  callback = async downloadProgress => {
    //if the file was already downloaded
    if (
      this.currentLocalFileSize == downloadProgress.totalBytesExpectedToWrite
    ) {
      await this.downloadResumable.pauseAsync();
      //console.log("not downloading sound file " + this.currentFile);
    } else {
      let percent =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      percent = percent * 100;
      this.setState({
        loadingText:
          "downloading sound file " +
          this.currentFileCount +
          "/" +
          this.fileCount +
          " " +
          parseFloat(percent).toFixed(2) +
          "%"
      });

      //if the file wasn't downloaded, it will be downloaded
      if (
        downloadProgress.totalBytesWritten ==
        downloadProgress.totalBytesExpectedToWrite
      ) {
        console.log("downloaded " + this.currentFile);
      }
    }
  };


  render() {
    let image = require("../assets/images/IconSivananda.png");

    return (
      <View style={styles.imageView}>
        <Image style={styles.image} source={image} />
        <Text>{this.state.loadingText}</Text>
        <Text>Please don't exit the app</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 150,
    width: 150
  },
});