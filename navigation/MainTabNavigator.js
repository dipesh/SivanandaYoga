import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import EditClassScreen from "../screens/EditClassScreen";
import StartClassScreen from "../screens/StartClassScreen";
import StartStandardClassScreen from "../screens/StartStandardClassScreen";
import MainScreen from "../screens/MainScreen";
import MeditationScreen from "../screens/MeditationScreen";
import HowToScreen from "../screens/HowToScreen";
//import LoadingScreen from "../screens/LoadingScreen";

const MainStack = createStackNavigator({
  // LoadingScreen:{

  //   screen: LoadingScreen
  // },
  Home: {
    screen: MainScreen
  },
  StartClassScreen: {
    screen: StartClassScreen
  },
  StartStandardClassScreen: {
    screen: StartStandardClassScreen
  },
  EditClassScreen: {
    screen: EditClassScreen
  }
});

// MainStack.navigationOptions = {
//   tabBarLabel: "Yoga",
//   tabBarVisible: false,
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       // name={
//       //   Platform.OS === "ios"
//       //     ? `ios-information-circle${focused ? "" : "-outline"}`
//       //     : "md-information-circle"
//       // }
//       name={"ios-body"}
//     />
//   ),

// };

MainStack.navigationOptions = ({ navigation }) => {
  let hideHeader = navigation.state;
  //console.log(hideHeader)
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: "Yoga",
    //tabBarVisible: false,
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
};
// MainStack.navigationOptions = ({ navigation }) => {
//   const { params = {} } = navigation.state;
//   const { state } = navigation;
//   const routes = state.routes[state.index];

// /**
//  * verify the current state of tabBarVisible from navigation params
//  * if isn't avaliable, will set default as true
//  */
//   const visible = state.routes[state.index].params ? state.routes[state.index].params.tabBarVisible : true;

//   if (!visible) {
//     return {
//       //tabBarVisible: false,
//       header: null,
//       tabBarVisible: false,
//       // title: "MainD",
//       // tabBarVisible: false
//     };
//   }

//   return {
//     tabBarVisible: true,
//   };

// };

const MeditationStack = createStackNavigator({
  Home: MeditationScreen
});

MeditationStack.navigationOptions = {
  tabBarLabel: "Meditation",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"md-rose"} />
};

const HowToStack = createStackNavigator({
  Home: HowToScreen
});

HowToStack.navigationOptions = {
  tabBarLabel: "How To",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-help-circle"} />
  )
};

export default createBottomTabNavigator({
  MainStack,
  HowToStack,
  MeditationStack
});
