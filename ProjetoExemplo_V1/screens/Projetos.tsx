import React from 'react';
import { StyleSheet } from 'react-native';
import { IconeUser } from './componentes/iconeUser';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Header } from './componentes/Header';


export default function Projetos() {
  return (
    <View>
       <Header titulo={'Projetos'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
