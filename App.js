import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, Image, ImageBackground } from 'react-native';
import {useEffect, useState} from 'react';
import  Portal  from './assets/Portal.png';

const request = async(Callback) =>{
  const response = await fetch ('https://rickandmortyapi.com/api/character');
  // trazendo a api e transformando em linguagem JSON 
  const parsed = await response.json();
  Callback(parsed.results);
};
    //Aqui tem o tramide 
export default function App() {
  
  const [registros, setRegistros] = useState([]);

  useEffect (() =>{
    request(setRegistros);
  },[]);
  
    //Sobre a função const renderItem, ela trás a informação da api, me permitindo manusear qual informação foi buscada 
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
   
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.texto1}>Nome: {item.name}</Text>
        <Text style={styles.texto2}>Espécie: {item.species}</Text>
        <Text style={styles.texto2}>Status: {item.status}</Text>
      </View> 
    </View>
  );

  return (
    <ImageBackground  
    source={Portal}
    style={styles.imgbck}>
      <ScrollView>
    <View style={styles.container}>
  
     
      <Text style={styles.title}>Ricky and Morty</Text>
     <FlatList 
      data={registros}
      keyExtractor={(item)=>item.id.toString()}
      //toda informação de string, deve se usar {} ao inves de ""
      renderItem={renderItem}
           
     />
     
     <StatusBar style='auto'/>
    </View>
    </ScrollView>
     </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    top: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 30,
    width: 360,
    height: 200,
    padding: 10, // Adiciona espaçamento interno
    backgroundColor: 'gray',
    borderRadius: 25,
    flexDirection: 'row', // Alinha a imagem e textos em linha
    alignItems: 'center',
    justifyContent: 'space-between', // Distribui o espaço entre os itens
  },
  image: {
    width: 150,
    height: 150,
  },
  texto1: {
    fontSize: 22,
    marginLeft: 10, // Espaço entre a imagem e o texto
    fontWeight:'bold',
  },
  texto2: {
    fontSize: 20,
    marginLeft: 10,
  },
  texto3: {
    fontSize: 20,
    marginLeft: 10,
  },
  imgbck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column', // Alinha os textos em coluna
    justifyContent: 'center', // Centraliza os textos verticalmente dentro do itemContainer
  },
});

