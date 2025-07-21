import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export function CatalogoRoupasScreen({ navigation, route }) {
  const { id } = route.params || {}; // Recebe o id do usuário, evita erro se não vier

  useEffect(() => {
    if (!id) {
      // Se não tiver id, redireciona para Login ou outra tela
      navigation.navigate("Login");
    }
  }, [id]);

  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const buscarEmpresasRoupas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/cadastroempresas?categoria=Roupas"
        );
        setEmpresas(response.data);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    buscarEmpresasRoupas();
  }, []);

  return (
    <View style={styles.fullContainer}>
      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
        {/* TOPO */}
        <View style={styles.topBar}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Usuario", { id })}
            style={styles.userIconButton}
          >
            <Ionicons name="person-circle-outline" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Pesquisa"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Empresa", { id })}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Catálogo de Vendas - Roupas</Text>

        {/* GRADE DE CARDS */}
        <View style={styles.catalogGrid}>
          {empresas.map((empresa, index) => (
            <View key={index} style={styles.catalogImageBox}>
              <Image source={{ uri: empresa.imagem }} style={styles.catalogImage} />
              <View style={styles.catalogInfo}>
                <Text style={styles.empresaNome}>{empresa.nome}</Text>
                <Text style={styles.empresaEmail}>{empresa.email}</Text>
                <Text style={styles.empresaDocumento}>{empresa.documento}</Text>
                <Text style={styles.empresaEndereco}>{empresa.endereco}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Home", { id })}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Cursos", { id })}
        >
          <Ionicons name="book-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Cursos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Noticias", { id })}
        >
          <Ionicons name="newspaper-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Notícias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Feedback", { id })}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#FEE3EC",
  },
  container: {
    padding: 20,
    paddingBottom: 160,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  userIconButton: {
    backgroundColor: "#DB3C8A",
    padding: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DB3C8A",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#DB3C8A",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
    lineHeight: 26,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DB3C8A",
    marginBottom: 10,
  },
  catalogGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  catalogImageBox: {
    width: "48%", 
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    elevation: 2,
    alignItems: "center",
  },
  catalogImage: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
    marginBottom: 6,
  },
  catalogInfo: {
    width: "100%",
    alignItems: "center",
  },
  empresaNome: {
    fontWeight: "bold",
    color: "#DB3C8A",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 2,
  },
  empresaEmail: {
    fontSize: 10,
    color: "#555",
    textAlign: "center",
    marginVertical: 1,
  },
  empresaDocumento: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
    marginVertical: 1,
  },
  empresaEndereco: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
    marginBottom: 4,
  },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#DB3C8A",
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },
  menuButton: {
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
  },
});
