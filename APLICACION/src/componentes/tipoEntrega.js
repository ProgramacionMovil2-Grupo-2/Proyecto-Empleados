import react from 'react';
import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Sucursal from './sucursal';
import domicilio from './domicilio';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from "@react-navigation/native";
import Navigation from '../../Navigation';
import Navigaion from '../../Navigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
    return (



        <View style={styles.contenedorGeneral}>
            <View style={styles.encabezado}>
                <View style={styles.tituloPrincipal}>
                    <Text style={{ fontSize: 20 }}> ENTREGA</Text>
                </View>
                <View style={styles.iconMenu}>
                    <TouchableOpacity>
                        <AntDesign name='bars' style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.avanceIcon}>
                    <AntDesign name='checkcircle' style={{ fontSize: 20 }} />
                    <AntDesign name='checkcircle' style={{ fontSize: 20 }} />
                    <Text style={{ fontSize: 20 }}>3</Text>
                </View>
                <View style={styles.avanceText}>
                    <Text style={{ fontSize: 20 }}>Carrito</Text>
                    <Text style={{ fontSize: 20 }}>Tipo Entrega</Text>
                    <Text style={{ fontSize: 20 }}>Confirmar</Text>
                </View>
            </View>


            <View style={styles.Opciones}>
                <TouchableOpacity style={styles.OpEntrega} onPress={() => {
                    navigation.navigate('Sucursal')
                }} >
                    <View style={styles.circleIcon}>
                        <AntDesign name='enviroment' style={{ fontSize: 25 }} />
                    </View>
                    <Text style={styles.tituloEntrega}>Recoger en Sucursal</Text>
                    <Text style={styles.horario}>Atendemos de 8:00a.m - 5:00p.m</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.OpEntrega} onPress={() => {
                    navigation.navigate('Domicilio')
                }}>
                    <View style={styles.circleIcon}>
                        <Feather name='truck' style={{ fontSize: 25 }} />
                    </View>
                    <Text style={styles.tituloEntrega}>Entrega a domicilio</Text>
                    <Text style={styles.horario}>Entregamos tu producto en la puerta de tu casa</Text>
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
    );
}



const styles = StyleSheet.create({
    contenedorGeneral: {
        flex: 1,
        position: "relative",
        top: 22,
        backgroundColor: "#BAFBB9"
    },
    encabezado: {
        backgroundColor: "#31C02E",
    },
    tituloPrincipal: {
        alignItems: "center",
        top: 10,
    },
    iconMenu: {
        top: -20,
        left: 435,
    },
    avanceIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        fontSize: 40,
    },
    avanceText: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    OpEntrega: {
        flexDirection: "row",
        marginTop: 40,
        backgroundColor: "#FFFFFF",
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 10,
        position: "relative",
        top: 30,
    },
    circleIcon: {
        backgroundColor: "#5FBC3E",
        borderRadius: 100,
        padding: 9,
        position: 'relative',
        left: -5,
        fontSize: 15,
    },
    horario: {
        position: 'relative',
        left: -110,
        paddingVertical: 15,
        fontSize: 13,
    },
    menu: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        paddingHorizontal: 15,
        position: "relative",
        top: 440,
      
    },
});