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
  return (
    <View style={styles.container}>

<View style={styles.entrega1}>

<View style={styles.tilOp}>
  <Text style={styles.ti}>FARMACIA</Text>
  <View style={styles.opciones}>
   
  </View>
</View>
      
 <View style={styles.menu1}>
 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('personas')}
 >
    <View>
  <Feather name='users' style={{ fontSize: 45, marginLeft: -160}}/>
 </View>
 <Text style={styles.tituloBoton2}>PERSONAS</Text>
 </TouchableOpacity >

 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('usuarios')}
 >
  <View>
  <Feather name='user-plus' style={{ fontSize: 45, marginLeft: -160}}/>
 </View>
 <Text style={styles.tituloBoton2}>USUARIOS</Text>
 </TouchableOpacity >

 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('categoria')}
 >
     <View>
   <AntDesign name='database' style={{ fontSize: 45, marginLeft: -141}} />
 </View>
 <Text style={styles.tituloBoton2}>CATEGORIAS</Text>
 </TouchableOpacity >

 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('Productos')}
 >
    <View>
   <AntDesign name='medicinebox' style={{ fontSize: 45, marginLeft: -141}} />
 </View>
 <Text style={styles.tituloBoton2}>PRODUCTOS</Text>
 </TouchableOpacity >
 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('proveedores')}
 >
    <View>
  <Feather name='truck' style={{ fontSize: 45, marginLeft: -130}}/>
 </View>
 <Text style={styles.tituloBoton2}>PROVEEDORES</Text>
 </TouchableOpacity >
 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('sucursales')}
 >
   <View>
   <AntDesign name='bank' style={{ fontSize: 45, marginLeft: -141}} />
 </View>
 <Text style={styles.tituloBoton2}>SUCURSALES</Text>
 </TouchableOpacity >
 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('sucursales')}
 >
    <View>
  <Feather name='shopping-cart' style={{ fontSize: 45, marginLeft: -160}}/>
 </View>
 <Text style={styles.tituloBoton2}>COMPRAS</Text>
 </TouchableOpacity >
 <TouchableOpacity style={styles.OpCarrito}
   onPress={() => navigation.navigate('Productos')}
 >
   <View>
  <Feather name='trello' style={{ fontSize: 45, marginLeft: -109}}/>
 </View>
 <Text style={styles.tituloBoton2}>DETALLE COMPRAS</Text>
 </TouchableOpacity >
         
  
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
    height: 60,
    position: "relative",
    top: -50
  },
  ti: {
    position: "relative",
    top: 10,
    fontSize: 25,
    left: 177,
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
     height: 60,
    marginTop: 20,
     alignContent: "center",
     justifyContent: "center",
     alignItems: "center",
     borderRadius: 40,
     backgroundColor: '#FFFFFF',
     position: "relative",
     top: -50,
    },
    tituloBoton2:{
      color: '#000000',
      fontSize: 25,
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
  },
  botonusuarios: {
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
    botoncategorias: {
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
      botonproductos: {
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

   
});









