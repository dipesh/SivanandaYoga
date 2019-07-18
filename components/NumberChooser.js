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

/**
 * NumberChooser is a component that allows users to select a number without typing it in
 * There is a - and + button to the left and right of the number
 * which will increment the chosen value by 'incrementValue'
 * There can also be a initial value
 */
export default class NumberChooser extends Component {
  constructor(props) {
    super(props);

    this.number = this.props.initialValue;
    if(this.number==undefined){
      this.number = 0;
    }
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
          <Text>-</Text>
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
          <Text>+</Text>
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
    flexDirection: "row",
  },
  button: {
    height: 40,
    width: 40,
    borderColor: "#eee",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textBox: {
    height: 40,
    width: 50,
    borderColor: "#eee",
    borderWidth: 1,
    textAlign: "center"
  }
});
