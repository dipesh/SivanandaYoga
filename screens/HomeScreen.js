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

        this.savedClassesKey = "SivanandaSavedClasses";
        this.ajustableClassName = "Adjustable Class 1";

        this.asanaArray = this.getAsanasArray();
        //.concat(this.getPranayamArray());

        this.allAsanaArray;
        this.removedAsanaArray = [];

        this.state = {
            arrayHolder: [],
            //removedAsanaArray: [],
            textInput_Holder: '',
            modalVisible: false,
        }

    }

    saveYoga() {
        try {
            await AsyncStorage.setItem('@MySuperStore:SivanandaSavedClasses', ' JSON.stringify(UID234_delta)');
        } catch (error) {
            // Error saving data
        }
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('TASKS');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    loadYoga(){

    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    getAsanasArray() {
        let arr = [
            {
                key: 0,
                title: 'Kapalabhati',
                description: 'Kapalabhati',
                image_url: ' ',
                rounds: 4,
                actionsPerRound: 35,
                retentionLength: 20,
                handleRemovePress: this.deleteData,
                updateRounds: this.updateRounds,
                updateActionsPerRound: this.updateActionsPerRound,
                updateRetentionLength: this.updateRetentionLength,
                isDeleted: false,
            },
            {
                key: 1,
                title: 'Anulom',
                description: 'Anulom',
                image_url: ' ',
                rounds: 20,
                ratioPerRound: 5,
                handleRemovePress: this.deleteData,
                updateRounds: this.updateRounds,
                updateRatioPerRound: this.updateRatioPerRound,
                isDeleted: false,
            },
            {
                key: 2,
                title: 'Sirshasana',
                description: 'Sirshasana',
                image_url: ' ',
                holdTime: 30,
                handleRemovePress: this.deleteData,
                updateHoldTime: this.updateHoldTime,
                isDeleted: false,
            },
            {
                key: 3,
                title: 'Sarvangasana',
                description: 'Sarvangasana',
                image_url: ' ',
                holdTime: 30,
                handleRemovePress: this.deleteData,
                updateHoldTime: this.updateHoldTime,
                isDeleted: false,
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
            arr[i].key = i.toString();
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
            </View>
        );
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
