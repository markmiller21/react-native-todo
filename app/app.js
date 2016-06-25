import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import realm from './realm';
import TodoList from './TodoList';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };

    // this.todos = realm.objects('Todo').filtered('complete = true');
    this.todos = realm.objects('Todo').sorted('complete');
  }

  addOne() {
    if (this.state.input === '') return;
    realm.write(() => {
       realm.create('Todo', { text: this.state.input });
    });

    this.setState({ input: '' });
  }

  updateInput(input) {
    this.setState({ input: input })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          value={this.state.input} 
          onChangeText={(text) => this.updateInput(text)}/>
        <TouchableHighlight 
          underlayColor='#FFFFFF'
          style={styles.button}
          onPress={this.addOne.bind(this)}>
          <Text style={styles.buttonText}>
            Add new Todo
          </Text>
        </TouchableHighlight>
        <TodoList todos={this.todos} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F4040',
  },
  button: {
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    backgroundColor: '#FFF1B9',
    borderRadius: 4,
    padding: 10,
    margin: 10,
  },
  input: {
    height: 60,
    marginTop: 50,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#cccccc',
    backgroundColor: '#cccccc',
    fontSize: 18,
    color: '#666666',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 60,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});