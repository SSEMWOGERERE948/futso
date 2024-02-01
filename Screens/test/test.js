// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Appbar } from 'react-native-paper';
// import { Calendar, LocaleConfig } from 'react-native-calendars';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios'; // Import axios

// // Assuming TeamModel is defined in the same file
// class TeamModel {
//   constructor(id, name) {
//     this.id = id;
//     this.name = name;
//     // Add other properties as needed
//   }
// }

// const CircularTimer = ({ time }) => {
//   const radius = 10;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDasharray = `${circumference} ${circumference}`;
//   const strokeDashoffset = circumference - (time / 90) * circumference;

//   return (
//     <Svg width={2 * radius} height={2 * radius}>
//       <G transform={{ translate: `${radius},${radius}` }}>
//         <Circle
//           r={radius}
//           fill="transparent"
//           stroke="#00cc00"
//           strokeWidth={1}
//           strokeLinecap="round"
//           strokeDasharray={strokeDasharray}
//           strokeDashoffset={strokeDashoffset}
//         />
//         <SvgText
//           x="0"
//           y="0"
//           fontSize="14"
//           textAnchor="middle"
//           dy="5"
//           fill="#00cc00"
//         >
//           {`${time % 45}'`}
//         </SvgText>
//       </G>
//     </Svg>
//   );
// };

// const match = ({ selectedLeague }) => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get(`http://192.168.43.212:8080/api/team`);
//         const data = response.data;

//         const matchesData = data.map((team) => new TeamModel(team.id, team.name));
//         setMatches(matchesData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching teams:', error);
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, [selectedLeague]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#00cc00" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.tabContent}>
//       {matches.map((team) => (
//         <View key={team.id} style={styles.matchContainer}>
//           <Text>
//             Team ID: {team.id}, Team Name: {team.name}
//           </Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   tabContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     paddingHorizontal: 16,
//     justifyContent: 'center',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   pickerLabel: {
//     flex: 1,
//     fontSize: 16,
//   },
//   picker: {
//     flex: 2,
//     height: 50,
//   },
//   timerContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default match;


