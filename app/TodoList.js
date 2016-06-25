import React, { Component } from 'react';
import {
	View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import realm from './realm';
import { ListView } from 'realm/react-native'

export default class TodoList extends Component {
	constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
     });
    
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.todos),
    }
  }

	// This will update when the props change but no on initial run
  componentWillReceiveProps(nextProps) { 
  	this.setState({
  		dataSource: this.ds.cloneWithRows(nextProps.todos),
  	})
  }

  updateTodo(todo) {
  	realm.write(() => {
  		todo.complete =  !todo.complete;
  	});
  	this.setState({
  		dataSource: this.ds.cloneWithRows(this.props.todos),
  	})
  }

  deleteTodo(todo) {
  	realm.write(() => {
  		realm.delete(todo);
  	});
  	this.setState({
  		dataSource: this.ds.cloneWithRows(this.props.todos),
  	})
  }

  // Assign style to make it look different if it is complete
  renderSingleTodo(todo) {
  	let rowStyle = todo.complete ? [styles.listItem, styles.complete] : styles.listItem;
  	return (
  		<View style={rowStyle}>
  			<TouchableHighlight 
  				underlayColor='transparent'
  				onPress={this.updateTodo.bind(this, todo)}>
	  			<Text style={styles.listItemText}>{todo.complete ? '✓' : '-'}</Text>
				</TouchableHighlight>
  			<Text style={styles.listItemText}>{todo.text}</Text>
  			<TouchableHighlight onPress={this.deleteTodo.bind(this, todo)}>
	  			<Text style={styles.listItemText}>X</Text>
				</TouchableHighlight>
			</View>
  	)
  }

  render() {
    return (
      <ListView style={styles.list}
      	enableEmptySections={true}
      	dataSource={this.state.dataSource}
      	renderRow={this.renderSingleTodo.bind(this)} />
    );
  }
}

const styles = StyleSheet.create({
	list: {
		alignSelf: 'stretch',
	},
	listItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#272625',
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	listItemText: {
		fontSize: 20,
		color: '#FFFFFF',
	},
	complete: {
		opacity: 0.5,
	}
});
