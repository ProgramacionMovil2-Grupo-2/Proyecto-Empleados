import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function correo() {
    const [correo, setCorreo] = useState(null);

    const presEnviarCorreo = async() =>{
        if(!correo){
            console.log("Escriba los datos completos");
            Alert.alert("ALERTA", "Escriba los datos completos");
        }else{
            try {
                const respuesta = await fetch(
                    'http://192.168.1.2:4001/api/autenticacion/correo',{
                        method: 'POST',
                        headers:{
                            accept: 'application/json',
                            'Content-Type':'application/json'
                        },
                        body:  JSON.stringify({
                            correo: correo,
                        })
                    });
                const json = await respuesta.json();
                console.log(json);
                Alert.alert("ALERTA", "Petición procesada");
            } catch (error) {
              console.error(error);
            }
        }
    }
    return (
        <View style={styles.contenedor}>
          <View style={styles.contenedorRegistro}>
            <View style={styles.contenedorTitulo}>
              <Text style={styles.tituloLogin}>CORREO DE RECUPERACION</Text>
            </View>
            <View style={styles.contenedorLogo}>
              <Image style={{ width: 140, height: 140, marginBottom: 30, marginTop: 50 }}
              source={require("../../images/Logo2.png")}/>
            </View>
            <View style={[styles.contenedorControles, styles.sombraControles]}>
              <View style={styles.controles}>
                  <View><Text style={styles.tituloinput}>   Correo electrónico:</Text></View>
                  <TextInput
                    value={correo}
                    onChangeText= {setCorreo}
      
                    placeholder="Ej. rodri@gmail.com"
                    style={styles.entradas}
                  >
                  </TextInput>
                <View style={styles.correo}>
                  <TouchableOpacity 
                    onPress={presEnviarCorreo}>
                    <Text style={styles.tituloBoton2} >ENVIAR PIN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      contenedor: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        width:"100%",
        height:"100%",
        backgroundColor:"#DEFFDA",
      },
      contenedorRegistro: {
        alignItems: "stretch",
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      },
      contenedorTitulo: {
        backgroundColor: '#00A41F',
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        marginTop:27,
        height:80,
      },
      contenedorControles: {
        flex: 1,
        flexDirection:"column",
        alignItems: "stretch",
        justifyContent:"center",
        padding:0,
      },
      contenedorLogo: {
        flexDirection:"column",
        alignItems: "center",
        justifyContent:"center",
      },
      sombraControles: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      tituloLogin: {
          color: "#FFFFFF" ,
          fontSize: 23,
          fontWeight: "700",
        },
      tituloinput: {
        color: "#000000" ,
        marginTop:20,
        marginVertical:10,
        alignItems:"flex-start",
        fontSize: 18,
        fontWeight: "500",
      },
      tituloBoton2: {
        color: "#FFFFFF" ,
        fontSize: 15,
        fontWeight: "600",
      },
      controles:{
        flex:3,
        alignItems:"flex-start",
        marginBottom:30,
        paddingLeft:10,
        paddingRight:10,
      },
      contenedorBotones:{
        paddingLeft:10,
        marginTop:0,
        alignItems:"center",
        justifyContent:"center",
        flexDirection: "column",
        height:100,
      },
      boton:{
        alignItems:"center",
        marginLeft:5,
        marginRight:5,
        height:'40%',
        width:170,
      },
      botonRedes:{
        flex:0.3,
        alignItems:"stretch",
        marginTop:20,
      },
      entradas:{
        flex:0.3,
        alignItems:"stretch",
        width:'100%',
        margin:5,
        padding:8,
        fontSize: 16,
        fontWeight:"400",
        color: "#495057",
        backgroundColor:"#fff",
        borderWidth:2,
        borderStyle:"solid",
        borderColor: '#FFFFFF',
        borderRadius: 25,
      },
      correo:{
        width: '90%',
        height: '8%',
        marginTop:40,
        marginLeft:20,
        alignContent:"center",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#0D7701',
      }
    });