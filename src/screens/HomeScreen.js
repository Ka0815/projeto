import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export function HomeScreen({ navigation, route }) {
  const id = route.params?.id; // pega o id do usuário logado
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/usuarios/${id}`)
        .then((response) => setUsuario(response.data))
        .catch((error) =>
          console.error("Erro ao buscar usuário na Home:", error)
        );
    }
  }, [id]);

  return (
    <View style={styles.fullContainer}>
      <ScrollView style={styles.container}>
        {/* Topo com logo e usuário */}
        <View style={styles.topBar}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />

          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#DB3C8A", fontWeight: "bold" }}>
              {usuario?.nome || "Usuário"}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Usuario", { id: id })}
              style={{
                backgroundColor: "#DB3C8A",
                padding: 8,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="person-circle-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Campo de busca */}
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
          onPress={() => navigation.navigate("Empresa", { id: id })}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Catálogo de vendas */}
        <Text style={styles.sectionTitle}>Catálogo de vendas</Text>
        <View style={styles.catalogContainer}>
          {[
            {
              label: "Salão",
              img: require("../../assets/salao2.png"),
              to: "CatalogoSalao",
            },
            { label: "Loja", img: require("../../assets/loja.png"), to: "CatalogoLoja" },
            {
              label: "Acessórios",
              img: require("../../assets/acessorios.png"),
              to: "CatalogoAcessorios",
            },
            {
              label: "Estética",
              img: require("../../assets/estetica.png"),
              to: "CatalogoEstetica",
            },
            {
              label: "Roupas",
              img: require("../../assets/roupas.png"),
              to: "CatalogoRoupas",
            },
            {
              label: "Pedicure",
              img: require("../../assets/pedicure.png"),
              to: "CatalogoPedicure",
            },
          ].map((item, index) => {
            const Wrapper = item.to ? TouchableOpacity : View;

            return (
              <Wrapper
                key={index}
                style={styles.catalogItem}
                {...(item.to && {
                  onPress: () => navigation.navigate(item.to, { id: id }),
                })}
              >
                <Image source={item.img} style={styles.catalogIcon} />
                <Text style={styles.catalogText}>{item.label}</Text>
              </Wrapper>
            );
          })}
        </View>

        {/* Notificações */}
        <View style={styles.notificationsSection}>
          {[1, 2].map((num) => (
            <View key={num} style={styles.notificationCard}>
              <View style={styles.notificationHeader}>
                <Image
                  source={require("../../assets/megafone.png")}
                  style={styles.notificationIcon}
                />
                <Text style={styles.notificationTitle}>Notificação {num}</Text>
              </View>
              <Text style={styles.notificationText}>
                Consultant - Internal Medicine
              </Text>
              <Text style={styles.notificationReview}>⭐ 4.9 (37 Reviews)</Text>
            </View>
          ))}
        </View>

        {/* Botão para ver feedbacks */}
        <TouchableOpacity
          style={styles.feedbackListButton}
          onPress={() => navigation.navigate("FeedbackList", { id: id })}
        >
          <Ionicons name="star-outline" size={20} color="#fff" />
          <Text style={styles.feedbackListButtonText}>
            Ver feedbacks de outros usuários
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Menu inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Cursos", { id: id })}
        >
          <Ionicons name="book-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Cursos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Noticias", { id: id })}
        >
          <Ionicons name="newspaper-outline" size={24} color="#fff" />
          <Text style={styles.menuText}>Notícias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate("Feedback",{id})}
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
    paddingBottom: 100,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DB3C8A",
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
  catalogContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  catalogItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  catalogIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
    resizeMode: "contain",
  },
  catalogText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#DB3C8A",
    textAlign: "center",
  },
  notificationsSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontWeight: "bold",
    color: "#DB3C8A",
    marginBottom: 5,
  },
  notificationText: {
    color: "#333",
  },
  notificationReview: {
    marginTop: 5,
    fontStyle: "italic",
    color: "#888",
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
  feedbackListButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB3C8A",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    alignSelf: "center",
  },
  feedbackListButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
});
