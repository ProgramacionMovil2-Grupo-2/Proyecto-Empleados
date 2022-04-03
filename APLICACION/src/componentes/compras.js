import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, ImageBackground,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const [id, setid] = useState(null);
  const [idProveedor, setidProveedor] = useState(null);
  const [fecha, setfecha] = useState(null);


  const guardarCompra = async() =>{
    if(!idProveedor || !fecha){
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    }else{
      try {
          const respuesta = await fetch(
            'http://192.168.1.42:4001/api/compras/guardarCompras',{
            method: 'POST',
              headers:{
                  accept: 'application/json',
                          'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                          idProveedor: idProveedor,
                          fecha: fecha
                      })
                  });
                  console.log("Datos Compra Guardado");
                  Alert.alert("AVISO", "Datos Compra Almacenado");
          } catch (error) {
              console.error(error);
          }
      }
  }

  const modificarCompra = async() =>{
    if(!idProveedor || !fecha){
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    }else{
      try {
          const respuesta = await fetch(
            'http://192.168.1.42:4001/api/compras/modificarCompras?id='+id,{
            method: 'PUT',
              headers:{
                  accept: 'application/json',
                          'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                          id: id,
                          idProveedor: idProveedor,
                          fecha: fecha
                      })
                  });
                  console.log("Datos Compra Modificado");
                  Alert.alert("AVISO", "Datos Compra Modificado");
          } catch (error) {
              console.error(error);
          }
      }
  }

  const eliminarCompra = async() =>{
    if(!id){
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    }else{
      try {
          const respuesta = await fetch(
            'http://192.168.1.42:4001/api/compras/eliminarCompras?id='+id,{
            method: 'DELETE',
              headers:{
                  accept: 'application/json',
                          'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                          id: id
                      })
                  });
                  console.log("Datos Compra Eliminado");
                  Alert.alert("AVISO", "Datos Compra Eliminado");
          } catch (error) {
              console.error(error);
          }
      }
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogin}>
        <View style={styles.tilOp}>
            <Text style={styles.ti}>MÓDULO DE COMPRAS</Text>
            <TouchableOpacity  style={{ marginLeft: 20, marginTop: -50}} onPress={() => navigation.navigate('inicio')}>
          <View>
            <Feather name='arrow-left' style={{ fontSize: 25 }}
            />
          </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.contenedorControles, styles.sombraControles]}>
          <View style={styles.controles}>
            <Text style={styles.titulos}>   id:</Text>
            <TextInput
            value={id}
            onChangeText= {setid}
              placeholder="Ej. 1"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.titulos}>   idProveedor:</Text>
            <TextInput
            value={idProveedor}
            onChangeText= {setidProveedor}
              placeholder="Ej. 1"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.titulos}>   fecha:</Text>
            <TextInput
            value={fecha}
            onChangeText= {setfecha}
              placeholder="Ej. 2020-02-01"
              style={styles.entradas}
            >
            </TextInput>
          </View>
          <View style={styles.botonRedes}>
              <Button
                title="REGISTRAR" color={"#0D7701"} 
                onPress={guardarCompra}>
              </Button>
          </View>
          <View style={styles.botonRedes2}>
              <Button 
                title="MODIFICAR" color={"#3A6C96"} 
                onPress={modificarCompra}>
              </Button>
          </View>
          <View style={styles.botonRedes3}>
              <Button 
                title="ELIMINAR" color={"#D51104"} 
                onPress={eliminarCompra}>
              </Button>
          </View>
        
            <TouchableOpacity style={[styles.OpCompras, {top: 100, backgroundColor: "#FFFFFF" }]}>
 
           <View>
          <Feather name='trello' style={{ fontSize: 45, marginLeft: -95}}/>
          </View>
          <Text style={[styles.tituloBoton2, { color: '#000000', fontSize:19}]}>DETALLE COMPRAS</Text>
         </TouchableOpacity >
         
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tilOp: {
    backgroundColor: "#31C02E",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 30,
    position: "relative",
    top: -65,
    height: 70
  },
  ti: {
    color: "#FFFFFF" ,
    fontSize: 30,
    fontWeight: "700",
    left: 80,
    top: -20
  },
  image: {
    alignItems: 'center',
    justifyContent: "center",
    margin:0,
    padding: 0,
    width:"110%",
    height:"105%",
  },
  contenedor: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#BAFBB9',
    //margin:0,
    padding: 10,
    width:"100%",
    height:"100%",
  },
  contenedorLogin: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  contenedorTitulo: {
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
    marginTop:-0,
    marginVertical:20,
    height:60,
  },
  contenedorLogo: {
    flexDirection:"column",
    alignItems: "center",
    justifyContent:"center",
  },
  contenedorControles: {
    flex: 3,
    flexDirection:"column",
    alignItems: "stretch",
    justifyContent:"center",
    borderRadius:25,
    padding:20
    
  },
  sombraControles: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tituloLogin: {
      color: "#FFFFFF" ,
      fontSize: 40,
      fontWeight: "700",
    },
    titulos: {
      color: "#020604" ,
      fontSize: 18,
    },
    titulos2: {
      color: "#FFFFFF" ,
      fontSize: 18,
      fontWeight: "700",
    },
  controles:{
    flex:4,
    //backgroundColor: "#29291f",
    marginBottom: 20,
    paddingTop:30,
    paddingVertical:30,
    top:-90
  },
  contenedorBotones:{
    flex:1,
    padding: 10,
    justifyContent:"space-evenly",
    flexDirection: "row",
  },
  contenedorBotonesRedes:{
    flex:2,
    padding: 10,
    justifyContent:"space-evenly",
    flexDirection: "column",
  },
  boton:{
    flex:1,
    alignItems:"stretch",
    marginLeft:10,
    marginRight:10,
  },
  botonRedes:{
    //flex:1,
    top: 90,
    height: 100,
    alignItems:"stretch",
    //margin:5,
    borderRadius: 55,
  },
  botonRedes2:{
    //flex:1,
    top: 40,
    height: 100,
    alignItems:"stretch",
  },
  botonRedes3:{
    //flex:1,
    top: -10,
    height: 100,
    alignItems:"stretch",
  },
  botonRedes4:{
    //flex:1,
    top: 80,
    height: 100,
    alignItems:"stretch",
  },
  entradas:{
    //flex:1,
    alignItems:"stretch",
    margin:7,
    padding:10,
    fontSize: 18,
    height: 50,
    color: "#495057",
    backgroundColor:"#fff",
    borderWidth:1,
    borderStyle:"solid",
    borderColor: "#ced4da",
    borderRadius: 15,
  },
  OpCompras: {
    flexDirection: "row",
     width:'100%',
     height: 60,
    marginTop: 20,
    left:0,
     alignContent: "center",
     justifyContent: "center",
     alignItems: "center",
     borderRadius: 40,
     backgroundColor: '#FFFFFF',
     position: "relative",
     top: 40,
    },
});
