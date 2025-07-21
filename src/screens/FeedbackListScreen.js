import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export function FeedbackListScreen({ navigation, route }) {
  const { id } = route.params || {};

  useEffect(() => {
    if (!id) {
      navigation.navigate("Login"); // ou outra tela inicial caso não tenha id
    }
  }, [id]);

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFeedbacks = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar feedbacks:", error);
      })
      .finally(() => setLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      loadFeedbacks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { id })}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={28} color="#DB3C8A" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Feedbacks Recebidos</Text>

      {loading ? (
        <ActivityIndicator
          color="#DB3C8A"
          size="large"
          style={styles.centered}
        />
      ) : feedbacks.length === 0 ? (
        <Text style={styles.noFeedback}>Nenhum feedback ainda.</Text>
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < item.stars ? "star" : "star-outline"}
                    size={20}
                    color="#DB3C8A"
                  />
                ))}
              </View>
              <Text style={styles.text}>{item.descricao}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE3EC",
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: {
    color: "#DB3C8A",
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A01773",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderColor: "#DB3C8A",
    borderWidth: 1,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  text: {
    color: "#333",
    fontSize: 16,
  },
  noFeedback: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  centered: {
    marginTop: 50,
  },
});
