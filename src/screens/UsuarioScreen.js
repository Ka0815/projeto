import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export function UsuarioScreen({ navigation, route }) {
  const id = route.params?.id;

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagemPerfil, setImagemPerfil] = useState(null);

  useEffect(() => {
    setLoading(true);
    setUsuario(null);

    axios
      .get(`http://localhost:3000/usuarios/${id}`)
      .then((response) => {
        setUsuario(response.data);
        if (response.data.imagemPerfil) {
          setImagemPerfil(response.data.imagemPerfil);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erro ao buscar usuário:", error.message || error);
        setUsuario(null);
        setLoading(false);
      });
  }, [id]);

  const selecionarImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão negada", "Precisamos do acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImagemPerfil(base64Image);

      axios
        .patch(`http://localhost:3000/usuarios/${id}`, { imagemPerfil: base64Image })
        .then(() => {
          console.log("Imagem salva no backend");
          Alert.alert("Sucesso", "Foto de perfil atualizada!");
        })
        .catch((error) => {
          console.log("Erro ao salvar imagem no backend:", error.message || error);
          Alert.alert("Erro", "Não foi possível salvar a imagem.");
        });
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#DB3C8A" />
        </TouchableOpacity>
        <Text style={styles.title}>Usuário Cadastrado</Text>
      </View>

      <View style={styles.userCard}>
        <TouchableOpacity onPress={selecionarImagem} style={styles.fotoContainer}>
          {imagemPerfil ? (
            <Image source={{ uri: imagemPerfil }} style={styles.fotoPerfil} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color="#A01773" />
          )}
          <Text style={styles.trocarFotoTexto}>Clique para trocar foto</Text>
        </TouchableOpacity>

        <Text style={styles.userName}>{usuario.nome}</Text>
        <Text>Email: {usuario.email}</Text>
        <Text>Documento: {usuario.documento}</Text>

        {/* Botão para ir à tela de edição */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditarConta", { id })}
        >
          <Text style={styles.editButtonText}>Editar Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE3EC",
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#DB3C8A",
  },
  userCard: {
    backgroundColor: "#FFD1E8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#A01773",
    marginTop: 10,
    marginBottom: 5,
  },
  fotoContainer: {
    alignItems: "center",
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  trocarFotoTexto: {
    color: "#A01773",
    fontSize: 12,
    marginTop: 6,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#DB3C8A",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
