import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Pressable, Alert, RefreshControl } from 'react-native';
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
  const [descripcion, setdescripcion] = useState(null);
  const [telefono, settelefono] = useState(null);
  const [direccion, setdireccion] = useState(null);


  const guardar = async () => {
    if (!descripcion || !telefono || !direccion) {
      console.log("Escriba los datos completos");
      Alert.alert("FACTURA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/proveedores/guardar', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            descripcion: descripcion,
            telefono: telefono,
            direccion: direccion,
            
          })
        });
        //const json = await respuesta.json();
        //console.log(json);
        Alert.alert("MEDI", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Petición procesada");
      }
    }
  }

  const modificar = async () => {
    if (!id || !descripcion || !direccion || !telefono) {
      console.log("Escriba los datos completos");
      Alert.alert("MEDI", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/proveedores/modificar?id=' + id, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            descripcion: descripcion,
            telefono: telefono,
            direccion: direccion,
            
          })
        });
        //const json = await respuesta.json();
        //console.log(json);
        Alert.alert("MEDI", "Petición procesada");
      } catch (error) {
        console.error(error);
      }
    }
  }

  const eliminar = async () => {
    if (!id) {
      console.log("Escriba los datos completos");
      Alert.alert("MEDI", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/proveedores/eliminar?id=' + id, {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        //const json = await respuesta.json();
       // console.log(json);
        Alert.alert("MEDI", "Petición procesada");

      } catch (error) {
        console.error(error);
      }
    }
  }


  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.42:4001/api/proveedores/listar")
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
    setdescripcion(item.descripcion);
    settelefono(item.telefono);
    setdireccion(item.direccion);
    
    const datos = {
      id: id,
      descripcion: descripcion,
      telefono: telefono,
      direccion: direccion,
     
    };
    const datos_proveedor = JSON.stringify(datos);
    await AsyncStorage.setItem("datos_proveedores", datos_proveedor);
  };



  useEffect(() => {
    elegir();
  }, []);


  const [refreshing, setRefresing] = useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await elegir();
    setRefresing(false);
  })




  //diseño
  return (
    <View style={styles.container}>
     <View style={styles.contenedorTitulo}>
        <Text style={styles.titulo}>MÓDULO DE PROVEEDORES</Text>
        <TouchableOpacity  style={{ marginLeft: -420, marginTop: -30}} onPress={() => navigation.navigate('inicio')}>
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
        placeholder='Ingrese la descripcion'
        placeholderTextColor={"#546574"}
        value={descripcion}
        onChangeText={setdescripcion}
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
      <TouchableOpacity style={[styles.botonGuardar, styles.botonmodificar2, {top:20}]} onPress={guardar} >
        <Text style={styles.botonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.botonGuardar, styles.botonmodificar, {top:20}]} onPress={modificar} >
        <Text style={styles.botonText}>Modificar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.botonGuardar, styles.botonmodificar3, {top:20}]} onPress={eliminar} >
        <Text style={styles.botonText}>Eliminar</Text>
      </TouchableOpacity>

      <FlatList style={{ width: "80%", top: 45}}
        data={info}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}

            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => {
          console.log(item);
          return (
            <Pressable
              style={styles.contenedorFuera}
            //   onPress={() => navigation.navigate("Sucursal")}
            >
              <View style={styles.contenedorDentro}>

                <TouchableOpacity onPress={() => { id: item.id }}>
                  <Text style={[styles.descripcion, {fontSize: 16.5}]}>
                    {item.descripcion}
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
    //backgroundColor: "#ffffff",
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
    fontSize: 23,
    fontWeight: "700",
  },
  titulo: {
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
    width: '40%'

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




















