import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Vibration,
} from "react-native";
import { Audio } from "expo-av";

export default function NotificacoesScreen() {
  const [mensagem, setMensagem] = useState("");
  const [notificacoes, setNotificacoes] = useState([]);

  const mensagensPadrao = [
    {
      titulo: "Nova tarefa disponível!",
      texto: "Você tem uma nova atividade para responder hoje.",
    },
    {
      titulo: "Lembrete de estudo",
      texto: "Não se esqueça de revisar o conteúdo da aula de hoje.",
    },
    {
      titulo: "Mensagem da professora",
      texto: "Parabéns pelo seu desempenho na última atividade!",
    },
  ];

  useEffect(() => {
    let index = 0;
    const intervalo = setInterval(() => {
      if (index < mensagensPadrao.length) {
        adicionarNotificacao(mensagensPadrao[index]);
        index++;
      } else {
        clearInterval(intervalo);
      }
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  async function tocarSom() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/notificacao.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.log("Erro ao tocar som:", error);
    }
  }

  const adicionarNotificacao = (novaMensagem) => {
    const fadeAnim = new Animated.Value(0);

    const novaNotif = { ...novaMensagem, fadeAnim };

    setNotificacoes((prev) => [novaNotif, ...prev]);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Vibration.vibrate(300);
    tocarSom();
  };

  const handleEnviar = () => {
    if (mensagem.trim() === "") return;
    adicionarNotificacao({ titulo: "Nova notificação", texto: mensagem });
    setMensagem("");
  };

  const handleLimpar = () => {
    setNotificacoes([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Central de Notificações</Text>

      <View style={styles.inputSection}>
        <TextInput
          placeholder="Digite uma nova notificação"
          placeholderTextColor="#999"
          style={styles.input}
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.btnEnviar} onPress={handleEnviar}>
          <Text style={styles.btnEnviarText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLimpar} onPress={handleLimpar}>
        <Text style={styles.btnLimparText}>Limpar todas as notificações</Text>
      </TouchableOpacity>

      <View style={styles.notificacoesContainer}>
        {notificacoes.map((notif, i) => (
          <Animated.View
            key={i}
            style={[styles.notificacaoCard, { opacity: notif.fadeAnim }]}
          >
            <View style={styles.notificacaoHeader}>
              <Image
                source={require("../../assets/megafone.png")}
                style={styles.icon}
              />
              <Text style={styles.notificacaoTitulo}>{notif.titulo}</Text>
            </View>
            <Text style={styles.notificacaoTexto}>{notif.texto}</Text>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#DB3C8A",
    textAlign: "center",
  },
  inputSection: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DB3C8A",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
  },
  btnEnviar: {
    backgroundColor: "#DB3C8A",
    marginLeft: 10,
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  btnEnviarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnLimpar: {
    backgroundColor: "#888",
    borderRadius: 25,
    paddingVertical: 10,
    marginBottom: 20,
  },
  btnLimparText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  notificacoesContainer: {},
  notificacaoCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificacaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  notificacaoTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#DB3C8A",
  },
  notificacaoTexto: {
    fontSize: 14,
    color: "#333",
  },
});
