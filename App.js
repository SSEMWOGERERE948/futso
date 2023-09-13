import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';


// Screens
import Home from './Screens/Home';
import match from './Screens/match';
import News from './Screens/News';
import Leagues from './Screens/Leagues';
import More from './Screens/More';
import calender from './Screens/calender';
import Admin from './Screens/Admin';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
       <Stack.Screen name="calender" component={calender} />
       <Stack.Screen name="Admin" component={Admin} />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#ADD8E6',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
          },
        }}
      >
        {/* <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="match"
          component={match}
          options={{
            tabBarLabel: 'Matches',
            tabBarIcon: ({ color, size }) => (
              <Icon name="football" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarLabel: 'News',
            tabBarIcon: ({ color, size }) => (
              <Icon name="newspaper" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Leagues"
          component={Leagues}
          options={{
            tabBarLabel: 'Leagues',
            tabBarIcon: ({ color, size }) => (
              <Icon name="trophy" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ellipsis-horizontal" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Admin"
          component={Admin}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
