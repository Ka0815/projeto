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
import axios from "axios";

export function FeedbackScreen({ navigation, route }) {
  const { id } = route.params; // <-- Recebendo o id do usuário
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    if (!descricao.trim()) {
      Alert.alert("Atenção", "Por favor, escreva o feedback.");
      return;
    }

    axios
      .post("http://localhost:3000/feedbacks", {
        descricao: descricao.trim(),
      })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert("Sucesso", "Feedback enviado com sucesso!");
          navigation.navigate("Home", { id }); // <-- Mantém o usuário logado
        } else {
          Alert.alert("Erro", "Erro ao enviar o feedback.");
        }
      })
      .catch((error) => {
        console.log("Erro ao enviar feedback:", error.response || error.message || error);
        Alert.alert("Erro", "Não foi possível enviar o feedback.");
      });
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={28}
        color="#DB3C8A"
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>FEEDBACK</Text>
      <Text style={styles.subtitle}>Como foi sua experiência?</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Escreva aqui sua opinião..."
        placeholderTextColor="#999"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Ionicons name="arrow-forward" color="#fff" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE3EC",
    padding: 20,
    alignItems: "center",
  },
  backIcon: {
    alignSelf: "flex-start",
  },
  logo: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A01773",
  },
  subtitle: {
    textAlign: "center",
    color: "#DB3C8A",
    marginVertical: 10,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: "#fff",
    width: "100%",
    height: 100,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    borderColor: "#DB3C8A",
    borderWidth: 1,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#DB3C8A",
    borderRadius: 50,
    padding: 12,
    marginTop: 20,
  },
});
