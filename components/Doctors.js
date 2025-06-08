// components/Doctors.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserDoctor, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { Mystyle } from './Mystyle';
import api from './api/api'; // Import your central API client

const Doctors = () => {
  const navigation = useNavigation();

  // --- 1. STATE MANAGEMENT for API data and UI states ---
  const [allDoctors, setAllDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // State for filters
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // State for UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);


  // --- 2. DATA FETCHING from the backend ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch both doctors and specializations at the same time
        const [doctorsResponse, specsResponse] = await Promise.all([
          api.get('/doctors'),
          api.get('/specializations')
        ]);
        
        setAllDoctors(doctorsResponse.data || []);
        setSpecializations(specsResponse.data || []);
        setFilteredDoctors(doctorsResponse.data || []); // Initially, show all doctors

      } catch (err) {
        console.error("Failed to fetch doctor data:", err);
        setError("Could not load doctor information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // --- 3. FILTERING LOGIC that runs when filters change ---
  useEffect(() => {
    let filtered = allDoctors;

    if (selectedSpec) {
      filtered = filtered.filter(doc => doc.specialization?.name === selectedSpec);
    }

    if (selectedDoctor) {
      filtered = filtered.filter(doc => doc.userAccount?.fullname === selectedDoctor);
    }
    
    setFilteredDoctors(filtered);
  }, [selectedSpec, selectedDoctor, allDoctors]);


  // --- 4. HELPER FUNCTIONS for UI interaction ---
  const toggleDropdown = (dropdown) => {
    setExpanded(expanded === dropdown ? null : dropdown);
  };

  const resetFilters = () => {
    setSelectedSpec(null);
    setSelectedDoctor(null);
  };

  const handleAppointment = (doctor) => {
    // Pass robust IDs instead of names
    navigation.navigate('Appointment', {
      doctorId: doctor._id,
      specializationId: doctor.specialization._id,
    });
  };

  // Helper to get unique days from a schedule array, just like the web version
  const getDisplayableSchedule = (schedules) => {
    if (!schedules || schedules.length === 0) {
      return 'Schedule not available.';
    }
    const daysWithDuplicates = schedules.map(s => s.split(' - ')[0]);
    const uniqueDays = [...new Set(daysWithDuplicates)];
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    uniqueDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    return `🗓 Available: ${uniqueDays.join(', ')}`;
  };
  
  // --- 5. DYNAMICALLY GENERATE FILTER OPTIONS ---
  const filterOptions = {
    Specialization: specializations.map(spec => spec.name),
    "Doctor's Name": allDoctors.map(doc => doc.userAccount?.fullname).filter(Boolean),
  };

  // --- 6. RENDER LOGIC with loading and error states ---
  if (loading) {
    return <SafeAreaView style={Mystyle.doctorsContainer}><ActivityIndicator size="large" color="#1e3a8a" /></SafeAreaView>;
  }

  if (error) {
    return <SafeAreaView style={Mystyle.doctorsContainer}><Text style={{textAlign: 'center', marginTop: 50}}>{error}</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={Mystyle.doctorsContainer}>
      <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Dashboard')} style={Mystyle.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="#1e3a8a" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={Mystyle.doctorsContentContainer}>
        <Text style={Mystyle.doctorsSectionTitle}>Meet Our Doctors</Text>

        <View style={Mystyle.doctorsFiltersContainer}>
          {["Specialization", "Doctor's Name"].map((filter, index) => (
            <View key={index} style={Mystyle.doctorsDropdownFilterContainer}>
              <TouchableOpacity onPress={() => toggleDropdown(filter)} style={Mystyle.doctorsDropdownButton}>
                <Text style={Mystyle.doctorsDropdownButtonText}>
                  {filter}: {filter === 'Specialization' && selectedSpec ? selectedSpec : filter === "Doctor's Name" && selectedDoctor ? selectedDoctor : 'All'}
                </Text>
              </TouchableOpacity>
              {expanded === filter && (
                <View style={Mystyle.dropdownOptions}>
                  {filterOptions[filter].map((option, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      onPress={() => {
                        if (filter === 'Specialization') setSelectedSpec(option);
                        else if (filter === "Doctor's Name") setSelectedDoctor(option);
                        setExpanded(null);
                      }}
                      style={Mystyle.dropdownOption}
                    >
                      <Text>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={resetFilters} style={Mystyle.seeAllButton}>
            <Text style={Mystyle.seeAllButtonText}>See All Doctors</Text>
          </TouchableOpacity>
        </View>

        <View style={Mystyle.doctorsDoctorCardsContainer}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <View key={index} style={Mystyle.doctorsDoctorCard}>
                <View style={Mystyle.doctorsDoctorIcon}>
                  <FontAwesomeIcon icon={faUserDoctor} size={40} color="#1e3a8a" />
                </View>
                <View style={Mystyle.doctorsDoctorDetails}>
                  <Text style={Mystyle.doctorsDoctorName}>{doctor.userAccount?.fullname || 'N/A'}</Text>
                  <Text style={Mystyle.doctorsDoctorSpecialization}>{doctor.specialization?.name || 'N/A'}</Text>
                  <Text style={Mystyle.doctorsDoctorAvailability}>{getDisplayableSchedule(doctor.schedules)}</Text>
                  <TouchableOpacity
                    style={Mystyle.doctorsAppointmentButton}
                    onPress={() => handleAppointment(doctor)}
                  >
                    <Text style={Mystyle.doctorsAppointmentButtonText}>Schedule an Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={{textAlign: 'center', marginTop: 20}}>No doctors match the selected criteria.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Doctors;