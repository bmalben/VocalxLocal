import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fcbd01" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* App Name and Logo */}
        <View style={styles.appBrand}>
          <Image
            source={require('../images/Logo1.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>VocalxLocal</Text>
        </View>

        {/* Profile Icon */}
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to VocalxLocal</Text>
          <Text style={styles.welcomeSubtitle}>Your voice matters in your community</Text>
        </View>

        {/* App Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>About Our App</Text>
          <Text style={styles.descriptionText}>
            VocalxLocal is your community's platform to report and track local issues. 
            From potholes to street lighting, we help you connect with local authorities 
            and ensure your concerns are heard and addressed promptly.
          </Text>
        </View>

        {/* Action Cards */}
        <View style={styles.actionsContainer}>
          {/* Register Complaint Card */}
          <TouchableOpacity 
            style={[styles.actionCard, styles.registerCard]}
            onPress={() => navigation.navigate('Main')}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="add-circle" size={40} color="#fff" />
            </View>
            <Text style={styles.cardTitle}>Register New Complaint</Text>
            <Text style={styles.cardDescription}>
              Report a new issue in your neighborhood
            </Text>
            <View style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Report Now</Text>
            </View>
          </TouchableOpacity>

          {/* View Complaints Card */}
          <TouchableOpacity 
            style={[styles.actionCard, styles.viewCard]}
            onPress={() => navigation.navigate('Status')}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="list-circle" size={40} color="#fff" />
            </View>
            <Text style={styles.cardTitle}>View Registered Complaints</Text>
            <Text style={styles.cardDescription}>
              Track the status of your submitted complaints
            </Text>
            <View style={styles.cardButton}>
              <Text style={styles.cardButtonText}>View Status</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Community Impact</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,247</Text>
              <Text style={styles.statLabel}>Issues Reported</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>893</Text>
              <Text style={styles.statLabel}>Issues Resolved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>94%</Text>
              <Text style={styles.statLabel}>Satisfaction Rate</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyCard}>
          <Ionicons name="warning" size={24} color="#ff6b6b" />
          <Text style={styles.emergencyText}>
            For emergency issues, please contact your local authorities directly
          </Text>
        </View>
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
  appBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 22,
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
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    marginBottom: 25,
  },
  actionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  registerCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#4ecdc4',
  },
  viewCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#45b7d1',
  },
  cardIcon: {
    backgroundColor: '#fcbd01',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  cardButton: {
    backgroundColor: '#fcbd01',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fcbd01',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  emergencyText: {
    fontSize: 12,
    color: '#d63031',
    marginLeft: 10,
    flex: 1,
  },
});

export default HomeScreen;