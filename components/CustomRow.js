import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Picker } from 'react-native';

const CustomRow = ({ rowNumber, title, description, image_url, handleRemovePress }) => (
    <View style={styles.container}>
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {description}
            </Text>
        </View>
        <Picker 
            style={{height: 50, width: 100}}
            // onValueChange={(itemValue, itemIndex) =>
            //     this.setState({language: itemValue})
            // }
            >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <TouchableOpacity onPress= {()=> handleRemovePress(rowNumber)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>x</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    removeButton: {
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    removeButtonText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
export default CustomRow;