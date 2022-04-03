import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity,Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
    const [id_personas, setIdPersonas] = useState(null);
    const [login, setLogin] = useState(null);
    const [correo, setCorreo] = useState(null);
    const [contrasena, setContrasena] = useState(null);
    const [estado, setEstado] = useState(null);
    const [pin, setPin] = useState(null);
    const [id, setId] = useState(null);
    const [] = useState(null);

    const guardarUsuario = async() =>{
        if(!id_personas || !login || !correo || !contrasena){
            console.log("Escriba los datos completos");
            Alert.alert("AVISO", "Escriba los datos completos");
        }else{
            try {
                const respuesta = await fetch(
                    'http://192.168.1.42:4001/api/usuarios/guardarUsuario',{
                        method: 'POST',
                        headers:{
                            accept: 'application/json',
                            'Content-Type':'application/json'
                        },
                        body:  JSON.stringify({
                            id_personas: id_personas,
                            login: login,
                            correo: correo,
                            contrasena: contrasena,
                            estado: estado,
                            pin: pin
                        })
                    });
                /*const request ={
                    method: 'POST',
                        headers:{
                            accept: 'application/json',
                            'Content-Type':'application/json'
                        },
                        body:  JSON.stringify({
                            id_personas: id_personas,
                            login: login,
                            correo: correo,
                            contrasena: contrasena,
                            estado: estado,
                            pin: pin
                        })
                };

                fetch('http://192.168.1.2:4001/api/usuarios/guardarUsuario',request)*/
                Alert.alert("AVISO", "Registro almacenado");
            } catch (error) {
                console.error(error);
            }
        }
    };

   

  return (    
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogin}>
        <View style={styles.contenedorTitulo}>
          <Text style={styles.titulo}>REGISTRARSE</Text>
          <TouchableOpacity  style={{ marginLeft: -380, marginTop: -32}} onPress={() => navigation.navigate('login')}>
          <View>
            <Feather name='arrow-left' style={{ fontSize: 25 }}
            />
          </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.contenedorControles, styles.sombraControles]}>
          <View style={styles.controles}>
          <Text style={styles.textinput}>   Id personas:</Text>
          <TextInput
            value={id_personas}
            onChangeText= {setIdPersonas}

              placeholder="Ej. 4"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Login:</Text>
            <TextInput
            value={login}
            onChangeText= {setLogin}

              placeholder="Ej. Marcos07"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Correo:</Text>
            <TextInput
            value={correo}
            onChangeText= {setCorreo}

              placeholder="Ej. Guti@gmail.com"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Contraseña:</Text>
            <TextInput
            value={contrasena}
            onChangeText= {setContrasena}
            secureTextEntry={true}
              placeholder="EJ. ********"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.textinput}>   Estado:</Text>
            <TextInput
            value={estado}
            onChangeText= {setEstado}

              placeholder="Ej. ACTIVO"
              style={styles.entradas}
            >
            </TextInput>
          </View>
          <View style={styles.botonRedes}>
              <Button 
                title="REGISTRAR" color={"#0D7701"} onPress={guardarUsuario}>
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
    fontSize:17
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
