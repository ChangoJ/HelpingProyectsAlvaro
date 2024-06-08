import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {TestWebServices} from './screens/TestWebServices'
import {PostForm} from './screens/PostForm'
import { color } from '@rneui/base';
export default function App() {
  const StackProducts = createNativeStackNavigator(); 
  return (
    <NavigationContainer>
      <StackProducts.Navigator initialRouteName='PostFormView'>
        <StackProducts.Screen name="PostFormView"  component={PostForm} 
        options={{title:'ProSportU', headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}/>
      </StackProducts.Navigator>
    </NavigationContainer>
  );
}
