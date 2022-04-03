import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert,TouchableOpacity,Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from 'react-native-vector-icons/Feather';



import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [id, setid] = useState(null);
  const [descripcion, setdescripcion] = useState(null);

  const presGuardar = async () => {
    if (!descripcion) {
      console.log("Escriba los datos completos");
      Alert.alert("MEDI", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/tipos/guardar', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            descripcion: descripcion
          })
        });
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Categoria Guardada");
      }
    }
  }

  const presModificar = async () => {
    if (!id || !descripcion) {
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
    } else {
      try {
        const respuesta = await fetch(
          'http://192.168.1.42:4001/api/tipos/modificar?id=' + id, {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            descripcion: descripcion
          })
        });
        const json = await respuesta.json();
        console.log(json);
        Alert.alert("ALERTA", "Petición procesada");
      } catch (error) {
        Alert.alert("ALERTA", "Categoria Modificada");
        //console.error(error);
      }
    }
  }
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogin}>
        <View style={styles.contenedorTitulo}>
          <Text style={styles.titulo}>MÓDULO DE CATEGORIAS</Text>
          <TouchableOpacity  style={{ marginLeft: -380, marginTop: -32}} onPress={() => navigation.navigate('inicio')}>
          <View>
            <Feather name='arrow-left' style={{ fontSize: 25 }}
            />
          </View>
          </TouchableOpacity>
        </View>

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
            <Text style={styles.textinput2}>   Nombre:</Text>
            <TextInput
              value={descripcion}
              onChangeText={setdescripcion}

              placeholder="Ej. Marcos"
              style={styles.entradas2}
            >
            </TextInput>
          </View>
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
            <Button
              title="VER" color={"#36465d"} onPress={() => navigation.navigate('categoriaMostrar')}>
            </Button>
          </View>

          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#DEFFDA",
    alignItems: 'center',
    justifyContent: "center",
    margin: 0,
    padding: 15,
    width: "100%",
    height: "112%",
  },
  textinput: {
    fontSize: 16.5,
    height: 200,
    top: 10,
  },
  textinput2: {
    fontSize: 16.5,
    height: 180,
    top: -145,
  },
  contenedorLogin: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  contenedorTitulo: {
    backgroundColor: '#00A41F',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -70,
    marginVertical: 10,
    height: 75
  },
  contenedorLogo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contenedorControles: {
    flex: 3,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius: 25,
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  sombraControles: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },
  controles: {
    flex: 4,
    //backgroundColor: "#29291f",
    marginBottom: 20,
    paddingTop: 30,
    paddingVertical: 30
  },
  contenedorBotones: {
    flex: 1,
    padding: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  contenedorBotonesRedes: {
    flex: 2,
    padding: 10,
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  boton: {
    flex: 1,
    alignItems: "stretch",
    marginLeft: 10,
    marginRight: 10,
  },
  botonRedes: {
    flex: 0.5,
    alignItems: "stretch",
    marginVertical: -7,
    marginTop: -15,
    marginLeft: 5,
    marginRight: 5
  },
  entradas: {
    flex: 1,
    alignItems: "stretch",
    margin: 10,
    padding: 10,
    fontSize: 15,
    fontWeight: "400",
    color: "#495057",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ced4da",
    borderRadius: 7,
    top: -170,
  },
  entradas2: {
    flex: 1,
    alignItems: "stretch",
    margin: 10,
    padding: 10,
    fontSize: 15,
    fontWeight: "400",
    color: "#495057",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ced4da",
    borderRadius: 7,
    top: -302,
  }
});
