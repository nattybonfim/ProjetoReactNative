
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Habilidades from '../screens/Habilidades';
import NotFoundScreen from '../screens/NotFoundScreen';
import Perfil from '../screens/Perfil';
import TabOneScreen from '../screens/Perfil';
import Projetos from '../screens/Projetos';
import TabTwoScreen from '../screens/Projetos';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      
    </Stack.Navigator>
  );
}


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Perfil"
        component={Perfil}
        options={({ navigation }: RootTabScreenProps<'Perfil'>) => ({
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
         
        })}
      />
      <BottomTab.Screen
      name="Projetos"
      component={Projetos}
      options={({navigation}:RootTabScreenProps<'Projetos'> )=>({
        title:'Projetos',
        tabBarIcon:({color}) => <TabBarIcon name="folder" color={color} />,
      })}
      
      />


      <BottomTab.Screen
        name="Habilidades"
        component={Habilidades}
        options={({navigation}:RootTabScreenProps<'Habilidades'>)=>({
          title: 'Habilidades',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        })}
      />
         

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
 function TabBarIcon(props: {
  name: React.ComponentProps<any>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}