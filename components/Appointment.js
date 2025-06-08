// components/Appointment.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { Mystyle } from "./Mystyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { Appbar } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import api from "./api/api"; // Make sure you have this api instance setup

const HomeScreen = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  // Fetch user's name when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get('/user/profile');
          // Use only the first name for a cleaner greeting
          setUserName(response.data?.firstName || 'User');
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUserName('User'); // Fallback name
        }
      };
      fetchUserProfile();
    }, [])
  );

  return (
    <View style={Mystyle.containerDashbord}>
      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* --- 1. REDESIGNED HEADER --- */}
        <Appbar.Header style={Mystyle.header}>
          {/* A more personal welcome message */}
          <View>
            <Text style={{ fontSize: 16, color: '#555' }}>Welcome back,</Text>
            <Text style={Mystyle.headerTitle}>{userName}</Text>
          </View>
          <Appbar.Action
            icon="menu"
            color="#001C5C"
            size={30}
            onPress={() => setIsSideNavOpen(true)}
          />
        </Appbar.Header>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* --- 2. NEW 2x2 ACTION GRID --- */}
          <View style={Mystyle.gridContainer}>
            <TouchableOpacity style={Mystyle.gridButton} onPress={() => navigation.navigate("Doctors")}>
              <Icon name="stethoscope" size={30} color="#001C5C" />
              <Text style={Mystyle.gridButtonTitle}>Find a Doctor</Text>
              <Text style={Mystyle.gridButtonSubtitle}>Search by name or specialty</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Mystyle.gridButton} onPress={() => navigation.navigate("Service")}>
              <Icon name="medkit" size={30} color="#001C5C" />
              <Text style={Mystyle.gridButtonTitle}>Our Services</Text>
              <Text style={Mystyle.gridButtonSubtitle}>View available medical services</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Mystyle.gridButton} onPress={() => navigation.navigate("Appointment")}>
              <Icon name="calendar-plus-o" size={30} color="#001C5C" />
              <Text style={Mystyle.gridButtonTitle}>Set Appointment</Text>
              <Text style={Mystyle.gridButtonSubtitle}>Book a new consultation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Mystyle.gridButton} onPress={() => navigation.navigate("MyAppointments")}>
              <Icon name="list-alt" size={30} color="#001C5C" />
              <Text style={Mystyle.gridButtonTitle}>My Appointments</Text>
              <Text style={Mystyle.gridButtonSubtitle}>View your upcoming visits</Text>
            </TouchableOpacity>
          </View>

          {/* --- 3. NEW HORIZONTAL CONTACT SECTION --- */}
          <Text style={Mystyle.secondaryTitle}>Get In Touch</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={Mystyle.horizontalScroll}>
             <TouchableOpacity style={Mystyle.contactCard}>
                <Icon name="phone" size={24} color="white" />
                <Text style={Mystyle.contactCardText}>Call Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Mystyle.contactCard}>
                <Icon name="map-marker" size={24} color="white" />
                <Text style={Mystyle.contactCardText}>Find Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Mystyle.contactCard}>
                <Icon name="envelope" size={24} color="white" />
                <Text style={Mystyle.contactCardText}>Email Us</Text>
              </TouchableOpacity>
          </ScrollView>

        </ScrollView>
      </View>

      {isSideNavOpen && (
        <View style={Mystyle.sideNavContainer}>
          <TouchableOpacity
            style={Mystyle.sideNavCloseButton}
            onPress={() => setIsSideNavOpen(false)}
          >
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={Mystyle.sideNavItem}
            onPress={() => {
              setIsSideNavOpen(false);
              navigation.navigate("Profile");
            }}
          >
            <Icon name="user" size={20} color="white" />
            <Text style={Mystyle.sideNavText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Mystyle.sideNavItem}
            onPress={() => {
              setIsSideNavOpen(false);
              navigation.navigate("MyAppointments");
            }}
          >
            <Icon name="list-alt" size={20} color="white" />
            <Text style={Mystyle.sideNavText}>My Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Mystyle.sideNavItem}
            onPress={() => {
              setIsSideNavOpen(false);
              navigation.navigate("Appointment");
            }}
          >
            <Icon name="calendar" size={20} color="white" />
            <Text style={Mystyle.sideNavText}>Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Mystyle.sideNavItem}
            onPress={() => {
              setIsSideNavOpen(false);
              navigation.navigate("Doctors");
            }}
          >
            <Icon name="stethoscope" size={20} color="white" />
            <Text style={Mystyle.sideNavText}>Meet Doctors</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Mystyle.sideNavItem}
            onPress={() => {
              setIsSideNavOpen(false);
              navigation.navigate("Service");
            }}
          >
            <Icon name="users" size={20} color="white" />
            <Text style={Mystyle.sideNavText}>Services</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Mystyle.logoutButton}
            onPress={() => {
              Alert.alert(
                "Logout Confirmation",
                "Are you sure you want to logout?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      setTimeout(() => {
                        navigation.navigate("Login");
                      }, 100);
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;