import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image, Button
} from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from './CreateAccountScreen';
import { Swiper, SwiperItem } from 'react-native-swiper';
import Login from './Login';
import Footer from './Footer';
import DashboardScreen from './Dashboard';
import ViewProfileScreen from './Profile';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen  name="Get Started" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Create Account" component={CreateAccountScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Profile" component={ViewProfileScreen} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const GetStartedScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/static/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/static/Montserrat-Regular.ttf'),
  });

    if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')}
       style={styles.logo}     
      />
      
      <Text style={styles.text}>KeySafe App</Text>
      <Text style={styles.subtext}>Your Key to Peace of Mind</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Account')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <Footer/>
    </View>
  )
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333652',
  },
  logo: {
    width: 300,
    height: 300,
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
    color: 'white',
    marginTop: -60
  },
  subtext: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '400',
    // textAlign: 'center',
    color: '#999999',
    marginTop: 10
  },
  button: {
    backgroundColor: '#ff914d',
    padding: 15,
    borderRadius: 10,
    marginTop: 150,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF'
  },

});

export default App;