import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import EditClassScreen from "../screens/EditClassScreen";
import StartClassScreen from "../screens/StartClassScreen";
import MainScreen from "../screens/MainScreen";
import MeditationScreen from "../screens/MeditationScreen";
import HowToScreen from "../screens/HowToScreen";


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

const HowToStack = createStackNavigator({
  Home: HowToScreen,
});

HowToStack.navigationOptions = {
  tabBarLabel: "How To",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  HowToStack,
  MeditationStack,
});
