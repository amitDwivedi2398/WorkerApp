import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import TabNavigator from './TabNavigator';
import Booking from '../screens/Booking';
import Membership from '../screens/DrawerPages/Membership';
import Feedback from '../screens/DrawerPages/Feedback';
import About from '../screens/DrawerPages/About';
import TermsCondtion from './TermsCondtion';
import Contact from '../screens/DrawerPages/Contact';
import HomeScreen from '../screens/HomeScreen';
import BranchesViewAll from '../screens/HomePage/BranchesViewAll';
import CenterNameScreen from '../screens/HomePage/CenterNameScreen';
import DoctorDetails from '../screens/HomePage/DoctorDetails';
import FacilityScreen from '../screens/HomePage/FacilityScreen';
import OtpSchame from '../screens/HomePage/OtpSchame';
import ToDoOpd from '../screens/HomePage/ToDoOpd';
import InvestigationScreen from '../screens/HomePage/InvestigationScreen';
import OptSchameCatagiry from '../screens/HomePage/OptSchameCatagiry';
import DoctorAbout from '../screens/HomePage/DoctorAbout';
import NotificationScreen from '../screens/NotificationScreen';
import NoticeDetails from '../screens/NoticeDetails';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingSlider from '../screens/OnboardingSlider';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OtpScreen from '../screens/OtpScreen';
import TopSheme from '../screens/TopSheme';
import NoticeScreen from '../screens/NoticeScreen';
import FavoriteScreen from '../screens/DrawerPages/FavoriteScreen';
import ChangeLng from '../screens/DrawerPages/ChangeLng';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
       name="Onboarding" 
       component={OnboardingScreen} 
       options={{ headerShown: false }}
       />
      <Stack.Screen name="OnboardingSlider" component={OnboardingSlider}  options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="OtpScreen" component={OtpScreen}  options={{ headerShown: false }}/>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BranchesViewAll"
        component={BranchesViewAll}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CenterNameScreen"
        component={CenterNameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FacilityScreen"
        component={FacilityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpSchame"
        component={OtpSchame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ToDoOpd"
        component={ToDoOpd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvestigationScreen"
        component={InvestigationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OptSchameCatagiry"
        component={OptSchameCatagiry}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorAbout"
        component={DoctorAbout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NoticeDetails"
        component={NoticeDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopSheme"
        component={TopSheme}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notice"
        component={NoticeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
      />

    </Stack.Navigator>
  );
};

export default HomeStack;
