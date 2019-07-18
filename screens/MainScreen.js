import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  AsyncStorage,
  Image
} from "react-native";
import quote from "../quotes";
import { FileSystem } from "expo-file-system";
import { KeepAwake } from "expo";

let appjson = require("../app.json");

var globalStyle = require("../style");

/**
 * The MainScreen will show the daily quote
 * it contains links the standard 60,90,120 min courses
 * it shows the list of adjustable classes and lets you create them
 */
export default class MainScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: "Main"
  // });

  static navigationOptions = ({ navigation }) => {
    //let  routeName  = navigation.state.routes[];

    console.log("navigationOptions " + navigation.state.routes);
    let navigationOptions = {};

    navigationOptions.tabBarVisible = true;
    navigationOptions.title = "Main";

    const { params = {} } = navigation.state;
    let tabBarVisible = false;

    // if (params.hideHeader) {
    //   tabBarVisible = false;
    //   return {
    //     header: null,
    //   };
    // }
    const routeParams = navigation.state.params;

    return navigationOptions;

    // {
    //   // hideTabBar: true,
    //   // tabBarVisible: routeParams && routeParams.tabBarVisible,
    //   title: "Main",
    // };
  };

  constructor(props) {
    super(props);
    this.savedClassesKey = "SivanandaSavedClasses";
    this.savedDailyQuoteArrayKey = "SivanandaSavedDailyQuoteArray";
    this.savedFileDownloadStatusKey = "savedFileDownloadStatusKey";
    this.savedFileDownloadStatusArray = {
      version: ""
    };

    this.allClasses = [];
    this.dailyQuoteArray = {
      date: " ",
      quote: " "
    };

    this.state = {
      loadingText: "",
      allClassesHolder: this.allClasses,
      dailyQuoteArrayHolder: [],
      dailyQuote: "",
      loading: true
    };
    this.dailyQuote = "";
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this._retrieveData();
    });
    //this.props.navigation.setParams({showTabBar: false});
    //this.props.navigation.setParams({tabBar:{visible:false}})
    this.props.navigation.setParams({ tabBarVisible: true });
    //this.props.navigation.setParams({ visible: false });

    console.log("file")
    this.file();
  }
  componentDidMount() {
    this.props.navigation.setParams({
      hideHeader: true
    });
  }
  async file() {
    let deleteFiles = true; //should false for release

    if (deleteFiles) {
      //for testing
      await AsyncStorage.removeItem(this.savedFileDownloadStatusKey);
    }
    //if the app updates the version will be different and all the files will be redownloaded
    //this solution allow me not to check each file individually

    //the version will only be saved locally if the download has completed
    let currentVersion = appjson.expo.version;

    const savedFileDownloadStatusValue = await AsyncStorage.getItem(
      this.savedFileDownloadStatusKey
    );

    let downloadFiles = true;

    //console.log("data" + savedFileDownloadStatusValue);
    //if the version was never saved or is different from the current version, download the files

    if (savedFileDownloadStatusValue != null) {
      this.savedFileDownloadStatusArray = JSON.parse(
        savedFileDownloadStatusValue
      );
      //console.log(this.savedFileDownloadStatusArray);
      if (this.savedFileDownloadStatusArray.version == currentVersion) {
        downloadFiles = false;
      }
    }

    //this.savedFileDownloadStatusArray.version = version

    if (downloadFiles) {
      this.setState({
        loadingText: "Downloading sound file... v" + currentVersion
      });
      // let arrFiles = await FileSystem.readDirectoryAsync(
      //   FileSystem.documentDirectory
      // );

      // console.log(arrFiles + "\n" + arrFiles.length);
      // console.log(arrFiles2 + "\n" + arrFiles2.length);
      // console.log(arrFiles3 + "\n" + arrFiles3.length);
      let serverLocation =
        "https://sivanandacanada.org/camp/wp-content/uploads/2019/07/";
      
        //todo 
      let soundFiles = [
        "bell.mp3",
        "OpeningPrayer.mp3",
        "Kapalabhati.mp3",
        //"AnulomaViloma.mp3",
        //"AnulomaVilomaRatio5.mp3",
        //"AnulomaVilomaRatio6.mp3",
        //"AnulomaVilomaRatio7.mp3",
        //"AnulomaVilomaRatio8.mp3",
        // "SuryaNamaskar.mp3",
        // "SingleLegRaises.mp3",
        // "DoubleLegRaises.mp3",
        // "Sarvangasana.mp3",
        // "Sirshasana.mp3",
        // "Halasana.mp3",
        // "Matsyasana.mp3",
        // "Paschimothanasana.mp3",
        // "InclinedPlane.mp3",
        // "Bhujangasana.mp3",
        // "Salabhasana.mp3",
        // "Dhanurasana.mp3",
        // "ArdhaMatsyendrasana.mp3",
        // "Kakasana.mp3",
        // "PadaHasthasana.mp3",
        // "Trikonasana.mp3",
        // "Savasana.mp3",
        // "FinalPrayer.mp3",
        // "90minClass01.mp3",
        // "90minClass02.mp3",
        // "90minClass03.mp3",
        // "90minClass04.mp3",
        // "90minClass05.mp3",
        // "90minClass06.mp3",
        // "90minClass07.mp3",
        // "90minClass08.mp3",
        // "90minClass09.mp3",
        // "90minClass10.mp3",
        // "90minClass11.mp3",
        // "90minClass12.mp3",
        // "90minClass13.mp3",
        // "90minClass14.mp3",
        // "90minClass15.mp3",
        // "90minClass16.mp3",
        // "90minClass17.mp3",
        // "90minClass18.mp3",
        // "90minClass19.mp3",
        // "90minClass20.mp3",
        // "90minClass21.mp3",
        // "120minClass01.mp3",
        // "120minClass02.mp3",
        // "120minClass03.mp3",
        // "120minClass04.mp3",
        // "120minClass05.mp3",
        // "120minClass06.mp3",
        // "120minClass07.mp3",
        // "120minClass08.mp3",
        // "120minClass09.mp3",
        // "120minClass10.mp3",
        // "120minClass11.mp3",
        // "120minClass12.mp3",
        // "120minClass13.mp3",
        // "120minClass14.mp3",
        // "120minClass15.mp3"
      ];

      this.fileCount = soundFiles.length;
      this.currentFileCount = 0;
      if (deleteFiles) {
        for (let i = 0; i < soundFiles.length; i++) {
          console.log(
            "deleting " + FileSystem.documentDirectory + soundFiles[i]
          );
          await FileSystem.deleteAsync(
            FileSystem.documentDirectory + soundFiles[i],
            { idempotent: true }
          );
        }
      }

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
          //.catch(this.failureCallback);

          this.currentFileCount++;
          this.setState({
            loadingText:
              "Downloading sound file " +
              this.currentFileCount +
              "/" +
              this.fileCount +
              " 0%"
          });

          await this.downloadResumable
            .downloadAsync()
            .then()
            .catch(this.failureCallback);
        });

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

    await this.wait(5000);

    this.setState({ loading: false });
    this.props.navigation.setParams({
      hideHeader: false
    });

    //this.props.navigation.setParams({tabBarVisible: true});
  }

  failureCallback(result) {
    console.log("failureCallback " + result);
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
      //console.log("not Downloading sound file " + this.currentFile);
    } else {
      let percent =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      percent = percent * 100;
      this.setState({
        loadingText:
          "Downloading sound file " +
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
        console.log("Downloaded " + this.currentFile);
      }
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(this.savedClassesKey);

      const savedDailyQuoteValue = await AsyncStorage.getItem(
        this.savedDailyQuoteArrayKey
      );

      //make sure that a quote is generated once a day by comparing the last saved date
      let today = new Date();
      let date =
        today.getDate() +
        "/" +
        parseInt(today.getMonth() + 1) +
        "/" +
        today.getFullYear();
      if (savedDailyQuoteValue != null) {
        this.dailyQuoteArray = JSON.parse(savedDailyQuoteValue);

        if (date == this.dailyQuoteArray.date) {
          this.setState({ dailyQuote: this.dailyQuoteArray.quote });
        } else {
          this.createNewQuote(date);
        }
      } else {
        this.createNewQuote(date);
      }

      if (value !== null) {
        this.allClasses = JSON.parse(value);
        this.setState({ allClassesHolder: [...this.allClasses] });
      } else {
        //there are no saved classes
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  async createNewQuote(date) {
    const min = 0;
    const max = 808;
    const rand = Math.floor(min + Math.random() * (max - min));

    let newQuote = quote[rand];

    this.dailyQuoteArray.date = date;
    this.dailyQuoteArray.quote = newQuote;
    await AsyncStorage.setItem(
      this.savedDailyQuoteArrayKey,
      JSON.stringify(this.dailyQuoteArray)
    );

    this.setState({ dailyQuoteArrayHolder: this.dailyQuoteArray });
    this.setState({ dailyQuote: this.dailyQuoteArray.quote });
  }

  newClass() {
    this.props.navigation.navigate("EditClassScreen", {
      key: "[New Class]"
    });
  }

  openClass(item) {
    if (item == 60 || item == 90 || item == 120) {
      this.props.navigation.navigate("StartStandardClassScreen", {
        item: item,
        title: item.toString() + " minute class"
      });
    } else {
      this.props.navigation.navigate("StartClassScreen", {
        item: item
      });
    }
  }

  render() {
    let image = require("../assets/images/IconSivananda.png");

    let loading = this.state.loading;
    if (loading) {
      return (
        <View style={styles.imageView}>
          <KeepAwake />
          <Image style={styles.image} source={image} />
          <Text>Preparing app for first time use</Text>
          <Text>{this.state.loadingText}</Text>
          <Text>Please don't exit the app </Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={globalStyle.mainContainer}>
          <KeepAwake />
          <View style={globalStyle.sectionContainer}>
            <Text style={globalStyle.headerLabel}>Daily Quote</Text>
            <Text style={styles.dailyQuote}>{this.state.dailyQuote}</Text>
          </View>

          <View style={globalStyle.sectionContainer}>
            <Text style={globalStyle.headerLabel}>Standard Classes</Text>

            <View style={globalStyle.buttonRow}>
              <TouchableOpacity
                onPress={() => this.openClass(60)}
                style={[globalStyle.button, styles.standardButton]}
              >
                <Text style={globalStyle.buttonText}>60 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.openClass(90)}
                style={[globalStyle.button, styles.standardButton]}
              >
                <Text style={globalStyle.buttonText}>90 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.openClass(120)}
                style={[globalStyle.button, styles.standardButton]}
              >
                <Text style={globalStyle.buttonText}>120 min</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={globalStyle.sectionContainer}>
            <Text style={globalStyle.headerLabel}>Adjustable Classes</Text>
            <FlatList
              data={this.state.allClassesHolder}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.openClass(item)}>
                  <Text style={globalStyle.listItemText}>{item.key}</Text>
                  <View style={globalStyle.separator} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => this.newClass()}
              style={globalStyle.button}
            >
              <Text style={globalStyle.buttonText}>New</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
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
  standardButton: {
    flex: 0.333
  },
  dailyQuote: {
    minHeight: 100,
    fontSize: 18,
    padding: 15,
    margin: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#f1f0f1",
    backgroundColor: "#f1f0f1"
  }
});
