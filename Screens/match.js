import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Appbar } from 'react-native-paper';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Circle, G, Svg, Text as SvgText } from 'react-native-svg';
import axios from 'axios'; // Import axios
import firestore from '@react-native-firebase/firestore'; // Import Firebase Firestore

// Assuming TeamModel is defined in the same file
class TeamModel {
  constructor(id, name,team1,team2) {
    this.id = id;
    this.name = name;
    this.team1 = team1;
    this.team2 = team2;
    // Add other properties as needed
  }
}

const CircularTimer = ({ time }) => {
  const radius = 10; // Adjust the radius as needed
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (time / 90) * circumference; // Adjust for your timer logic

  return (
    <Svg width={2 * radius} height={2 * radius}>
      <G transform={{ translate: `${radius},${radius}` }}>
        <Circle
          r={radius}
          fill="transparent"
          stroke="#00cc00" // Adjust the color as needed
          strokeWidth={1} // Adjust the stroke width as needed
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
        <SvgText
          x="0"
          y="0"
          fontSize="14" // Adjust the font size as needed
          textAnchor="middle"
          dy="5"
          fill="#00cc00" // Adjust the color as needed
        >
          {`${time % 45}'`}
        </SvgText>
      </G>
    </Svg>
  );
};

const MatchScreen = ({ selectedLeague }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://192.168.43.212:8080/api/match`);
        const data = response.data;

        const matchesData = data.map((match) => new TeamModel(match.id, match.name,match.team1,match.team2));
        setMatches(matchesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    

    fetchMatches();
  }, [selectedLeague]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00cc00" />
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      <View style={styles.tabContent}>
      {matches.map((match) => (
        <View key={match.id} style={styles.matchContainer}>
        <Text>
        {/* ${match.id}.${match.name}  */}
     {`${match.team1.name} vs ${match.team2.name}`}
</Text>

        </View>
      ))}
    </View>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

LocaleConfig.locales['en'] = {};
LocaleConfig.defaultLocale = 'en';

const CalendarIcon = ({ onPress }) => (
  <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
    <Icon name="calendar-outline" size={24} color="#333333" />
  </TouchableOpacity>
);

const AdminButton = () => {
  const navigation = useNavigation();

  const handleAdminButton = () => {
    navigation.navigate('Admin');
  };

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={handleAdminButton}>
      <Icon name="person" size={24} color="#333333" />
    </TouchableOpacity>
  );
};

const match = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer < 90) {
        setTimer(timer + 1);
      } else {
        clearInterval(interval);
      }
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  const handleCalendarIconPress = () => {
    setCalendarVisible((prevState) => !prevState);
  };

  const [selectedLeague, setSelectedLeague] = useState('Premier League');
  const leagues = ['Premier League', 'Champions League'];

  const handleLeagueChange = (league) => {
    setSelectedLeague(league);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Futso" />
        <CalendarIcon onPress={handleCalendarIconPress} />
        <AdminButton />
      </Appbar.Header>

      {isCalendarVisible && (
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{ [selectedDate]: { selected: true, marked: true } }}
        />
      )}

      <View style={styles.timerContainer}>
        <CircularTimer time={timer} />
      </View>

      <Tab.Navigator>
        <Tab.Screen
          name="Yesterday"
          component={(props) => <MatchScreen {...props} selectedLeague={selectedLeague} />}
        />
      </Tab.Navigator>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select League:</Text>
        <Picker
          selectedValue={selectedLeague}
          onValueChange={(itemValue) => handleLeagueChange(itemValue)}
          style={styles.picker}
        >
          {leagues.map((league) => (
            <Picker.Item key={league} label={league} value={league} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pickerLabel: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    flex: 2,
    height: 50,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default match;
