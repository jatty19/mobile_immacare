// components/Service.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
// 1. Import ChevronUp as well for better visual feedback
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react-native";
import { Mystyle } from "./Mystyle";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Service = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const toggleDropdown = (serviceTitle) => {
    setExpanded(expanded === serviceTitle ? null : serviceTitle);
  };

  const servicesData = [
    {
      title: 'Obstetrics and Gynecology',
      content: 'The Obstetrics and Gynecology (OB-GYN) department supports women’s health through all life stages. We offer prenatal care, family planning, fertility counseling, menstrual disorder treatment, and menopause management. Our obstetricians ensure safe and supportive care throughout pregnancy and childbirth.'
    },
    {
      title: 'Pediatrics',
      content: 'Our Pediatrics services are designed to meet the unique medical needs of infants, children, and adolescents. From routine checkups and vaccinations to managing acute and chronic illnesses, we ensure every child receives compassionate and age-appropriate care.'
    },
    {
      title: 'Internal Medicine',
      content: 'The Internal Medicine department provides primary and specialty care for adult patients, managing chronic illnesses such as diabetes, hypertension, heart disease, and respiratory conditions. Our internists take a holistic approach to diagnosis, prevention, and long-term care.'
    },
    // ... include all your other services here ...
    {
        title: 'Surgery',
        content: 'Our Surgery team performs a wide range of procedures, from minor outpatient surgeries to more complex operations. With a focus on patient safety and recovery, we utilize modern techniques and equipment to ensure optimal outcomes for general, laparoscopic, and emergency surgeries.'
    },
    {
        title: 'Dermatology',
        content: 'The Dermatology department specializes in the health of your skin, hair, and nails. We treat acne, eczema, psoriasis, fungal infections, skin allergies, and perform screenings for skin cancer. Our approach combines medical and cosmetic dermatology for complete skin wellness.'
    },
    {
        title: 'Ophthalmology',
        content: 'Our Ophthalmology team provides comprehensive eye care, from routine vision exams to the management of complex eye diseases such as cataracts, glaucoma, diabetic retinopathy, and macular degeneration. We use advanced diagnostic tools and treatments to protect and restore your vision.'
    },
    {
        title: 'Urology',
        content: 'The Urology department focuses on the urinary tract system and male reproductive organs. Our services include diagnosis and treatment of urinary tract infections, kidney stones, incontinence, and prostate issues. We offer both medical management and surgical solutions tailored to your needs.'
    },
    {
        title: 'ENT (Ear, Nose, and Throat)',
        content: 'Our ENT specialists provide expert care for disorders related to the ear, nose, throat, and related structures of the head and neck. We treat common issues like sinus infections, hearing loss, sore throats, and balance disorders, as well as more complex conditions that may require surgical intervention.'
    }
  ];

  return (
    <SafeAreaView style={Mystyle.containerService}>
      <View style={Mystyle.headerService}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#1e3a8a" size={24} />
        </TouchableOpacity>
        <Text style={Mystyle.headerTitle}>Our Services</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={Mystyle.contentContainerService}>
        {servicesData.map((service, index) => {
          const isExpanded = expanded === service.title;
          return (
            <TouchableOpacity
              key={index}
              style={Mystyle.serviceCard}
              onPress={() => toggleDropdown(service.title)}
              activeOpacity={0.7}
            >
              <View style={Mystyle.serviceCardHeader}>
                <Text style={Mystyle.serviceCardTitle}>{service.title}</Text>
                {isExpanded ? <ChevronUp color="#001C5C" size={24} /> : <ChevronDown color="#001C5C" size={24} />}
              </View>
              {isExpanded && (
                <View style={Mystyle.serviceCardContent}>
                  <Text style={Mystyle.serviceCardText}>{service.content}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={Mystyle.featuredServiceCard}>
          <Text style={Mystyle.featuredServiceTitle}>24/7 Lying-In Clinic</Text>
          <Text style={Mystyle.featuredServiceSubtitle}>Maternity and newborn care available around the clock.</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Icon name="phone" size={16} color="white" style={{marginRight: 8}}/>
            <Text style={Mystyle.featuredServiceContact}>0912 3456 789</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Service;