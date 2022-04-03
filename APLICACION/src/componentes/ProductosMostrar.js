import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, FlatList, ScrollView, StatusBar, ImageComponent, Image, TextInput, Alert, Button } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { withTheme, SearchBar } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [id, setid] = useState(null);
  const [descripcion, setdescripcion] = useState(null);

  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.6:4001/api/productos/listar")
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
    <View style={styles.contenedor}>
      <View style={styles.contenedorTitulo}>
        <Text style={styles.titulo}>MOSTRAR PRODUCTOS</Text>
        <TouchableOpacity  style={{ marginLeft: -400, marginTop: 10}} onPress={() => navigation.navigate('producto')}>
          <View>
            <Feather name='arrow-left' style={{ fontSize: 25 }}
            />
          </View>
          </TouchableOpacity>
      </View>
      <View>
      
      </View>

      <View style={styles.scrollView}>
        <View style={styles.contenedorRegistro}>


          <View style={[styles.contenedorControles, styles.sombraControles]}>
            <View style={styles.controles}>



              <FlatList
                style={styles.sucursales}
                data={info}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={styles.contenedorFuera}
                    //    onPress={() => navigation.navigate("ConfirmarSucursal")}
                    >
                      <View style={styles.contenedorDentro}>
                      <Text style={styles.nombre}>
                         Nombre: {item.nombre}
                        </Text>
                        <Text style={styles.nombre}>
                          Fecha V.: {item.fechavencimiento}
                        </Text>
                        <Text style={styles.nombre}>
                          CodigoBarras: {item.codigobarras}
                        </Text>
                        <Text style={styles.nombre}>
                          Descripcion: {item.descripcion}
                        </Text>
                        <Text style={styles.nombre}>
                          Impuesto: {item.impuesto}
                        </Text>
                        <Text style={styles.nombre}>
                          Precio: {item.precio}
                        </Text>

                        <Image source={{ uri: item.imagen }}
                          style={{ width: 70, height: 70, left: 10, top: -105 }} />

                        <View style={styles.circleIcon}>
                          <TouchableOpacity onPress={() => {
                            navigation.navigate('Buscar')
                          }}>
                          </TouchableOpacity>
                        </View>

                      </View>
                    </Pressable>
                  );
                }}
              />

            </View>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: "#ffffff",
  },
  contenedorRegistro: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  contenedorTitulo: {
    backgroundColor: '#00A41F',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 170,
    width: '100%',
    top: 4,
  },
  contenedorControles: {
    flex: 3,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
    top: 10,
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
  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    top: 40,
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
    flex: 0.3,
    alignItems: "stretch",
    marginTop: 20,
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
    left: 85,
    top: 55,
  },
  sucursales: {
    borderRadius: 10,
  },
  contenedorFuera: {
    width: "100%",
    borderWidth: 5,
    padding: 4,
    borderColor: "#BAFBB9",
  },
  circleIcon: {
    backgroundColor: "#ffffff",
    borderRadius: 100,
    padding: 10,
    position: 'relative',
    left: 350,
    fontSize: 10,
    height: 45,
    width: 45,
    top: -15,
  },

  back: {
    top: -50,
    left: -210,
  },
  scrollView: {
    marginHorizontal: 20,
    width: '100%',
    top: -25,
    backgroundColor: '#BAFBB9',
  },
  contenedorDentro: {
    backgroundColor: "#ffffff",
  }
});