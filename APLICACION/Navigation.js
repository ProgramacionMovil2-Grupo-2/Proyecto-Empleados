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

const Tab = createBottomTabNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{
                    tabBarActiveTintColor: 'black',
                    headerShown: false,
                }}>
                <Stack.Screen
                    name="inicio"
                    component={inicio}
                    
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
               
                 
                 
                

            </Stack.Navigator>

        </NavigationContainer>
    );
}