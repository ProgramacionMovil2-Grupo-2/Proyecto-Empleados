import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

import inicio from './src/componentes/inicio';
import personas from './src/componentes/personas';
import usuarios from './src/componentes/usuarios';
import categoria from './src/componentes/categoria';
import categoriaMostrar from './src/componentes/categoriaMostrar';
import proveedores from './src/componentes/proveedores';
import login from './src/componentes/login';
import registrar from './src/componentes/registro';
import sucursales from './src/componentes/sucursales';
import compras from './src/componentes/compras';
import detallecompras from './src/componentes/detalleCompras';
import productoMostrar from './src/componentes/ProductosMostrar';
import producto from './src/componentes/productos';
import vercompras from './src/componentes/verCompra';

const Tab = createBottomTabNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{
                    tabBarActiveTintColor: 'black',
                    headerShown: false,
                }}>
                <Stack.Screen
                    name="login"
                    component={login}
                    
                />
                   <Stack.Screen
                    name="inicio"
                    component={inicio}
                    
                />
                   <Stack.Screen
                    name="registrar"
                    component={registrar}
                   
                />
                <Stack.Screen
                    name="personas"
                    component={personas}
                   
                />
                 <Stack.Screen
                    name="usuarios"
                    component={usuarios}
                   
                />
                 <Stack.Screen
                    name="categoria"
                    component={categoria}
                   
                />
                 <Stack.Screen
                    name="categoriaMostrar"
                    component={categoriaMostrar}
                   
                />
                  <Stack.Screen
                    name="proveedores"
                    component={proveedores}
                   
                />
               
                   <Stack.Screen
                    name="sucursales"
                    component={sucursales}
                   
                />
                   <Stack.Screen
                    name="compras"
                    component={compras}
                   
                />
                   <Stack.Screen
                    name="detallecompras"
                    component={detallecompras}
                   
                />
                   <Stack.Screen
                    name="productoMostrar"
                    component={productoMostrar}
                   
                />
                 <Stack.Screen
                    name="producto"
                    component={producto}
                   
                />
                 <Stack.Screen
                    name="vercompras"
                    component={vercompras}
                   
                />
               
                 
                 
                

            </Stack.Navigator>

        </NavigationContainer>
    );
}