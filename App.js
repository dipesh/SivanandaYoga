import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading} from "expo";
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Icon from '@expo/vector-icons'
import AppNavigator from "./navigation/AppNavigator";
import * as FileSystem from 'expo-file-system'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    //await this.file();

    //var actions = await soundUris.map(downloadAudio);

    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
        //require({uri: "Kapalabhati.mp3"}),
        //require("AnulomaViloma.mp3"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
      //getData(),
      //actions,
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  async file() {
    // let arrFiles = await FileSystem.readDirectoryAsync(
    //   FileSystem.documentDirectory
    // );
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "90minClass/",
      {
        intermediates: true
      }
    );
    // let arrFiles2 = await FileSystem.readDirectoryAsync(
    //   FileSystem.documentDirectory + "90minClass/"
    // );
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "120minYogaClass/",
      {
        intermediates: true
      }
    );
    // let arrFiles3 = await FileSystem.readDirectoryAsync(
    //   FileSystem.documentDirectory + "120minYogaClass/"
    // );

    //console.log(arrFiles + "\n" + arrFiles.length);
    // console.log(arrFiles2 + "\n" + arrFiles2.length);
    // console.log(arrFiles3 + "\n" + arrFiles3.length);
    let serverLocation = "http://192.168.1.116/";
    let items = [
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
      "90minClass/01.mp3",
      "90minClass/02.mp3",
      "90minClass/03.mp3",
      "90minClass/04.mp3",
      "90minClass/05.mp3",
      "90minClass/06.mp3",
      "90minClass/07.mp3",
      "90minClass/08.mp3",
      "90minClass/09.mp3",
      "90minClass/10.mp3",
      "90minClass/11.mp3",
      "90minClass/12.mp3",
      "90minClass/13.mp3",
      "90minClass/14.mp3",
      "90minClass/15.mp3",
      "90minClass/16.mp3",
      "90minClass/17.mp3",
      "90minClass/18.mp3",
      "90minClass/19.mp3",
      "90minClass/20.mp3",
      "90minClass/21.mp3",
      "120minYogaClass/01.mp3",
      "120minYogaClass/02.mp3",
      "120minYogaClass/03.mp3",
      "120minYogaClass/04.mp3",
      "120minYogaClass/05.mp3",
      "120minYogaClass/06.mp3",
      "120minYogaClass/07.mp3",
      "120minYogaClass/08.mp3",
      "120minYogaClass/09.mp3",
      "120minYogaClass/10.mp3",
      "120minYogaClass/11.mp3",
      "120minYogaClass/12.mp3",
      "120minYogaClass/13.mp3",
      "120minYogaClass/14.mp3",
      "120minYogaClass/15.mp3"
    ];

    // for (let i = 0; i < items.length; i++) {
    //   console.log("deleting " + FileSystem.documentDirectory + items[i])
    //   await FileSystem.deleteAsync(FileSystem.documentDirectory + items[i], {idempotent: true});
    // }

    //await FileSystem.deleteAsync(FileSystem.documentDirectory + "fileThatDoesntExist.mp3")
    //await FileSystem.deleteAsync( FileSystem.documentDirectory + "bell.mp3", {idempotent: true})
    //await FileSystem.deleteAsync( FileSystem.documentDirectory + "Kapalabhati.mp3")

    let item_chunk_size = 1;

    this.currentFileArr = new Array(item_chunk_size);
    this.currentLocalFileSizeArr = new Array(item_chunk_size);

    let itemArray = [];
    for (let i = 0; i < items.length; i += item_chunk_size) {
      let myChunk = items.slice(i, i + item_chunk_size);
      itemArray.push(myChunk);
    }
    for (let i = 0; i < itemArray.length; i++) {
      let itemChunk = itemArray[i].map(async soundUri => {
        let arr = soundUri.toString().split("/");

        let filename = arr[arr.length - 1];
        if (soundUri.includes("90minClass")) {
          filename = "90minClass/" + filename;
        } else if (soundUri.includes("120minYogaClass")) {
          filename = "120minYogaClass/" + filename;
        }

        this.currentFile = filename;
        console.log(this.currentFile);
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
        await this.downloadResumable.downloadAsync();
      });

      await Promise.all(itemChunk);
      await this.wait(1000);
    }

    console.log("finished all downloads");
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
      console.log("not downloading file " + this.currentFile);
    } else {
      //if the file wasn't downloaded, it will be downloaded
      if (
        downloadProgress.totalBytesWritten ==
        downloadProgress.totalBytesExpectedToWrite
      ) {
        console.log("downloaded " + this.currentFile);
      } else {
        //console.log("downloading file " + this.currentFile);
      }
    }
  };
}

//console.ignoredYellowBox = ['Setting a timer'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
