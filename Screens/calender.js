// CalendarScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const CalendarIcon = ({ onPress }) => (
  <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
    <Icon name="calendar-outline" size={24} color="#333333" />
  </TouchableOpacity>
);

const calendar = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackButtonPress} />
        <Appbar.Content title="Calendar" />
      </Appbar.Header>

      {/* Calendar */}
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{ [selectedDate]: { selected: true, marked: true } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});

export default calendar;
