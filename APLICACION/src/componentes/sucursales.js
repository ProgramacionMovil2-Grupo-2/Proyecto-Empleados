import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Pressable, Alert, RefreshControl } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


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
      Alert.alert("FACTURA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.41:4001/api/sucursales/guardar', {
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
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("MEDI", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Petición procesada");
      }
    }
  }

  const modificar = async () => {
    if (!id || !ciudad || !direccion || !telefono) {
      console.log("Escriba los datos completos");
      Alert.alert("MEDI", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.41:4001/api/sucursales/modificar?id=' + id, {
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
        const json = await respuesta.json();
        console.log(json);
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
          'http://192.168.1.41:4001/api/sucursales/eliminar?id=' + id, {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("MEDI", "Petición procesada");
      } catch (error) {
        console.error(error);
      }
    }
  }


  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.41:4001/api/sucursales/listar")
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
        <Text style={styles.tituloLogin}>Sucursales</Text>
      </View>
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
      <TouchableOpacity style={styles.botonGuardar} onPress={guardar} >
        <Text style={styles.botonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonGuardar} onPress={modificar} >
        <Text style={styles.botonText}>Modificar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonGuardar} onPress={eliminar} >
        <Text style={styles.botonText}>Eliminar</Text>
      </TouchableOpacity>

      <FlatList style={{ width: "100%" }}
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
                  <Text style={styles.ciudad}>
                    {item.ciudad}
                  </Text>
                  <Text style={styles.direccion}>
                    {item.direccion}
                  </Text>
                  <Text style={styles.telefono}>
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
    backgroundColor: "#DEFFDA",
  },
  contenedorTitulo: {
    backgroundColor: '#00A41F',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: '100%',
    top: -20,
  },

  tituloLogin: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
  },
  input: {
    width: '90%',
    marginBottom: 7,
    alignContent: "center",
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#31C02E',
    height: 35,
    color: "black",
    padding: 4,
    textAlign: "center",
    borderRadius: 5,
  },
  botonGuardar: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: '#31C02E',
    width: '40%',

  },
  botonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  contenedorDentro: {
    backgroundColor: '#31C02E',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: "center",
  },
});




















