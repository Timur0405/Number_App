import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  const [number, setNumber] = useState('');
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const getFact = async () => {
    if (number === '') {
      setFact('Введите номер факта');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setFact('');

    try {
      const response = await fetch('https://meowfacts.herokuapp.com/?lang=rus');
      const data = await response.json();

      setFact(`Факт №${number}: ${data.data[0]}`);
    } catch (error) {
      setFact('Ошибка загрузки факта');
    }

    setLoading(false);
  };

  const getRandomFact = () => {
    const randomNumber = String(Math.floor(Math.random() * 1000));
    setNumber(randomNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Факты о котиках</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите номер"
        keyboardType="number-pad"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={getFact}>
        <Text style={styles.buttonText}>Получить факт</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.randomButton} onPress={getRandomFact}>
        <Text style={styles.buttonText}>Случайный номер</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#3B82F6" />}

      {fact !== '' && (
        <View style={styles.card}>
          <Text style={styles.fact}>{fact}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },

 input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 12,
  padding: 14,
  fontSize: 20,
  marginBottom: 12,
  width: 220,
  alignSelf: 'center',
},

 button: {
  backgroundColor: '#3B82F6',
  padding: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginBottom: 12,
  width: 220,
  alignSelf: 'center',
},

randomButton: {
  backgroundColor: '#111827',
  padding: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginBottom: 20,
  width: 220,
  alignSelf: 'center',
},

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
  },

  fact: {
    fontSize: 18,
    lineHeight: 26,
  },
});