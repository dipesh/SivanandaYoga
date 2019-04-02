import React from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import AddAsanaRow from "../components/AddAsanaRow";
import AsanaListview from "../components/AsanaListview";
import AddAsanaListview from "../components/AddAsanaListview";
import DialogInput from "react-native-dialog-input";

export default class EditClassScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edit " + `${navigation.state.params.key}`
  });
  constructor(props) {
    super(props);

    this.savedClassName = this.props.navigation.getParam("key", "[New Class]");
    this.savedClassesKey = "SivanandaSavedClasses";
    this.ajustableClassName = "Adjustable Class 1";

    this.asanaArray = this.getAsanasArray();
    //.concat(this.getPranayamArray());

    this.removedAsanaArray = [];

    this.allClasses = [];
    this._retrieveData();

    this.state = {
      allClassesHolder: this.allClasses,
      arrayHolder: [],
      //removedAsanaArray: [],
      textInput_Holder: "",
      modalVisible: false,
      isDialogVisible: false
    };
  }

  _storeData = async () => {
    if (this.savedClassName == "[New Class]") {
      this.showDialog(true);
    }

    //if a name was set or was already saved
    if (this.savedClassName != "[New Class]") {
      let matchFound = false;

      for (i = 0; i < this.allClasses.length; i++) {
        if (this.allClasses[i].key == this.savedClassName) {
          //update the current item
          this.allClasses[i].item = this.asanaArray;
          matchFound = true;
        }
      }

      if (this.allClasses.length == 0 || matchFound == false) {
        //save a new item
        let arr = {
          key: this.savedClassName,
          item: []
        };

        arr.item = this.asanaArray;
        this.allClasses.push(arr);
      }

      this.setState({ allClassesHolder: [...this.allClasses] });
      try {
        await AsyncStorage.setItem(
          this.savedClassesKey,
          JSON.stringify(this.allClasses)
        );
      } catch (error) {
        // Error saving data
      }
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(this.savedClassesKey);

      if (value !== null) {
        // We have data!!

        this.allClasses = JSON.parse(value);
        //let itemArray = [];

        this.allClasses.forEach(element => {
          if (element.key == this.savedClassName) {
            this.asanaArray = element.item;
          }
        });
        
        for (i = 0; i < this.asanaArray.length; i++) {
          this.asanaArray[i].rowNumber = i.toString();
        }
        //this.setState({ arrayHolder: [...itemArray] })
        this.setState({ arrayHolder: [...this.asanaArray] });
      } else {
        //there are no saved classes
      }
    } catch (error) {
      // Error retrieving data
      console.log("load error: " + error);
      try {
        AsyncStorage.removeItem(this.savedClassesKey);
        console.log("removed data");
      } catch (error) {}
    }
  };

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  getAsanasArray() {
    //the key also represents the order
    let arr = [
      {
        key: "0",
        title: "Opening Prayer",
        description: "Opening Prayer",
        image_url: require("../assets/images/OpeningPrayer.jpg"),
        holdTime: 30,
        actionsPerRound: 35,
        retentionLength: 30,
        rounds: 6,
        ratioPerRound: 5
      },
      {
        key: "1",
        title: "Kapalabhati",
        description: "Shining Skull Breath",
        image_url: require("../assets/images/Kapalabhati.jpg"),
        holdTime: 30,
        actionsPerRound: 35,
        retentionLength: 30,
        rounds: 6,
        ratioPerRound: 5
      },
      {
        key: "2",
        title: "Anulom Viloma",
        description: "Alternate Nostril Breathing",
        image_url: require("../assets/images/AnulomViloma.jpg"),
        holdTime: 30,
        actionsPerRound: 35,
        retentionLength: 30,
        rounds: 20,
        ratioPerRound: 5
      },
      {
        key: "3",
        title: "Surya Namaskar",
        description: "Sun Salutations",
        image_url: require("../assets/images/SunSalutations.jpg"),
        holdTime: 30,
        actionsPerRound: 35,
        retentionLength: 30,
        rounds: 20,
        ratioPerRound: 5
      },
      {
        key: "4",
        title: "Single Leg Raises",
        description: "Single Leg Raises",
        image_url: require("../assets/images/SingleLegRaises.jpg"),
        holdTime: 30,
        actionsPerRound: 35,
        retentionLength: 30,
        rounds: 20,
        ratioPerRound: 5
      },
      // {
      //   key: "5",
      //   title: "Double Leg Raises",
      //   description: "Double Leg Raises",
      //   image_url: require("../assets/images/DoubleLegRaises.jpg"),
      //   holdTime: 30,
      //   actionsPerRound: 35,
      //   retentionLength: 30,
      //   rounds: 20,
      //   ratioPerRound: 5
      // },
      // {
      //   key: "6",
      //   title: "Sirshasana",
      //   description: "Headstand",
      //   image_url: require("../assets/images/Sirshasana.jpg"),
      //   holdTime: 30,
      //   actionsPerRound: 35,
      //   retentionLength: 30,
      //   rounds: 20,
      //   ratioPerRound: 5
      // },
      // {
      //   key: "7",
      //   title: "Sarvangasana",
      //   description: "Shoulderstand",
      //   image_url: require("../assets/images/Sarvangasana.jpg"),
      //   holdTime: 30,
      //   actionsPerRound: 35,
      //   retentionLength: 30,
      //   rounds: 20,
      //   ratioPerRound: 5
      // },
      // {
      //   key: "8",
      //   title: 'Halasana',
      //   description: 'Halasana',
      //   image_url: require("../assets/images/Halasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "9",
      //   title: 'Matsyasana',
      //   description: 'Matsyasana',
      //   image_url: require("../assets/images/Matsyasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "10",
      //   title: 'Paschimothanasana',
      //   description: 'Paschimothanasana',
      //   image_url: require("../assets/images/Paschimothanasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "11",
      //   title: 'Bhujangasana',
      //   description: 'Bhujangasana',
      //   image_url: require("../assets/images/Bhujangasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "12",
      //   title: 'Salabhasana',
      //   description: 'Salabhasana',
      //   image_url: require("../assets/images/Salabhasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "13",
      //   title: 'Dhanurasana',
      //   description: 'Dhanurasana',
      //   image_url: require("../assets/images/Dhanurasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "14",
      //   title: 'Ardha Matsyendrasana',
      //   description: 'Ardha Matsyendrasana',
      //   image_url: require("../assets/images/ArdhaMatsyendrasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "15",
      //   title: 'Kakasana',
      //   description: 'Kakasana',
      //   image_url: require("../assets/images/Kakasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "16",
      //   title: 'Pada Hasthasana',
      //   description: 'Pada Hasthasana',
      //   image_url: require("../assets/images/PadaHasthasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "17",
      //   title: 'Trikonasana',
      //   description: 'Trikonasana',
      //   image_url: require("../assets/images/Trikonasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "18",
      //   title: 'Savasana',
      //   description: 'Savasana',
      //   image_url: require("../assets/images/Savasana.jpg"),
      //   holdTime: 30,
      // },
      // {
      //   key: "19",
      //   title: 'Final Prayer',
      //   description: 'Final Prayer',
      //   image_url: require("../assets/images/FinalPrayer.jpg"),
      //   holdTime: 30,
      // },
    ];
    for (i = 0; i < arr.length; i++) {
      arr[i].rowNumber = i.toString();
    }
    return arr;
  }

  componentDidMount() {
    this.setState({ arrayHolder: [...this.asanaArray] });
  }

  deleteData = rowNumber => {
    this.removedAsanaArray.push(this.asanaArray[rowNumber]);

    this.asanaArray.splice(rowNumber, 1);

    for (i = 0; i < this.asanaArray.length; i++) {
      this.asanaArray[i].rowNumber = i.toString();
    }
    this.setState({ arrayHolder: [...this.asanaArray] });
  };

  joinData = item => {

    //add the item at the right index, the key contains the proper order
    let indexToAdd = 0;
    if (item.key > this.asanaArray.length) {
      this.asanaArray.push(item);
    } else {
      for (i = 0; i < this.asanaArray.length; i++) {
        if (item.key <= this.asanaArray[i].key) {
          indexToAdd = i;
          break;
        }
      }
    }
    this.asanaArray.splice(indexToAdd, 0, item);

    this.setState({ arrayHolder: [...this.asanaArray] });

    this.removedAsanaArray.splice(item.rowNumber, 1);

    for (i = 0; i < this.asanaArray.length; i++) {
      this.asanaArray[i].rowNumber = i.toString();
    }
  };

  updateHoldTime = (rowNumber, holdTime) => {
    this.asanaArray[rowNumber].holdTime = holdTime;
    this.setState({ arrayHolder: [...this.asanaArray] });
  };

  updateRounds = (rowNumber, rounds) => {
    this.asanaArray[rowNumber].rounds = rounds;
    this.setState({ arrayHolder: [...this.asanaArray] });
  };

  updateActionsPerRound = (rowNumber, actionsPerRound) => {
    this.asanaArray[rowNumber].actionsPerRound = actionsPerRound;
    this.setState({ arrayHolder: [...this.asanaArray] });
  };

  updateRetentionLength = (rowNumber, retentionLength) => {
    this.asanaArray[rowNumber].retentionLength = retentionLength;
    this.setState({ arrayHolder: [...this.asanaArray] });
  };

  updateRatioPerRound = (rowNumber, ratioPerRound) => {
    this.asanaArray[rowNumber].ratioPerRound = ratioPerRound;
    this.setState({ arrayHolder: [...this.asanaArray] });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { 
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.mainContainer}>
            {this.renderRemovedItems()}
            <TouchableOpacity
              style={styles.addExercises}
              onPress={() => {
                this.toggleModal(!this.state.modalVisible);
              }}
            >
              <Text style={styles.linkText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={"Enter Name"}
          message={"Enter name for adjustable class"}
          submitInput={inputText => {
            this.setName(inputText);
          }}
          closeDialog={() => {
            this.showDialog(false);
          }}
        />

        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <AsanaListview
            itemList={this.state.arrayHolder}
            handleRemovePress={this.deleteData}
            updateHoldTime={this.updateHoldTime}
            updateActionsPerRound={this.updateActionsPerRound}
            updateRetentionLength={this.updateRetentionLength}
            updateRounds={this.updateRounds}
            updateRatioPerRound={this.updateRatioPerRound}
          />
        </ScrollView>
        {/* <Text> {JSON.stringify(this.asanaArray)} </Text> */}

        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => this._storeData()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Save Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._removeClass()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Remove Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._handleAddExercisePress()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonButtonText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>

        {/* <Text>{this.savedClassName}</Text> */}
      </View>
    );
  }
  _removeClass() {
    //save with the current class removed
    
    for (i = 0; i < this.allClasses.length; i++) {
      if (this.allClasses[i].key == this.savedClassName) {
        this.allClasses.splice(i, 1); 
        break;
      }
    }
    AsyncStorage.setItem(
      this.savedClassesKey,
      JSON.stringify(this.allClasses)
    );
    this.props.navigation.popToTop();
  }
  setName(input) {
    this.savedClassName = input;

    this.props.navigation.setParams({ key: this.savedClassName });
    this._storeData();

    this.showDialog(false);
  }

  showDialog(value) {
    this.setState({ isDialogVisible: value });
  }
  renderRemovedItems() {
    if (this.removedAsanaArray.length == 0) {
      return <Text>There is nothing to add </Text>;
    } else {
      return (
        <FlatList
          data={this.removedAsanaArray}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.joinData(item);
                this.toggleModal(!this.state.modalVisible);
              }}
            >
              <AddAsanaRow
                rowNumber={item.key}
                title={item.title}
                description={item.description}
              />
            </TouchableOpacity>
          )}
        />
      );
    }
  }

  _handleAddExercisePress = () => {
    this.toggleModal(true);
    //this.joinData();
  };
}

const styles = StyleSheet.create({
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
  },
  buttonContainer: {
    margin: 10
  },
  mainContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff"
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 5
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    alignItems: "center"
  },
  addExercises: {
    paddingVertical: 15
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  textInputModal: {}
});
