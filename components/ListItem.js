import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
export function ListItem( props ) {
    return (
        <View style={ ( props.completed ) ? styles.itemDone : styles.item }>
            <View style={ styles.listText }>
                <Text style={ styles.itemName }>{ props.name }</Text>
            </View>
            <View>
                <TouchableHighlight 
                    style={styles.updateButton}
                    onPress={ () => props.update( props.id ) }
                >
                    <Text>Update</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    itemName: {
        fontSize: 16,
    },
    item: {
        padding: 10,
        flexDirection: 'row'
    },
    itemDone: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#a4fcb8',
    },
    listText: {
        flex: 1,
    },
    listButtons: {
        backgroundColor: '#dddddd'
    },
    updateButton: {
        backgroundColor: '#bbfca4',
    }
} )