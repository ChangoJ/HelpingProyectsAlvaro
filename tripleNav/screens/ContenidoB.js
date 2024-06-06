import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, ScrollView, TouchableOpacity, Modal } from 'react-native';

// Lista de productos inicial
let productos = [
  { codigo: 101, nombre: "Doritos", categoria: "Snacks", precioDeCompra: 0.31, precioDeVenta: 0.37 },
  { codigo: 102, nombre: "Manicho", categoria: "Golosinas", precioDeCompra: 0.50, precioDeVenta: 0.60 },
];

// Variables de estado y banderas
let esNuevo = true;
let indiceSeleccionado = -1;

// Componente principal
export default function App({navigation}) {
  // Estados para los datos de los productos y el modal
  const [txtCodigo, setTxtCodigo] = useState("");
  const [txtNombre, setTxtNombre] = useState("");
  const [txtCategoria, setTxtCategoria] = useState("");
  const [txtPrecioDeCompra, setTxtPrecioDeCompra] = useState("");
  const [numElementos, setNumElementos] = useState(productos.length);
  const [modalVisible, setModalVisible] = useState(false);

  // Componente para cada ítem de la lista de productos
  let ItemProducto = ({indice, producto}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setTxtCodigo(producto.codigo.toString());
          setTxtNombre(producto.nombre);
          setTxtCategoria(producto.categoria);
          setTxtPrecioDeCompra(producto.precioDeCompra.toString());
          esNuevo = false;
          indiceSeleccionado = indice;
        }}
      >
        <View style={styles.itemProducto}>
          <View style={styles.itemIndice}>
            <Text style={styles.textoPrincipal}>{producto.codigo}</Text>
          </View>
          <View style={styles.itemContenido}>
            <Text style={styles.textoPrincipal}>{producto.nombre}</Text>
            <Text style={styles.textoSecundario}>{producto.categoria}</Text>
          </View>
          <View>
            <Text style={styles.precioVen}>{(producto.precioDeVenta)}</Text>
          </View>
          <Button
            color='red'
            title=' X '
            onPress={() => {
              setModalVisible(true);
              indiceSeleccionado = indice;
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Función para verificar si ya existe un producto con el mismo código
  let existeProducto = () => {
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].codigo == txtCodigo) {
        return true;
      }
    }
    return false;
  };

  // Función para guardar un nuevo producto o actualizar uno existente
  let guardarProducto = () => {
    if (esNuevo) {
      if (existeProducto()) {
        Alert.alert("INFO", "Ya existe un producto con el código " + txtCodigo);
      } else if (txtCodigo == "" || txtNombre == "" || txtCategoria == "" || txtPrecioDeCompra == "") {
        Alert.alert("INFO", "Cajas de texto vacías");
      } else {
        let precioVenta = parseFloat(txtPrecioDeCompra) * 1.2;
        precioVenta = parseFloat(precioVenta.toFixed(2)); 
        let producto = {
          codigo: txtCodigo,
          nombre: txtNombre,
          categoria: txtCategoria,
          precioDeCompra: parseFloat(txtPrecioDeCompra),
          precioDeVenta: precioVenta,
        };
        productos.push(producto);
      } 
    } else {
      productos[indiceSeleccionado].nombre = txtNombre;
      productos[indiceSeleccionado].categoria = txtCategoria;
      productos[indiceSeleccionado].precioDeCompra = parseFloat(txtPrecioDeCompra);
      productos[indiceSeleccionado].precioDeVenta = (parseFloat(txtPrecioDeCompra) * 1.2).toFixed(2);
    }
    limpiar();
    setNumElementos(productos.length);
  };

  // Función para limpiar los campos de entrada de texto
  let limpiar = () => {
    setTxtCodigo('');
    setTxtNombre('');
    setTxtCategoria('');
    setTxtPrecioDeCompra('');
    esNuevo = true;
  };

  // Cálculo del precio de venta en base al precio de compra
  let precioDeVenta;
  if (txtPrecioDeCompra !== '') {
    precioDeVenta = (parseFloat(txtPrecioDeCompra) * 1.2).toFixed(2);
  } else {
    precioDeVenta = "0.0";
  }

  // Retorno de la vista de la aplicación
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Está seguro que quiere eliminar?</Text>
            <View style={styles.modalButtons}>
              <Button
                title="Aceptar"
                onPress={() => {
                  productos.splice(indiceSeleccionado, 1);
                  setNumElementos(productos.length);
                  setModalVisible(!modalVisible);
                }}
              />
              <Button
                title="Cancelar"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.areaCabecera}>
        <Text style={styles.textoPro}>PRODUCTOS</Text>
        <TextInput
          style={styles.txt}
          value={txtCodigo}
          placeholder="CODIGO"
          onChangeText={setTxtCodigo}
          keyboardType='numeric'
          editable={esNuevo}
        />
        <TextInput
          style={styles.txt}
          value={txtNombre}
          placeholder="NOMBRE"
          onChangeText={setTxtNombre}
        />
        <TextInput
          style={styles.txt}
          value={txtCategoria}
          placeholder="CATEGORIA"
          onChangeText={setTxtCategoria}
        />
        <TextInput
          style={styles.txt}
          value={txtPrecioDeCompra}
          placeholder="PRECIO DE COMPRA"
          onChangeText={setTxtPrecioDeCompra}
        />
        <TextInput
          style={styles.txt}
          value={precioDeVenta}
          placeholder="0.0"
          editable={false}
        />
        <View style={styles.boton}>
          <Button
            title='Nuevo'
            onPress={() => {
              limpiar();
            }}
          />
          <Button
            title='Guardar'
            onPress={() => {
              guardarProducto();
            }}
          />
          <Text style={styles.elementos}>Productos: {numElementos}</Text>
        </View>
      </View>
      {/* Sección de contenido */}
      <View style={styles.areaContenido}>
        <FlatList
          style={styles.lista}
          data={productos}
          renderItem={({index,item}) => {
            return <ItemProducto indice={index} producto={item} />;
          }}
          keyExtractor={item => item.codigo.toString()} // Key debe ser un string
        />
        {/*<Button title="Ir a Calculadora" onPress={() => navigation.navigate('Home')} />*/}
      </View>
       {/* Sección de pie */}
      <View style={styles.areaPie}>
        <Text>Autor: Alvaro Hernandez</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12, // Reducido de 70 para dar espacio a los botones y contador
    paddingHorizontal: 10,
  },
  lista: {},
  itemProducto: {
    backgroundColor: "lightgreen",
    marginBottom: 15,
    padding: 15,
    flexDirection: "row"
  },
  textoPrincipal: {
    fontSize: 20,
  },
  textoPro: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textoSecundario: {
    fontStyle: "italic",
    fontSize: 16,
  },
  areaCabecera: {
    flex: 4,
    paddingEnd: 2,
    justifyContent: 'center',
  },
  areaContenido: {
    flex: 5,
  },
  areaPie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  itemIndice: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContenido: {
    flex: 9,
    paddingLeft: 5,
  },
  itemBotones: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txt: {
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 9,
    padding: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  boton: {
    flexDirection: "row",
    justifyContent: 'space-evenly'
  },
  elementos: {
    marginTop: 12,
  },
  precioVen: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingRight: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
