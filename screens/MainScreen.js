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
  }

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
      <ScrollView style={styles.container}>
        <Text style={styles.headerLabel}>Daily Quote:</Text>
        <View style={styles.dailyQuoteView}>
          <Text style={styles.dailyQuote}>{this.state.dailyQuote}</Text>
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
          <Text style={styles.linkText}>+ New Adjustable Class</Text>
        </TouchableOpacity>
      </ScrollView>
    );
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
