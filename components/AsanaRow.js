import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";
import PropTypes from "prop-types";
import NumberChooser from "../components/NumberChooser";
import Swipeable from "react-native-swipeable-row";
import NumericInput from "react-native-numeric-input";

export default class AsanaRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      holdTime: this.props.holdTime,
      rounds: this.props.rounds,
      actionsPerRound: this.props.actionsPerRound,
      retentionLength: this.props.retentionLength,
      ratioPerRound: this.props.ratioPerRound,
      currentlyOpenSwipeable: null
    };
  }
  keyCount = 0;

  static propTypes = {
    //rowNumber: PropTypes.number, //this exists
    title: PropTypes.string,

    description: PropTypes.string,
    //image_url: PropTypes.string,
    //updateHoldTime
    //handleRemovePress, this will be a function

    //asanas have
    holdTime: PropTypes.number,

    //kapalabhati has
    rounds: PropTypes.number,
    actionsPerRound: PropTypes.number,
    retentionLength: PropTypes.number,

    //anulom has
    //rounds: PropTypes.number, //no need to declare twice
    ratioPerRound: PropTypes.number
  };

  render = () => {
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (
          this.state.currentlyOpenSwipeable &&
          this.state.currentlyOpenSwipeable !== swipeable
        ) {
          this.state.currentlyOpenSwipeable.recenter();
        }
        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null })
    };

    return (
      <Swipeable
        rightButtons={[
          <TouchableOpacity
            onPress={() => {
              //console.log("asana row " + this.props.title)
              this.props.handleRemovePress(this.props.rowNumber);
              this.state.currentlyOpenSwipeable.recenter();
            }}
            style={[styles.rightSwipeItem, { backgroundColor: "red" }]}
          >
            <Text style={styles.whiteText}>Remove</Text>
          </TouchableOpacity>
        ]}
        onRightButtonsOpenRelease={itemProps.onOpen}
        onRightButtonsCloseRelease={itemProps.onClose}
      >
        {this.createView()}
      </Swipeable>
    );
  };

  createView() {
    return (
      <View style={styles.container}>
        {/* <Image source={{ uri: this.props.image_url }} style={styles.photo} /> */}

        <View style={styles.container_text}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>

        {this.createPicker(this.props.title)}
      </View>
    );
  }

  createPicker(title) {
    let view = [];

    if(title == "Opening Prayer" || title == "Final Prayer"){

    }
    else if (title == "Kapalabhati") {
      view.push(
        <View key={this.keyCount++}>
          <View style={styles.container_text} key={this.keyCount++}>
            <Text style={styles.label}>Rounds:</Text>
            <NumberChooser
              onValueChange={itemValue => {
                this.setState({ rounds: itemValue });
                this.props.updateRounds(this.props.rowNumber, itemValue);
              }}
              initialValue={this.props.rounds}
              minValue={3}
              //maxValue={10}
              incrementValue={1}
            />
          </View>
          <View style={styles.container_text} key={this.keyCount++}>
            <Text style={styles.label}>Actions Per Round:</Text>
            <NumberChooser
              onValueChange={itemValue => {
                this.setState({ actionsPerRound: itemValue });
                this.props.updateActionsPerRound(
                  this.props.rowNumber,
                  itemValue
                );
              }}
              initialValue={this.props.actionsPerRound}
              minValue={30}
              //maxValue={10}
              incrementValue={5}
            />
          </View>
        </View>
      );
      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <Text style={styles.label}>Retention Length</Text>
          <NumberChooser
            onValueChange={itemValue => {
              this.setState({ retentionLength: itemValue });
              this.props.updateRetentionLength(this.props.rowNumber, itemValue);
            }}
            initialValue={this.props.retentionLength}
            minValue={15}
            //maxValue={10}
            incrementValue={5}
          />
        </View>
      );
    } else if (title == "Anulom" || title == "Anulom Viloma") {
      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <Text style={styles.label}>Rounds:</Text>
          <NumberChooser
            onValueChange={itemValue => {
              this.setState({ rounds: itemValue });
              this.props.updateRounds(this.props.rowNumber, itemValue);
            }}
            initialValue={this.props.rounds}
            minValue={15}
            //maxValue={10}
            incrementValue={5}
          />
        </View>
      );

      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <Text style={styles.label}>Ratio Per Round:</Text>
          <NumberChooser
            onValueChange={itemValue => {
              this.setState({ ratioPerRound: itemValue });
              this.props.updateRatioPerRound(this.props.rowNumber, itemValue);
            }}
            initialValue={this.props.ratioPerRound}
            minValue={4}
            //maxValue={10}
            //incrementValue={1}
          />
        </View>
      );
    } else {
      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <Text style={styles.label}>Hold time (sec):</Text>
          <NumberChooser
            onValueChange={itemValue => {
              this.setState({ holdTime: itemValue });
              this.props.updateHoldTime(this.props.rowNumber, itemValue);
            }}
            initialValue={this.props.holdTime}
            minValue={30}
            //maxValue={900}
            incrementValue={15}
          />
        </View>
      );
    }

    return view;
  }
  createKapalabatiRoundsRows = () => {
    let rows = [];
    for (let i = 3; i < 10; i++) {
      let num = i;
      rows.push(<Picker.Item key={i} label={num.toString()} value={num} />);
    }
    return rows;
  };
  createKapalabatiActionsPerRoundRows = () => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
      let num = i * 5 + 30;
      rows.push(
        <Picker.Item key={i} label={num.toString() + " sec"} value={num} />
      );
    }
    return rows;
  };
  createKapalabatiRetentionRows = () => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
      let num = i * 5 + 15;
      rows.push(
        <Picker.Item key={i} label={num.toString() + " sec"} value={num} />
      );
    }
    return rows;
  };
  createAnulomRoundsRows = () => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
      let num = i * 5 + 15;
      rows.push(<Picker.Item key={i} label={num.toString()} value={num} />);
    }
    return rows;
  };
  createAnulomRatioRows = () => {
    let rows = [];
    for (let i = 4; i < 9; i++) {
      let num = i;
      rows.push(
        <Picker.Item key={i} label={num.toString() + " sec"} value={num} />
      );
    }
    return rows;
  };
  createAsanaRows = () => {
    let rows = [];
    for (let i = 1; i < 20; i++) {
      let num = i * 15;
      rows.push(
        <Picker.Item key={i} label={num.toString() + " sec"} value={num} />
      );
    }
    // for (let i = 0; i < rows.length; i++) {
    //     rows[i].key = i.toString();
    // }
    return rows;
  };
}

const styles = StyleSheet.create({
  Swipeable: {
    alignItems: "flex-start"
  },
  picker: {
    height: 50,
    width: 120
  },
  pickerRow: {
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  row: {
    flexDirection: "row"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#FFF",
    elevation: 2,
    alignItems: "flex-start"
  },
  title: {
    fontSize: 16,
    color: "#000"
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 8
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,

    marginBottom: 5
  },
  description: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 5,
  },
  photo: {
    height: 50,
    width: 50
  },
  removeButton: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  removeButtonText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  whiteText: {
    color: "white"
  }
});
//export default AsanaRow;
