// components/MyAppointmentScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native'; // For a back button
import api from './api/api'; // Make sure this path is correct

const MyAppointmentScreen = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useFocusEffect runs every time the screen comes into view
  useFocusEffect(
    React.useCallback(() => {
      const fetchAppointments = async () => {
        try {
          setLoading(true);
          setError(null);
          // Assuming the mobile endpoint is similar to the form submission endpoint
          const response = await api.get('/user/appointments');
          setAppointments(response.data);
        } catch (err) {
          console.error('Failed to fetch appointments:', err);
          setError('Could not load your appointments. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }, [])
  );

  const handleCancelAppointment = (appointmentId) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        {
          text: 'Nevermind',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          onPress: async () => {
            try {
              // Assumes a DELETE endpoint like /user/appointments/:id
              await api.delete(`/user/appointments/${appointmentId}`);
              
              // Refresh the list by filtering out the cancelled appointment
              setAppointments(prev => prev.filter(app => app._id !== appointmentId));

              Alert.alert('Success', 'Your appointment has been cancelled.');
            } catch (err) {
              console.error('Failed to cancel appointment:', err);
              Alert.alert('Error', 'Could not cancel the appointment.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  // What to show while loading
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1e3a8a" />
      </SafeAreaView>
    );
  }

  // What to show if there's an error
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }
  
  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.doctorName}>Dr. {item.doctor?.userAccount?.fullname || 'N/A'}</Text>
      <Text style={styles.specialization}>{item.specialization?.name || 'N/A'}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailValue}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
       <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Time:</Text>
        <Text style={styles.detailValue}>{item.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Reason:</Text>
        <Text style={styles.detailValue}>{item.reason || 'N/A'}</Text>
      </View>
      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => handleCancelAppointment(item._id)}
      >
        <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#1e3a8a" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.container}>
            <Text style={styles.emptyText}>You have no scheduled appointments.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// You can move these styles to your Mystyle.js file for consistency
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#1e3a8a',
  },
  listContainer: {
    padding: 10,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialization: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 14,
    color: '#555',
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  errorText: {
      fontSize: 16,
      color: 'red',
  }
});

export default MyAppointmentScreen;