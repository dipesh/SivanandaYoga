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

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: "Main"
  };

  constructor(props) {
    super(props);
    this.savedClassesKey = "SivanandaSavedClasses";

    this.allClasses = [];

    this.state = {
      allClassesHolder: this.allClasses
    };
    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      this._retrieveData();
    });
  }
  playSound(){
    try {
      //SoundPlayer.playSoundFile("../assets/sounds/AnulomViloma", "mp3");
      //SoundPlayer.playUrl("https://example.com/music.mp3");
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(this.savedClassesKey);

      console.log("load value " + value);
      if (value !== null) {
        this.allClasses = JSON.parse(value);
        this.setState({ allClassesHolder: [...this.allClasses] });
      } else {
        //there are no saved classes
        return [];
      }
    } catch (error) {}
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerLabel}>Daily Quote:</Text>
        <View style={styles.dailyQuoteView}>
          <Text style={styles.dailyQuote}>{this.getQuote()}</Text>
        </View>
        <Text style={styles.headerLabel}>Standard Classes:</Text>
        <View style={styles.standardClassView}>
          <TouchableOpacity
            onPress={() => this.openClass(60)}
            style={styles.standardClassButton}
          >
            <Text style={styles.standardClassButtonText}>60 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.openClass(90)}
            style={styles.standardClassButton}
          >
            <Text style={styles.standardClassButtonText}>90 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.openClass(120)}
            style={styles.standardClassButton}
          >
            <Text style={styles.standardClassButtonText}>120 min</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerLabel}>Adjustable Classes:</Text>
        <FlatList
          data={this.state.allClassesHolder}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.openClass(item)}>
              <Text style={styles.customClassRow}>{item.key}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => this.newClass()}
          style={styles.headerButton}
        >
          <Text style={styles.linkText}>+ New Ajustable Class</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.playSound()}
          style={styles.headerButton}
        >
          <Text style={styles.linkText}>Play</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  newClass() {
    this.props.navigation.navigate("EditClassScreen", {
      key: "[New Class]"
    });
  }
  getQuote() {
    const min = 0;
    const max = 808;
    const rand = Math.floor(min + Math.random() * (max - min));

    return quote[rand];
  }

  openClass(item) {
    if (item == 60) {
    } else if (item == 90) {
    } else if (item == 120) {
    } else {
      //it must be a custom class, so item is a array
      this.props.navigation.navigate("StartClassScreen", {
        item: item
      });
    }
  }
}

const styles = StyleSheet.create({
  customClassRow: {
    margin: 10
  },
  standardClassButton: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "powderblue",
    padding: 10,
    margin: 10
  },
  standardClassButtonText: {
    textAlign: "center"
  },
  standardClassLabel: {
    padding: 5,
    paddingBottom: 10,
    textAlign: "center"
  },
  standardClassView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  headerLabel: {
    padding: 5,
    textAlign: "center"
  },
  dailyQuote: {
    minHeight: 100,
    padding: 15,
    margin: 10,
    // textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#eff0f1",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  dailyQuoteView: {
    justifyContent: "center"
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
    margin: 10
  }
});
