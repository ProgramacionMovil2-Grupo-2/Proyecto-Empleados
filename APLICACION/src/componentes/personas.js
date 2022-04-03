import { useState } from 'react';
import { StyleSheet, Text, View, Button,FlatList, ActivityIndicator, TouchableOpacity, Pressable, ImageComponent,Image, TextInput, Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";





import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
    const [identidad, setIdentidad] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [edad, setEdad] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [id, setId] = useState(null);
    const [] = useState(null);
    const [] = useState(null);

    const guardarPersona = async() =>{
      if(!identidad || !nombre || !apellido || !edad || !tipo){
          console.log("Escriba los datos completos");
          Alert.alert("ALERTA", "Escriba los datos completos");
      }else{
          try {
              const respuesta = await fetch(
                  'http://192.168.1.42:4001/api/personas/guardar',{
                      method: 'POST',
                      headers:{
                          accept: 'application/json',
                          'Content-Type':'application/json'
                      },
                      body:  JSON.stringify({
                          identidad: identidad,
                          nombre: nombre,
                          apellido: apellido,
                          edad: edad,
                          tipo: tipo
                      })
                  });
              Alert.alert("ALERTA", "Petición procesada");
          } catch (error) {
              console.error(error);
          }
      }
  }

  const modificarPersona = async() =>{
    if(!identidad || !nombre || !apellido || !edad || !tipo){
        console.log("Escriba los datos completos");
        Alert.alert("ALERTA", "Escriba los datos completos");
    }else{
        try {
            const respuesta = await fetch(
                'http://192.168.1.42:4001/api/personas/modificar?id='+id,{
                    method: 'PUT',
                    headers:{
                        accept: 'application/json',
                        'Content-Type':'application/json'
                    },
                    body:  JSON.stringify({
                        id: id,
                        identidad: identidad,
                        nombre: nombre,
                        apellido: apellido,
                        edad: edad,
                        tipo: tipo
                    })
                });
            Alert.alert("ALERTA", "Registro modificado");
        } catch (error) {
            console.error(error);
        }
    }
}

const eliminarPersona = async() =>{
  if(!id){
      console.log("Escriba los datos completos");
      Alert.alert("ALERTA", "Escriba los datos completos");
  }else{
      try {
          const respuesta = await fetch(
              'http://192.168.1.2:4001/api/personas/modificarEliminar?id='+id,{
                  method: 'PUT',
                  headers:{
                      accept: 'application/json',
                      'Content-Type':'application/json'
                  },
                  body:  JSON.stringify({
                      id: id
                  })
              });
          Alert.alert("ALERTA", "Registro eliminado");
      } catch (error) {
          console.error(error);
      }
  }
}
  return (    
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogin}>
        <View style={styles.contenedorTitulo}>
          <Text style={styles.titulo}>MÓDULO DE PERSONAS</Text>
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
            onChangeText= {setId}

              placeholder="Ej. 7"
              style={styles.entradas}
            >
            </TextInput>
          <Text style={styles.textinput}>   Identidad:</Text>
          <TextInput
            value={identidad}
            onChangeText= {setIdentidad}

              placeholder="Ej. 08011997600245"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Nombre:</Text>
            <TextInput
            value={nombre}
            onChangeText= {setNombre}

              placeholder="Ej. Marcos"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Apellido:</Text>
            <TextInput
            value={apellido}
            onChangeText= {setApellido}

              placeholder="Ej. Gutierrez"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Edad:</Text>
            <TextInput
            value={edad}
            onChangeText= {setEdad}

              placeholder="EJ. 23"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Tipo:</Text>
            <TextInput
            value={tipo}
            onChangeText= {setTipo}

              placeholder="Ej. CL"
              style={styles.entradas}
            >
            </TextInput>
          </View>
          <View style={styles.botonRedes}>
              <Button 
                title="REGISTRAR" color={"#0D7701"} onPress={guardarPersona}>
              </Button>
          </View>
          <View style={styles.botonRedes}>
              <Button 
                title="MODIFICAR" color={"#3A6C96"} onPress={modificarPersona}>
              </Button>
          </View>
          <View style={styles.botonRedes}>
              <Button 
                title="ELIMINAR" color={"#D51104"} onPress={eliminarPersona}>
              </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor:"#DEFFDA",
    alignItems: 'center',
    justifyContent: "center",
    margin:0,
    padding: 15,
    width:"100%",
    height:"112%",
  },
  textinput:{
    fontSize:16.5
  },
  contenedorLogin: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  contenedorTitulo: {
    backgroundColor: '#00A41F',
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
    marginTop:-70,
    marginVertical:10,
    height:75
  },
  contenedorLogo: {
    flexDirection:"column",
    alignItems: "center",
    justifyContent:"center",
  },
  contenedorControles: {
    flex: 3,
    flexDirection:"column",
    alignItems: "stretch",
    justifyContent:"center",
    borderWidth: 1,
    borderColor: "#dedede",
    borderRadius:25,
    backgroundColor:"#fff",
    paddingLeft:10,
    paddingRight:10,
  },
  sombraControles: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  titulo: {
      color: "#FFFFFF" ,
      fontSize: 30,
      fontWeight: "700",
    },
  controles:{
    flex:4,
    //backgroundColor: "#29291f",
    marginBottom: 20,
    paddingTop:30,
    paddingVertical:30
  },
  contenedorBotones:{
    flex:1,
    padding: 10,
    justifyContent:"space-evenly",
    flexDirection: "row",
  },
  contenedorBotonesRedes:{
    flex:2,
    padding: 10,
    justifyContent:"space-evenly",
    flexDirection: "column",
  },
  boton:{
    flex:1,
    alignItems:"stretch",
    marginLeft:10,
    marginRight:10,
  },
  botonRedes:{
    flex:0.5,
    alignItems:"stretch",
    marginVertical:-7,
    marginTop:-15,
    marginLeft:5,
    marginRight:5
  },
  entradas:{
    flex:1,
    alignItems:"stretch",
    margin:10,
    padding:10,
    fontSize: 15,
    fontWeight:"400",
    color: "#495057",
    backgroundColor:"#fff",
    borderWidth:1,
    borderStyle:"solid",
    borderColor: "#ced4da",
    borderRadius: 7,
  }
});
