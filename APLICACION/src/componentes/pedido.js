import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
//import { withTheme } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function buscarProducto() {
  const [nombre, setNombre] = useState(null);
  return (
    <View style={styles.Entregas}>
      <View style={styles.entrega1}>

        <View style={styles.tilOp}>
          <Text style={styles.ti}>Pedido</Text>
          <View style={styles.opciones}>
            <AntDesign name='bars' style={{ fontSize: 30 }} />
          </View>
        </View>

        <View style={styles.progre}>
          <View style={styles.avance}>
            <Text style={{ padding: 20}}>
              <AntDesign name='checkcircle' />
            </Text>
            <Text style={{ padding: 20 }}>
              <AntDesign name='checkcircle' />
            </Text>
            <Text style={{ padding: 20 }}>
              <AntDesign name='checkcircle' />
            </Text>
          </View>
          <View style={styles.avanceTitulo}>
            <Text style={styles.subtitulo}>Carrito</Text>
            <Text style={styles.subtitulo}>Tipo de Entrega</Text>
            <Text style={styles.subtitulo}>Confirmar</Text>
          </View>
        </View>

        <View style={styles.OpEntrega1}>
          <TouchableOpacity style={styles.OpEntregaPedi}>
            <View style={styles.circleIcon}>
              <Feather name='image' style={{marginLeft:60, fontSize: 25, marginTop:65, width:95}} />
              <Text style={styles.tituloEntrega1}>L.  0.00</Text>
            </View>
            
            <View>
                <Text style={styles.tituloEntrega}>Resumen Pedido:</Text>
                <TouchableOpacity style={styles.OpEntregaPediC}>
                  <Text style={styles.tituloEntrega}>Descuento Aplicado (L.):</Text>
                  <TextInput placeholder='0.00' style={styles.input}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.OpEntregaPediC}>
                  <Text style={styles.tituloEntrega}>Costo Envío (L.):</Text>
                  <TextInput placeholder='0.00' style={styles.input2}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.OpEntregaPediC}>
                  <Text style={styles.tituloEntrega}>Total + Envío (L.):</Text>
                  <TextInput placeholder='0.00' style={styles.input3}/>
                </TouchableOpacity>

                </View>
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.OpEntrega}>

            <View>
                <View>
                <Text style={styles.tituloEntrega}>Entregar Producto en:</Text>
                <TouchableOpacity style={styles.OpEntrega2}>
                  <Text style={styles.tituloEntrega}>Direccion del Cliente</Text>
                  <View style={styles.botonCambiar}>
                  <Button 
                    title="Cambiar" color={"#00A41F"}></Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.OpEntrega2}>
                  <Text style={styles.tituloEntrega}>Telefono del Cliente</Text>
                </TouchableOpacity>

                </View>
            </View>
            
            
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.menu1}>
          <View style={styles.menu}>
            <FontAwesome name='home' style={{ fontSize: 25 }} />
            <AntDesign name='search1' style={{ fontSize: 25 }} />
            <AntDesign name='filetext1' style={{ fontSize: 25 }} />
            <AntDesign name='shoppingcart' style={{ fontSize: 25 }} />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitulo:{
    marginLeft:5,
    marginRight:5
  },
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
    left: 425,
    position: "relative",
    top: -27
  },
  tilOp: {
    backgroundColor: "#00A41F",
    paddingBottom: 0,
    alignItems: "stretch",
    paddingTop: 10,
    position: "relative",
    top: -138
  },
  ti: {
    position: "relative",
    alignItems: "center",
    top: 5,
    fontSize: 25,
    left: 195,
  },
  progre: {
    position: "relative",
    top: -158,
    backgroundColor: "#00A41F",
  },
  avance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avanceTitulo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  OpEntrega: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
    position: "relative",
    top: -75,
    height: 150,
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
//body
  OpEntregaPedi: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
    position: "relative",
    top: -115,
    height: 195,
    bottom: -50
  },
  OpEntregaPediC: {
    flexDirection: "row",
    marginTop: 5,
    borderRadius: 5,
    borderColor: "black",
    position: "relative",
    textAlign: 'center',
    height: 40,
    width: 170
  },
  circleIcon: {
    backgroundColor: "#00A41F",
    borderRadius: 20,
    padding: 9,
    position: 'relative',
    textAlign: 'center',
    left: -5,
    top: 10,
    fontSize: 10,
    height: 170
  },
  tituloEntrega1: {
    marginTop:45,
    marginLeft:50
  },
  tituloEntrega:{
    textAlign: 'center',
    marginTop: 13,
    marginLeft: 15
  },
  botonCambiar:{
    marginTop:10,
    marginLeft:170,
    height:50,
    width:120,
    color: "#000000"
  },
  input:{
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 40,
    textAlign: 'center',
    width: 70,
    position: 'relative'
  },
  input2:{
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 90,
    textAlign: 'center',
    width: 70,
    position: 'relative'
  },
  input3:{
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 85,
    textAlign: 'center',
    width: 70,
    position: 'relative'
  },
  OpEntrega2: {
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: "#BAFBB9",
    borderRadius: 10,
    position: "relative",
    height: 40,
    width: 280
  },
  tituloEntregatext: {
    borderRadius: 5,
    borderColor: "black",
    top: 7,
    marginLeft: 25,
  },


  menu: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingHorizontal: 15,
    position: "relative",
    top: 142,
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
  }




});