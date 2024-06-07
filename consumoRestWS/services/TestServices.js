import { Alert } from "react-native";
//ejemplo de un get
export const getAllPostsService = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {return response.json()})
      .then((json) => {console.log(json)});
  };
//ejemplo de un post
  export const createPostService = (post, fnExito) => {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        title: post.title,
        body: post.body,
        userId: 1,},
        ()=>{
            Alert.alert("CONFIRMACION","Se ha ingresado un nuevo POST")
        }),
      
      headers: {
        'Content-type': 'application/json',
      },
    };
    fetch('https://jsonplaceholder.typicode.com/posts', config)
      .then((response) => {return response.json()})
      .then((json) => {console.log(json);fnExito();});
  };
  //ejemplo de un put
  export const updatePostService = (id, title, body, userId) => {
    const config = {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title,
        body,
        userId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  
   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, config)
   .then((response) => {return response.json()})
   .then((json) => {console.log(json)});
  };
  export const getByUserIdService = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    .then((response) => {return response.json()})
    .then((json) => {console.log(json)});
  };
//get en la fake store
export const getFakeStoreProductsService = () => {
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>console.log(json))
  };
  
// post en la fake store
  export const postFakeStoreProductsService = () => {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        title: 'el main producto',
                    price: 13.5,
                    description: 'es una prueba pa',
                    image: 'https://i.pravatar.cc',
                    category: 'electronicozzz'
        }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  
    return fetch('https://fakestoreapi.com/products', config)
    .then((response) => {return response.json()})
    .then((json) => {console.log(json)});
  };
//put en la fake store
export const putFakeStoreProductsService = (id, title, price, description, image, category) => {
    const config = {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title,
        price,
        description,
        image,
        category,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  
    return fetch(`https://fakestoreapi.com/products/${id}`, config)
    .then((response) => {return response.json()})
    .then((json) => {console.log(json)});
  };
  export const getDocumentTypes = () => {
    return fetch('http://192.168.100.8:8080/inventarios-1.0.0/rest/tiposdocumento/recuperar')
      .then((response) => {return response.json()})
      .then((json) => {console.log(json)});
  };
  //insertar tipos doc
  export const insertTiposServices = (post, fnExito) => {
  const config = {
    method: 'POST',
    body: JSON.stringify({
      codigo: post.codigo,
      descripcion: post.descripcion
    }),
    headers: {
      'Content-type': 'application/json',
    },
  };
  fetch('http://192.168.100.8:8080/inventarios-1.0.0/rest/tiposdocumento/insertar', config)
    .then(response => {
        if(response.body!=null){
            response.json()
        }else{
            response.body;
        }
    })
    .then((json) => {
      console.log(json);
      fnExito();
    })
    .catch((error) => {
      console.error('Error al realizar la solicitud:', error);
    });
};

  