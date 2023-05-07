import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const DistanceCalculatorScreen = () => {
  const [location, setLocation] = useState(null);
  const [targetLatitude, setTargetLatitude] = useState('');
  const [targetLongitude, setTargetLongitude] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    // Request permission to access the device's location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Retrieve the current location
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const calculateDistance = () => {
    const lat1 = parseFloat(location.coords.latitude);
    const lon1 = parseFloat(location.coords.longitude);
    const lat2 = parseFloat(targetLatitude);
    const lon2 = parseFloat(targetLongitude);
  
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
  
    setDistance(distance.toFixed(2) + ' km');
  };
  const toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  return (
    <View style={styles.container}>
       {location ? (
        <View>
          <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Fetching location...</Text>
      )}
      <TextInput
        style={styles.input}
        value={targetLatitude}
        onChangeText={setTargetLatitude}
        placeholder="Target Latitude"
      />
      <TextInput
        style={styles.input}
        value={targetLongitude}
        onChangeText={setTargetLongitude}
        placeholder="Target Longitude"
      />
       <Text style={styles.distance}>Distance: {distance}</Text>
      <Button title="Calculate" onPress={calculateDistance} />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  coordinates: {
    fontSize: 16,
    marginBottom: 30,
  },
  text: {
   marginBottom: 10
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  distance: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default DistanceCalculatorScreen;
