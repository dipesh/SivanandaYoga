import React, { Component } from 'react';
import { View, ListView, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from './CustomRow';
import AsanaRow from './AsanaRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default class AsanaListview extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    static propTypes = {
        //itemList
    }

    render = () => {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.itemList}
                    extraData={this.props.itemList}
                    renderItem={({ item }) =>
                        <AsanaRow
                            rowNumber={item.key}
                            title={item.title}
                            description={item.description}
                            image_url={item.image_url}
                            holdTime={item.holdTime}
                            rounds={item.rounds}
                            actionsPerRound={item.actionsPerRound}
                            retentionLength={item.retentionLength}
                            ratioPerRound={item.ratioPerRound}
                            handleRemovePress={item.handleRemovePress}
                            updateHoldTime={item.updateHoldTime}
                            updateRounds={item.updateRounds}
                            updateActionsPerRound={item.updateActionsPerRound}
                            updateRetentionLength={item.updateRetentionLength}
                            updateRatioPerRound={item.updateRatioPerRound}
                            isDeleted={item.isDeleted}
                        />
                    }
                />
            </View>
            )
    }
}