import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class SettingsScreen extends Component {
  state = {
    isDarkMode: false 
  };

  toggleDarkMode = () => {
    const newMode = !this.state.isDarkMode;
    this.setState({ isDarkMode: newMode });
    this.props.setDarkMode(newMode);
  }

  render() {
    const { isDarkMode } = this.state;

    return (
      <View style={[styles.container, isDarkMode && styles.darkMode]}>
        <Text style={styles.title}>세팅</Text>
        <TouchableOpacity
          style={[styles.option, isDarkMode ? styles.darkButton : styles.lightButton]}
          onPress={this.toggleDarkMode}
        >
          <Text style={styles.optionText}>{isDarkMode ? 'Turn off Dark Mode' : 'Turn on Dark Mode'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', 
  },
  darkMode: {
    backgroundColor: '#333', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  lightButton: {
    backgroundColor: 'dodgerblue',
  },
  darkButton: {
    backgroundColor: 'darkslategrey',
  },
});
