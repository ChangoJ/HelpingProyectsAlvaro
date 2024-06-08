import { View, StyleSheet, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Text } from '@rneui/base'
import {useState} from 'react'
import {createPostService} from '../services/TestServices'

export const PostForm = () => {
    const navigation = useNavigation();
    const [marcador1,setMarcador1]=useState();
    const [marcador2,setMarcador2]=useState();
    const [codigoUsuario,setCodigoUsuario]=useState();
    const [codigoPartido,setCodigoPartido]=useState();

    const [codigoEquipo1,setCodigoEquipo1]=useState();
    const [codigoEquipo2,setCodigoEquipo2]=useState();

    setCodigoUsuario("1802825487");
    setCodigoPartido(3);
    setCodigoEquipo1("218");
    setCodigoEquipo2("862");



    const createPost=()=>{
        console.log("creando pronostico "+marcador1+" "+marcador2);
        createPostService({
            codigoUsuario:codigoUsuario,
            codigoPartido:codigoPartido,
            codigoEquipo1:codigoEquipo1,
            codigoEquipo2:codigoEquipo2,
            marcadorEquipo1:marcador1,
            marcadorEquipo2:marcador2
        });()=>{
            Alert.alert("CONFIRMACION","Se ha ingresado un nuevo pronostico");
            console.log("Pronostico creado exitosamente");
    }
    }
    return <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.textContainer3} h4="true">PRONOSTICOS</Text>
        </View>
        <View style={styles.textContainer2}>
        <Text h4="true">Usuario: Rosa Solis</Text>
        </View>
        <View style={styles.textContainer2}>
        </View>
        <View style={styles.textContainer2}>
        <Text h4="true">Equipo 1: Ecuador</Text>
        <Input
                placeholder='Marcador equipo 1'
                value={marcador1}
                onChangeText={(value)=>{
                    setMarcador1(value);
                }}
            />
        </View>
        <View style={styles.textContainer2}>
        <Text h4="true">Equipo 2: Venezuela</Text>
        <Input
                placeholder='Marcador equipo 2'
                value={marcador2}
                onChangeText={(value)=>{
                    setMarcador2(value);
                }}
            />
        </View>
        <View style={styles.formContainer}>            
            <Button 
                title="Guardar"
                onPress={createPost}
            />
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        marginVertical: 10,
    },
    formContainer: {
        flex: 19,
        flexDirection:'row',
        justifyContent:'center',

    },
    textContainer2: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        marginVertical: 10
    },
    textContainer3: {
        borderWidth: 2.3,
        borderColor: '#DAA520',
    },
});
