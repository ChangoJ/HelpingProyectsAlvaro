import { View, StyleSheet, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Text } from '@rneui/base'
import {useState} from 'react'
import {createPostService} from '../services/TestServices'
import {insertTiposServices} from '../services/TestServices'
export const PostForm = () => {
    const navigation = useNavigation();
    const [subject,setSubject]=useState();
    const [message,setMessage]=useState();

    const [codigo,setCodigos]=useState();
    const [descripcion,setDescripcion]=useState();

    const createPost=()=>{
        console.log("creando post "+subject+" "+message);
        createPostService({
            title:subject,
            body:message
        });
    }
    const createTipoDoc=()=>{
        console.log("creando tipo "+codigo+" "+descripcion);
        insertTiposServices({
            codigo:codigo,
            descripcion:descripcion
        }, 
        ()=>{
            Alert.alert("CONFIRMACION","Se ha ingresado un nuevo tipo de documento");
            console.log("Tipo de documento creado exitosamente");});
    }
    return <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text h4="true">NUEVO MENSAJE</Text>
        </View>
        <View style={styles.textContainer}>
            <Text>Ingrese tipo de documento</Text>
        </View>
        <View>
        <Input
                placeholder='TIPO'
                value={codigo}
                onChangeText={(value)=>{
                    setCodigos(value);
                }}
            />
            <Input
                placeholder='DESCRIPCION'
                value={descripcion}
                onChangeText={(value)=>{
                    setDescripcion(value);
                }}
            />
            <Button 
                title="Guardar"
                onPress={createTipoDoc}
            />
        </View>
        <View style={styles.formContainer}>            
            <Input
                placeholder='TITULO'
                value={subject}
                onChangeText={(value)=>{
                    setSubject(value);
                }}
            />
            <Input
                placeholder='MENSAJE'
                value={message}
                onChangeText={(value)=>{
                    setMessage(value);
                }}
            />
            <Button 
                title="Guardar"
                onPress={createPost}
            />
            <Button
                title="Ir a TestWebServices"
                onPress={() => navigation.navigate('TestWebServicesNav')}
            />
        </View>

    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        marginVertical: 10
    },
    formContainer: {
        flex: 7,
        flexDirection:'column',
        justifyContent:'center'

    }
});
