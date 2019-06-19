import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import EditClassScreen from "../screens/EditClassScreen";
import StartClassScreen from "../screens/StartClassScreen";
import StartStandardClassScreen from "../screens/StartStandardClassScreen";
import MainScreen from "../screens/MainScreen";
import MeditationScreen from "../screens/MeditationScreen";
import HowToScreen from "../screens/HowToScreen";


const HomeStack = createStackNavigator({
  Home: MainScreen,
  StartClassScreen: {
    screen: StartClassScreen
  },
  StartStandardClassScreen:{
    screen: StartStandardClassScreen
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
      // name={
      //   Platform.OS === "ios"
      //     ? `ios-information-circle${focused ? "" : "-outline"}`
      //     : "md-information-circle"
      // }
      name={"ios-body"}
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
      name={"md-rose"}
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
      name={"md-help-circle"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  HowToStack,
  MeditationStack,
});
