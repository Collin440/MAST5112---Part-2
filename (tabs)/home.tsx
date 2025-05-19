import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMenu } from '../context/MenuContext';

const COURSE_TABS = [
  { label: 'Starter', key: 'Starter', color: '#D2B48C' },   // Tan
  { label: 'Main', key: 'Main', color: '#A0522D' },         // Sienna
  { label: 'Dessert', key: 'Dessert', color: '#8B5C2F' },   // Brown
];

const CARD_SHADES = ['#EAD9C5', '#DEB887', '#B88753']; // Cream, BurlyWood, Custom Brown

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const CARD_MARGIN = (SCREEN_WIDTH - CARD_WIDTH) / 2;

const CHEFS_MENU_IDS = ['1', '2', '4']; // My Menu ID's as per Part 1 (POE): Cedar Plank Salmon, Beef Wellington, Raspberry Trifle

export default function HomeScreen() {
  const { menu, selectedItemIds, toggleSelectItem, isItemSelected } = useMenu();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chefsMenuChecked, setChefsMenuChecked] = useState(false);

  // Group menu and total price by course
  const courseBlocks = COURSE_TABS.map((tab, i) => {
    const items = menu.filter(item => item.course === tab.key);
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return { ...tab, items, total, shade: CARD_SHADES[i % CARD_SHADES.length] };
  });

  // Total price of all selected items
  const selectedItems = menu.filter(item => selectedItemIds.includes(item.id));
  const cartTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleScroll = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(index);
  };

  const handleChefMenuToggle = () => {
    setChefsMenuChecked(v => !v);
    if (!chefsMenuChecked) {
      CHEFS_MENU_IDS.forEach(id => {
        if (!isItemSelected(id)) toggleSelectItem(id);
      });
    } else {
      CHEFS_MENU_IDS.forEach(id => {
        if (isItemSelected(id)) toggleSelectItem(id);
      });
    }
  };

  const renderMenuItems = (items: typeof menu) =>
    items.length === 0 ? (
      <Text style={styles.emptyText}>No items in this course.</Text>
    ) : (
      items.map(item => {
        const checked = isItemSelected(item.id);
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuCard,
              checked && styles.menuCardSelected,
            ]}
            onPress={() => toggleSelectItem(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.menuCardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuCardTitle}>{item.name}</Text>
                <Text style={styles.menuCardDescription}>{item.description}</Text>
                <Text style={styles.menuCardPrice}>R {item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.menuCheckbox}>
                <FontAwesome
                  name={checked ? "check-square" : "square-o"}
                  size={26}
                  color={checked ? "#A0522D" : "#B88753"}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    );

  return (
    <View style={styles.container}>
      {/* My Menu Logo */}
      <View style={styles.logoRow}>
        <Image
          source={require('../../assets/images/cristo-logo.jpg')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.chefsMenuContainer}>
        <TouchableOpacity
          style={styles.chefsMenuCheckRow}
          onPress={handleChefMenuToggle}
          activeOpacity={0.7}
        >
          <FontAwesome
            name={chefsMenuChecked ? "check-square" : "square-o"}
            size={28}
            color={chefsMenuChecked ? "#A0522D" : "#B88753"}
          />
          <Text style={styles.chefsMenuText}>Chef&apos;s Menu</Text>
        </TouchableOpacity>
        <Text style={styles.chefsMenuSubText}>
          Select all chef&apos;s specials in one tap!
        </Text>
      </View>

      {/* Course Carousel for the Starters, Mains and Desserts */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToAlignment="center"
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: CARD_MARGIN,
          alignItems: 'center',
        }}
        style={{ flexGrow: 0 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {courseBlocks.map((block, idx) => (
          <View
            key={block.key}
            style={[
              styles.carouselCard,
              {
                width: CARD_WIDTH,
                backgroundColor: block.shade,
                borderColor: block.color,
                shadowColor: block.color,
              },
              activeIndex === idx && styles.carouselCardActive,
            ]}
          >
            <Text style={[styles.carouselTitle, { color: block.color }]}>{block.label}</Text>
            <Text style={[styles.carouselTotal, { color: block.color }]}>
              Total: R {block.total.toFixed(2)}
            </Text>
            <ScrollView
              style={styles.menuList}
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            >
              {renderMenuItems(block.items)}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {COURSE_TABS.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              activeIndex === idx && styles.dotActive,
              { backgroundColor: COURSE_TABS[idx].color },
            ]}
          />
        ))}
      </View>
      <View style={styles.cartContainer}>
        <FontAwesome name="shopping-cart" size={24} color="#A0522D" />
        <Text style={styles.cartText}>
          {selectedItems.length} item{selectedItems.length === 1 ? '' : 's'} | Total: <Text style={{ fontWeight: 'bold' }}>R {cartTotal.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F3' },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 8,
  },
  logoImage: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F5EEE6' },
  carouselCard: {
    borderRadius: 18,
    marginHorizontal: 4,
    marginTop: 8,
    padding: 22,
    flex: 1,
    minHeight: 340,
    maxHeight: 420,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    opacity: 0.93,
  },
  carouselCardActive: {
    opacity: 1,
    borderWidth: 3,
  },
  carouselTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 1,
  },
  carouselTotal: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  menuList: {
    marginTop: 0,
    flexGrow: 0,
    maxHeight: 280,
  },
  menuCard: {
    backgroundColor: '#F5EEE6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  menuCardSelected: {
    borderColor: '#A0522D',
    borderWidth: 2,
    backgroundColor: '#F6E4CD'
  },
  menuCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuCheckbox: {
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
  menuCardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#965C16',
    marginBottom: 2,
  },
  menuCardDescription: {
    color: '#965C16',
    fontSize: 14,
    marginBottom: 4,
  },
  menuCardPrice: {
    color: '#B88753',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#B88753',
    marginTop: 16,
    fontSize: 16,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginHorizontal: 7,
    opacity: 0.4,
  },
  dotActive: {
    opacity: 1,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6E4CD',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 14,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#A0522D',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 10,
  },
  cartText: {
    marginLeft: 10,
    fontSize: 17,
    color: '#A0522D',
    fontWeight: '600',
  },
  chefsMenuContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 28,
    marginBottom: 8,
    marginTop: 2,
  },
  chefsMenuCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  chefsMenuText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#A0522D',
    marginLeft: 10,
  },
  chefsMenuSubText: {
    fontSize: 13,
    color: '#B88753',
    marginLeft: 5,
    marginTop: -2,
  }
});