import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading} from "expo";
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
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
        ...Ionicons.font,
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
