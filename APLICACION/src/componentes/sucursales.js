import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Pressable, Alert, RefreshControl } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Feather from 'react-native-vector-icons/Feather';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {

  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [id, setid] = useState(null);
  const [ciudad, setciudad] = useState(null);
  const [direccion, setdireccion] = useState(null);
  const [telefono, settelefono] = useState(null);

  const guardar = async () => {
    if (!ciudad || !direccion || !telefono) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/sucursales/guardar', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ciudad: ciudad,
            direccion: direccion,
            telefono: telefono
            
          })
        });
        //const json = await respuesta.json();
        //console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Petición procesada");
      }
    }
  }



  const modificar = async () => {
    if (!id || !ciudad || !direccion || !telefono) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/sucursales/modificar?id=' + id, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            ciudad: ciudad,
            direccion: direccion,
            telefono: telefono
          })
        });
      //  const json = await respuesta.json();
      //  console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        console.error(error);
      }
    }
  }

  const eliminar = async () => {
    if (!id) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/sucursales/eliminar?id=' + id, {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
       // const json = await respuesta.json();
      //  console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        console.error(error);
      }
    }
  }


  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.42:4001/api/sucursales/listar")
        .then((response) => response.json())
        .then((json) => {
          setinfo(json);
          console.log(json);
        });
      setEjecucion(false);
    } catch (error) {
      setEjecucion(false);
      console.error(error);
    }
  }

  const elegir = async (item) => {
    console.log(item);
    setid(item.id);
    setciudad(item.ciudad);
    setdireccion(item.direccion);
    settelefono(item.telefono);
    const datos = {
      id: id,
      ciudad: ciudad,
      direccion: direccion,
      telefono: telefono,
    };
    const datos_sucursales = JSON.stringify(datos);
    await AsyncStorage.setItem("datos_sucursales", datos_sucursales);
  };







  //diseño
  return (
    <View style={styles.container}>
      <View style={styles.contenedorTitulo}>
        <Text style={styles.tituloLogin}>MÓDULO DE SUCURSALES</Text>
        <TouchableOpacity  style={{ marginLeft: -410, marginTop: -30}} onPress={() => navigation.navigate('inicio')}>
          <View>
            <Feather name='arrow-left' style={{ fontSize: 25 }}
            />
          </View>
          </TouchableOpacity>
      </View>
      <View style={[styles.contenedorControles, styles.sombraControles]}>
      <TextInput style={styles.input}
        placeholder='Ingrese el id'
        placeholderTextColor={"#546574"}
        value={id}
        onChangeText={setid}
      />
      <TextInput style={styles.input}
        placeholder='Ingrese la ciudad'
        placeholderTextColor={"#546574"}
        value={ciudad}
        onChangeText={setciudad}
      />
      <TextInput style={styles.input}
        placeholder='Ingrese la direccion'
        placeholderTextColor={"#546574"}
        value={direccion}
        onChangeText={setdireccion}
      />
      <TextInput style={styles.input}
        placeholder='Ingrese el telefono'
        placeholderTextColor={"#546574"}
        value={telefono}
        onChangeText={settelefono}
      />

</View>
      <TouchableOpacity  style={[styles.botonGuardar, styles.botonmodificar2, {top:20}]} onPress={guardar} >
        <Text style={styles.botonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.botonGuardar, styles.botonmodificar, {top:20}]} onPress={modificar}>
        <Text style={styles.botonText}>Modificar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.botonGuardar, styles.botonmodificar3, {top:20}]} onPress={eliminar}>
        <Text style={styles.botonText}>Eliminar</Text>
      </TouchableOpacity>

      <FlatList style={{ width: "90%", top: 45}}
        data={info}
        keyExtractor={(item) => item.id}
       
        renderItem={({ item }) => {
          console.log(item);
          return (
            <Pressable
              style={styles.contenedorFuera}
            //   onPress={() => navigation.navigate("Sucursal")}
            >
              <View style={styles.contenedorDentro}>

                <TouchableOpacity onPress={() => { id: item.id }}>
                  <Text style={[styles.ciudad, {fontSize: 16.5}]}>
                    {item.ciudad}
                  </Text>
                  <Text style={[styles.direccion, {fontSize: 16.5}]}>
                    {item.direccion}
                  </Text>
                  <Text style={[styles.telefono, {fontSize: 16.5}]}>
                    {item.telefono}
                  </Text>
                </TouchableOpacity>



              </View>
            </Pressable>
          );
        }}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: '#BAFBB9',
  },
  contenedorTitulo: {
    backgroundColor: '#00A41F',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: '100%',
    marginTop:10,
    marginVertical:30,
    top: 15,
  },

  tituloLogin: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    top:  0,
  },
  input: {
    top: -10,
    marginTop: 10,
    width: '100%',
    marginBottom: 7,
    alignContent: "center",
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#000',
    height: 50,
    color: "black",
    padding: 4,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  botonGuardar: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    width: '80%'

  },

  botonmodificar: {
    backgroundColor:"#3A6C96",
  },
  botonmodificar2: {
    backgroundColor:"#0D7701",
  },
  botonmodificar3: {
    backgroundColor:"#D51104",
  },
  botonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  contenedorDentro: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: "center",
  },
  contenedorControles: {
  
    width: "90%",
    alignItems: "stretch",
    justifyContent:"center",
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius:25,
    backgroundColor:"#fff",
    paddingLeft:10,
    paddingRight:10,
    height: 350
  },
  sombraControles: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});




















