import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Body extends Component {
  state = {
    editedText: '',
    editedDate: '',
    searchText: ''
  }

  handleEditChange = (field, value) => {
    this.setState({ [field]: value });
  }

  handleSearchChange = (text) => {
    this.setState({ searchText: text });
  }

  render() {
    const { checkTodo, removeTodo, editTodo, toggleEditMode, toggleImportant } = this.props;
    const { searchText } = this.state;

    const filteredTodos = Object.keys(this.props.todos).reduce((filtered, date) => {
      const filteredDateTodos = this.props.todos[date].filter(todo =>
        todo.text.toLowerCase().includes(searchText.toLowerCase()) ||
        todo.date.toLowerCase().includes(searchText.toLowerCase())
      );
      if (filteredDateTodos.length > 0) {
        filtered[date] = filteredDateTodos;
      }
      return filtered;
    }, {});

    return (
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="todo검색(text or date)"
            value={searchText}
            onChangeText={this.handleSearchChange}
          />
        </View>
        {Object.keys(filteredTodos).map(date => (
          <View key={date} style={styles.dateSection}>
            <Text style={styles.dateTitle}>Date: {date}</Text>
            {filteredTodos[date].map(data => (
              <View style={styles.todo} key={data.id}>
                <View style={styles.todoText}>
                  {data.isEditing ? (
                    <View style={styles.editContainer}>
                      <TextInput
                        style={[styles.inputText, styles.textInput]}
                        value={this.state.editedText}
                        onChangeText={(newText) => this.handleEditChange('editedText', newText)}
                        placeholder={data.text}
                      />
                      <TextInput
                        style={[styles.inputText, styles.dateInput]}
                        value={this.state.editedDate}
                        onChangeText={(newDate) => this.handleEditChange('editedDate', newDate)}
                        placeholder={data.date}
                      />
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity style={styles.todoCheckbox} onPressOut={() => checkTodo(data.id)}>
                        {data.completed
                          ? <MaterialCommunityIcons size={20} name='checkbox-marked-circle-outline' />
                          : <MaterialCommunityIcons size={20} name='checkbox-blank-circle-outline' />
                        }
                      </TouchableOpacity>
                      <Text style={[data.completed ? styles.todoCompleted : null]}>{data.text}</Text>
                      <TouchableOpacity style={styles.todoImportant} onPressOut={() => toggleImportant(data.id)}>
                        <MaterialCommunityIcons size={20} name={data.important ? 'star' : 'star-outline'} color={data.important ? 'gold' : 'grey'} />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View style={styles.buttonsContainer}>
                  {data.isEditing ? (
                    <TouchableOpacity onPress={() => editTodo(data.id, this.state.editedText || data.text, this.state.editedDate || data.date)}>
                      <MaterialCommunityIcons style={styles.todoSaveBtn} size={30} name='content-save' />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.todoButtons}>
                      <TouchableOpacity onPressOut={() => removeTodo(data.id)}>
                        <MaterialCommunityIcons style={styles.todoDelBtn} size={30} name='delete-outline' color='red' />
                      </TouchableOpacity>
                      <TouchableOpacity onPressOut={() => toggleEditMode(data.id)}>
                        <MaterialCommunityIcons style={styles.todoEditBtn} size={30} name='pencil-outline' />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
    color: '#777',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
  },
  todoText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoCompleted: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
  },
  dateInput: {
    flex: 1,
    padding: 10,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoDelBtn: {
    color: 'red',
    marginRight: 10,
  },
  todoEditBtn: {
    color: '#4169E1',
  },
  todoSaveBtn: {
    color: '#32CD32',
  },
  todoCheckbox: {
    marginRight: 10,
  },
  todoImportant: {
    marginLeft: 10,
  },
});
