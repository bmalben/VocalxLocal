import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Alert, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const Main = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const issueCategories = [
    { label: 'Potholes & Road Damage', value: 'potholes' },
    { label: 'Garbage & Waste Management', value: 'garbage' },
    { label: 'Street Lighting', value: 'lighting' },
    { label: 'Water Supply Issues', value: 'water' },
    { label: 'Drainage Problems', value: 'drainage' },
    { label: 'Public Safety Concerns', value: 'safety' },
    { label: 'Parks & Recreation', value: 'parks' },
    { label: 'Other', value: 'other' },
  ];

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera permission is needed to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Gallery permission is needed to select photos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Location permission is needed to pinpoint the issue');
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = locationData.coords;
      setLocation({ latitude, longitude });

      // Get address from coordinates
      const [addressResult] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResult) {
        const formattedAddress = `${addressResult.name || ''} ${addressResult.street || ''}, ${addressResult.city || ''}`.trim();
        setAddress(formattedAddress);
      }

    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!issueType) {
      Alert.alert('Error', 'Please select an issue type');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please describe the issue');
      return;
    }

    if (!location) {
      Alert.alert('Error', 'Please pinpoint the location');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Warning', 'Adding a photo helps authorities understand the issue better. Are you sure you want to continue without a photo?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: submitComplaint },
      ]);
      return;
    }

    submitComplaint();
  };

  const submitComplaint = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success', 
        'Your complaint has been registered successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      
      // Reset form
      setSelectedImage(null);
      setIssueType('');
      setDescription('');
      setLocation(null);
      setAddress('');
      
    } catch (error) {
      Alert.alert('Error', 'Failed to submit complaint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryLabel = () => {
    const category = issueCategories.find(cat => cat.value === issueType);
    return category ? category.label : 'Select Issue Type';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.appBrand}>
          <Image
            source={require('../images/Logo1.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Report Issue</Text>
        </View>

        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Help us make your community better</Text>

        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Photo Evidence</Text>
          <Text style={styles.sectionSubtitle}>A picture helps authorities understand the issue better</Text>
          
          <View style={styles.photoContainer}>
            {selectedImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <Ionicons name="close-circle" size={24} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.photoButtons}>
                <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                  <Ionicons name="camera" size={28} color="#fff" />
                  <Text style={styles.photoButtonText}>Take Photo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.photoButton, styles.galleryButton]} onPress={pickFromGallery}>
                  <Ionicons name="images" size={28} color="#fff" />
                  <Text style={styles.photoButtonText}>From Gallery</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Issue Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Category</Text>
          
          <TouchableOpacity 
            style={styles.categorySelector}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={[styles.categoryText, !issueType && styles.placeholderText]}>
              {getCategoryLabel()}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {/* Category Selection Modal */}
          <Modal
            visible={showCategoryModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCategoryModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Issue Category</Text>
                  <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView>
                  {issueCategories.map((category) => (
                    <TouchableOpacity
                      key={category.value}
                      style={[
                        styles.categoryItem,
                        issueType === category.value && styles.categoryItemSelected
                      ]}
                      onPress={() => {
                        setIssueType(category.value);
                        setShowCategoryModal(false);
                      }}
                    >
                      <Text style={[
                        styles.categoryItemText,
                        issueType === category.value && styles.categoryItemTextSelected
                      ]}>
                        {category.label}
                      </Text>
                      {issueType === category.value && (
                        <Ionicons name="checkmark" size={20} color="#2ecc71" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe the Issue</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Please describe the issue in detail... (What, when, how it affects the community)"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.charCount}>{description.length}/500 characters</Text>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pinpoint Location</Text>
          
          <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation} disabled={isLoading}>
            <Ionicons name="locate" size={20} color="#fff" />
            <Text style={styles.locationButtonText}>
              {isLoading ? 'Getting Location...' : 'Use Current Location'}
            </Text>
          </TouchableOpacity>

          {address && (
            <View style={styles.locationInfo}>
              <Ionicons name="checkmark-circle" size={20} color="#2ecc71" />
              <Text style={styles.addressText}>Location captured: {address}</Text>
            </View>
          )}

          {location && (
            <View style={styles.coordinatesContainer}>
              <Text style={styles.coordinatesText}>
                📍 Latitude: {location.latitude.toFixed(6)}
              </Text>
              <Text style={styles.coordinatesText}>
                📍 Longitude: {location.longitude.toFixed(6)}
              </Text>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Ionicons name="refresh" size={24} color="#fff" style={styles.loadingIcon} />
          ) : (
            <Ionicons name="paper-plane" size={24} color="#fff" />
          )}
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Submitting...' : 'Submit Complaint'}
          </Text>
        </TouchableOpacity>

        {/* Privacy Notice */}
        <Text style={styles.privacyText}>
          📝 Your complaint will be shared with local authorities. Personal information is kept confidential.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcbd01',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fcbd01',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  appBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    padding: 5,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    height: 50,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryItemSelected: {
    backgroundColor: '#e8f5e8',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  categoryItemTextSelected: {
    color: '#2ecc71',
    fontWeight: '600',
  },
  photoContainer: {
    alignItems: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  photoButton: {
    backgroundColor: '#4ecdc4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 120,
  },
  galleryButton: {
    backgroundColor: '#45b7d1',
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
    fontSize: 12,
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fcbd01',
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  descriptionInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  locationButton: {
    backgroundColor: '#ff6b6b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  coordinatesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  coordinatesText: {
    fontSize: 14,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  submitButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  loadingIcon: {
    transform: [{ rotate: '0deg' }],
  },
  privacyText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Main;