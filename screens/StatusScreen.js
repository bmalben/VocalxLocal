import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatusScreen = ({ navigation }) => {
  const [complaints, setComplaints] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'in-progress', 'resolved'

  // Sample data
  const sampleComplaints = [
    {
      id: '1',
      title: 'Pothole on Main Street',
      category: 'potholes',
      description: 'Large pothole near the intersection causing traffic issues',
      status: 'in-progress',
      date: '2024-01-15',
      location: '123 Main Street',
      image: require('../images/Logo1.png'),
      updates: [
        {
          date: '2024-01-16',
          message: 'Issue assigned to maintenance team',
          status: 'in-progress'
        },
        {
          date: '2024-01-15',
          message: 'Complaint registered successfully',
          status: 'pending'
        }
      ]
    },
    {
      id: '2',
      title: 'Garbage Accumulation',
      category: 'garbage',
      description: 'Garbage bins overflowing in park area',
      status: 'resolved',
      date: '2024-01-10',
      location: 'Central Park',
      image: require('../images/Logo1.png'),
      updates: [
        {
          date: '2024-01-12',
          message: 'Garbage cleared successfully',
          status: 'resolved'
        },
        {
          date: '2024-01-11',
          message: 'Sanitation team dispatched',
          status: 'in-progress'
        }
      ]
    },
    {
      id: '3',
      title: 'Street Light Not Working',
      category: 'lighting',
      description: 'Light pole #45 not functioning since last week',
      status: 'pending',
      date: '2024-01-18',
      location: 'Oak Avenue',
      image: require('../images/Logo1.png'),
      updates: [
        {
          date: '2024-01-18',
          message: 'Complaint registered successfully',
          status: 'pending'
        }
      ]
    }
  ];

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    setRefreshing(true);
    setTimeout(() => {
      setComplaints(sampleComplaints);
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12'; // Orange
      case 'in-progress': return '#3498db'; // Blue
      case 'resolved': return '#2ecc71'; // Green
      case 'rejected': return '#e74c3c'; // Red
      default: return '#95a5a6'; // Gray
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'time';
      case 'in-progress': return 'build';
      case 'resolved': return 'checkmark-done';
      case 'rejected': return 'close-circle';
      default: return 'help';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'potholes': return 'car';
      case 'garbage': return 'trash';
      case 'lighting': return 'bulb';
      case 'water': return 'water';
      case 'drainage': return 'water';
      case 'safety': return 'shield-checkmark';
      case 'parks': return 'leaf';
      case 'noise': return 'volume-high';
      case 'animals': return 'paw';
      default: return 'alert-circle';
    }
  };

  const filteredComplaints = filter === 'all' 
    ? complaints 
    : complaints.filter(complaint => complaint.status === filter);

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'in-progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  const handleComplaintPress = (complaint) => {
    Alert.alert(
      complaint.title,
      `Status: ${getStatusText(complaint.status)}\n\n${complaint.description}`,
      [{ text: 'OK' }]
    );
  };

  const renderComplaintCard = (complaint) => (
    <TouchableOpacity 
      key={complaint.id}
      style={styles.complaintCard}
      onPress={() => handleComplaintPress(complaint)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Ionicons name={getCategoryIcon(complaint.category)} size={16} color="#333" />
          <Text style={styles.categoryText}>{complaint.category}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(complaint.status) }]}>
          <Ionicons name={getStatusIcon(complaint.status)} size={14} color="#fff" />
          <Text style={styles.statusText}>{getStatusText(complaint.status)}</Text>
        </View>
      </View>

      <Text style={styles.complaintTitle}>{complaint.title}</Text>
      <Text style={styles.complaintDescription} numberOfLines={2}>
        {complaint.description}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.locationInfo}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.locationText}>{complaint.location}</Text>
        </View>
        <Text style={styles.dateText}>{complaint.date}</Text>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { 
              width: complaint.status === 'pending' ? '33%' : 
                     complaint.status === 'in-progress' ? '66%' : '100%',
              backgroundColor: getStatusColor(complaint.status)
            }
          ]} 
        />
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.appName}>My Complaints</Text>
        </View>

        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'pending' && styles.filterTabActive]}
          onPress={() => setFilter('pending')}
        >
          <Ionicons name="time" size={16} color={filter === 'pending' ? '#fff' : '#f39c12'} />
          <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>Pending</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'in-progress' && styles.filterTabActive]}
          onPress={() => setFilter('in-progress')}
        >
          <Ionicons name="build" size={16} color={filter === 'in-progress' ? '#fff' : '#3498db'} />
          <Text style={[styles.filterText, filter === 'in-progress' && styles.filterTextActive]}>In Progress</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'resolved' && styles.filterTabActive]}
          onPress={() => setFilter('resolved')}
        >
          <Ionicons name="checkmark-done" size={16} color={filter === 'resolved' ? '#fff' : '#2ecc71'} />
          <Text style={[styles.filterText, filter === 'resolved' && styles.filterTextActive]}>Resolved</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Complaints List */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadComplaints}
            colors={['#fcbd01']}
            tintColor="#fcbd01"
          />
        }
      >
        {filteredComplaints.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text" size={64} color="#ddd" />
            <Text style={styles.emptyStateTitle}>No complaints found</Text>
            <Text style={styles.emptyStateText}>
              {filter === 'all' 
                ? "You haven't registered any complaints yet."
                : `No ${filter} complaints found.`
              }
            </Text>
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.registerButtonText}>Register New Complaint</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.resultsText}>
              {filteredComplaints.length} complaint{filteredComplaints.length !== 1 ? 's' : ''} found
            </Text>
            {filteredComplaints.map(renderComplaintCard)}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Main')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
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
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterTabActive: {
    backgroundColor: '#fcbd01',
    borderColor: '#fcbd01',
  },
  filterText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  complaintCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
    textTransform: 'capitalize',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  complaintTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  complaintDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#fcbd01',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#fcbd01',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default StatusScreen;