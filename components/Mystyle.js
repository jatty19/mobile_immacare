import React from "react";
import { StyleSheet } from "react-native";

export const Mystyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7e7",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 60,
  },

  box: {
    width: 340,
    padding: 20,
    borderColor: "black",
  },

  logo: {
    height: 90,
    width: 80,
    borderRadius: 10,
    marginBottom: 40,
    alignSelf: "center",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },

  // DASHBOARD DESIGN
  containerDashbord: {
    flex: 1,
    backgroundColor: "#EEECDE",
    flexDirection: "row"
  },

  header: {
    width: "100%",
    backgroundColor: "#EEECDE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Better than using "right:30"
    paddingHorizontal: 20, // A bit more space
    paddingVertical: 10,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    color: '#001C5C',
    fontWeight: 'bold',
  },
  gridContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 20,
},
gridButton: {
  width: '48%', // Two items per row with a 4% gap
  aspectRatio: 1, // Makes the buttons square
  backgroundColor: '#FFFFFF', // Clean white background
  borderRadius: 20,
  padding: 15,
  marginBottom: 15,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 4, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
gridButtonTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#001C5C',
  marginTop: 10,
  textAlign: 'center',
},
gridButtonSubtitle: {
  fontSize: 12,
  color: '#666',
  marginTop: 4,
  textAlign: 'center',
},
secondaryTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  marginTop: 20,
  marginBottom: 10,
},
horizontalScroll: {
  flexDirection: 'row',
},
contactCard: {
  width: 100,
  height: 100,
  backgroundColor: '#001C5C',
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
},
contactCardText: {
  color: 'white',
  marginTop: 8,
  fontWeight: 'bold',
  fontSize: 14,
},


  logo: {
    height: 80,
    width: 100,
    resizeMode: "contain",
  },

  // CONTACT US SECTION
  contactContainer: {
    backgroundColor: "#40587C",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  contactTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },

  contactIcon: {
    backgroundColor: "#0B2447",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#0B2447", // Dark blue background
    borderRadius: 10,
    width: 110, // Set a fixed width
    height: 100, // Set a fixed height
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
    right:60,
    margin:10,
  },

  // BUTTONS SECTION
  buttonContainer: {
    marginTop: 20,
    width:'100%',
    alignItems:"center",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001C5C",
    width:"85%",
    padding: 50,
    borderRadius: 20,
    marginVertical: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },

  // SIDE NAVIGATION BAR
  sideNavContainer: {
    position: "absolute",
    right: 0, // Move sidebar to the right
    top: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#001C5C",
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  
  sideNavCloseButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  
  sideNavItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  
  sideNavText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  //PROFILE CSS
  containerProfile: {
    flex: 1,
    backgroundColor: "#EEECDE",
    alignItems: "center",
  },
  headerProfile: {
    backgroundColor: "#001C5C",
    width: "100%",
    height: 298,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    
  },
  // backButton: {
  //   position: "absolute",
  //   left: 20,
  //   top: 50,
  //   marginTop:5,
  // },
  backButton: {
    paddingTop: 30,
    paddingBottom: 30,
    alignSelf: 'flex-start',
    // top: 20, // Adjust for better vertical alignment
    left: 20, // Push it to the left corner
    zIndex:20, // Ensure it's above other elements
  },
  
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  profilePictureContainer: {
    // position: "absolute",
    bottom: 100,
    alignItems: "center",
  },
  profileIcon: {
    backgroundColor: "transparent",

  },
  form: {
    
    width: "80%",
    // marginTop: 80,
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
    color: "#333",
  },
  profile_input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#001C5C",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  logoutButtonContainer: {
    alignItems: 'center', // centers the button horizontally
    marginTop: 20,        // adds spacing from the top
    padding: 10,          // optional padding
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  containerSetappointment: {
  flex: 1,
  backgroundColor: '#EEECDE',
},
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    justifyContent: 'center',
  },
  pickerStyle: {
    width: '100%',
    // On Android, the picker has its own style, this helps contain it
    // On iOS, you might need to adjust height/padding
  },
  primaryButton: {
    backgroundColor: '#001C5C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#001C5C',
  },
  secondaryButtonText: {
    color: '#001C5C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  //setAppointmentcss
  containerSetappointment: {
    padding: 20,
    backgroundColor: '#EEECDE',
    flex: 1,
    justifyContent: 'center',
  
  },
  noteSetappointment: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 15
  },
  sectionTitleSetappointment: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'navy'
  },
  inputSetappointment: {
    borderWidth: 12,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation:4,
    color:'white',
    backgroundColor:'white',
  },
  buttonSetappointment: {
    backgroundColor: 'navy',
    padding: 15,
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonTextSetappointment: {
    color: 'white',
    fontWeight: 'bold'
  },
  inputSetappointmentdoc: {
    borderWidth: 1,
    padding: 1,
    marginBottom: 10,
    borderRadius: 5,
    color:'gray',
    backgroundColor:'white',
  },
  appointmentHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  appointmentFormContainer: {
    padding: 20,
    backgroundColor: "#001C5C",
    borderRadius: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  titleSetappointment: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  verificationPopupContainer: {
    backgroundColor: "#1e3a8a",
    padding:24,
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    top:150,
  },
  verificationPopupTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 2,
  },
  verificationPopupText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 4,
  },
  verificationNoteText: {
    color: "#f5f5f5",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
  verificationModalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  verificationModalButton: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  verificationModalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% transparency
    justifyContent: "center",
    alignItems: "center",
  },



  //LOGIN CSS
  containerLoginpage: {
    flex: 1,
    backgroundColor: "#EEECDE", // Beige background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainerLoginpage: {
    marginBottom: 20,
  },
  logoTextLoginpage: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A214A", // Dark Blue
    left:25,
  },
  loginTextLoginpage: {
    fontSize: 18,
    color: "#0A214A",
    marginBottom: 20,
  },
  inputContainerLoginpage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#999",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputLoginpage: {
    flex: 1,
    height: 50,
  },
  loginButtonLoginpage: {
    backgroundColor: "#0A214A", // Dark Blue
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  loginButtonTextLoginpage: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerTextLoginpage: {
    marginTop: 15,
    color: "black",
  },
  registerLinkLoginpage: {
    color: "#001C5C",
    fontWeight: "bold",
    top:5,
  },


//our service css
containerService: {
  flex: 1,
   backgroundColor: '#EEECDE',
},
headerService: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 15,
  backgroundColor: '#EEECDE',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},
logoTextService: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1e3a8a',
},
contentContainerService: {
   padding: 20,
},
serviceCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 20,
  marginBottom: 15,
  elevation: 3, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
},
serviceCardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
serviceCardTitle: {
  flex: 1, // Allows text to wrap if it's long
  fontSize: 18,
  fontWeight: 'bold',
  color: '#001C5C',
  marginRight: 10,
},
serviceCardContent: {
  paddingTop: 15, // Space between title and content
},
serviceCardText: {
  fontSize: 14,
  color: '#555',
  lineHeight: 20, // Improves readability
},

// --- NEW STYLES FOR THE FEATURED CARD AT THE BOTTOM ---
featuredServiceCard: {
  backgroundColor: '#001C5C', // Use primary dark color
  borderRadius: 16,
  padding: 24,
  marginTop: 20,
  alignItems: 'flex-start', // Align content to the left
},
featuredServiceTitle: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 20,
},
featuredServiceSubtitle: {
  color: '#d1d5db', // Lighter text color
  marginTop: 4,
  fontSize: 14,
},
featuredServiceContact: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
sectionTitleService: {
  fontSize: 18,
  fontWeight: '600',
  color: '#1e3a8a',
  marginBottom: 16,
},
serviceContainerService: {
  marginBottom: 12,
},
serviceButtonService: {
  backgroundColor: '#001C5C',
  borderRadius: 20,
  paddingVertical: 20,
  margin:12,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},
serviceTextService: {
  color: '#fff',
  fontWeight: '600',
},
dropdownContentService: {
  backgroundColor: 'lightblue',
  borderRadius: 12,
  padding: 12,
  margin:12,
  marginTop: 0,
},
dropdownTextService: {
  color: '#1e3a8a',
},
contactSectionService: {
  backgroundColor: '#001C5C',
  borderRadius: 16,
  padding: 20,
  marginTop: 24,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
},
contactTitleService: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
},
contactSubtitleService: {
  color: '#fff',
  marginTop: 4,
},
contactLabelService: {
  color: '#fff',
  marginTop: 12,
  fontWeight: '600',
},
contactNumberService: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 4,
},


//doctors css
doctorsContainer: {
  flex: 1,
  backgroundColor: '#EEECDE',
},
doctorsContentContainer: {
  padding: 20,
},
doctorsSectionTitle: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#001C5C',
  textAlign: 'center',
  marginBottom: 20,
},
doctorsFiltersContainer: {
  marginBottom: 20,
},
doctorsDropdownFilterContainer: {
  marginBottom: 12,
},
doctorsDropdownButton: {
  backgroundColor: '#001C5C',
  padding: 14,
  borderRadius: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
doctorsDropdownButtonText: {
  color: '#fff',
  fontSize: 16,
},
dropdownOptions: {
  backgroundColor: '#e0e7ff',
  borderRadius: 12,
  marginTop: 5,
  padding: 10,
},
dropdownOption: {
  paddingVertical: 8,
},
seeAllButton: {
  backgroundColor: '#001C5C',
  padding: 12,
  borderRadius: 12,
  marginTop: 10,
},
seeAllButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
},
doctorsDoctorCardsContainer: {
  gap: 20,
},
doctorsDoctorCard: {
  backgroundColor: '#001C5C',
  padding: 20,
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
},
doctorsDoctorIcon: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#e0e7ff',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 16,
},
doctorsDoctorDetails: {
  flex: 1,
},
doctorsDoctorName: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},
doctorsDoctorSpecialization: {
  color: '#d1d5db',
  fontSize: 16,
  marginVertical: 4,
},
doctorsDoctorAvailability: {
  color: '#d1d5db',
  fontSize: 14,
},
doctorsDoctorType: {
  color: '#d1d5db',
  fontSize: 14,
  marginBottom: 10,
},
doctorsAppointmentButton: {
  backgroundColor: '#f8f5f0',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 10,
},
doctorsAppointmentButtonText: {
  color: '#1e3a8a',
  fontWeight: 'bold',
  textAlign: 'center',
},
label: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 5,
  color: "#333",
  textAlign: 'center',
},
radioContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  marginVertical: 10,
  gap: 20, // Ensures spacing between options
},

radioOption: {
  flexDirection: "row",
  alignItems: "center",
},
 homeButtonSetappointment: {
    // This makes it a "ghost" button
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    // These styles are copied from the primary button for consistency
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15, // Give it some space from the button above
  },
  homeButtonTextSetappointment: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

});







