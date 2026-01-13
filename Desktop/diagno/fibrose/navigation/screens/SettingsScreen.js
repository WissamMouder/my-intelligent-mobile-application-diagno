import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigation = useNavigation();

  const settingsItems = [
    { label: 'Toggle Theme', action: toggleTheme },
    { label: 'Contact', screen: 'Contact' }, // Utilisez le nom défini dans votre StackNavigator
    { label: 'About Us', screen: 'AboutUs' }
  ];

  const handlePress = (item) => {
    if (item.action) {
      item.action();
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Settings</Text>
      <View style={styles.settingsBorder}>
        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.settingItem, isDarkMode && styles.darkSettingItem]}
              onPress={() => handlePress(item)}
            >
              <Text style={[styles.settingText, isDarkMode && styles.darkSettingText]}>{item.label}</Text>
              {item.label === 'Toggle Theme' && (
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleTheme}
                  value={isDarkMode}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
  },
  settingsBorder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'blue',
    overflow: 'hidden',
  },
  settingsContainer: {
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  darkSettingItem: {
    backgroundColor: 'darkgray',
  },
  settingText: {
    fontSize: 18,
    color: 'black',
  },
  darkSettingText: {
    color: 'white',
  },
});
