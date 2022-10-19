import { View, Text, StyleSheet } from 'react-native'
export function ListItem( props ) {
    return (
        <View style={ styles.item }>
            <View>
                <Text style={ styles.itemName }>{ props.name }</Text>
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
    }
} )