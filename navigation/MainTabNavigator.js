import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import EditClassScreen from "../screens/EditClassScreen";
import LinksScreen from "../screens/LinksScreen";
import StartClassScreen from "../screens/StartClassScreen";
import MainScreen from "../screens/MainScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MeditationScreen from "../screens/MeditationScreen";


const HomeStack = createStackNavigator({
  Home: MainScreen,
  StartClassScreen: {
    screen: StartClassScreen
  },
  EditClassScreen: {
    screen: EditClassScreen
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: "Yoga",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const MeditationStack = createStackNavigator({
  Home: MeditationScreen,
  // StartClassScreen: {
  //   screen: StartClassScreen
  // },
  // EditClassScreen: {
  //   screen: EditClassScreen
  // }
});

MeditationStack.navigationOptions = {
  tabBarLabel: "Meditation",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Home: MainScreen,
  StartClassScreen: {
    screen: StartClassScreen
  },
  EditClassScreen: {
    screen: EditClassScreen
  }
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  MeditationStack,
  HomeStack,
  //SettingsStack
});
