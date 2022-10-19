import { View, Text, StyleSheet } from 'react-native'

export function EmptyList( props ) {
    return(
        <View style={ styles.empty }>
            <Text>You have no items!</Text>
        </View>
    )
}

const styles = StyleSheet.create( {
    empty: {
        flex: 1,
    }
} )