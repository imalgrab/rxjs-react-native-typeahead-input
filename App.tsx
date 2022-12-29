import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { interval, Observer } from 'rxjs';

const value$ = interval(1000);

const observer: Partial<Observer<number>> = {
  next: (v) => console.log(v),
};

export default function App() {
  const [label, setLabel] = useState<number>();

  useEffect(() => {
    if (value$) {
      const subscription = value$.subscribe((value) => setLabel(value));
      return () => subscription.unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
