import { StyleSheet } from 'react-native';
import { Header } from './componentes/Header';
import { IconeUser } from './componentes/iconeUser';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function Habilidades() {
  return (
    <View>
       <Header titulo={'Habilidades'} />
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
