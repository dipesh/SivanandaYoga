import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";

export default class StartClassScreen extends React.Component {
  

  constructor(props) {
    super(props);

    let name = this.props.navigation.getParam('name', 'NAME ERROR');

    const {setParams} = this.props.navigation;
    setParams({ title: name })
  }
  
  static navigationOptions = {
    title: 'hi' //this.className
  };

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
      </ScrollView>
      //list of asana
    );
  }

  startPause() {}

  editClass() {
    //let a = 'a'
    this.props.navigation.navigate('EditClassScreen');

  }
}

const styles = StyleSheet.create({
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
