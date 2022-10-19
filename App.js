import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react'

const ListData = [
  { name: "item 1", id: "1", completed: false },
  { name: "item 2", id: "2", completed: false },
  { name: "item 3", id: "3", completed: false },
]

export default function App() {
  // state to keep items
  const [ items, setItems ] = useState(ListData)
  const [ itemName, setItemName ] = useState()

  const renderer = ({item}) => (
    <View>
      <Text>{ item.name } </Text>
      <Text>id: {item.id} </Text>
    </View>
  )

  const pressHandler = () => {
    // console.log( {name: itemName, id: 4, completed: false} )
    let newItem = { name: itemName, id: new Date().getTime(), completed: false }
    setItems( items.concat(newItem) )
    setItemName('')
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputGroup} >
        <TextInput 
          style={styles.input} 
          placeholder='add an item'
          value={itemName}
          onChangeText = { (txtvalue) =>setItemName(txtvalue) }
        />
        <TouchableHighlight 
          style={styles.button}
          onPress={ pressHandler }
        >
          <Text style={ styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
      <Text>{itemName}</Text>
      <FlatList 
        data = {items}
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
    padding: 10,
    backgroundColor: '#1C3738',
  },
  input: {
    flex: 1,
    fontSize: 20,
    padding: 5,
    backgroundColor: '#eeeeee',
  },
  button: {
    fontSize: 20,
  },
  buttonText: {
    color: '#eeeeee',
    fontSize: 20,
    padding: 10,
  }
});
