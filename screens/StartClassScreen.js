import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image
} from "react-native";

export default class StartClassScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "uncomment this " //`${navigation.state.params.item.name}`
  });

  constructor(props) {
    super(props);

    //this.currentClass = this.props.navigation.getParam("item", "");
    this.currentClass = {
      key: "tempName2",
      name: "tempName2",
      item: [
        {
          key: "0",
          title: "Kapalabhati",
          description: "Kapalabhati",
          image_url: " ",
          isDeleted: false,
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 6,
          ratioPerRound: 5
        },
        {
          key: "1",
          title: "Anulom Viloma",
          description: "Anulom Viloma",
          image_url: " ",
          isDeleted: false,
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 20,
          ratioPerRound: 5
        },
        {
          key: "2",
          title: "Sirshasana",
          description: "Sirshasana",
          image_url: " ",
          isDeleted: false,
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 20,
          ratioPerRound: 5
        },
        {
          key: "3",
          title: "Sarvangasana",
          description: "Sarvangasana",
          image_url: " ",
          isDeleted: false,
          holdTime: 30,
          actionsPerRound: 35,
          retentionLength: 30,
          rounds: 20,
          ratioPerRound: 5
        }
      ]
    };
    this.asanaArray = this.currentClass.item;

    this.asanaArray.forEach(element => {
      element.isSelected = false;
    });
    this.asanaArray[2].isSelected = true;


    this.currentAsana = "";

    this.started = false;

    this.state = {
      asanaHolder: this.asanaArray
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => this.startPause()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.editClass()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Image
          style={{ width: 100, height: 100 }}
          source={require("../assets/images/IconSivananda.jpg")}
        />

        <FlatList
          data={this.state.asanaHolder}
          renderItem={({ item }) => this.renderItem(item)}
        />
        {/* <Text> {JSON.stringify(this.asanaArray)} </Text> */}
      </ScrollView>
    );
  }

  renderItem = item => {

    let color = 'rgba(0, 0, 0, 0)'
    if(item.isSelected){
      color =  '#eff0f1'
    }
    return (
      <TouchableOpacity
        style={{backgroundColor: color}}
        onPress={() => this.exersiceClicked(item)}
      >
        <Text style={styles.customClassRow}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  exersiceClicked(item) {}

  startPause() {
    if (this.started) {
      pauseAsanas();
    } else {
      startAsanas();
    }
  }
  startAsanas() {
    this.started = true;

    if (this.currentAsana == "") {
      //the practice is being started for the first time
      //start the timer
      //highlight the exercise
      //set the image
      //when the timespan has ended go to the next asana
    } else {
      //resume from the last asana and time
    }
  }
  pauseAsanas() {
    this.started = false;
  }
  editClass() {
    this.props.navigation.navigate("EditClassScreen");
  }
}

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
