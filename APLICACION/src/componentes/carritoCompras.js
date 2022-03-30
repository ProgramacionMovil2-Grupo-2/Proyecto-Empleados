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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App({ navigation }) {

  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [id, setid] = useState(null);
  const [idCarrito, setidCarrito] = useState(null);
  const [nombre, setProducto] = useState(null);
  const [codigobarras, setcodigobarras] = useState(null);
  const [impuesto, setimpuesto] = useState(null);
  const [precio, setprecio] = useState(null);
  const [descripcion, setdescripcion] = useState(null);
  const [cantidad, setcantidad] = useState(null);
  const [descuento, setdescuento] = useState(null);
  const [imagen, setimagen] = useState(null);
  


  if (ejecucion == null) {
    try {
        const buscardor=2;
        const response = fetch("http://192.168.1.35:4001/api/mostrarcarrito/buscar?idCarrito="+buscardor)
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
    setidCarrito(item.idCarrito);
    setProducto(item.nombre);
    setcodigobarras(item.codigobarras);
    setimpuesto(item.impuesto);
    setprecio(item.precio);
    setdescripcion(item.descripcion);
    setcantidad(item.cantidad);
    setdescuento(item.descuento);
    setimagen(item.imagen);
  
    const datos = {
      id: id,
      idCarrito: idCarrito,
      nombre: nombre,
      codigobarras: codigobarras,
      impuesto: impuesto,
      precio: precio,
      descripcion: descripcion,
      cantidad: cantidad,
      descuento: descuento,
      imagen: imagen,
    };
    const datos_sucursales = JSON.stringify(datos);
    await AsyncStorage.setItem("datos_sucursales", datos_sucursales);
  };


  return (
    <View style={styles.container}>

<View style={styles.entrega1}>

<View style={styles.tilOp}>
  <Text style={styles.ti}>Carrito</Text>
  <View style={styles.opciones}>
    <AntDesign name='bars' style={{ fontSize: 30 }} />
  </View>
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
            <Text style={styles.subtitulo2}>Tipo de Entrega</Text>
            <Text style={styles.subtitulo3}>Confirmar</Text>
          </View>
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
                 
                  <View>
                  
                     <Text style={styles.id}>
                        Codigo de barras : 
                        {item.codigobarras}
                      </Text>
                      <Text style={styles.id}>
                        Nombre producto : 
                        {item.nombre}
                    
                      </Text>
                      <Text style={styles.id}>
                        Tipo  : 
                        <Text style={styles.tipo}>
                        {item.descripcion}
                      </Text>
                      </Text>
                      <Text style={styles.id}> 
                        Precio :
                        <Text style={styles.precio}>
                        {item.precio}
                        </Text>
                        </Text>
                     
                        
                  <View style={styles.image}>
                  <Image source={{ uri: item.imagen }} style={{width: 100,  height: 120, left: 6, top: 2}}
                  
                    />
                  </View>
                      
                      
                      </View>
                      <TouchableOpacity style={styles.boton}>
                     <Text style={styles.tituloBoton2}>Editar</Text>
                     </TouchableOpacity>
                     <View style={styles.entrada}>
                         <Text>
                         Cantidad:
                         </Text>
                       
                     <TextInput>
                     {item.cantidad}
                     </TextInput>
                     </View>
                  </View>
               
                </Pressable>

                
              );
            }}
          />


       
        
        
      
        <View style={styles.menu1}>
        <TouchableOpacity style={styles.OpCarrito}
         onPress={() => navigation.navigate('Productos')}
        >
            <Text style={styles.tituloBoton2}>BUSCAR MAS PRODUCTOS</Text>
          </TouchableOpacity >
          <View style={styles.total}>
            <Text>Total: L</Text>
           
            <TouchableOpacity style={styles.Totales} onPress={() => navigation.navigate('TipoEntrega')}>
            <View style={styles.continuar}>
              <Text>Siguiente</Text>
              <AntDesign name='right' style={styles.ico} />
            </View>
            </TouchableOpacity>

          </View>
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
    backgroundColor: "#00A41F",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 100,
    position: "relative",
    top: 20
  },
  ti: {
    position: "relative",
    top: -70,
    fontSize: 25,
    left: 200,
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
    top: -105
  },
  contenedorFuera: {
    top: 10,
    width: "100%",
    height: 310,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#BAFBB9",
    backgroundColor: "white",
  },
  contenedorDentro: {
    margin: 10,
    width: "100%"
  },

  progre: {
    position: "relative",
    top: -100
  },
  avance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avanceTitulo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menu: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingHorizontal: 15,
    position: "relative",
    top: 5,
  },
  OpCarrito: {
    flexDirection: "row",
     width:'100%',
     height: 70,
    
     alignContent: "center",
     justifyContent: "center",
     alignItems: "center",
     borderRadius: 40,
     backgroundColor: '#FFFFFF',
     position: "relative",
     top: -10,
    },
    tituloBoton2:{
      color: '#000000',
      fontSize: 15,
      fontWeight: "600",
    },
    total: {
      flexDirection: "row",
      backgroundColor: "#31C02E",
      justifyContent: "space-between",
      padding: 30,
      position: "relative",
      top: 5,
    },
    continuar: {
      flexDirection: "row",
    },
    productos:{
    
      top: -50,
      height: "90%",
    },
   
      tipo: {
        textAlign: "left",
        color: "black", 
        fontSize: 16,
        top: -105,
        left: 130
      },
      precio: {
        marginTop: 5,
        textAlign: "left",
        color: "black", 
        fontSize: 16,
        top: -85,
        left: 130
      },
      nombre: {
        marginTop: 15,
        textAlign: "left",
        color: "black",
        fontSize: 16,
        top: -125,
        left: 130
    
      },
      codigobarras: {
        marginTop: 25,
        textAlign: "left",
        color: "black",
        fontSize: 16,
        left: 130,
        top: 0
    
      },
      id: {
        marginTop: 25,
        textAlign: "left",
        color: "black",
        fontSize: 14,
    
      },

      id2: {
        marginTop: 25,
        textAlign: "left",
        color: "black",
        fontSize: 14,
        left: 150,
        top: -175
    
      },
      boton: {
    
        width: 60, 
        height: 20, 
        top: -80, 
        left: 360, 
        backgroundColor:'#00A41F',
        color: "#fff",
        alignContent: "center",
        justifyContent: "center",
         alignItems: "center",
         borderRadius: 5,

      },
      entrada: {
          top: -120,
          left: 260,
          width: 80,
          height: 50,
          borderWidth: 2,
        borderColor: "#dedede",
        borderRadius: 1,
        fontSize: 14,
        alignContent: "center",
        
        justifyContent: "center",
         alignItems: "center",

      }
      ,
  image:{
    width: 120, 
    height: 140,
    left: 300,
    top: -160,
     borderWidth: 3,
     borderColor: "#000000",
  }
   
});









