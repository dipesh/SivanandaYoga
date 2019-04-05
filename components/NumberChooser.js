import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  AsyncStorage
} from "react-native";

export default class NumberChooser extends Component {
  constructor(props) {
    super(props);

    this.number = this.props.initialValue;
    this.incrementValue = "incrementValue" in this.props ? this.props.incrementValue : 1;
    this.state = {
      number: this.number
    };
  }

  render = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.buttonPress(0 - this.incrementValue)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          editable={false}
          style={styles.textBox}
          onChangeText={(number) => {
            this.setState({ number: number })
            }}
          value={this.state.number.toString()}
        />
        <TouchableOpacity
          onPress={() => this.buttonPress(this.incrementValue)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  buttonPress(value) {
    let newNumber =  this.number + value;;

    let minValueCheck = true;
    let maxValueCheck = true;
    if ("minValue" in this.props && newNumber < this.props.minValue) {
      minValueCheck = false;
    }
    if ("maxValue" in this.props && newNumber > this.props.maxValue) {
      maxValueCheck = false;
    }

    if (maxValueCheck && minValueCheck) {
      this.number += value;
      this.setState({ number: this.number });
      this.props.onValueChange(this.number);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  button: {
    height: 40,
    width: 30,
    borderColor: "#eee",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {},
  textBox: {
    height: 40,
    width: 50,
    borderColor: "#eee",
    borderWidth: 1,
    textAlign: "center"
  }
});
