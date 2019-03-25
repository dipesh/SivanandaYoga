import React from 'react';
import {Animated, Easing, View, ListView, FlatList, StyleSheet, Text,
    Dimensions, Platform, } from 'react-native';
import AddAsanaRow from './AddAsanaRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const AddAsanaListview = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            extraData={itemList}
            renderItem={({ item }) =>
                <AddAsanaRow
                    rowNumber={item.key}
                    title={item.title}
                    description={item.description}
                    isDeleted={item.isDeleted}
                />
            }
        />
    </View>
);

export default AddAsanaListview;