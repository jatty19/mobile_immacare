// components/Profile.js

import React, { useState } from "react";
// --- 1. Make sure ScrollView is imported ---
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ArrowLeft, Edit3, Save } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Mystyle } from "./Mystyle";
import api from "./api/api";

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // No changes needed in any of the logic (useEffect, handlers, etc.)
  useFocusEffect(
    React.useCallback(() => {
      const fetchProfileData = async () => {
        try {
          const response = await api.get('/user/profile');
          setUserData(response.data);
          await AsyncStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user profile from API", error);
          Alert.alert("Error", "Could not load your profile. Please try again later.");
        }
      };
      fetchProfileData();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
          navigation.navigate("Login");
        },
      },
    ]);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.put('/user/profile', userData);
      setUserData(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error)      {
      console.error("Failed to save user data", error.response?.data || error.message);
      Alert.alert("Error", "Could not save your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (field, value) => {
    setUserData(prevData => ({ ...prevData, [field]: value }));
  };

  // --- 2. Change the outermost <View> to a <ScrollView> ---
  // We use `contentContainerStyle` to ensure content can grow and has padding.
  // The `style` prop gives it the blue background color.
  return (
    <ScrollView 
        style={{backgroundColor: Mystyle.containerProfile.backgroundColor}} 
        contentContainerStyle={{paddingBottom: 50}} // Add padding to the bottom
    >
      {/* All content is now a direct child of the ScrollView */}
      <View style={Mystyle.headerProfile}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 20, top: 60 }}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={Mystyle.headerText}>Profile</Text>
        <TouchableOpacity onPress={handleEditToggle} style={{ position: "absolute", right: 20, top: 60 }}>
            {loading ? <ActivityIndicator color="white" /> : (isEditing ? <Save color="white" size={24} /> : <Edit3 color="white" size={24} />)}
        </TouchableOpacity>
      </View>

      <View style={Mystyle.profilePictureContainer}>
        <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', bottom: 30, fontSize: 22 }}>
            Hi, {userData.firstName || "User"}
        </Text>
      </View>

      {/* --- 3. The inner wrapper is now just a regular <View> --- */}
      {/* It no longer needs to be a ScrollView because its parent handles scrolling. */}
      <View style={Mystyle.form}>
        
        <Text style={Mystyle.label}>First Name</Text>
        <TextInput style={Mystyle.profile_input} value={userData.firstName} editable={isEditing} onChangeText={(text) => handleChange("firstName", text)} />

        <Text style={Mystyle.label}>Last Name</Text>
        <TextInput style={Mystyle.profile_input} value={userData.lastName} editable={isEditing} onChangeText={(text) => handleChange("lastName", text)} />

        <Text style={Mystyle.label}>Suffix</Text>
        <TextInput style={Mystyle.profile_input} value={userData.suffix} editable={isEditing} onChangeText={(text) => handleChange("suffix", text)} />

        <Text style={Mystyle.label}>Email</Text>
        <TextInput style={Mystyle.profile_input} value={userData.signupEmail} editable={isEditing} onChangeText={(text) => handleChange("signupEmail", text)} />

        <Text style={Mystyle.label}>Phone</Text>
        <TextInput style={Mystyle.profile_input} value={userData.PhoneNumber} editable={isEditing} keyboardType="phone-pad" onChangeText={(text) => handleChange("PhoneNumber", text)} />

        <Text style={Mystyle.label}>Address</Text>
        <TextInput style={Mystyle.profile_input} value={userData.Address} editable={isEditing} onChangeText={(text) => handleChange("Address", text)} />
        
        <Text style={Mystyle.label}>Age</Text>
        <TextInput style={Mystyle.profile_input} value={String(userData.Age || '')} editable={isEditing} keyboardType="numeric" onChangeText={(text) => handleChange("Age", text)} />

        {!isEditing && (

          <View style={Mystyle.logoutButtonContainer}>
            <TouchableOpacity style={Mystyle.logoutButton} onPress={handleLogout}>
              <Text style={Mystyle.logoutText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;