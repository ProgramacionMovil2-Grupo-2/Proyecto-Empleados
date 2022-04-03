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
  const [idCompra, setidCompra] = useState(null);
  const [idProducto, setidProducto] = useState(null);
  const [precioCompra, setprecioCompra] = useState(null);
  const [cantidad, setcantidad] = useState(null);


  const guardarDetalleCompra = async() =>{
    if(!idCompra || !idProducto || !precioCompra || !cantidad){
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    }else{
      try {
          const respuesta = await fetch(
            'http://192.168.101.9:4001/api/detallecompra/guardarDetalleCompras',{
            method: 'POST',
              headers:{
                  accept: 'application/json',
                          'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                          idCompra: idCompra,
                          idProducto: idProducto,
                          precioCompra: precioCompra,
                          cantidad: cantidad,
                      })
                  });
                  console.log("Datos Detalle Compra Guardado");
                  Alert.alert("ALERTA", "Datos Detalle Compra Almacenado");
          } catch (error) {
              console.error(error);
          }
      }
  }

  const modificarDetalleCompra = async() =>{
    if(!idCompra || !idProducto || !precioCompra || !cantidad){
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    }else{
      try {
          const respuesta = await fetch(
            'http://192.168.101.9:4001/api/detallecompra/modificarDetalleCompras?id='+id,{
            method: 'PUT',
              headers:{
                  accept: 'application/json',
                          'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                          id: id,
                          idCompra: idCompra,
                          idProducto: idProducto,
                          precioCompra: precioCompra,
                          cantidad: cantidad,
                      })
                  });
                  console.log("Datos Detalle Compra Modificado");
                  Alert.alert("ALERTA", "Detalle Compra Modificado");
          } catch (error) {
              console.error(error);
          }
      }
  }

  const eliminarDetalleCompra = async() =>{
    if(!id){
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    }else{
      try {
          const respuesta = await fetch(
            'http://192.168.101.9:4001/api/detallecompra/eliminarDetalleCompras?id='+id,{
            method: 'DELETE',
              headers:{
                  accept: 'application/json',
                          'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                          id: id
                      })
                  });
                  console.log("Datos Detalle Compra Eliminado");
                  Alert.alert("ALERTA", "Detalle Compra Eliminado");
          } catch (error) {
              console.error(error);
          }
      }
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogin}>
        <View style={styles.tilOp}>
            <Text style={styles.ti}>DETALLE COMPRAS</Text>
            <TouchableOpacity  style={{ marginLeft: 20, marginTop: -50}} onPress={() => navigation.navigate('compras')}>
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
            <Text style={styles.titulos}>   idCompra:</Text>
            <TextInput
            value={idCompra}
            onChangeText= {setidCompra}
              placeholder="Ej. 1"
              style={styles.entradas}
            ></TextInput>
            <Text style={styles.titulos}>   idProducto:</Text>
            <TextInput
            value={idProducto}
            onChangeText= {setidProducto}
              placeholder="Ej. 1"
              style={styles.entradas}
            ></TextInput>
            <Text style={styles.titulos}>   precioCompra:</Text>
            <TextInput
            value={precioCompra}
            onChangeText= {setprecioCompra}
              placeholder="Ej. 20.50"
              style={styles.entradas}
            ></TextInput>
            <Text style={styles.titulos}>   cantidad:</Text>
            <TextInput
            value={cantidad}
            onChangeText= {setcantidad}
              placeholder="Ej. 5"
              style={styles.entradas}
            ></TextInput>
          </View>
          <View style={styles.botones}>
          <View style={styles.botonRedes}>
              <Button
                title="REGISTRAR" color={"#0D7701"} 
                onPress={guardarDetalleCompra}>
              </Button>
          </View>
          <View style={styles.botonRedes2}>
              <Button 
                title="MODIFICAR" color={"#3A6C96"}
                onPress={modificarDetalleCompra}>
              </Button>
          </View>
          <View style={styles.botonRedes3}>
              <Button 
                title="ELIMINAR" color={"#D51104"}
                onPress={eliminarDetalleCompra}>
              </Button>
          </View>
          </View>
          
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
    height: 70,
    top: -70
  },
  ti: {
    alignContent: "center",
    alignItems: "center",
    fontSize: 30,
    color: "#FFFFFF",
    marginLeft: 40,
    top: -15,
    left: 60
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
  contenedorControles: {
    flex: 3,
    height: 200,
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
  titulos: {
    color: "#020604" ,
    fontSize: 18,
  },
  controles:{
    //flex:4,
    //backgroundColor: "#29291f",
    marginBottom: 20,
    top: -25,
    paddingTop: 80,
    paddingVertical:30
  },
  botones:{
    alignItems:"stretch",
    marginTop: -150,
    marginLeft:10,
    marginRight:10,
  },
  botonRedes:{
    top: 110,
    height: 100,
    alignItems:"stretch",
    borderRadius: 55,
  },
  botonRedes2:{
    top: 55,
    height: 100,
    alignItems:"stretch",
  },
  botonRedes3:{
    height: 100,
    alignItems:"stretch",
  },
  entradas:{
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
  }
});
