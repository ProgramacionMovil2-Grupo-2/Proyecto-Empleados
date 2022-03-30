import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { render } from 'react-dom';
import { Component } from 'react/cjs/react.production.min';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ navigation }) {

  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [id, setid] = useState(null);
  const [ciudad, setciudad] = useState(null);
  const [direccion, setdireccion] = useState(null);
  const [telefono, settelefono] = useState(null);



  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.35:4001/api/sucursales/listar")
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


  return (
    <View style={styles.container}>
      <View style={styles.entrega1}>
        <View style={styles.tilOp}>
          <Text style={styles.ti}>Entregas</Text>

        </View>


        <View style={styles.progre}>
          <View style={styles.avance}>
            <Text style={{ padding: 20 }}>
              <AntDesign name='checkcircle' />
            </Text>
            <Text style={{ padding: 20 }}>
              <AntDesign name='checkcircle' />
            </Text>
            <Text style={{ padding: 20 }}>
              3
            </Text>
          </View>
          <View style={styles.avanceTitulo}>
            <Text style={styles.subtitulo}>Carrito</Text>
            <Text style={styles.subtitulo}>Tipo de Entrega</Text>
            <Text style={styles.subtitulo}>Confirmar</Text>
          </View>
        </View>


        
          <View style={styles.main}>
            <View>
              <FlatList
                style={styles.sucursales}
                data={info}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={styles.contenedorFuera}
                        onPress={() => navigation.navigate("ConfirmarSucursal")}
                    >
                      <View style={styles.contenedorDentro}>

                        <Text style={styles.ciudad}>
                          {item.ciudad}
                        </Text>
                        <Text style={styles.direccion}>
                          {item.direccion}
                        </Text>
                        <Text style={styles.telefono}>
                          {item.telefono}
                        </Text>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>
        

          <View style={styles.menu1}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('inicio')
            }}>
              <View>
                <FontAwesome name='home' style={{ fontSize: 25 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate('Buscar')
            }}>
              <View>
                <AntDesign name='search1' style={{ fontSize: 25 }} />

              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate('Pedidos')
            }}>
              <View>
                <AntDesign name='filetext1' style={{ fontSize: 25 }} />

              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate('Carrito')
            }}>
              <View>
                <AntDesign name='shoppingcart' style={{ fontSize: 25 }} />

              </View>
            </TouchableOpacity>

          </View>
        </View>






      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenedorFuera: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#eee",
    backgroundColor: "white",
  },
  contenedorDentro: {
    margin: 10,
    width: "100%"
  },
  ciudad: {
    textAlign: "left",
    color: "black",
    fontSize: 18,
  },
  direccion: {
    marginTop: 5,
    textAlign: "left",
    color: "black",
    fontSize: 18,
  },
  telefono: {
    marginTop: 15,
    textAlign: "left",
    color: "black",
    fontSize: 20,

  },



  entrega1: {
    backgroundColor: '#BAFBB9',
    borderWidth: 2,
    borderColor: "#dedede",
    borderRadius: 5,
    alignItems: "stretch",
    justifyContent: 'center',
    height: '90%',
    width: '100%',
  },
  tilOp: {
    backgroundColor: "#31C02E",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 100,
    position: "relative",
    top: -20,

  },
  ti: {
    alignContent: "center",
    alignItems: "center",
    fontSize: 40,
  },

  progre: {
    backgroundColor: "#31C02E",
    position: "relative",
    top: -20
  },
  avance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avanceTitulo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  circleIcon: {
    padding: 9,
    position: 'relative',
    left: -5,
    top: 30,
    fontSize: 10,
  },
  menu: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingHorizontal: 15,
    position: "relative",
    top: -20,

  },
});