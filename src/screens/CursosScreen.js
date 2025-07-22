import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const cursosMock = [
  {
    id: "1",
    title: "Empreendedorismo para Iniciantes",
    description: "Aprenda os primeiros passos para abrir seu negócio do zero.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    duration: "4 semanas • Online",
    url: "https://sebrae.com.br/sites/PortalSebrae/cursosonline/aprender-a-empreender,b070b8a6a28bb610VgnVCM1000004c00210aRCRD",
    details:
      "Neste curso você aprenderá tudo que precisa para começar seu próprio negócio, desde a concepção da ideia, elaboração do plano, até dicas práticas para superar desafios comuns dos iniciantes.",
  },
  {
    id: "2",
    title: "Marketing Digital para Pequenos Negócios",
    description:
      "Aprenda a divulgar seus produtos e atrair mais clientes pela internet.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    duration: "4 semanas • Online",
    url: "https://www.sebrae-sc.com.br/blog/marketing-digital-para-pequenos-negocios",
    details:
      "Explore estratégias modernas de marketing digital, como o uso das redes sociais, campanhas pagas, SEO e muito mais para expandir a presença digital do seu negócio.",
  },
  {
    id: "3",
    title: "Gestão Financeira Básica",
    description:
      "Entenda como organizar as finanças do seu negócio para crescer com saúde.",
    image:
      "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?auto=format&fit=crop&w=800&q=80",
    duration: "3 semanas • Online",
    url: "https://sebrae.com.br/sites/PortalSebrae/cursosonline/gestao-financeira,7370b8a6a28bb610VgnVCM1000004c00210aRCRD",
    details:
      "Aprenda a controlar seu fluxo de caixa, elaborar orçamentos e interpretar indicadores financeiros para tomar decisões seguras e inteligentes.",
  },
];

export function CursosScreen({ navigation, route }) {
  const { id } = route.params || {}; // recupera o id do usuário
  const [search, setSearch] = useState("");
  const [cursos, setCursos] = useState(cursosMock);
  const [modalVisible, setModalVisible] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const handleSearch = () => {
    const resultado = cursosMock.filter(
      (curso) =>
        curso.title.toLowerCase().includes(search.toLowerCase()) ||
        curso.description.toLowerCase().includes(search.toLowerCase())
    );
    setCursos(resultado);
  };

  const resetSearch = () => {
    setSearch("");
    setCursos(cursosMock);
  };

  const abrirModal = (curso) => {
    setCursoSelecionado(curso);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setCursoSelecionado(null);
  };

  const abrirLink = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          alert("Não foi possível abrir o link: " + url);
        }
      })
      .catch((err) => alert("Erro: " + err));
  };

  return (
    <ScrollView style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={28}
        color="#DB3C8A"
        style={styles.backIcon}
        onPress={() => navigation.navigate("Home", { id })}
      />

      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Capacite-se com cursos gratuitos!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar por título ou descrição..."
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

      {cursos.length === 0 ? (
        <Text style={styles.noCourses}>Nenhum curso encontrado.</Text>
      ) : (
        cursos.map((curso) => (
          <View key={curso.id} style={styles.card}>
            {curso.image && (
              <Image source={{ uri: curso.image }} style={styles.cardImage} />
            )}
            <Text style={styles.cardTitle}>{curso.title}</Text>
            <Text style={styles.description}>{curso.description}</Text>
            <Text style={styles.duration}>{curso.duration}</Text>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => abrirLink(curso.url)}
              >
                <Text style={styles.buttonText}>Acessar curso</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saibaMaisButton]}
                onPress={() => abrirModal(curso)}
              >
                <Text style={styles.buttonText}>Saiba mais</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <Text style={styles.footerMessage}>
        💡 Um passo por dia já é progresso! Você consegue.
      </Text>

      {/* Modal para mostrar detalhes do curso */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{cursoSelecionado?.title}</Text>
            <Text style={styles.modalDetails}>{cursoSelecionado?.details}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={fecharModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
  },
  title: {
    color: "#DB3C8A",
    fontWeight: "bold",
    fontSize: 18,
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
    shadowOpacity: 0.15,
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
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    color: "#444",
    fontSize: 14,
    marginBottom: 6,
  },
  duration: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
    fontStyle: "italic",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    backgroundColor: "#DB3C8A",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  saibaMaisButton: {
    backgroundColor: "#7A1153",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerMessage: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#A01773",
    textAlign: "center",
  },
  noCourses: {
    color: "#A01773",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    color: "#7A1153",
  },
  modalDetails: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#DB3C8A",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
    
