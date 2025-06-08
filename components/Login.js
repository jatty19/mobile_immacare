// components/Login.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Mystyle } from "./Mystyle";
import api from './api/api'; // NEW: Import the central API client

const Login = () => {
  const navigation = useNavigation();
  const goToRegister = () => navigation.navigate("Registration");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // NEW: Add loading state

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // NEW: Updated handleLogin function
  const handleLogin = async () => {
    if (loading) return;
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // Make the API call to your backend's login endpoint
      const response = await api.post('/auth/mobile-login', {
        email: form.email,
        password: form.password,
      });

      console.log('Backend Response Data:', JSON.stringify(response.data, null, 2));
      // The backend should return a token and user data
      const { token, userData } = response.data;

      // Store the token and user data securely
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      // Navigate to the main part of the app
      Alert.alert("Success", "Login Successful!", [
        { text: "OK", onPress: () => navigation.navigate("Dashboard") },
      ]);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid email or password.";
      Alert.alert("Login Failed", errorMessage);
      console.error("Login error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Mystyle.containerLoginpage}>
      <View style={Mystyle.logoContainerLoginpage}>
          <Image source={require("../assets/logo.png")} style={{resizeMode:'contain', height:200,width:200, backgroundColor:'#EEECDE'}} ></Image>
        <Text style={Mystyle.logoTextLoginpage}>Immacare+</Text>
      </View>

      <Text style={Mystyle.loginTextLoginpage}>Login to your Account</Text>

      <View style={Mystyle.inputContainerLoginpage}>
        <TextInput
          style={Mystyle.inputLoginpage}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>

      <View style={Mystyle.inputContainerLoginpage}>
        <TextInput
          style={Mystyle.inputLoginpage}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          onChangeText={(value) => handleChange("password", value)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialIcons
            name={passwordVisible ? "visibility" : "visibility-off"}
            size={24}
            color="#001C5C"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={Mystyle.loginButtonLoginpage}
        onPress={handleLogin}
        disabled={loading} // UPDATED: Disable button while loading
      >
        <Text style={Mystyle.loginButtonTextLoginpage}>{loading ? "LOGGING IN..." : "LOGIN"}</Text>
      </TouchableOpacity>

      <Text style={Mystyle.registerTextLoginpage}>
        Don’t have an account?
        <TouchableOpacity onPress={goToRegister}>
          <Text style={Mystyle.registerLinkLoginpage}> Register Here</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default Login;