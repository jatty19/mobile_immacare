import Registration from './components/Registration';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Appointment from './components/Appointment';
import Profile from './components/Profile';
// No need to import Mystyle here as it's not used directly
import AppointmentForm from './components/AppointmentForm';
import Login from './components/Login';
import Service from './components/Service';
import Doctors from './components/Doctors';
// REMOVED: import { Home } from 'lucide-react-native'; - This is an icon, not a screen.
import MyAppointmentScreen from './components/myAppointmentScreen';
import ChangePassword from './components/ChangePassword';

export default function App() {
  const SNavigation = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SNavigation.Navigator initialRouteName="Login">
        {/* --- Authentication Screens --- */}
        <SNavigation.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <SNavigation.Screen options={{ headerShown: false }} name="Registration" component={Registration} />

        {/* --- Main App Screens --- */}
        <SNavigation.Screen  options={{ headerShown: false }} name="Dashboard" component={Appointment} />
        <SNavigation.Screen  options={{ headerShown: false }} name="Profile" component={Profile}  />
        <SNavigation.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePassword} />
        <SNavigation.Screen  options={{ headerShown: false }} name="Doctors" component={Doctors}  />
        <SNavigation.Screen  options={{ headerShown: false }} name="Service" component={Service} />
        <SNavigation.Screen  options={{ headerShown: false }} name="Appointment" component={AppointmentForm} />
        <SNavigation.Screen  options={{ headerShown: false }} name="MyAppointments" component={MyAppointmentScreen} />
      </SNavigation.Navigator>
    </NavigationContainer>
  )
}