import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export function EmpresaScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
   const [produto, setProduto] = useState("");
  const [imagem, setImagem] = useState(null);

  const [categoriaOpen, setCategoriaOpen] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [categorias] = useState([
    { label: "Salão", value: "Salão" },
    { label: "Loja", value: "Loja" },
    { label: "Acessórios", value: "Acessórios" },
    { label: "Estética", value: "Estética" },
    { label: "Roupas", value: "Roupas" },
    { label: "Pedicure", value: "Pedicure" },
  ]);

  const selecionarImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão negada", "Precisamos do acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
      base64: true,
    });

    if (!result.canceled) {
      setImagem(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleCadastroEmpresa = () => {
    if (!nome || !documento || !email || !categoria || !endereco ||!produto||!imagem) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos e selecione uma imagem.");
      return;
    }

    axios
      .post("http://localhost:3000/cadastroempresas", {
        nome,
        documento,
        email,
        categoria,
        endereco,
        produto,
        imagem,
      })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert("Sucesso", "Empresa cadastrada com sucesso!");
          navigation.goBack();
        } else {
          Alert.alert("Erro", "Erro ao cadastrar a empresa.");
        }
      })
      .catch((error) => {
        console.log("Erro ao cadastrar empresa:", error.response || error.message || error);
        Alert.alert("Erro", error.response?.data?.mensagem || "Erro ao cadastrar a empresa");
      });
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="#DB3C8A"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />

      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Cadastre a sua empresa</Text>

      <TextInput
        placeholder="Nome do negócio"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="CPF/CNPJ"
        style={styles.input}
        value={documento}
        onChangeText={setDocumento}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={{ zIndex: 1000, width: "90%", marginBottom: 15 }}>
        <DropDownPicker
          placeholder="Nicho de vendas"
          open={categoriaOpen}
          value={categoria}
          items={categorias}
          setOpen={setCategoriaOpen}
          setValue={setCategoria}
          setItems={() => {}}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <TextInput
        placeholder="Endereço do negócio"
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
      />
<TextInput
        placeholder="Descreva seu produto"
        style={styles.input}
        value={produto}
        onChangeText={setProduto}
      />

      <TouchableOpacity style={styles.input} onPress={selecionarImagem}>
        <Text style={{ color: imagem ? "#000" : "#999" }}>
          {imagem ? "Imagem selecionada" : "Selecionar Imagem"}
        </Text>
      </TouchableOpacity>

 

      <TouchableOpacity style={styles.button} onPress={handleCadastroEmpresa}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE3EC",
    alignItems: "center",
    padding: 20,
  },
  backIcon: {
    alignSelf: "flex-start",
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    color: "#DB3C8A",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderColor: "#DB3C8A",
    borderWidth: 1,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#DB3C8A",
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#DB3C8A",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#DB3C8A",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    marginTop: 15,
    color: "#DB3C8A",
    textDecorationLine: "underline",
  },
});
