import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import ContenidoA from './screens/ContenidoA';
import ContenidoB from './screens/ContenidoB';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bienvenido!!!" component={ContenidoA} />
      <Stack.Screen name="Productos" component={ContenidoB} />
    </Stack.Navigator>
  );
}

function DrawerScreens() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackScreens} options={{ title: 'Home',drawerIcon: ({ color, size }) => ( // Icono de la casita para Home
            <Ionicons name="home" size={size} color={color} />
          ) }} />
      <Drawer.Screen name="Productos" component={ContenidoB} options={{ title: 'Tienda El Pato', drawerIcon: ({ color, size }) => ( // Icono de la tienda para Productos
            <Ionicons name="storefront" size={size} color={color} />
          ) }}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [navigationType, setNavigationType] = useState('Drawer');
  return (
    <NavigationContainer>
      {navigationType === 'Drawer' && <DrawerScreens />}
      {navigationType === 'Stack' && <StackScreens />}
      {/* 
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={() => setNavigationType('Drawer')} style={styles.navigationButton}>
          <Text>Drawer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNavigationType('Stack')} style={styles.navigationButton}>
          <Text>Stack</Text>
        </TouchableOpacity>
      </View>
      */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  navigationButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});
