import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";

export function LoginScreen({ navigation, route }) {
  const idDoUsuario = route.params?.id; // ID recebido do cadastro, se tiver
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (idDoUsuario) {
      console.log("ID recebido do Cadastro:", idDoUsuario);
      // Se quiser, pode salvar esse ID em AsyncStorage ou fazer algo com ele
    }
  }, [idDoUsuario]);

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    axios
      .get("http://localhost:3000/usuarios")
      .then((response) => {
        const usuarios = response.data;
        const usuarioEncontrado = usuarios.find(
          (u) => u.email === email && u.senha === senha
        );

        if (usuarioEncontrado) {
          Alert.alert("Sucesso", "Login realizado com sucesso!");
          navigation.navigate("Home", { id: usuarioEncontrado.id }); // Envia o ID para a tela de perfil
        } else {
          Alert.alert("Erro", "Email ou senha incorretos.");
        }
      })
      .catch((error) => {
        console.log("Erro no login:", error.message || error);
        Alert.alert("Erro", "Erro ao realizar login.");
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE3EC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#DB3C8A",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    color: "#DB3C8A",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#DB3C8A",
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#DB3C8A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 15,
    color: "#DB3C8A",
    textDecorationLine: "underline",
  },
});
