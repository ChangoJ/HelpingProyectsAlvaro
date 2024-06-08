import { Alert } from "react-native";
//ejemplo de un post
  export const createPostService = (post, fnExito) => {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        codigoUsuario:post.codigoUsuario,
        codigoPartido:post.codigoPartido,
        codigoEquipo1:post.codigoEquipo1,
        codigoEquipo2:post.codigoEquipo2,
        marcadorEquipo1: post.marcadorEquipo1,
        marcadorEquipo2: post.marcadorEquipo2,
        userId: 1,},
        ()=>{
            Alert.alert("CONFIRMACION","Se ha ingresado un nuevo Pronostico")
        }),
      
      headers: {
        'Content-type': 'application/json',
      },
    };
    fetch('http://localhost:8081/Pronostico/rest/pronosticos/registrar', config)
      .then((response) => {return response.json()})
      .then((json) => {console.log(json);fnExito();});
  };
 

  