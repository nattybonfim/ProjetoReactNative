import { StyleSheet } from "react-native";
import { Header } from "./componentes/Header";
import { IconeUser } from "./componentes/iconeUser";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Card } from "@rneui/base";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Habilidades() {
  const data = [
    {
      competencia: [
        {
          nome: "Profissional",
          itens: [
            {
              icone: "comment-dots",
              nomeTitulo: "Comunicação"
            },
            {
              icone: "clock",
              nomeTitulo: "Pontualidade"
            },
            {
              icone: "people-arrows",
              nomeTitulo: "Trabalho em equipe"
            }
          ]
        }
      ]
    },

    {
      competencia: [
        {
          nome: "Tecnica",
          itens: [
            {
              icone: "php",
              nomeTitulo: "PHP"
            },
            {
              icone: "react",
              nomeTitulo: "React Native"
            },
            {
              icone: "html5",
              nomeTitulo: "Html"
            }
          ]
        }
      ]
    }
  ];
  return (
    <View>
      <Header titulo={"Teste"} />

      {
      data.length >0 ?
      data.map((dta: any,j) => (
        <View key={j}>
          <Text style={styles.title}>{dta.competencia.nome}</Text>
          <Card containerStyle={styles.card}>

            {
             dta?.competencia?.itens?.length >0 ? 
            dta?.competencia?.itens?.map((item: any,i) => (
              <View style={styles.row} >
                <FontAwesome5 name={item.icone} size={50} color="#666599" />
                <Text style={styles.subTitulo}>{item.nomeTitulo}</Text>
              </View>
            )): null
          }
          </Card>
        </View>
      )):null
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666599",
    marginBottom: 17,
    marginTop: 20,
    marginLeft: 6,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  card: {
    elevation: 0,
    borderBottomRightRadius: 20,
    borderColor: "rgba(169, 167, 244, 0.44);",
    backgroundColor: "rgba(169, 167, 244, 0.44);",
    margin: 0,
  },

  row: {
    flexDirection: "row",
    backgroundColor: "rgba(169, 167, 244, 0.0);",
    alignItems: "center",
  },

  subTitulo: {
    color: "#666599",
    fontWeight: "700",
    marginLeft: 20,
    fontSize: 15,
  },
});
