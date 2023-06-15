import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { BaseNavigation } from './navigation';
import { CargoProvider } from './modules/cargo/contexts';


export default function App() {
  return (
    <View style={styles.container}>
      <CargoProvider>
        <BaseNavigation />
      </CargoProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
