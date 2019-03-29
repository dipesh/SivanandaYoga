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
          image_url: require("../assets/images/Kapalabhati.jpg"),
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
          image_url: require("../assets/images/Anulom Viloma.jpg"),
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
          image_url: require("../assets/images/Sirshasana.jpg"),
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
          image_url: require("../assets/images/Sarvangasana.jpg"),
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

    this.currentAsanaRow = -1;

    //this.started = false;

    this.state = {
      asanaHolder: this.asanaArray,
      started: false
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerView}>
          {this.renderStartPauseButtion()}
          <TouchableOpacity
            onPress={() => this.editClass()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {this.renderImage()}

        <FlatList
          data={this.state.asanaHolder}
          renderItem={({ item }) => this.renderItem(item)}
        />
        {/* <Text> {JSON.stringify(this.asanaArray)} </Text> */}
      </ScrollView>
    );
  }
  renderImage() {
    let image = require("../assets/images/IconSivananda.png");

    if (this.currentAsanaRow >= 0) {
      this.asanaArray[this.currentAsanaRow].image_url;
    }
    return <Image style={{ width: 100, height: 100 }} source={image} />;
  }
  renderStartPauseButtion() {
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
    return (
      <TouchableOpacity
        style={{ backgroundColor: color }}
        onPress={() => this.exersiceClicked(item)}
      >
        <Text style={styles.customClassRow}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  exersiceClicked(item) {}

  startPause() {
    if (this.state.started) {
      this.pauseAsanas();
    } else {
      this.startAsanas();
    }
  }
  startAsanas() {
    //this.started = true;
    this.setState({ started: true });
    if (this.currentAsanaRow == -1) {
      this.currentAsanaRow++;
      //the practice is being started for the first time
      //start the timer
      //highlight the exercise
      this.asanaArray.forEach(element => {
        element.isSelected = false;
      });
      this.asanaArray[this.currentAsanaRow].isSelected = true;

      //set the image
      //when the timespan has ended go to the next asana
    } else {
      this.asanaArray[this.currentAsanaRow++].isSelected = false;
      this.asanaArray[this.currentAsanaRow].isSelected = true;

      //resume from the last asana and time
      //highlight next row
    }

    this.setState({ asanaHolder: [...this.asanaArray] });
  }
  pauseAsanas() {
    this.setState({ started: false });
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
