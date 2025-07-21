import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

export function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    if (!nome || !email || !documento || !senha) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos.");
      return;
    }

    axios
      .post("http://localhost:3000/usuarios", {
        nome,
        email,
        documento,
        senha,
      })
      .then((response) => {
        const usuarioCriado = response.data;
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");

        // Envia o ID do novo usuário para a tela de Login
        navigation.navigate("Login", { id: usuarioCriado.id });
      })
      .catch((error) => {
        console.log("Erro no cadastro:", error.response || error.message || error);
        Alert.alert(
          "Erro",
          error.response?.data?.mensagem || "Erro ao cadastrar."
        );
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Cadastre-se aqui:</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome completo"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>CPF ou CNPJ:</Text>
      <TextInput
        style={styles.input}
        value={documento}
        onChangeText={setDocumento}
        placeholder="Digite seu CPF ou CNPJ"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Voltar para login</Text>
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
