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
          image_url: require("../assets/images/AnulomViloma.jpg"),
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

    this.totalTime = 0;
    this.asanaArray.forEach(element => {
      element.isSelected = false;

      //TODO: add beginning and end time

      //also calculate the total time of the class
      if (element.title == "Kapalabhati") {
        let timeToAdd = 3; //for testing
        //timeToAdd =  (element.actionsPerRound*2 +  element.retentionLength)*element.rounds;
        this.totalTime += timeToAdd;
      } else if (element.title == "Anulom Viloma") {
        let timeToAdd = 5;
        //timeToAdd = element.ratioPerRound*6*element.rounds; //4 inhale, 12 hold, 8 exhale
        this.totalTime += timeToAdd;
      } else {
        let timeToAdd = 4;
        //timeToAdd = element.holdTime;
        this.totalTime += timeToAdd;
      }

      //create a timestamp for when the posture should end
      element.endTimeStamp = this.totalTime;
    });

    //this.asanaArray[2].isSelected = true;

    this.currentAsanaRow = -1;

    //this.started = false;

    this.state = {
      asanaHolder: this.asanaArray,
      started: false,
      timer: null,
      counter: 0,
      totalTime: this.totalTime
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}

  tick = () => {
    if (this.state.counter >= this.state.totalTime) {
      clearTimeout(this.state.timer);
    } else if (
      this.state.counter >= this.asanaArray[this.currentAsanaRow].endTimeStamp
    ) {
      this.nextAsana();
      this.setState({ asanaHolder: [...this.asanaArray] });
    }

    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerView}>
          {this.renderStartPauseButtion()}
          <View style={styles.textHeaderView}>
            <Text>Elapsed: {this.state.counter.toString().toHHMMSS()}</Text>
            <Text>Total: {this.state.totalTime.toString().toHHMMSS()}</Text>
          </View>
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
      image = this.asanaArray[this.currentAsanaRow].image_url;
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
    //start the timer
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer });

    //this.started = true;
    this.setState({ started: true });

    //the practice is being started for the first time
    if (this.currentAsanaRow == -1) {
      this.currentAsanaRow++;

      //highlight the exercise
      this.asanaArray.forEach(element => {
        element.isSelected = false;
      });
      this.asanaArray[this.currentAsanaRow].isSelected = true;

      //set the image
      //when the timespan has ended go to the next asana
    } else {
      //resume from the last asana and time
    }

    this.setState({ asanaHolder: [...this.asanaArray] });
  }
  nextAsana() {
    //highlight next row
    this.asanaArray[this.currentAsanaRow++].isSelected = false;
    this.asanaArray[this.currentAsanaRow].isSelected = true;
  }
  pauseAsanas() {
    clearTimeout(this.state.timer);
    this.setState({ started: false });
  }
  editClass() {
    this.props.navigation.navigate("EditClassScreen", {
      key: this.currentClass.key
    });
  }
}

String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

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
  textHeaderView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
