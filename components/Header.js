import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Header extends Component {
  state = {
    newTodo: '',
    newTodoDate: '',
  }

  addNewTodo = () => {
    const { newTodo, newTodoDate } = this.state;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!newTodo.trim() || !newTodoDate.trim()) {
      Alert.alert('Warning', 'Please enter both todo and date.');
      return;
    }
    if (!dateRegex.test(newTodoDate)) {
      Alert.alert('Warning', 'Please enter a valid date in YYYY-MM-DD format.');
      return;
    }
    this.props.addTodo(newTodo, newTodoDate);
    this.setState({ newTodo: '', newTodoDate: '' });
  }

  render() {
    const isDarkMode = this.props.isDarkMode;
    return (
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={isDarkMode ? styles.inputTextDark : styles.inputText}
            placeholder='Todo ?��?��'
            placeholderTextColor={isDarkMode ? '#AAA' : '#000'}
            autoCorrect={false}
            value={this.state.newTodo}
            onChangeText={(newTodo) => this.setState({ newTodo })}
          />
          <TextInput
            style={isDarkMode ? styles.inputTextDark : styles.inputText}
            placeholder='?���? ?��?��(YYYY-MM-DD)'
            placeholderTextColor={isDarkMode ? '#AAA' : '#000'}
            autoCorrect={false}
            value={this.state.newTodoDate}
            onChangeText={(newTodoDate) => this.setState({ newTodoDate })}
          />
          <TouchableOpacity onPress={this.addNewTodo}>
            <MaterialCommunityIcons style={styles.addBtn} size={30} name='plus-circle' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  containerDark: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 100,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputText: {
    width: '100%',
    padding: 10,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: '#000',
  },
  inputTextDark: {
    width: '100%',
    padding: 10,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: '#FFF',
  },
  addBtn: {
    color: '#32CD32',
  },
});

export default Header;
