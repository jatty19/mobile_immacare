// components/AppointmentForm.js

import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform,
  SafeAreaView, TouchableOpacity, Modal, Alert, ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Mystyle } from "./Mystyle";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import api from "./api/api";
import { Calendar } from 'react-native-calendars';

const AppointmentForm = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [form, setForm] = useState({
    firstName: "", lastName: "", suffix: "",
    phone: "", age: "", address: "",
    specialization: "", doctor: "", date: "", time: "", reason: "",
  });

  const [specializations, setSpecializations] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctorsForPicker, setDoctorsForPicker] = useState([]);

  // State for the new date/time logic
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
   const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // --- Data Fetching & Autofill ---
  useFocusEffect(
    React.useCallback(() => {
      const loadInitialData = async () => {
        try {
          const [specsResponse, profileResponse, doctorsResponse] = await Promise.all([
            api.get('/specializations'),
            api.get('/user/profile'),
            api.get('/doctors')
          ]);

          setSpecializations(specsResponse.data || []);
          setAllDoctors(doctorsResponse.data || []);

          const profile = profileResponse.data;
          setForm(prevForm => ({
            ...prevForm,
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            suffix: profile.suffix || '',
            phone: profile.PhoneNumber || '',
            address: profile.Address || '',
            age: String(profile.Age || ''),
          }));
          
          if (route.params?.doctorId && route.params?.specializationId) {
            setForm(prevForm => ({
                ...prevForm,
                doctor: route.params.doctorId,
                specialization: route.params.specializationId,
                reason: route.params.reason || prevForm.reason 
            }));
          }

        } catch (err) {
          console.error("Failed to load appointment form data:", err);
          Alert.alert("Error", "Could not load necessary data. Please try again.");
        }
      };
      loadInitialData();
    }, [route.params])
  );

  // --- Cascading Dropdown Logic ---
  useEffect(() => {
    if (form.specialization) {
      const filtered = allDoctors.filter(doc => doc.specialization?._id === form.specialization);
      setDoctorsForPicker(filtered);
    } else {
      setDoctorsForPicker([]);
    }
     if (form.specialization !== route.params?.specializationId) {
      setForm(prevForm => ({ ...prevForm, doctor: "" }));
    }
  }, [form.specialization, allDoctors]);

  // --- Fetch Doctor's Schedule when Doctor is Selected ---
  useEffect(() => {
    const fetchDoctorSchedule = async () => {
      if (!form.doctor) {
        setDoctorSchedule(null);
        return;
      }
      try {
        const response = await api.get(`/schedule/${form.doctor}`);
        setDoctorSchedule(response.data);
      } catch (err) {
        console.error("Failed to fetch doctor schedule:", err);
        setDoctorSchedule(null);
      }
    };
    fetchDoctorSchedule();
    setForm(prev => ({ ...prev, date: "", time: "" }));
  }, [form.doctor]);

  // --- Calculate Available Times when Date is Selected ---
  useEffect(() => {
    const calculateAvailableTimes = async () => {
      if (!form.date || !form.doctor || !doctorSchedule) {
        setAvailableTimes([]);
        return;
      }
      setLoadingTimes(true);
      try {
        const dayOfWeek = new Date(form.date).toLocaleDateString('en-US', { weekday: 'long' });
        const potentialTimes = doctorSchedule[dayOfWeek] || [];
        const bookedTimesResponse = await api.get(`/booked-times?doctorId=${form.doctor}&date=${form.date}`);
        const bookedTimes = bookedTimesResponse.data;
        const finalAvailableTimes = potentialTimes.filter(time => !bookedTimes.includes(time));
        setAvailableTimes(finalAvailableTimes);
      } catch (err) {
        console.error("Failed to calculate available times:", err);
        setAvailableTimes([]);
      } finally {
        setLoadingTimes(false);
      }
    };
    calculateAvailableTimes();
    setForm(prev => ({ ...prev, time: "" }));
  }, [form.date, form.doctor, doctorSchedule]);


  // --- Handler Functions ---
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };


  const onDayPress = (day) => {
    // day object from the calendar is { dateString: 'YYYY-MM-DD', ... }
    setForm({ ...form, date: day.dateString });
    setCalendarModalVisible(false); // Close the modal after selection
  };
  
  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.age || !form.address || !form.specialization || !form.doctor || !form.date || !form.time || !form.reason) {
        Alert.alert("Missing Information", "Please fill in all required fields.");
        return;
    }
    setIsModalVisible(true);
  };

   const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        doctor: form.doctor,
        specialization: form.specialization,
        date: form.date,
        time: form.time,
        reason: form.reason,
      };

      if (route.params?.rescheduleOf) {
        appointmentData.rescheduleOf = route.params.rescheduleOf;
      }

      await api.post('/user/appointments', appointmentData);

      setIsSubmitting(false);
      setIsModalVisible(false);
      Alert.alert("Success!", "Your appointment request has been submitted.", [
        { text: "OK", onPress: () => navigation.navigate('Dashboard') }
      ]);
    } catch (err) {
      setIsSubmitting(false);
      console.error("Failed to submit appointment:", err.response?.data || err.message);
      Alert.alert("Submission Failed", "There was an error submitting your appointment. Please try again.");
    }
  };

  const handleEdit = () => {
    setIsModalVisible(false);
  };

  const getMarkedDates = () => {
    if (!doctorSchedule) {
      return {}; // Return empty object if no schedule is loaded
    }
    
    // Create an object of all dates in the current month to mark as disabled
    const marked = {};
    const availableDays = Object.keys(doctorSchedule).filter(day => doctorSchedule[day].length > 0);
    const dayNameToNum = { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 };

    const today = new Date();
    // Mark the next 90 days for performance, adjust as needed
    for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayNum = date.getDay();
        const dayName = Object.keys(dayNameToNum).find(key => dayNameToNum[key] === dayNum);
        
        // If the day is NOT in the doctor's available weekdays
        if (!availableDays.includes(dayName)) {
            const dateString = date.toISOString().split('T')[0];
            marked[dateString] = { 
                disabled: true, 
                disableTouchEvent: true,
                // Custom styling for unavailable dates
                customStyles: {
                    container: {
                        backgroundColor: '#ffdddd' // A light red background
                    },
                    text: {
                        color: '#aaa', // Gray out the text
                        textDecorationLine: 'line-through'
                    }
                }
            };
        }
    }
    // Mark the selected date with a blue circle
    if (form.date) {
        marked[form.date] = {
            ...marked[form.date], // Keep disabled styles if they exist
            selected: true,
            selectedColor: '#007bff'
        };
    }
    return marked;
  };

  return (
    <SafeAreaView style={Mystyle.containerSetappointment}>
      <View style={Mystyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#1e3a8a" size={24} />
        </TouchableOpacity>
        <Text style={Mystyle.headerTitle}>Set an Appointment</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
          <View style={Mystyle.formCard}>
            
            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>First Name</Text>
              <TextInput style={Mystyle.inputField} value={form.firstName} onChangeText={(v) => handleChange("firstName", v)} placeholder="e.g., Juan" />
            </View>
            
            <View style={Mystyle.formRow}>
                <View style={[Mystyle.inputGroup, { flex: 2 }]}>
                    <Text style={Mystyle.label}>Last Name</Text>
                    <TextInput style={Mystyle.inputField} value={form.lastName} onChangeText={(v) => handleChange("lastName", v)} placeholder="e.g., Dela Cruz" />
                </View>
                <View style={[Mystyle.inputGroup, { flex: 1, marginLeft: 10 }]}>
                    <Text style={Mystyle.label}>Suffix</Text>
                    <TextInput style={Mystyle.inputField} value={form.suffix} onChangeText={(v) => handleChange("suffix", v)} placeholder="e.g., Jr." />
                </View>
            </View>
            
            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Phone Number</Text>
              <TextInput style={Mystyle.inputField} value={form.phone} onChangeText={(v) => handleChange("phone", v)} keyboardType="phone-pad" placeholder="e.g., 09123456789" />
            </View>

            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Age</Text>
              <TextInput style={Mystyle.inputField} value={form.age} onChangeText={(v) => handleChange("age", v)} keyboardType="numeric" placeholder="e.g., 30" />
            </View>

            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Address</Text>
              <TextInput style={Mystyle.inputField} value={form.address} onChangeText={(v) => handleChange("address", v)} placeholder="e.g., 123 Main St, Pasig City" />
            </View>
            
            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Specialization</Text>
              <View style={Mystyle.pickerContainer}>
                <Picker selectedValue={form.specialization} onValueChange={(v) => handleChange("specialization", v)} style={Mystyle.pickerStyle}>
                  <Picker.Item label="Select a Specialization..." value="" />
                  {specializations.map(spec => <Picker.Item key={spec._id} label={spec.name} value={spec._id} />)}
                </Picker>
              </View>
            </View>

            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Doctor</Text>
              <View style={Mystyle.pickerContainer}>
                <Picker selectedValue={form.doctor} onValueChange={(v) => handleChange("doctor", v)} style={Mystyle.pickerStyle} enabled={!!form.specialization}>
                  <Picker.Item label={form.specialization ? "Select a Doctor..." : "Select specialization first"} value="" />
                  {doctorsForPicker.map(doc => <Picker.Item key={doc._id} label={doc.userAccount?.fullname || 'Unnamed Doctor'} value={doc._id} />)}
                </Picker>
              </View>
            </View>
            
            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Date</Text>
              <TouchableOpacity style={Mystyle.inputField} onPress={() => setCalendarModalVisible(true)} disabled={!form.doctor}>
                <Text style={{ color: form.date ? '#000' : '#999' }}>
                    {form.date ? new Date(form.date + 'T00:00:00').toLocaleDateString() : 'Select a Date'}
                </Text>
              </TouchableOpacity>
            </View>

            <Modal visible={isCalendarModalVisible} animationType="slide">
                <SafeAreaView style={{flex: 1}}>
                    <Calendar
                        minDate={new Date().toISOString().split('T')[0]} // Disable past dates
                        onDayPress={onDayPress}
                        markedDates={getMarkedDates()}
                        markingType={'custom'} // Enable custom styling
                    />
                    <TouchableOpacity style={Mystyle.primaryButton} onPress={() => setCalendarModalVisible(false)}>
                        <Text style={Mystyle.primaryButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
            
            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Available Time</Text>
              {loadingTimes ? (
                <ActivityIndicator color="#001C5C" style={{ padding: 10 }} />
              ) : (
                <View style={Mystyle.pickerContainer}>
                  <Picker selectedValue={form.time} onValueChange={(v) => handleChange("time", v)} style={Mystyle.pickerStyle} enabled={!loadingTimes && (availableTimes || []).length > 0}>
                    <Picker.Item label={!form.date ? "Select a date first" : (availableTimes || []).length > 0 ? "Select a Time..." : "No available times"} value="" />
                    {(availableTimes || []).map(time => <Picker.Item key={time} label={time} value={time} />)}
                  </Picker>
                </View>
              )}
            </View>

            <View style={Mystyle.inputGroup}>
              <Text style={Mystyle.label}>Reason for Visit</Text>
              <TextInput style={[Mystyle.inputField, { height: 100, textAlignVertical: 'top' }]} onChangeText={(v) => handleChange("reason", v)} multiline placeholder="Briefly describe your reason for consultation..." />
            </View>

            <TouchableOpacity style={Mystyle.primaryButton} onPress={handleSubmit}>
              <Text style={Mystyle.primaryButtonText}>SUBMIT APPOINTMENT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Mystyle.secondaryButton} onPress={() => navigation.navigate('Dashboard')}>
              <Text style={Mystyle.secondaryButtonText}>BACK TO HOME</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal transparent visible={isModalVisible} animationType="slide">
        <View style={Mystyle.modalBackground}>
          <View style={Mystyle.verificationPopupContainer}>
            <Text style={Mystyle.verificationPopupTitle}>Verification</Text>
            <Text style={Mystyle.verificationPopupText}>Name: {`${form.firstName} ${form.lastName}`}</Text>
            <Text style={Mystyle.verificationPopupText}>Date: {form.date}</Text>
            <Text style={Mystyle.verificationPopupText}>Time: {form.time}</Text>
            <Text style={Mystyle.verificationNoteText}>NOTE: Your appointment isn't confirmed yet. We will call you for final confirmation.</Text>
            <View style={Mystyle.verificationModalButtonContainer}>
              <TouchableOpacity style={Mystyle.verificationModalButton} onPress={handleEdit} disabled={isSubmitting}>
                <Text style={Mystyle.verificationModalButtonText}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Mystyle.verificationModalButton} onPress={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={Mystyle.verificationModalButtonText}>SUBMIT</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AppointmentForm;