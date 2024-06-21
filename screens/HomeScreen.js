import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Header from '../components/Header';
import Body from '../components/Body';

export default class HomeScreen extends Component {
  state = {
    todos: []
  }

  addTodo = (todo, date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!todo.trim() || !date.trim()) {
      Alert.alert('Warning', 'Please enter both todo and date.');
      return;
    }
    if (!dateRegex.test(date)) {
      Alert.alert('Warning', 'Please enter a valid date in YYYY-MM-DD format.');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: todo,
      date: date,
      completed: false,
      isEditing: false,
      important: false,
    };

    this.setState(prevState => ({
      todos: [
        newTodo,
        ...prevState.todos
      ]
    }), this.sortTodos);
  }

  checkTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  }

  editTodo = (id, newText, newDate) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!newText.trim() || !newDate.trim()) {
      Alert.alert('Warning', 'Please enter both todo and date.');
      return;
    }
    if (!dateRegex.test(newDate)) {
      Alert.alert('Warning', 'Please enter a valid date in YYYY-MM-DD format.');
      return;
    }

    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, text: newText, date: newDate, isEditing: false } : todo
      )
    }));
  }

  toggleEditMode = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    }));
  }

  toggleImportant = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    }), this.sortTodos);
  }

  sortTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => b.important - a.important || new Date(b.date) - new Date(a.date))
    }));
  }

  groupTodosByDate = () => {
    return this.state.todos.reduce((groups, todo) => {
      const date = todo.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(todo);
      return groups;
    }, {});
  }

  render() {
    const groupedTodos = this.groupTodosByDate();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>
        <Header addTodo={this.addTodo} />
        <Body
          todos={groupedTodos}
          checkTodo={this.checkTodo}
          removeTodo={this.removeTodo}
          editTodo={this.editTodo}
          toggleEditMode={this.toggleEditMode}
          toggleImportant={this.toggleImportant}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    backgroundColor: "#EEE",
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
  }
});