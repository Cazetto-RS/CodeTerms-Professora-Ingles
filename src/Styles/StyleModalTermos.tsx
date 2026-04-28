import { StyleSheet } from "react-native";
import { Colors } from "./colorsBase";

export const getStyles = (width) => {
  const isWeb = width > 768;

  return StyleSheet.create({
    containerDiv: {
      width: isWeb ? "40%" : "100%", // 40% no PC, 100% no Celular
      height: isWeb ? "80%" : "100%", // Um pouco menor no PC para aparecer o fundo
      backgroundColor: "#121212", // Cor de fundo do seu modal
      overflow: "hidden",
    },
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    title: {
      fontSize: 27,
      color: Colors.text,
      fontWeight: "500",
    },
    title2: {
      fontSize: 18,
      color: Colors.text,
      fontWeight: "400",
      marginBottom: 3,
    },
    subtitle: {
      fontSize: 17,
      fontWeight: "300",
      color: Colors.subtext,
    },
    svg: {
      marginLeft: 20,
      marginTop: 9,
    },
    svg2: {
      marginLeft: 10,
      marginTop: 7,
    },
    DivImage: {
      backgroundColor: Colors.black_gray,
      borderRadius: 5,
    },
    border: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.light_grayBorder,
    },
    image: {
      width: "100%",
      aspectRatio: 16 / 9,
      borderRadius: 10,
      maxHeight: isWeb ? 300 : 200,
      resizeMode: "contain",
    },
  });
};
