import React from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Linking
} from "react-native";

/**
 * HowToScreen will display a list of asanas and the user can click them
 * to view a tutorial on youtube
 * 
 * TODO:
 * Some tutorials for the asanas and pranayam are still being done.
 * For the prayers a link to the lyrics of the chant can be shown
 */

export default class HowToScreen extends React.Component {
  static navigationOptions = {
    title: "How To"
  };

  constructor(props) {
    super(props);
    this.asanaArray = this.getAsanaArray();

    this.state = {
      arrayHolder: this.asanaArray
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.arrayHolder}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </ScrollView>
    );
  }
  renderItem = item => {
    if (item.description == "") {
      return (
          <Text style={styles.textRow}>{item.title} (Not Available)</Text>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.openLink(item.description)}>
          <Text style={styles.linkRow}>{item.title}</Text>
        </TouchableOpacity>
      );
    }
  };
  openLink(url) {
    //On android this will open the youtube app,
    //
    Linking.openURL(url);
  }
  getAsanaArray() {
    let arr = [
      // {
      //   key: "0",
      //   title: "Opening Prayer",
      //   description: ""
      // },
      // {
      //   key: "1",
      //   title: "Kapalabhati",
      //   description: ""
      // },
      // {
      //   key: "2",
      //   title: "Anuloma Viloma",
      //   description: ""
      // },
      // {
      //   key: "3",
      //   title: "Surya Namaskar",
      //   description: ""
      // },
      // {
      //   key: "4",
      //   title: "Single Leg Raises",
      //   description: ""
      // },
      // {
      //   key: "5",
      //   title: "Double Leg Raises",
      //   description: ""
      // },
      {
        key: "6",
        title: "Sirshasana",
        description:
          "https://www.youtube.com/watch?v=XoyICRpeEzU&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=2"
      },
      {
        key: "7",
        title: "Sarvangasana",
        description:
          "https://www.youtube.com/watch?v=_ZLDgittH6Y&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=3"
      },
      {
        key: "8",
        title: "Halasana",
        description:
          "https://www.youtube.com/watch?v=mRRQ22ZwqkM&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=4"
      },
      {
        key: "9",
        title: "Matsyasana",
        description:
          "https://www.youtube.com/watch?v=WNDAPXet2gU&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=5"
      },
      {
        key: "10",
        title: "Paschimothanasana",
        description:
          "https://www.youtube.com/watch?v=8ZI7Qdpo1uQ&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=6"
      },
      // {
      //   key: "11",
      //   title: "Inclined Plane",
      //   description: ""
      // },
      {
        key: "12",
        title: "Bhujangasana",
        description:
          "https://www.youtube.com/watch?v=8J3dozEZf3g&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=7"
      },
      {
        key: "13",
        title: "Salabhasana",
        description:
          "https://www.youtube.com/watch?v=u7YW7iTjJ3A&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=8"
      },
      {
        key: "14",
        title: "Dhanurasana",
        description:
          "https://www.youtube.com/watch?v=zXWRjzt-MnI&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=9"
      },
      {
        key: "15",
        title: "Ardha Matsyendrasana",
        description:
          "https://www.youtube.com/watch?v=qPPJIl0fnBg&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=10"
      },
      {
        key: "16",
        title: "Kakasana",
        description:
          "https://www.youtube.com/watch?v=sK6Fv6VhavQ&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=11"
      },
      {
        key: "17",
        title: "Pada Hasthasana",
        description: "https://www.youtube.com/watch?v=r2P7Qg9ZyhQ&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=12"
      },
      {
        key: "18",
        title: "Trikonasana",
        description: "https://www.youtube.com/watch?v=jIgE9UO3Zs0&list=PL8S-896CdoehMZg0D_BFaBLjGxCkoK8cL&index=13"
      },
      // {
      //   key: "19",
      //   title: "Savasana",
      //   description: ""
      // },
      // {
      //   key: "20",
      //   title: "Final Prayer",
      //   description: ""
      // }
    ];

    return arr;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  linkRow: {
    margin: 5,
    fontSize: 14,
    color: "#2e78b7"
  },
  textRow: {
    margin: 5,
    fontSize: 14,
  }
});
