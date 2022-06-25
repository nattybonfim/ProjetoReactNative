import { View,Text,StyleSheet, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Icone ({nomeIcone,titulo,url}:{nomeIcone:any,titulo:any,url:any}){
    return (
<View style={styles.container} onStartShouldSetResponder={() => Linking.openURL(url)}>

<FontAwesome5 name={nomeIcone} size={50} color="#8A7EBE" />
<Text style={styles.titulo}>{titulo} </Text>

</View>

    );
}

const styles=StyleSheet.create({
titulo:{
    color:"#8A7EBE",
    fontSize:12,
    fontWeight:"500",
    },

container:{
margin:10,
flex:1,
alignItems:"center",
width:70,

}
})