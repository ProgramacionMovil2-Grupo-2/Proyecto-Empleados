import React, { useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Pressable, ImageComponent,Image, TextInput} from 'react-native';
import { render } from 'react-dom';
import { Component } from 'react/cjs/react.production.min';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import "react-native-gesture-handler";
import reactDom from 'react-dom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App({ navigation }) {

  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [id, setid] = useState(null);
  const [idCompra, setidCompra] = useState(null);
  const [nombre, setProducto] = useState(null);
  const [codigobarras, setcodigobarras] = useState(null);
  const [precioCompra, setprecioCompra] = useState(null);
  const [cantidad, setcantidad] = useState(null);
  const [fecha, setfecha] = useState(null);

  if (ejecucion == null) {
    try {
        const buscardor=2;
        const response = fetch("http://192.168.1.42:4001/api/verCompra/listarverCompra")
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
    setidCompra(item.idCompra);
    setProducto(item.nombre);
    setcodigobarras(item.codigobarras);
    setprecioCompra(item.precioCompra);
    setcantidad(item.cantidad);
    setfecha(item.fecha);
  
    const datos = {
      id: id,
      idCompra: idCompra,
      nombre: nombre,
      codigobarras: codigobarras,
      precioCompra: precioCompra,
      cantidad: cantidad,
      fecha: fecha,
    };
    const datos_sucursales = JSON.stringify(datos);
    await AsyncStorage.setItem("datos_sucursales", datos_sucursales);
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


  return (
    <View style={styles.container}>

    <View style={styles.entrega1}>

    <View style={styles.tilOp}>
      <Text style={styles.ti}>Detalle Compras</Text>
      <TouchableOpacity  style={{ marginLeft: 20, marginTop: -30}} onPress={() => navigation.navigate('detallecompras')}>
          <View>
            <Feather name='arrow-left' style={{ fontSize: 25 }}
            />
          </View>
          </TouchableOpacity>
    </View>
        <FlatList
            style={styles.productos}
            data={info}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={styles.contenedorFuera}
                //    onPress={() => navigation.navigate("ConfirmarSucursal")}
                >
                <View style={styles.contenedorDentro}>
                      <Text style={styles.id}>
                        ID Compra :  
                        {item.id}
                      </Text>
                      <Text style={styles.id}> 
                        Fecha :
                        <Text style={styles.fecha}>
                        {item.fecha}
                        </Text>
                      </Text>
                      <Text style={styles.id}>
                        Codigo de Barra :  
                        {item.codigobarras}
                      </Text>
                      <Text style={styles.id}>
                        Nombre del Producto :  
                        {item.nombre}
                      </Text>
                      <Text style={styles.id}> 
                        Precio :
                        <Text>
                        {item.precioCompra}
                        </Text>
                      </Text>
                      <Text style={styles.id}> 
                        Cantidad :
                        <Text style={styles.cantidad}>
                        {item.cantidad}
                        </Text>
                      </Text>
                      
                  </View>
               
                </Pressable>
              );
            }}
          />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 4,
    width: "100%",
    height: "100%",
  },
  entrega1: {
    backgroundColor: '#BAFBB9',
    borderWidth: 2,
    borderColor: "#dedede",
    borderRadius: 5,
    alignItems: "stretch",
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },

  tilOp: {
    backgroundColor: "#31C02E",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 10,
    position: "relative",
    top: 20,
  },
  ti: {
    alignContent: "center",
    alignItems: "center",
    fontSize: 40,
    color: "#020604",
    marginLeft: 90,
  },
  contenedorFuera: {
    top: 70,
    height: 230,
    width: 425,
    marginLeft: 17,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#BAFBB9",
    backgroundColor: "white",
  },
  contenedorDentro: {
    height: 250,
    marginLeft: 25,
  },
  id: {
    marginTop: 9,
    textAlign: "left",
    color: "black",
    fontSize: 15,
  },
});