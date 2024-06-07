import { View, StyleSheet } from 'react-native'
import { Button, Text } from '@rneui/base'
import {getAllPostsService} from '../services/TestServices'
import {createPostService } from '../services/TestServices';
import {updatePostService } from '../services/TestServices';
import {getByUserIdService} from '../services/TestServices';
import {
  getFakeStoreProductsService,
  postFakeStoreProductsService,
  putFakeStoreProductsService,
} from '../services/TestServices';
import {getDocumentTypes} from '../services/TestServices';

export const TestWebServices = () => {
  const getAllPosts=()=>{
    getAllPostsService();
  };
  const getDocuTypes=()=>{
    getDocumentTypes();
  };
  const createPost = () => {
    createPostService();
  };
  const updatePost = () => {
    updatePostService(1, 'mensaje final', 'Hasta la vista baby', 1);
  };
  const getByUserId=()=>{
    getByUserIdService();
  };
  //GET
  const getFakeStoreProducts = () => {
  getFakeStoreProductsService();
  };
  //POST
  const postFakeStoreProducts = () => {
    postFakeStoreProductsService();
  };
  //PUT
  const updateFakeStoreProduct = () => {
    putFakeStoreProductsService(1, 'La bici', 49.99, 'que te lleva a todos laos', 'https://via.placeholder.com/150', 'electronicos');
  };
  return <View style={styles.container}>
    <Text style={styles.textContainer}>MODULO 3</Text>
    <View style={styles.buttonContainer}>
      <Button
        title="Recuperar Post LaTrikitrakatelas"
        onPress={getAllPosts}
      />
      <Button
        title="Crear Post"
        onPress={createPost}
      />
        <Button
        title="Actualizar Post"
        onPress={updatePost}
      />
        <Button
        title="Filtrar"
        onPress={getByUserId}
      />
          <Button
        title="XXX"
        onPress={getFakeStoreProducts}
      />

      <Button
        title="YYY"
        onPress={postFakeStoreProducts}
      />

      <Button
        title="ZZZ"
        onPress={updateFakeStoreProduct}
      />
      <Button
        title="TIPOS DE DOCUMENTOS"
        onPress={getDocuTypes}
      />
      
    </View>
  </View>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10
  },
  buttonContainer: {
    flex: 6,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    marginHorizontal:10

  }
});