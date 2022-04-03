import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, FlatList, ScrollView, StatusBar, ImageComponent, Image, TextInput, Alert, Button, SafeAreaView } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [nombre, setnombre] = useState(null);
  const [fechavencimiento, setfechavencimiento] = useState(null);
  const [codigobarras, setcodigobarras] = useState(null);
  const [descripcion, setdescripcion] = useState(null);
  const [impuesto, setimpuesto] = useState(null);
  const [precio, setprecio] = useState(null);
  const [idtipo, setidtipo] = useState(null);
  const [imagen, setimagen] = useState(null);
  const [estado, setestado] = useState(null);

  const presGuardar = async () => {
    if (!idtipo || !fechavencimiento || !nombre || !codigobarras || !impuesto || !precio) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/productos/guardarProducto', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: nombre,
            fechavencimiento: fechavencimiento,
            codigobarras: codigobarras,
            descripcion: descripcion,
            impuesto: impuesto,
            precio: precio,
            idtipo: idtipo,
            imagen: imagen,
            estado: estado
          })
        });
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Petición procesada");
        //console.error(error);
      }
    }
  }

  const presModificar = async () => {
    if (!idtipo || !fechavencimiento || !nombre || !codigobarras || !impuesto || !precio) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/productos/modificarProducto?id=' + id, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: nombre,
            fechavencimiento: fechavencimiento,
            codigobarras: codigobarras,
            descripcion: descripcion,
            impuesto: impuesto,
            precio: precio,
            idtipo: idtipo,
            imagen: imagen,
            estado: estado
          })
        });
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Petición procesada");
        //console.error(error);
      }
    }
  }
  const presEliminar = async () => {
    if (!id) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/productos/modificarEliminar?id=' + id, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Petición procesada");
        //console.error(error);
      }
    }
  }


  const presBuscar = async () => {
    if (!descripcion) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/tipos/buscarTipos?filtro=' + descripcion, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.42:4001/api/tipos/listar")
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


  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorTitulo}>
        <Text style={styles.tituloLogin}>MODULO DE PRODUCTOS</Text>
        <TouchableOpacity  style={{ marginLeft: -400, marginTop: -40}} onPress={() => navigation.navigate('inicio')}>
          <View>
            <Feather name='arrow-left' style={{ fontSize: 25 }}
            />
          </View>
          </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contenedorRegistro}>


          <View style={[styles.contenedorControles, styles.sombraControles]}>
            <View style={styles.controles}>
              <Text style={styles.textinput}>   Id:</Text>
              <TextInput
                value={id}
                onChangeText={setid}

                placeholder="Ej. 7"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Nombre:</Text>
              <TextInput
                value={nombre}
                onChangeText={setnombre}

                placeholder="Ej. Analgesico"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Fecha:</Text>
              <TextInput
                value={fechavencimiento}
                onChangeText={setfechavencimiento}

                placeholder="Ej. 2022/03/30"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Codigo Barras:</Text>
              <TextInput
                value={codigobarras}
                onChangeText={setcodigobarras}

                placeholder="Ej. 01010202"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Descripcion:</Text>
              <TextInput
                value={descripcion}
                onChangeText={setdescripcion}

                placeholder="Ej. Lo mejor"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Impuesto:</Text>
              <TextInput
                value={impuesto}
                onChangeText={setimpuesto}

                placeholder="Ej. 15%"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Precio:</Text>
              <TextInput
                value={precio}
                onChangeText={setprecio}

                placeholder="Ej. 23"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Categoria:</Text>
              <TextInput
                value={idtipo}
                onChangeText={setidtipo}

                placeholder="Ej. numero"
                style={styles.entradas}
              >
              </TextInput>
              <Text style={styles.textinput}>   Imagen:</Text>
              <TextInput
                value={imagen}
                onChangeText={setimagen}

                placeholder="Ej. "
                style={styles.entradas}
              >
              </TextInput>

              <Text style={styles.textinput}>   Estado:</Text>
              <TextInput
                value={estado}
                onChangeText={setestado}

                placeholder="Ej. "
                style={styles.entradas}
              >
              </TextInput>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.botonRedes}>
        <Button
          title="GUARDAR" color={"#0D7701"} onPress={presGuardar}>
        </Button>
      </View>
      <View style={styles.botonRedes}>
        <Button
          title="MODIFICAR" color={"#3A6C96"} onPress={presModificar}>
        </Button>
      </View>
      <View style={styles.botonRedes}>
        <Button style={styles.nombreBoton}
          title="ELIMINAR" color={"#D51104"} onPress={presEliminar}>
        </Button>
      </View>
      <View style={styles.botonRedes}>
        <Button
          title="VER" color={"#055b5c"} onPress={() => navigation.navigate('productoMostrar')}>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textinput: {
    fontSize: 18
  },
  textcuenta: {
    fontSize: 16
  },
  contenedor: {
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#DEFFDA",
  },
  contenedorRegistro: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: '90%',
    width: '100%',
    top: 50
  },
  contenedorTitulo: {
    backgroundColor: '#00A41F',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: '100%',
    top: -5,
  },
  contenedorControles: {
    flex: 3,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 0,
    top: 30,
  },
  contenedorLogo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },
  sombraControles: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tituloLogin: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    top: -5
  },
  tituloBoton: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  tituloBoton2: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  controles: {
    flex: 3,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  contenedorBotones: {
    paddingLeft: 10,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: 100,
  },
  boton: {
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
    height: '40%',
    width: 170,
  },
  botonRedes: {
    flex: 0.20,
    alignItems: "stretch",
    top: 0,
    height: '100%',
    width: '40%',
  },
  entradas: {
    flex: 0.3,
    alignItems: "stretch",
    margin: 5,
    padding: 8,
    fontSize: 16,
    fontWeight: "400",
    color: "#495057",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: '#FFFFFF',
    borderRadius: 25,
  },
  iniciarSesion: {
    width: 150,
    height: 40,
    alignContent: "center",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#3A6C96',
  },
  botonGuardar: {
    width: 225,
    height: 50,
    marginTop: 10,
    alignContent: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#0D7701',
    left: 0,
  },
  botonEditar: {
    width: 225,
    height: 50,
    marginTop: -40,
    alignContent: "center",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#0D7701',
    top: -12,
    left: 230,
  },
  botonEliminar: {
    width: '100%',
    height: 50,
    alignContent: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#0D7701',
  },
  botonBuscar: {
    width: '100%',
    height: 50,
    alignContent: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#0D7701',
    top: 10,
  },
  nombre: {
    fontSize: 20,
    left: 10,
    top: 28,
  },
  sucursales: {
    borderRadius: 10,
  },
  contenedorFuera: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#BAFBB9",
  },
  circleIcon: {
    backgroundColor: "#31C02E",
    borderRadius: 100,
    padding: 10,
    position: 'relative',
    left: 350,
    fontSize: 10,
    height: 45,
    width: 45,
    top: -30,
  },
  scrollView: {
    marginHorizontal: 20,
    width: '100%',
    top: -20,
    height: '46%'
  }
});