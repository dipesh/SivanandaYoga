import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Picker } from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable-row';

export default class AddAsanaRow extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        //rowNumber: PropTypes.number, //this exists
        title: PropTypes.string,

        description: PropTypes.string,
    }

    render = () => {
        return (
            <View style={styles.container}>
                {/* <Image source={{ uri: this.props.image_url }} style={styles.photo} /> */}
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.description}>
                        {this.props.description}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 16,
        color: '#000',
        marginTop: 5
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
        marginBottom: 5
    },
});