// components/ChangePassword.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { Mystyle } from './Mystyle'; // Assuming Mystyle has the styles we need
import api from './api/api';

const ChangePassword = () => {
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
    });

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleUpdatePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/change-password', {
                currentPassword,
                newPassword,
                confirmNewPassword: confirmPassword
            });
            Alert.alert("Success", "Your password has been updated successfully.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            
            console.log("CHANGE PASSWORD FAILED. FULL ERROR:", JSON.stringify(error, null, 2));
            const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);
        }

        
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={Mystyle.headerProfile}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <Text style={Mystyle.headerText}>Change Password</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                {/* --- Current Password Input --- */}
                <Text style={Mystyle.label}>Current Password</Text>
                <View style={[Mystyle.profile_input, styles.inputContainer]}>
                    <TextInput
                        style={styles.inputField}
                        secureTextEntry={!passwordVisibility.current}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Enter your current password"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => togglePasswordVisibility('current')} style={styles.eyeIcon}>
                        {passwordVisibility.current ? <EyeOff color="#999" size={20} /> : <Eye color="#999" size={20} />}
                    </TouchableOpacity>
                </View>

                {/* --- New Password Input --- */}
                <Text style={Mystyle.label}>New Password</Text>
                <View style={[Mystyle.profile_input, styles.inputContainer]}>
                    <TextInput
                        style={styles.inputField}
                        secureTextEntry={!passwordVisibility.new}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Enter your new password"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => togglePasswordVisibility('new')} style={styles.eyeIcon}>
                        {passwordVisibility.new ? <EyeOff color="#999" size={20} /> : <Eye color="#999" size={20} />}
                    </TouchableOpacity>
                </View>

                {/* --- Confirm New Password Input --- */}
                <Text style={Mystyle.label}>Confirm New Password</Text>
                <View style={[Mystyle.profile_input, styles.inputContainer]}>
                    <TextInput
                        style={styles.inputField}
                        secureTextEntry={!passwordVisibility.confirm}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm your new password"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => togglePasswordVisibility('confirm')} style={styles.eyeIcon}>
                        {passwordVisibility.confirm ? <EyeOff color="#999" size={20} /> : <Eye color="#999" size={20} />}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[Mystyle.logoutButton, styles.updateButton]} 
                    onPress={handleUpdatePassword}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={Mystyle.logoutText}>UPDATE PASSWORD</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Add some specific styles for this screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Mystyle.containerProfile.backgroundColor,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 60,
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    updateButton: {
        marginTop: 30,
        backgroundColor: '#4CAF50', // A success green color
    },
    updateButton: {
        marginTop: 40, // More space above the button
        width: '100%', // Make the button take the full width of its container
    },
    inputField: {
        marginBottom: 20, // Add space below each input field
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // We apply styles from Mystyle.profile_input here, but reset padding
        // because the TextInput and Icon will have their own.
        paddingHorizontal: 0,
        paddingVertical: 0, 
        marginBottom: 20,
    },
    // The actual text input field, takes up most of the space
    inputField: {
        flex: 1,
        height: '100%',
        // color: '#fff',
        fontSize: 16,
        paddingHorizontal: 15, // Inner padding for text
    },
    // The touchable area for the icon
    eyeIcon: {
        padding: 10,
    },
});


export default ChangePassword;