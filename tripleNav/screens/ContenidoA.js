import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,Alert } from 'react-native';
import { useState } from 'react';
import React from 'react';

export default function App({navigation}) {
  const [estatura,setEstatura]=useState();
  const [peso,setPeso]=useState();
  const [resultado,setResultado]=useState("");
  const [textoIMC, setTextoIMC] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.contenedorTitulo}>
        <Text style={styles.titulo}>Calculadora IMC!</Text>
      </View>
      <View style={styles.contenedorCalcu}>
        <Text style={styles.titulo2}>INGRESAR LOS SIGUIENTES VALORES</Text>
        <TextInput 
          style={styles.caja}
          value={estatura}
          onChangeText={(txt)=>{
            let valorE=parseFloat(txt);
            setEstatura(valorE);
           }}
          placeholder='Ingrese su estatura en centimetros'
        />
        <TextInput
          style={styles.caja}
          value={peso}
          onChangeText={(txt)=>{
          let valorP=parseFloat(txt);
          setPeso(valorP);
          }}
          placeholder='Ingrese su peso en kilogramos'
          />
        <Button
        title='CALCULAR'
        onPress={()=>{
          let estaturaMetros=(estatura/100);
          let resultadoEstatura= estaturaMetros;
          let imcP=(peso/(resultadoEstatura*resultadoEstatura));
          let imcDeci= imcP.toFixed(2);
          let IMC="Su IMC es: "+imcDeci;
          if(isNaN(imcDeci)){
            setResultado("");
            setTextoIMC("");
          }else{
            setResultado(IMC);
          }
          console.log(IMC);
          if(imcDeci<18.5){
            setTextoIMC("Peso inferior al normal-menos de 18.5");
          }
          if(imcDeci>=18.5 && imcDeci<24.9){
            setTextoIMC("Normal-de 18.5 a 24.9");
          }
          if(imcDeci>=25.0 && imcDeci<29.9){
            setTextoIMC("Peso superior al normal-de 25.0 a 29.9");
          }
          if(imcDeci>30.0){
            setTextoIMC("Obesidad-mas de 30.0");
          }
          if(isNaN(imcDeci)){
            Alert.alert("Llenar los campos vacios")
          }
        }}
      />

      <Text style={styles.ResultadoIMC}>{resultado}</Text>
      <Text style={styles.Descripcion}>{textoIMC}</Text>
      <Text>--------------------------</Text>
      <Button title="Ir a Productos" onPress={() => navigation.navigate('Productos')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titulo:{
    fontSize:16,
    marginBottom:10,
    fontWeight:'bold',
  },
  titulo2:{
    fontSize:16,
    marginBottom:10,
    color:"red",
    marginHorizontal:15,
    fontWeight:'heavy',
  },
  Descripcion:{
    fontSize:14,
    marginHorizontal:75,
    fontWeight:'semibold',
  },
  ResultadoIMC:{
    fontSize:22,
    marginTop:25,
    marginHorizontal:75,
    marginBottom:15,
    fontWeight:'bold',
    color:"green",
  },
  contenedorTitulo:{
    flex: 1,
    backgroundColor: 'white',
    flexDirection:"row",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contenedorCalcu:{
    flex: 6,
    backgroundColor: 'white',
    flexDirection:"column",
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  caja: {
    borderColor:'gray',
    borderWidth:1,
    paddingTop:5,
    paddingHorizontal:15,
    marginBottom:10,
  },
});




