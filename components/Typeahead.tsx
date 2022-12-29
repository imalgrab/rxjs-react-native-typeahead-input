import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  Text,
} from 'react-native';
// components/Typeahead.tsx
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  map,
  Subject,
} from 'rxjs';
import { useSubscription } from '../hooks/useSubscription';

const SUGGESTIONS = [
  'react',
  'react native',
  'redux',
  'redux toolkit',
  'redux.js',
  'redux saga',
  'remix',
  'reactive extension',
  'rxjs',
];

const input$ = new Subject<string>();

export function Typeahead() {
  const [suggestions, setSuggestions] = useState<string[]>(SUGGESTIONS);
  function handleChangeText(text: string) {
    input$.next(text);
  }

  useSubscription(
    input$.pipe(
      debounceTime(300),
      filter((text) => text.length > 1),
      distinctUntilChanged()
    ),
    (text) =>
      setSuggestions(SUGGESTIONS.filter((word) => word.indexOf(text) > -1))
  );

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={handleChangeText}
        style={styles.input}
      />
      {suggestions.map((suggestion) => (
        <Text>{suggestion}</Text>
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
});
