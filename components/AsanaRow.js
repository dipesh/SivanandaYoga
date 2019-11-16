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

var globalStyle = require("../style");

export default class AsanaRow extends React.PureComponent {
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
    let removeButton = [
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
    ];

    if (
      this.props.title == "Opening Prayer" ||
      this.props.title == "Final Prayer"
    ) {
      //the prayers cannot be removed
      return this.createView();
    } else {
      return (
        <Swipeable
          rightButtons={removeButton}
          onRightButtonsOpenRelease={itemProps.onOpen}
          onRightButtonsCloseRelease={itemProps.onClose}
        >
          {this.createView()}
        </Swipeable>
      );
    }
  };

  createView() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.container_text}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.description}>{this.props.description}</Text>
          </View>

          {this.createPicker(this.props.title)}
        </View>
        <View style={globalStyle.separator} />
      </View>
    );
  }

  //each asana has their own attributes, min and max value
  //so they will be drawn differently
  createPicker(title) {
    let view = [];

    if (
      title == "Opening Prayer" ||
      title == "Final Prayer" 
    ) {
    } else if (title == "Kapalabhati") {
      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <View style={styles.container_text} key={this.keyCount++}>
            <Text style={styles.label}>Rounds:</Text>
            <NumberChooser
              onValueChange={itemValue => {
                this.setState({ rounds: itemValue });
                this.props.updateRounds(this.props.rowNumber, itemValue);
              }}
              initialValue={this.props.rounds}
              minValue={1}
              maxValue={5}
              incrementValue={1}
            />
          </View>
          <View style={styles.container_text} key={this.keyCount++}>
            <Text style={styles.label}>Pumpings Per Round:</Text>
            <NumberChooser
              onValueChange={itemValue => {
                this.setState({ actionsPerRound: itemValue });
                this.props.updateActionsPerRound(
                  this.props.rowNumber,
                  itemValue
                );
              }}
              initialValue={this.props.actionsPerRound}
              minValue={50}
              maxValue={200}
              incrementValue={5}
            />
          </View>
          <View style={styles.container_text} key={this.keyCount++}>
            <Text style={styles.label}>Retention Length</Text>
            <NumberChooser
              onValueChange={itemValue => {
                this.setState({ retentionLength: itemValue });
                this.props.updateRetentionLength(
                  this.props.rowNumber,
                  itemValue
                );
              }}
              initialValue={this.props.retentionLength}
              minValue={30} //45
              maxValue={120}
              incrementValue={5}
            />
          </View>
        </View>
      );
      // view.push(

      // );
    } else if (title == "Anuloma Viloma") {
      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <View style={styles.container_text} key={this.keyCount++}>
            <Text style={styles.label}>Rounds:</Text>
            <NumberChooser
              onValueChange={itemValue => {
                this.setState({ rounds: itemValue });
                this.props.updateRounds(this.props.rowNumber, itemValue);
              }}
              initialValue={this.props.rounds}
              minValue={4} //5
              maxValue={20}
              incrementValue={1} //5
            />
          </View>
          <View style={styles.container_text} key={this.keyCount++}>
            <Text style={styles.label}>Count Per Round:</Text>
            <NumberChooser
              onValueChange={itemValue => {
                this.setState({ ratioPerRound: itemValue });
                this.props.updateRatioPerRound(this.props.rowNumber, itemValue);
              }}
              initialValue={this.props.ratioPerRound}
              minValue={4}
              maxValue={8}
              incrementValue={1}
            />
          </View>
        </View>
      );
    } else if (
      title == "Surya Namaskar" ||
      title == "Single Leg Raises" ||
      title == "Double Leg Raises"
    ) {
      let labelText = "Rounds:";
      let minValue = 0;
      let maxValue = 0;

      if (title == "Surya Namaskar") {
        labelText = "Rounds (per leg):";
        minValue = 4;
        maxValue = 54;
      } else if (title == "Single Leg Raises") {
        minValue = 3;
        maxValue = 6;
      } else if (title == "Double Leg Raises") {
        minValue = 4;
        maxValue = 20;
      }

      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <Text style={styles.label}>{labelText}</Text>
          <NumberChooser
            onValueChange={itemValue => {
              this.setState({ rounds: itemValue });
              this.props.updateRounds(this.props.rowNumber, itemValue);
            }}
            initialValue={this.props.rounds}
            minValue={minValue} //5
            maxValue={maxValue}
            incrementValue={1}
          />
        </View>
      );
    } else {
      let minValue = 0;
      let maxValue = 0;
      let incrementValue = 0;

      if (
        title == "Sirshasana" ||
        title == "Sarvangasana" ||
        title == "Paschimothanasana"
      ) {
        minValue = 120;
        maxValue = 1200;
        incrementValue = 15;
      } else if (
        title == "Halasana" ||
        title == "Matsyasana" ||
        title == "Ardha Matsyendrasana" ||
        title == "Pada Hasthasana" ||
        title == "Trikonasana"
      ) {
        minValue = 30;
        maxValue = 600;
        incrementValue = 15;
      } else if (title == "Inclined Plane") {
        minValue = 30;
        maxValue = 60;
        incrementValue = 5;
      } else if (
        title == "Bhujangasana" ||
        title == "Dhanurasana" ||
        title == "Kakasana-Mayurasana"
      ) {
        minValue = 30;
        maxValue = 120;
        incrementValue = 5;
      } else if (title == "Salabhasana") {
        minValue = 15;
        maxValue = 120;
        incrementValue = 5;
      } else if(title == "Savasana"){
        minValue = 60;
        maxValue = 1200;
        incrementValue = 30;
      }

      view.push(
        <View style={styles.container_text} key={this.keyCount++}>
          <Text style={styles.label}>Hold time (sec):</Text>
          <NumberChooser
            onValueChange={itemValue => {
              this.setState({ holdTime: itemValue });
              this.props.updateHoldTime(this.props.rowNumber, itemValue);
            }}
            initialValue={this.props.holdTime}
            minValue={minValue} 
            maxValue={maxValue}
            incrementValue={incrementValue}
          />
        </View>
      );
    }

    return view;
  }
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
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
    elevation: 2,
    alignItems: "flex-start"
  },
  title: {
    fontSize: 18,
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
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 5
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
