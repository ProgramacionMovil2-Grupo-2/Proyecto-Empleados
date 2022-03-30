import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();



import productos from "./src/componentes/productosNuevo2";
import Categorias from "./src/componentes/categoriaProductoNuevo";
import buscar from './src/componentes/buscarProducto2';
import historial from './src/componentes/historialPedido'
import carrito from './src/componentes/carritoCompras'


import confirmarDomicilio from './src/componentes/confirmarDomicilio';
import confirmarSucursal from './src/componentes/confirmarSucursal';
import domicilio from './src/componentes/domicilio';
import sucursal from './src/componentes/sucursal';
import tipoEntrega from './src/componentes/tipoEntrega';
import Pedidos from './src/componentes/pedidosHistorial2';
//import { exp } from "react-native/Libraries/Animated/Easing";
//import { color } from "react-native-reanimated";

const Tab = createBottomTabNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>

            <Stack.Navigator

                screenOptions={{
                    tabBarActiveTintColor: 'black',
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="inicio"
                    component={Categorias}
                    
                />
                <Stack.Screen
                    name="Buscar"
                    component={buscar}
                   
                />
                <Stack.Screen
                    name="Historial"
                    component={historial}
                    options={{

                        tabBarLabel: 'Historial de Pedido',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="file-document-outline" size={35} color="black" />
                        ),
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Carrito"
                    component={carrito}
                    options={{
                        tabBarLabel: 'Carrito',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cart" size={35} color="black" />
                        ),
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="Sucursal"
                    component={sucursal}
                />
                <Stack.Screen
                    name="Domicilio"
                    component={domicilio}
                />
                 <Stack.Screen
                    name="ConfirmarSucursal"
                    component={confirmarSucursal}
                />
                 <Stack.Screen
                    name="ConfirmarDomicilio"
                    component={confirmarDomicilio}
                />
                <Stack.Screen
                    name="tipoEntrega"
                    component={tipoEntrega}
                />
                <Stack.Screen
                    name="buscarProductos"
                    component={buscar}
                />

                <Stack.Screen
                    name="TipoEntrega"
                    component={tipoEntrega}
                />    

                <Stack.Screen
                    name="Productos"
                    component={productos}
                />
                <Stack.Screen
                    name="Categoria"
                    component={Categorias}
                />  
                 <Stack.Screen
                    name="Pedidos"
                    component={Pedidos}
                /> 

            </Stack.Navigator>

        </NavigationContainer>
    );
}