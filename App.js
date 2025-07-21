import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "./src/screens/SplashScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { CadastroScreen } from "./src/screens/CadastroScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { EmpresaScreen } from "./src/screens/EmpresaScreen";
import { UsuarioScreen } from "./src/screens/UsuarioScreen";
import { CursosScreen } from "./src/screens/CursosScreen";
import { NoticiasScreen } from "./src/screens/NoticiasScreen";
import { FeedbackScreen } from "./src/screens/FeedbackScreen";
import { CatalogoSalaoScreen } from "./src/screens/CatalogoSalaoScreen";
import { FeedbackListScreen } from "./src/screens/FeedbackListScreen";
import { CatalogoLojaScreen } from "./src/screens/CatalogoLojaScreen";
import { CatalogoAcessoriosScreen } from "./src/screens/CatalogoAcessoriosScreen";
import { EditarContaScreen } from './src/screens/EditarContaScreen';
import { CatalogoEsteticaScreen } from "./src/screens/CatalogoEsteticaScreen";
import { CatalogoRoupasScreen } from "./src/screens/CatalogoRoupasScreen";
import { CatalogoPedicureScreen } from "./src/screens/CatalogoPedicureScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Empresa" component={EmpresaScreen} />
        <Stack.Screen name="Usuario" component={UsuarioScreen} />
        <Stack.Screen name="Cursos" component={CursosScreen} />
        <Stack.Screen name="Noticias" component={NoticiasScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="CatalogoSalao" component={CatalogoSalaoScreen} />
        <Stack.Screen name="CatalogoLoja" component={CatalogoLojaScreen} />
        <Stack.Screen name="CatalogoAcessorios" component={CatalogoAcessoriosScreen} />
        <Stack.Screen name="CatalogoEstetica" component={CatalogoEsteticaScreen} />
        <Stack.Screen name="CatalogoRoupas" component={CatalogoRoupasScreen} />
        <Stack.Screen name="CatalogoPedicure" component={CatalogoPedicureScreen} />
        <Stack.Screen name="FeedbackList" component={FeedbackListScreen} />
        <Stack.Screen name="EditarConta" component={EditarContaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
