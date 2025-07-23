

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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function NoticiasScreen({ navigation, route }) {
  const id = route.params?.id;

  const noticiasMock = [
    {
      title:
        "10 mulheres que transformam o empreendedorismo e a tecnologia no Brasil",
      description:
        "Conheça histórias inspiradoras de mulheres que estão revolucionando o mercado tecnológico no país.",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dgitais.com%2Fpost%2Ftendencias-de-mulheres-empreendedoras%2F&psig=AOvVaw2dWjqG0d63eh19uAQgqR3x&ust=1753233821149000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJCVjounz44DFQAAAAAdAAAAABAE.jpg",
      publishedAt: "2025-07-16T14:00:00Z",
      url: "https://exame.com/pme/10-mulheres-que-transformam-o-empreendedorismo-e-a-tecnologia-no-brasil/",
    },
    {
      title:
        "Feira para mulheres empreendedoras arretadas de Picuí movimenta economia criativa",
      description:
        "Evento movimentou a economia local durante os três dias da tradicional festa de São Pedro em Picuí.",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Faliancaenergia.com.br%2Fnoticias%2Falianca-presente-no-i-forum-das-mulheres-empreendedoras-de-icapui%2F&psig=AOvVaw3slbtLL23bM9ChUrbJ2Crm&ust=1753233885272000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIjXiKunz44DFQAAAAAdAAAAABAf.jpg",
      publishedAt: "2025-07-15T10:00:00Z",
      url: "https://picui.pb.gov.br/noticia/feira-para-mulheres-empreendedoras-arretadas-de-picui-movimenta-economia-criativa-durante-os-tres-dias-da-tradicional-festa-de-sao-pedro",
    },
    {
      title: "Projeto incentiva crianças a desenvolver o empreendedorismo",
      description:
        "Iniciativa do Sesc incentiva o empreendedorismo desde a infância, despertando habilidades desde cedo.",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sescpe.org.br%2F2018%2F09%2F04%2Fprojeto-incentiva-criancas-a-desenvolver-o-empreendedorismo%2F&psig=AOvVaw0GugUKFOAcgjkzLQETedki&ust=1753233694525000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNDQ2vKmz44DFQAAAAAdAAAAABAE.jpg",
      publishedAt: "2025-07-14T08:00:00Z",
      url: "https://www.sescpe.org.br/2018/09/04/projeto-incentiva-criancas-a-desenvolver-o-empreendedorismo/",
    },
    {
      title: "Mulheres negras empreendedoras transformam comunidades",
      description:
        "Fundo Agbara apoia mulheres negras no empreendedorismo, promovendo inclusão social e econômica.",
      image:
        "https://cdn.pixabay.com/photo/2020/01/07/18/54/african-american-4743930_1280.jpg",
      publishedAt: "2025-07-12T12:30:00Z",
      url: "https://fundoagbara.org.br",
    },
  ];

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

  const abrirLink = async (url) => {
    const podeAbrir = await Linking.canOpenURL(url);
    if (podeAbrir) {
      Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não foi possível abrir o link.");
    }
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
        <Ionicons name="newspaper" size={18} color="#DB3C8A" /> Notícias sobre
        empreendedorismo feminino!
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
            {/* A imagem da notícia aqui */}
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
              onPress={() => abrirLink(noticia.url)}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
