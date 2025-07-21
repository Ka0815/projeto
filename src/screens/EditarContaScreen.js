import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import axios from "axios";

export function EditarContaScreen({ route, navigation }) {
  const { id } = route.params;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [imagemPerfil, setImagemPerfil] = useState(null); // estado para imagem
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/usuarios/${id}`)
      .then((response) => {
        const { nome, email, documento, senha, imagemPerfil } = response.data;
        setNome(nome);
        setEmail(email);
        setDocumento(documento);
        setSenha(senha);
        setImagemPerfil(imagemPerfil || null); // define a imagem atual
      })
      .catch((error) => {
        console.log("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      });
  }, [id]);

  const handleAtualizar = () => {
    if (!nome || !email || !documento || !senha) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    axios
      .put(`http://localhost:3000/usuarios/${id}`, {
        nome,
        email,
        documento,
        senha,
        imagemPerfil, // mantém a imagem ao atualizar
      })
      .then(() => {
        Alert.alert("Sucesso", "Conta atualizada com sucesso!");
        navigation.replace("Usuario", { id });
      })
      .catch((error) => {
        console.log("Erro na atualização:", error);
        Alert.alert("Erro", "Erro ao atualizar a conta.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Editar Conta:</Text>

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
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleAtualizar}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEE3EC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 40,
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
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
