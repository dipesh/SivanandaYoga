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
import quote from "../quotes";
import { FileSystem } from "expo-file-system";

var globalStyle = require("../style");

/**
 * The MainScreen will show the daily quote
 * it contains links the standard 60,90,120 min courses
 * it shows the list of adjustable classes and lets you create them
 */
export default class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Main"
  });
  constructor(props) {
    super(props);
    this.savedClassesKey = "SivanandaSavedClasses";
    this.savedDailyQuoteArrayKey = "SivanandaSavedDailyQuoteArray";

    this.allClasses = [];
    this.dailyQuoteArray = {
      date: " ",
      quote: " "
    };
    this.state = {
      allClassesHolder: this.allClasses,
      dailyQuoteArrayHolder: [],
      dailyQuote: ""
    };
    this.dailyQuote = "";
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this._retrieveData();
    });

    this.file();
  }

  wait = async ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  async file() {

    let arrFiles = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
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

    console.log(arrFiles + "\n" + arrFiles.length);
    // console.log(arrFiles2 + "\n" + arrFiles2.length);
    // console.log(arrFiles3 + "\n" + arrFiles3.length);

    let items = [
      "http://192.168.1.116/bell.mp3",
      "http://192.168.1.116/OpeningPrayer.mp3",
      "http://192.168.1.116/Kapalabhati.mp3",
      "http://192.168.1.116/AnulomaViloma.mp3",
      "http://192.168.1.116/AnulomaVilomaRatio5.mp3",
      "http://192.168.1.116/AnulomaVilomaRatio6.mp3",
      "http://192.168.1.116/AnulomaVilomaRatio7.mp3",
      "http://192.168.1.116/AnulomaVilomaRatio8.mp3",
      "http://192.168.1.116/SuryaNamaskar.mp3",
      "http://192.168.1.116/SingleLegRaises.mp3",
      "http://192.168.1.116/DoubleLegRaises.mp3",
      "http://192.168.1.116/Sarvangasana.mp3",
      "http://192.168.1.116/Sirshasana.mp3",
      "http://192.168.1.116/Halasana.mp3",
      "http://192.168.1.116/Matsyasana.mp3",
      "http://192.168.1.116/Paschimothanasana.mp3",
      "http://192.168.1.116/InclinedPlane.mp3",
      "http://192.168.1.116/Bhujangasana.mp3",
      "http://192.168.1.116/Salabhasana.mp3",
      "http://192.168.1.116/Dhanurasana.mp3",
      "http://192.168.1.116/ArdhaMatsyendrasana.mp3",
      "http://192.168.1.116/Kakasana.mp3",
      "http://192.168.1.116/PadaHasthasana.mp3",
      "http://192.168.1.116/Trikonasana.mp3",
      "http://192.168.1.116/Savasana.mp3",
      "http://192.168.1.116/FinalPrayer.mp3",
      "http://192.168.1.116/90minClass/01.mp3",
      "http://192.168.1.116/90minClass/02.mp3",
      "http://192.168.1.116/90minClass/03.mp3",
      "http://192.168.1.116/90minClass/04.mp3",
      "http://192.168.1.116/90minClass/05.mp3",
      "http://192.168.1.116/90minClass/06.mp3",
      "http://192.168.1.116/90minClass/07.mp3",
      "http://192.168.1.116/90minClass/08.mp3",
      "http://192.168.1.116/90minClass/09.mp3",
      "http://192.168.1.116/90minClass/10.mp3",
      "http://192.168.1.116/90minClass/11.mp3",
      "http://192.168.1.116/90minClass/12.mp3",
      "http://192.168.1.116/90minClass/13.mp3",
      "http://192.168.1.116/90minClass/14.mp3",
      "http://192.168.1.116/90minClass/15.mp3",
      "http://192.168.1.116/90minClass/16.mp3",
      "http://192.168.1.116/90minClass/17.mp3",
      "http://192.168.1.116/90minClass/18.mp3",
      "http://192.168.1.116/90minClass/19.mp3",
      "http://192.168.1.116/90minClass/20.mp3",
      "http://192.168.1.116/90minClass/21.mp3",
      "http://192.168.1.116/120minYogaClass/01.mp3",
      "http://192.168.1.116/120minYogaClass/02.mp3",
      "http://192.168.1.116/120minYogaClass/03.mp3",
      "http://192.168.1.116/120minYogaClass/04.mp3",
      "http://192.168.1.116/120minYogaClass/05.mp3",
      "http://192.168.1.116/120minYogaClass/06.mp3",
      "http://192.168.1.116/120minYogaClass/07.mp3",
      "http://192.168.1.116/120minYogaClass/08.mp3",
      "http://192.168.1.116/120minYogaClass/09.mp3",
      "http://192.168.1.116/120minYogaClass/10.mp3",
      "http://192.168.1.116/120minYogaClass/11.mp3",
      "http://192.168.1.116/120minYogaClass/12.mp3",
      "http://192.168.1.116/120minYogaClass/13.mp3",
      "http://192.168.1.116/120minYogaClass/14.mp3",
      "http://192.168.1.116/120minYogaClass/15.mp3"
    ];
    
    await FileSystem.deleteAsync(FileSystem.documentDirectory + "fileThatDoesntExist.mp3")
    //await FileSystem.deleteAsync( FileSystem.documentDirectory + "bell.mp3", {idempotent: true})
    //await FileSystem.deleteAsync( FileSystem.documentDirectory + "Kapalabhati.mp3")

    let item_chunk_size = 1;
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
        console.log(this.currentFile)
        const directoryData = await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + filename
        );
        this.currentLocalFileSize = directoryData.size;
        //console.log("directoryData " + directoryData.size);
 
        this.downloadResumable = await FileSystem.createDownloadResumable(
          soundUri,
          FileSystem.documentDirectory + filename,
          {},
          this.callback
        );
        await this.downloadResumable.downloadAsync()

        //console.log("downloading " + filename);
        // return FileSystem.downloadAsync(
        //   soundUri,
        //   FileSystem.documentDirectory + filename
        // )
        //   .then(({ uri }) => {
        //     console.log("finished downloading to", uri);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
      });

      await Promise.all(itemChunk);
      await this.wait(1000);
    }

    console.log("finished all downloads");
  }
  callback = async downloadProgress => {

    //if the file was already downloaded
    if(this.currentLocalFileSize == downloadProgress.totalBytesExpectedToWrite){
      await this.downloadResumable.pauseAsync();
      console.log("not downloading file " + this.currentFile)
    }
    else{
    //if the file wasn't downloaded, it will be downloaded
      console.log("downloading file "  + this.currentFile)
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
    return (
      <ScrollView style={globalStyle.mainContainer}>
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

const styles = StyleSheet.create({
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
