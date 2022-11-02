import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Separator } from './components/Separator'
import { EmptyList } from './components/EmptyList'
import { ListItem } from './components/ListItem'

// This is my experiment
export default function App() {
  // state to keep items
  const [ items, setItems ] = useState([])
  const [ itemName, setItemName ] = useState()
  const [ startup, setStartup ] = useState(true)

  useEffect( () => {
    if( startup === true ) {
      readItems()
      setStartup( false )
    }
  }, [startup])

  useEffect( () => {
    if( items.length >= 0 && startup === false ) {
      saveItems()
    }
  }, [items] )

  const renderer = ({item}) => (
    <ListItem 
      name={item.name} 
      id={item.id} 
      completed={item.completed} 
      update={ itemUpdate } 
      delete={ itemDelete }
    />
  )
  // function to sort items in chronological order
  const sortItems = () => {
    let data = items
    data.sort( ( item1, item2 ) => {
      if( item1.id > item2.id ) {
        return 1
      }
      if( item1.id < item2.id ) {
        return -1
      }
      else {
        return 0
      }
    })
    setItems([...data])
  }
  // function to read items from storage
  const readItems = async () => {
    // console.log('loading data...')
    let data = await AsyncStorage.getItem('ListData')
    data = ( data !== null ) ? JSON.parse(data) : []
    setItems( data )
  }
  // function to save items into storage
  const saveItems = async () => {
    // console.log('saving items...')
    const data = JSON.stringify(items)
    // use asyncstorage to store data
    try {
      await AsyncStorage.setItem('ListData', data )
    }
    catch (error) {
      console.log( error )
    }
  }

  const pressHandler = () => {
    // console.log( {name: itemName, id: 4, completed: false} )
    let newItem = { name: itemName, id: new Date().getTime(), completed: false }
    // sort the items chronologically
    setItems( items.concat(newItem) )
    setItemName('')
  }

  const itemUpdate = ( id ) => {
    //console.log( id )
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
    //console.log( id )
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
