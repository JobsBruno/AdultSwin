import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, Image, ImageBackground } from 'react-native';
import {useEffect, useState} from 'react';

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
  
    //esta função funciona de forma magica 
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
     <ImageBackground>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.texto}>Nome: {item.name}</Text>
      <Text style={styles.texto}>Especies: {item.species}</Text>
      <Text style={styles.texto}>Status: {item.status}</Text>
      {/* Adicione outros campos aqui se necessário */}
      </ImageBackground>
    </View>
  );

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
   //adc espaçamento 
  itemContainer: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});
