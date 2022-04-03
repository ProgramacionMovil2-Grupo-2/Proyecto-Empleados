import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [contrasena, setContrasena] = useState(null);

    const presIniciarSesion = async() =>{
        if(!usuario || !contrasena){
            console.log("Escriba los datos completos");
            Alert.alert("ALERTA", "Escriba los datos completos");
          }
        else{
            try {
                const respuesta = await fetch(
                    'http://192.168.1.42:4001/api/autenticacion/iniciosesion',{
                        method: 'POST',
                        headers:{
                            accept: 'application/json',
                            'Content-Type':'application/json'
                        },
                        body:  JSON.stringify({
                            usuario: usuario,
                            contrasena: contrasena
                        })
                    });
                const json = await respuesta.json();
                console.log(json);
                const data = json.data;

                if(!data.token){
                  
                }else{
                  const token = data.token;
                  console.log(token);
                  await AsyncStorage.setItem('Token', token);
                }
                Alert.alert("ALERTA", json.msj);
            } catch (error) {
                console.error(error);
            }
        }
    }
    const pressToken = async () => {
      try {
          var token = await AsyncStorage.getItem('Token');
          console.log(token);
          Alert.alert("TOKEN", token);
          //await AsyncStorage.removeItem('Token');
          token = await AsyncStorage.getItem('Token');
          if(!token){
              Alert.alert("TOKEN", "Token eliminado");
          }
      } catch (error) {
          console.error(error);
      }
  }
  return (
    <View style={styles.contenedor}>
    <ImageBackground source={require("../../images/fondo3.jpg")} resizeMode="cover" style={styles.image}>
      <View style={styles.contenedorLogin}>
        <View style={styles.contenedorTitulo}>
          <Text style={styles.tituloLogin}>LOGIN</Text>
        </View>
        <View style={styles.contenedorLogo}>
          <Image style={{ width: 130, height: 130, marginBottom: 20, marginTop: 10 }}
          source={require("../../images/Logo2.png")}/>
        </View>
        <View style={[styles.contenedorControles, styles.sombraControles]}>
          <View style={styles.controles}>
          <Text style={styles.titulos}>   Usuario:</Text>
            <TextInput
            value={usuario}
            onChangeText= {setUsuario}

              placeholder="Ej. rodri_23"
              style={styles.entradas}
            >
            </TextInput>
            <Text style={styles.titulos}>   Contraseña:</Text>
            <TextInput
            value={contrasena}
            onChangeText= {setContrasena}

              placeholder="Ej. *********"
              style={styles.entradas}
              passwordRules=""
              secureTextEntry={true}
            >
            </TextInput>
          </View>
          <View style={styles.botonRedes}>
              <Button 
                title="INICIAR SESIÓN" color={"#0D7701"} 
                onPress={
                    async() =>{
                        if(!usuario || !contrasena){
                            console.log("Escriba los datos completos");
                            Alert.alert("ALERTA", "Escriba los datos completos");
                          }
                        else{
                            try {
                                const respuesta = await fetch(
                                    'http://192.168.1.42:4001/api/autenticacion/iniciosesion',{
                                        method: 'POST',
                                        headers:{
                                            accept: 'application/json',
                                            'Content-Type':'application/json'
                                        },
                                        body:  JSON.stringify({
                                            usuario: usuario,
                                            contrasena: contrasena
                                        })
                                    });
                                const json = await respuesta.json();
                                console.log(json);
                                const data = json.data;
                
                                if(!data.token){
                                  
                                }else{
                                  const token = data.token;
                                  console.log(token);
                                  await AsyncStorage.setItem('Token', token);
                                  navigation.navigate('inicio')
                                }
                                
                                Alert.alert("ALERTA", json.msj);
                               
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
                }>
              </Button>
            </View>
            <View style={styles.contenedorBotones}>
              <View style={styles.boton}>
                <Text style={styles.titulos2}>¿No tienes una cuenta?</Text>
              </View>
              <View style={styles.boton}>
              <Button title="Registrate" color={"#3A6C96"} fontSize="200"//hover={"#FFFFFF"}
              onPress={()=>navigation.navigate('registrar')}
              ></Button>
            </View>
          </View>
        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    justifyContent: "center",
    margin:0,
    padding: 0,
    width:"110%",
    height:"105%",
  },
  contenedor: {
    alignItems: 'center',
    justifyContent: "center",
    margin:0,
    padding: 20,
    width:"100%",
    height:"100%",
  },
  contenedorLogin: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  contenedorTitulo: {
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
    marginTop:-0,
    marginVertical:20,
    height:60,
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
    borderRadius:25,
    padding:20
    
  },
  sombraControles: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tituloLogin: {
      color: "#FFFFFF" ,
      fontSize: 40,
      fontWeight: "700",
    },
    titulos: {
      color: "#FFFFFF" ,
      fontSize: 28,
      fontWeight: "700",
    },
    titulos2: {
      color: "#FFFFFF" ,
      fontSize: 18,
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
    flex:1,
    alignItems:"stretch",
    margin:5,
  },
  entradas:{
    flex:1,
    alignItems:"stretch",
    margin:7,
    padding:10,
    fontSize: 18,
    fontWeight:"400",
    color: "#495057",
    backgroundColor:"#fff",
    borderWidth:1,
    borderStyle:"solid",
    borderColor: "#ced4da",
    borderRadius: 15,
  }
});
