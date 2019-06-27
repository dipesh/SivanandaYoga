'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  
  mainContainer: {
    flex:1,
    backgroundColor: "#f1f0f1"
  },
  sectionContainer: {
    margin: 10,
    backgroundColor: "#fff"
  },
  headerLabel: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  button: {
    //flex: 0.3,
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //minWidth: 50,
    height: 50,
    backgroundColor: "#72c9ba",
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    margin: 10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listItemText: {
    margin: 10,
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f0f1',
  },
  horizontalContainer: {
    flexDirection: "row"
  },
});