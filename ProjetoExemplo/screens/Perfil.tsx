import { ScrollView, StyleSheet } from "react-native";
import Icone from "./componentes/Icone";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { IconeUser } from "./componentes/iconeUser";

export default function Perfil({ navigation }: RootTabScreenProps<"Perfil">) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconeUser tamanho={100} />
      </View>

      <Text style={styles.title}>Sobre</Text>

      <Text style={styles.conteudo}>
        Estudante de Análise e Desenvolvimento de Sistemas do centro
        universitario Eniac. Atualmento estou no 5 º Semestre do curso, com
        previsão de formação para o final de 2022.
      </Text>
      <Text style={styles.title}>Contatos</Text>

      <Text style={styles.conteudo}>Me siga nas redes sociais!</Text>

      <View style={styles.row}>
        <Icone titulo={"Instagram"} nomeIcone={"instagram-square"} />
        <Icone titulo={"Github"} nomeIcone={"github"} />
        <Icone titulo={"linkedin"} nomeIcone={"linkedin"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   backgroundColor:"#FFFFFF",

  },
  title: {
    fontSize: 25,
    color: "#666599",
    fontWeight: "600",
    marginTop: 50,
    marginLeft: 10,
    marginBottom: 20,
  },
  conteudo: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: "justify",
    fontSize:16,
    color:"#585858",
    lineHeight:26,
  },

  row: {
    flexDirection: "row",
    marginTop:20,
  },

header:{
 backgroundColor:"#A9A7F4",
 height:316,
 shadowColor: "rgba(0, 0, 0, 0.9);",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4,
 borderBottomLeftRadius: 50,
 borderBottomRightRadius: 50,





  }
});
