import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [pontos, setPontos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [localizacao, setLocalizacao] = useState('');

  const API_URL = 'http://000.000.0.000:5000/api/pontos'; // troque pelo seu IP local

  useEffect(() => {
    fetchPontos();
  }, []);

  const fetchPontos = async () => {
    try {
      const res = await axios.get(API_URL);
      setPontos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão da câmera é necessária.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
    });

    if (!result.cancelled) {
      setFoto(result.assets[0]);
    }
  };

  const pegarLocalizacao = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de localização negada');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = location.coords;
    setLocalizacao(`Lat: ${coords.latitude}, Long: ${coords.longitude}`);
  };

  const enviarPonto = async () => {
    if (!nome || !descricao || !foto || !localizacao) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('localizacao', localizacao);
    formData.append('foto', {
      uri: foto.uri,
      type: 'image/jpeg',
      name: 'foto.jpg'
    });

    try {
      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Ponto cadastrado com sucesso!');
      setNome('');
      setDescricao('');
      setFoto(null);
      setLocalizacao('');
      fetchPontos();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao cadastrar ponto.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Ponto Turístico</Text>

      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Descrição" style={styles.input} value={descricao} onChangeText={setDescricao} />
      
      <Button title="Pegar Localização Atual" onPress={pegarLocalizacao} />
      <Text style={styles.text}>{localizacao}</Text>

      <Button title="Tirar Foto" onPress={tirarFoto} />
      {foto && <Image source={{ uri: foto.uri }} style={styles.image} />}

      <Button title="Enviar" onPress={enviarPonto} />

      <Text style={styles.title}>Pontos Cadastrados</Text>
      {pontos.map(ponto => (
        <View key={ponto._id} style={styles.card}>
          <Text style={styles.cardTitle}>{ponto.nome}</Text>
          <Text>{ponto.descricao}</Text>
          <Text style={styles.text}>{ponto.localizacao}</Text>
          {ponto.foto && (
            <Image
              source={{ uri: `http://000.000.0.000:5000${ponto.foto}` }}
              style={styles.image}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  image: { width: '100%', height: 200, marginVertical: 10 },
  card: { marginVertical: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  text: { fontSize: 14, marginTop: 5 }
});
