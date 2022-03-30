import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, FlatList, ImageComponent, Image, TextInput } from 'react-native';
import { withTheme } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function tipoEntrega({ navigation }) {
  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [id, setid] = useState(null);
  const [nombre, setnombre] = useState(null);
  const [descripcion, setdescripcion] = useState(null);
  const [precio, setprecio] = useState(null);
  const [imagen, setimagen] = useState(null);

  const { sucursal, setSucursal } = useState(null);

  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.35:4001/api/productos/listar")
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
    setnombre(item.nombre);
    setdescripcion(item.descripcion);
    setprecio(item.precio);
    setimagen(item.imagen);
    const datos = {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen,
    };
    const datos_productos = JSON.stringify(datos);
    await AsyncStorage.setItem("datos_productos", datos_productos);
  };

  return (
    <View style={styles.Entregas}>
      <View style={styles.entrega1}>



        <View style={styles.tilOp}>
          <Text style={styles.ti}>Productos</Text>
          <View style={styles.opciones}>
            <AntDesign name='bars' style={{ fontSize: 30 }} />
          </View>
        </View>


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
                  <Text style={styles.descripcion}>
                    Descripcion: {item.descripcion}
                  </Text>
                  <Text style={styles.precio}>
                    Precio: {item.precio}

                  </Text>
                  <View style={styles.image}>
                  <Image source={{ uri: item.imagen }} style={{width: 60,  height: 60, left: -3, top: 2}}
                  
                    />
                  </View>
                 


                  <View style={styles.circleIcon}>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate('Carrito')
                    }}>
                      <View>
                        <Feather name='plus' style={{ fontSize: 25 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                </View>
              </Pressable>
            );
          }}
        />







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
  Entregas: {
    alignItems: "center",
    backgroundColor: '#BAFBB9',
    justifyContent: "center",
    margin: 0,
    padding: 4,
    width: "100%",
    height: "100%",
  },
  entrega1: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: "#dedede",
    borderRadius: 5,
    alignItems: "stretch",
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  ti: {
    alignContent: "center",
    alignItems: "center",
    fontSize: 40,
  },
  avanceTitulo: {
    backgroundColor: "#31C02E",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 100,
    position: "relative",
    top: -80
  },
  opciones: {
    flexDirection: "row",
    position: 'relative',
    left: 410,
    position: "relative",
    top: -20
  },
  tilOp: {
    backgroundColor: "#31C02E",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 10,
    position: "relative",
    top: 19
  },
  ti: {
    position: "relative",
    top: 9,
    fontSize: 25,
    left: 180,
  },
  progre: {
    position: "relative",
    top: -158
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
  OpEntrega: {
    flexDirection: "row",
    marginTop: 40,
    backgroundColor: "#BAFBB9",
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 10,
    position: "relative",
    top: -15,
    width: 50,
    height: 50,
  },
  horario: {
    position: 'relative',
    left: 140,
    paddingVertical: 15,
    fontSize: 18,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    position: "relative",
    top: 120,
  },
  continuar: {
    flexDirection: "row",
  },
  ico: {
    paddingVertical: 5,
  },
  menu: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingHorizontal: 15,
    position: "relative",
    top: 1,
  },
  registrar: {
    width: 380,
    height: 70,
    marginTop: 40,
    alignContent: "center",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: 'white',
  },
  tituloBoton2: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  contenedorFuera: {
    width: "100%",
    borderWidth: 3,
    borderColor: "#BAFBB9",
    borderRadius: 25,
    top: 25
  },
  sucursales: {
    borderRadius: 10,
  },
  nombre: {
    fontSize: 18,
    left: 75,
    top: 28,
  },
  descripcion: {
    fontSize: 18,
    left: 75,
    top: 38,
  },
  precio: {
    fontSize: 18,
    left: 330,
    top: -24,
  },
  contenedorDentro: {
    borderRadius: 100,
  },
  image:{
    width: 60, 
    height: 70,
     left: 10, 
     top: -45,
     borderWidth: 3,
     borderColor: "#000000",
  }
});