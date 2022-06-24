import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "@rneui/base";
export function IconeUser ({tamanho}:{tamanho:any}) {
    return(
 
 <Avatar
              size={100}
              containerStyle={[style.borderRadius, { width:tamanho,height:tamanho} ]}
              rounded
              source={require('../../assets/images/foto.png')}
           
            />
  
    );
}

const style=StyleSheet.create({
    borderRadius:{
        borderRadius:100,
        borderWidth:5,
        borderColor:"#666599",
        position:"relative",
        
       

    }

}
)