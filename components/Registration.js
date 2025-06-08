// components/Registration.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import { Mystyle } from "./Mystyle";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RadioButton } from 'react-native-paper';
import api from './api/api';

const RegistrationForm = () => {
  const navigation = useNavigation();
  const goToLogin = () => navigation.navigate("Login");

  // --- 1. UPDATE THE STATE to match the web form's fields ---
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    suffix: "",
    age: "",
    gender: "male",
    mobile: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // --- 2. UPDATE VALIDATION to check the new fields ---
  const validateForm = () => {
    // Check for required fields (suffix is optional)
    if (!form.firstName || !form.lastName || !form.age || !form.gender || !form.mobile || !form.address || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields.");
      return false;
    }
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }
    return true;
  };

  // --- 3. UPDATE SUBMISSION to build the 'name' field for the backend ---
  const handleSubmit = async () => {
    if (!validateForm() || loading) return;

    setLoading(true);
    try {
      // Combine first, last, and suffix into a single 'name' string for the API
      let fullName = `${form.firstName} ${form.lastName}`;
      if (form.suffix) {
        fullName += ` ${form.suffix}`;
      }

      // Prepare the data payload for the backend
      const payload = {
        name: fullName.trim(), // The backend expects a 'name' field
        age: form.age,
        gender: form.gender,
        mobile: form.mobile,
        address: form.address,
        email: form.email,
        password: form.password,
      };

      const response = await api.post('/auth/mobile-register', payload);

      // Handle success
      Alert.alert("Success", "Registration Successful! Please login.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);

    } catch (error) {
      // Handle errors from the backend
      const errorMessage = error.response?.data?.message || "An error occurred during registration. Please try again.";
      Alert.alert("Registration Failed", errorMessage);
      console.error("Registration error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={Mystyle.scrollContainer}>
      <View style={[Mystyle.container, { backgroundColor: "#001C5C", flex: 1, justifyContent: "center", alignItems: "center" }]}>
        <TouchableOpacity onPress={goToLogin} style={Mystyle.backButton}>
          <Icon name="arrow-left" size={30} color="white" />
        </TouchableOpacity>

        <View style={[Mystyle.box, { backgroundColor: "white", padding: 20, borderRadius: 10, elevation: 5 }]}>
          <Image source={require("../assets/logo.png")} style={[Mystyle.logo, { left: 95, bottom: 20 }]} />
          
          {/* --- 4. UPDATE THE UI with new fields --- */}
          <Text style={Mystyle.label}>First Name:</Text>
          <TextInput placeholder="Enter your first name" style={Mystyle.input} onChangeText={(text) => handleChange("firstName", text)} />

          <Text style={Mystyle.label}>Last Name:</Text>
          <TextInput placeholder="Enter your last name" style={Mystyle.input} onChangeText={(text) => handleChange("lastName", text)} />

          <Text style={Mystyle.label}>Suffix (Optional):</Text>
          <TextInput placeholder="e.g., Jr., III" style={Mystyle.input} onChangeText={(text) => handleChange("suffix", text)} />

          <Text style={Mystyle.label}>Age:</Text>
          <TextInput placeholder="Enter your age" style={Mystyle.input} keyboardType="numeric" onChangeText={(text) => handleChange("age", text)} />

          <Text style={Mystyle.label}>Sex:</Text>
          <View style={Mystyle.radioContainer}>
            <RadioButton.Group onValueChange={(value) => handleChange("gender", value)} value={form.gender}>
              <View style={Mystyle.radioOption}>
                <RadioButton value="male" />
                <Text>Male</Text>
              </View>
              <View style={Mystyle.radioOption}>
                <RadioButton value="female" />
                <Text>Female</Text>
              </View>
            </RadioButton.Group>
          </View>

          <Text style={Mystyle.label}>Phone #:</Text>
          <TextInput placeholder="Enter your phone number" style={Mystyle.input} keyboardType="phone-pad" onChangeText={(text) => handleChange("mobile", text)} />

          <Text style={Mystyle.label}>Address:</Text>
          <TextInput placeholder="Enter your address" style={Mystyle.input} onChangeText={(text) => handleChange("address", text)} />

          <Text style={Mystyle.label}>Email:</Text>
          <TextInput placeholder="Enter your email" style={Mystyle.input} keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => handleChange("email", text)} />

          <Text style={Mystyle.label}>Password:</Text>
          <TextInput placeholder="Enter your password" style={Mystyle.input} secureTextEntry onChangeText={(text) => handleChange("password", text)} />
          
          <Text style={Mystyle.label}>Confirm Password:</Text>
          <TextInput placeholder="Confirm your password" style={Mystyle.input} secureTextEntry onChangeText={(text) => handleChange("confirmPassword", text)} />

          <Button title={loading ? "Registering..." : "Register"} onPress={handleSubmit} disabled={loading} />
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistrationForm;