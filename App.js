import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants'
import { useState, useEffect } from 'react'

import { Separator } from './components/Separator'
import { EmptyList } from './components/EmptyList'
import { ListItem } from './components/ListItem'

// const ListData = [
//   { name: "item 1", id: "1", completed: false },
//   { name: "item 2", id: "2", completed: false },
//   { name: "item 3", id: "3", completed: false },
// ]

export default function App() {
  // state to keep items
  const [ items, setItems ] = useState([])
  const [ itemName, setItemName ] = useState()

  const renderer = ({item}) => (
    <ListItem 
      name={item.name} 
      id={item.id} 
      completed={item.completed} 
      update={ itemUpdate } 
      delete={ itemDelete }
    />
  )

  const pressHandler = () => {
    // console.log( {name: itemName, id: 4, completed: false} )
    let newItem = { name: itemName, id: new Date().getTime(), completed: false }
    setItems( items.concat(newItem) )
    setItemName('')
  }

  const itemUpdate = ( id ) => {
    console.log( id )
    // copy the items array into arr
    let arr = items
    arr.forEach( (item) => {
      if( item.id === id ){
        item.completed = true
      }
    })
    // ...arr converts [ 0, 1, 2, 3] to 0,1,2,3
    // react will only update a state if you pass a new array
    setItems( [...arr] )
  }

  const itemDelete = ( id ) => {
    console.log( id )
    //create a copy of items
    let arr = items
    let toKeep = arr.filter( (item) => {
      if( item.id !== id ) {
        return item
      }
    })
    setItems([...toKeep])
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
      <FlatList 
        data = {items}
        renderItem = { renderer }
        keyExtractor = { (item) => item.id }
        ItemSeparatorComponent = {Separator}
        ListEmptyComponent = { EmptyList }
        style= { styles.list }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf9ff',
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
  },
  list: {
    flex: 1,
  },
});
