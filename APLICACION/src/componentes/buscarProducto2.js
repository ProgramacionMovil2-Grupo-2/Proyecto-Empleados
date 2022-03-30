import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { withTheme } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function buscarProducto({navigation}) {
  const [nombre, setNombre] = useState(null);
  const [filtro, setFiltro] = useState(null);
  const presBuscarProducto = async () => {
    if (!filtro) {
      console.log("Escriba los datos completos");
      Alert.alert("MEDI", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.7:4001/api/productos/buscarProducto?filtro=', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          query: JSON.stringify({
            nombre: filtro
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

  return (
    <View style={styles.Entregas}>
      <View style={styles.entrega1}>

        <View style={styles.tilOp}>
          <Text style={styles.ti}>Buscar Productos</Text>
          <View style={styles.opciones}>
            <AntDesign name='bars' style={{ fontSize: 30 }} />
          </View>
        </View>


        <TextInput
          value={filtro}
          onChangeText={setFiltro}

          placeholder="Busca tu medicamento"
          style={styles.entradas}
        >
        </TextInput>

        <View style={styles.registrar}>
          <TouchableOpacity
            onPress={presBuscarProducto}>
            <Text style={styles.tituloBoton2} >Buscar</Text>
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
    justifyContent: "center",
    margin: 0,
    padding: 4,
    width: "100%",
    height: "100%",
  },
  entrega1: {
    backgroundColor: '#DEFFDA',
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
    left: 400,
    position: "relative",
    top: -27
  },
  tilOp: {
    backgroundColor: "#00A41F",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 10,
    position: "relative",
    top: -240
  },
  ti: {
    position: "relative",
    top: 5,
    fontSize: 25,
    left: 130,
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
    backgroundColor: "#5FBC3E",
    borderRadius: 100,
    padding: 9,
    position: 'relative',
    left: -5,
    fontSize: 10,
  },
  OpEntrega: {
    flexDirection: "row",
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
    position: "relative",
    top: -200,
  },
  horario: {
    position: 'relative',
    left: 10,
    paddingVertical: 15,
    fontSize: 13,
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
    top: 265,
  },
  registrar: {
    width: "100%",
    height: 60,
    marginTop: 40,
    alignContent: "center",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#0D7701',
    top: 220,
  },
  tituloBoton2: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  tituloBoton2: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  controles: {
    flex: 3,
    marginBottom: 1,
    paddingLeft: 10,
    paddingRight: 10,

  },
  entradas: {
    flexDirection: "row",
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 6,
    borderRadius: 10,
    position: "relative",
    top: -235,
    fontSize: 20,
  }
});