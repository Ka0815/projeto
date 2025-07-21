import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const noticiasMock = [
  {
    title: "Empreendedoras brasileiras se destacam no mercado de tecnologia",
    description:
      "Mulheres estão liderando startups inovadoras e conquistando espaço no setor de tecnologia.",
    image:
      "https://img.freepik.com/fotos-premium/empresaria-computador-portatil-cafe_392895-124439.jpg",
    publishedAt: "2025-07-16T14:00:00Z",
    url: "https://www.exemplo.com/empreendedoras-tecnologia",
  },
  {
    title: "Feiras de empreendedorismo feminino movimentam economia local",
    description:
      "Eventos promovem produtos de mulheres empreendedoras e fomentam o desenvolvimento regional.",
    image:
      "https://img.freepik.com/fotos-premium/mulheres-vendedoras-feirinha_392895-123456.jpg",
    publishedAt: "2025-07-15T10:00:00Z",
    url: "https://www.exemplo.com/feiras-femininas",
  },
  {
    title: "Projeto incentiva meninas a empreender desde cedo",
    description:
      "Iniciativa educacional ensina conceitos de empreendedorismo para estudantes do ensino médio.",
    image:
      "https://img.freepik.com/fotos-premium/jovem-menina-projeto-escola_392895-99887.jpg",
    publishedAt: "2025-07-14T08:00:00Z",
    url: "https://www.exemplo.com/projeto-meninas",
  },
  {
    title: "Mulheres negras empreendedoras quebram barreiras e inspiram",
    description:
      "Histórias de superação mostram como a força e a criatividade feminina estão transformando comunidades.",
    image:
      "https://img.freepik.com/fotos-premium/mulher-negra-feliz-trabalho_392895-567888.jpg",
    publishedAt: "2025-07-12T12:30:00Z",
    url: "https://www.exemplo.com/mulheres-inspiram",
  },
];

export function NoticiasScreen({ navigation, route }) {
  const id = route.params?.id;
  const [search, setSearch] = useState("");
  const [noticias, setNoticias] = useState(noticiasMock);

  const handleSearch = () => {
    const resultado = noticiasMock.filter(
      (noticia) =>
        noticia.title.toLowerCase().includes(search.toLowerCase()) ||
        noticia.description.toLowerCase().includes(search.toLowerCase())
    );
    setNoticias(resultado);
  };

  const resetSearch = () => {
    setSearch("");
    setNoticias(noticiasMock);
  };

  return (
    <ScrollView style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="#DB3C8A"
        style={styles.backIcon}
        onPress={() => navigation.navigate("Home", { id })}
      />

      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>
        Notícias sobre empreendedorismo feminino!
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar por palavras..."
          placeholderTextColor="#A01773"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetSearch}>
          <Ionicons name="refresh" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {noticias.length === 0 ? (
        <Text style={styles.noNews}>Nenhuma notícia encontrada.</Text>
      ) : (
        noticias.map((noticia, i) => (
          <View key={noticia.url || i} style={styles.card}>
            {noticia.image && (
              <Image source={{ uri: noticia.image }} style={styles.cardImage} />
            )}
            <Text style={styles.cardTitle}>{noticia.title}</Text>
            {noticia.description && (
              <Text style={styles.description}>{noticia.description}</Text>
            )}
            <Text style={styles.date}>
              {new Date(noticia.publishedAt).toLocaleDateString("pt-BR")}
            </Text>
            <Text style={styles.time}>
              🕒 {new Date(noticia.publishedAt).toLocaleTimeString("pt-BR")}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => noticia.url && Linking.openURL(noticia.url)}
            >
              <Text style={styles.buttonText}>Ler mais</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.footerMessage}>
        💜 Seu sucesso inspira outras mulheres!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE3EC",
    padding: 20,
  },
  backIcon: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  title: {
    color: "#DB3C8A",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    gap: 6,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#DB3C8A",
    borderWidth: 1,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#DB3C8A",
    padding: 10,
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: "#7A1153",
    padding: 10,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#FFD1E8",
    width: "100%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    color: "#7A1153",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  description: {
    color: "#444",
    fontSize: 14,
    marginBottom: 6,
  },
  date: {
    color: "#444",
    fontSize: 12,
  },
  time: {
    fontSize: 12,
    color: "#555",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#DB3C8A",
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
    borderRadius: 20,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerMessage: {
    marginTop: 20,
    color: "#A01773",
    fontStyle: "italic",
    textAlign: "center",
  },
  noNews: {
    color: "#A01773",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
});
