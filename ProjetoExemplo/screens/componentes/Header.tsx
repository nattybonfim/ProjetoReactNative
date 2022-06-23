import { View } from "../../components/Themed";
import { StyleSheet, Text } from "react-native";
import React from "react";
import { IconeUser } from "./iconeUser";

export function Header({ titulo }: { titulo: any }) {
  return (
    <View>
      <IconeUser tamanho={70} />

      <View style={style.container}>
        <Text>{titulo}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 200,
    width: 359,
    marginTop: -30,

    backgroundColor: "#A9A7F4",
  },
});
