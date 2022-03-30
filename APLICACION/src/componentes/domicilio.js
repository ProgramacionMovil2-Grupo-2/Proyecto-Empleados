import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { render } from 'react-dom';
import { Component } from 'react/cjs/react.production.min';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App({navigation}) {
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


        <View style={styles.total}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('tipoEntrega')
            }}>
              <View>
                <Text >Atrás</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate('ConfirmarDomicilio')
            }} >
              <View>
                <Text>Confirmar</Text>
              </View>
            </TouchableOpacity>
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
              navigation.navigate('Productos')
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenedorFuera: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#eee",
  },
  contenedorDentro: {
    margin: 10,
    width: "100%"
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
    paddingTop: 100,
    position: "relative",
    top: -330,

  },
  ti: {
    alignContent: "center",
    alignItems: "center",
    fontSize: 40,
  },

  progre: {
    backgroundColor: "#31C02E",
    position: "relative",
    top: -330
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
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "relative",
    top: 250,
    backgroundColor: "#31C02E",

  },
  menu: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingHorizontal: 15,
    position: "relative",
    top: 245,

  },
});

