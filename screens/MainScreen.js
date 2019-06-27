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
  standardButton:{
    flex: 0.333,
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
