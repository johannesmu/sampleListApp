import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';

const ListData = [
  { name: "item 1", id: "1", completed: false },
  { name: "item 2", id: "2", completed: false },
  { name: "item 3", id: "3", completed: false },
]

export default function App() {
  const renderer = ({item}) => (
    <View>
      <Text>{ item.name } </Text>
      <Text>id: {item.id} </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup} >
        <TextInput style={styles.input} placeholder='add an item'/>
        <TouchableHighlight>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
      <FlatList 
        data = {ListData}
        renderItem = { renderer }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'start',
  },
  inputGroup: {
    flexDirection: "row",
  },
  input {
    flex: 1,
  },
});
