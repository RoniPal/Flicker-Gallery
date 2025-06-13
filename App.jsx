import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Home from './src/screens/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

//Create Navigation
const Drawer = createDrawerNavigator();

//Navigation Implement
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: () => <Icon name="home" size={25} color={'blue'} />,
            }}
          />
        </Drawer.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
