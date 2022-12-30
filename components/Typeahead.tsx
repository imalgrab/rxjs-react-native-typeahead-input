import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  map,
  Subject,
  switchMap,
} from 'rxjs';
import { getAirportsByName } from '../api/client';
import { useSubscription } from '../hooks/useSubscription';

const input$ = new Subject<string>();

export function Typeahead() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  function handleChangeText(text: string) {
    input$.next(text);
  }

  function getAirports(name: string) {
    return from(getAirportsByName(name)).pipe(
      map((airports) => airports.map((airport) => airport.name).slice(0, 10))
    );
  }

  useSubscription(
    input$.pipe(
      map((text) => text.trim()),
      debounceTime(300),
      filter((text) => text.length > 1),
      distinctUntilChanged(),
      switchMap((text) => getAirports(text))
    ),
    (airportNames) => setSuggestions(airportNames)
  );

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={handleChangeText}
        style={styles.input}
      />
      {suggestions.map((suggestion, index) => (
        <Text style={styles.label} key={`${suggestion}-${index}`}>
          {suggestion}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    width: '100%',
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    width: '100%',
  },
  label: {
    padding: 4,
  },
});
