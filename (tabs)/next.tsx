import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LogoHeader from '../../components/LogoHeader';
import { useMenu } from '../context/MenuContext';

const COURSE_ORDER = ['Starter', 'Main', 'Dessert'];
const COURSE_COLORS = {
  Starter: '#D2B48C',
  Main: '#A0522D',
  Dessert: '#8B5C2F',
};

export default function NextScreen({ navigation }) {
  const { menu, selectedItemIds } = useMenu();

  // I grouped selected items by course
  const selectedItemsByCourse = COURSE_ORDER.map(course => {
    const items = menu.filter(
      item => item.course === course && selectedItemIds.includes(item.id)
    );
    return { course, items, color: COURSE_COLORS[course] };
  });

  const selectedItems = menu.filter(item => selectedItemIds.includes(item.id));

  return (
    <View style={styles.container}>
      <LogoHeader />

      <Text style={styles.header}>Patron Menu</Text>

      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 60 }}>
        {selectedItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome name="cutlery" size={58} color="#DEB887" style={{ marginBottom: 16 }} />
            <Text style={styles.emptyText}>No meals selected. Please select dish</Text>
          </View>
        ) : (
          selectedItemsByCourse.map(({ course, items, color }) =>
            items.length === 0 ? null : (
              <View key={course} style={styles.courseSection}>
                <Text style={[styles.courseTitle, { color }]}>{course}</Text>
                {items.map(item => (
                  <View key={item.id} style={styles.menuCard}>
                    <Text style={styles.menuCardTitle}>{item.name}</Text>
                    <Text style={styles.menuCardDescription}>{item.description}</Text>
                    <Text style={styles.menuCardPrice}>R {item.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            )
          )
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F3' },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A0522D',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 26,
  },
  scrollArea: {
    paddingHorizontal: 18,
  },
  courseSection: {
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    marginLeft: 2,
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: '#F5EEE6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  menuCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#965C16',
    marginBottom: 2,
  },
  menuCardDescription: {
    color: '#965C16',
    fontSize: 15,
    marginBottom: 4,
  },
  menuCardPrice: {
    color: '#B88753',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#B88753',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F6E4CD',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 18,
    shadowColor: '#A0522D',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#A0522D',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 4,
    elevation: 2,
  },
  homeButtonText: {
    color: '#FFF8F3',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});