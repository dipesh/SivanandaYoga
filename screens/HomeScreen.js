import React from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Modal,
    FlatList,
    TouchableWithoutFeedback,

} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import AddAsanaRow from '../components/AddAsanaRow'
import AsanaListview from '../components/AsanaListview'
import AddAsanaListview from '../components/AddAsanaListview'
import { AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);


        //
        //
        //[
        //{"name":"class 1", "item":{"key":"0","title":"Kapalabhati"}},
        //{"name":"class 2", "item":{"key":"1","title":"Anulom"}}
        //]
        //
        this.savedClassName = "tempName"//this.props.name;
        this.savedClassesKey = "SivanandaSavedClasses";
        this.ajustableClassName = "Adjustable Class 1";

        this.asanaArray = this.getAsanasArray();
        //.concat(this.getPranayamArray());

        this.removedAsanaArray = [];

        this.allClasses = this._retrieveData();

        this.state = {
            allClassesHolder: this.allClasses,
            arrayHolder: [],
            //removedAsanaArray: [],
            textInput_Holder: '',
            modalVisible: false,
        }

    }

    _storeData = async () => {  
        console.log("save data");

        for (i = 0; i < this.allClasses.length; i++) {
            if(this.allClasses[i].name == this.savedClassName){
                this.allClasses[i].item = asanaArray;
            }
            else{
                let arr = [{
                      name: this.savedClassName,
                    }]
                arr.item = asanaArray;
                this.allClasses.push(arr);
                this.setState({ allClassesHolder: [...this.allClasses] })
            }
        }

        try {
            await AsyncStorage.setItem(this.savedClassesKey, JSON.stringify(this.state.allClassesHolder));
            
        } catch (error) {
            // Error saving data
           

        } 
    } 
    _retrieveData = async () => {
        try {
            console.log("load data");
            const value = await AsyncStorage.getItem(this.savedClassesKey);
            
            console.log("load value " + value);
            
            if (value !== null) {
                // We have data!!
  
                var allClassesArray = JSON.parse(value);
                let itemArray = []
 
                allClassesArray.forEach(element => {
                    if(element.name == this.savedClassName){
                        itemArray = element.item; 
                    }
                });

                this.setState({ arrayHolder: [...itemArray] })

                console.log(value);
            }
            else{
                //there are no saved classes 
            }
        } catch (error) {
            // Error retrieving data
            console.log("load error: "+error);
            try { 
                AsyncStorage.removeItem(this.savedClassesKey);
                console.log("removed data");
            } catch (error) {}
        }
    };
   
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    getAsanasArray() {
        //the key also represents the order
        let arr = [
            {
                key: "0",
                title: 'Kapalabhati',
                description: 'Kapalabhati',
                image_url: ' ',
            },
            {
                key: "1",
                title: 'Anulom Viloma',
                description: 'Anulom Viloma',
                image_url: ' ',
            },
            {
                key: "2",
                title: 'Sirshasana',
                description: 'Sirshasana',
                image_url: ' ',
            },
            {
                key: "3",
                title: 'Sarvangasana',
                description: 'Sarvangasana',
                image_url: ' ',
            },
            // {
            //   key: 0, 
            //   title: 'Halasana',
            //   description: 'Halasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Matsyasana',
            //   description: 'Matsyasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Paschimothanasana',
            //   description: 'Paschimothanasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Bhujangasana',
            //   description: 'Bhujangasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Salabhasana',
            //   description: 'Salabhasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Dhanurasana',
            //   description: 'Dhanurasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Ardha Matsyendrasana',
            //   description: 'Ardha Matsyendrasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Kakasana',
            //   description: 'Kakasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Pada Hasthasana',
            //   description: 'Pada Hasthasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Trikonasana',
            //   description: 'Trikonasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
            // {
            //   key: 0, 
            //   title: 'Savasana',
            //   description: 'Savasana',
            //   image_url: ' ', 
            //   holdTime: 30,
            //   handleRemovePress: this.deleteData,
            //   updateHoldTime: this.updateHoldTime
            //   isDeleted: false,
            // },
        ]
         
        for (i = 0; i < arr.length; i++) {
            arr[i].isDeleted = false;
            arr[i].handleRemovePress = this.deleteData;

            arr[i].holdTime = 30;
            arr[i].updateHoldTime = this.updateHoldTime;

            arr[i].actionsPerRound = 35;
            arr[i].updateActionsPerRound = this.updateActionsPerRound;
            arr[i].retentionLength = 20;
            arr[i].updateRetentionLength = this.updateRetentionLength;
            arr[i].rounds = 20;
            arr[i].updateRounds = this.updateRounds;
            arr[i].ratioPerRound = 5;
            arr[i].updateRatioPerRound = this.updateRatioPerRound;
        }
        return arr;
    }

    componentDidMount() {
        this.setState({ arrayHolder: [...this.asanaArray] })
    }

    deleteData = (rowNumber) => {
        this.asanaArray[rowNumber].isDeleted = true;
        this.removedAsanaArray.push(this.asanaArray[rowNumber]);

        this.asanaArray.splice(rowNumber, 1);

        for (i = 0; i < this.asanaArray.length; i++) {
            this.asanaArray[i].key = i;
        }
        this.setState({ arrayHolder: [...this.asanaArray] })

    }

    joinData = (item) => {
        this.asanaArray.push(item);
        this.setState({ arrayHolder: [...this.asanaArray] })

        this.removedAsanaArray.splice(item.rowNumber, 1);

        for (i = 0; i < this.asanaArray.length; i++) {
            this.asanaArray[i].key = i;
        }
    }
    updateHoldTime = (rowNumber, holdTime) => {
        this.asanaArray[rowNumber].holdTime = holdTime;
        this.setState({ arrayHolder: [...this.asanaArray] })
    }
    updateRounds = (rowNumber, rounds) => {
        this.asanaArray[rowNumber].rounds = rounds;
        this.setState({ arrayHolder: [...this.asanaArray] })
    }
    updateActionsPerRound = (rowNumber, actionsPerRound) => {
        this.asanaArray[rowNumber].actionsPerRound = actionsPerRound;
        this.setState({ arrayHolder: [...this.asanaArray] })
    }
    updateRetentionLength = (rowNumber, retentionLength) => {
        this.asanaArray[rowNumber].retentionLength = retentionLength;
        this.setState({ arrayHolder: [...this.asanaArray] })
    }
    updateRatioPerRound = (rowNumber, ratioPerRound) => {
        this.asanaArray[rowNumber].ratioPerRound = ratioPerRound;
        this.setState({ arrayHolder: [...this.asanaArray] })
    }
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <View style={styles.modal}>

                        {this.renderRemovedItems()}
                        <TouchableOpacity style={styles.addExercises}
                            onPress={() => { this.toggleModal(!this.state.modalVisible) }}>
                            <Text style={styles.linkText}>Close Modal</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.helpContainer}>
                        <TouchableOpacity onPress={this._handleAddExercisePress} style={styles.addExercises}>
                            <Text style={styles.linkText}>Add Exercise</Text>
                        </TouchableOpacity>
                    </View>
                    <AsanaListview itemList={this.state.arrayHolder} />
                </ScrollView>
                {/* <Text> {JSON.stringify(this.asanaArray)} </Text> */}

                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => this._storeData()} style={styles.headerButton}>
                        <Text style={styles.headerButtonButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._retrieveData()} style={styles.headerButton}>
                        <Text style={styles.headerButtonButtonText}>Load</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    // saveData(){

    // }

    loadData(){
        console.log("load data");
    }
    renderRemovedItems() {

        if (this.removedAsanaArray.length == 0) {
            return (<Text>There is nothing to add </Text>)
        }
        else {
            return (<FlatList
                data={this.removedAsanaArray}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => {
                        this.joinData(item);
                        this.toggleModal(!this.state.modalVisible)
                    }}>
                        <AddAsanaRow
                            rowNumber={item.key}
                            title={item.title}
                            description={item.description}
                            isDeleted={item.isDeleted}
                        />
                    </TouchableOpacity>
                }
            />)
        }
    }
    _handleAddExercisePress = () => {
        this.toggleModal(true);
        //this.joinData();
    };
}

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    headerButtonButtonText: {
        textAlign: 'center',
    },
    headerButton: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'powderblue',
        padding: 10,
        margin: 10
    },
    buttonContainer: {
        margin: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    addExercises: {
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
