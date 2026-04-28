import { StyleSheet, Platform } from "react-native";
import { Colors } from "./colorsBase";

export const getStyles = (width) => {
  const isWeb = width > 768;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    navBarDiv: {
      width: "100%",
      backgroundColor: Colors.black_gray,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: isWeb ? "row" : "column",
      gap: isWeb ? 30 : 0,
      paddingVertical: isWeb ? 0 : 0,
    },
    svgBar: {},
    image: {
      width: isWeb ? "10%" : "45%",
      marginTop: isWeb ? 0 : -15,
    },
    searchInput: {
      width: isWeb ? "100%" : "87%",
      color: Colors.subtext,
      borderWidth: 0,
      ...Platform.select({
        web: {
          outlineWidth: 0,
        },
      }),
      padding: 0,
    },
    searchDiv: {
      width: isWeb ? "50%" : "87%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      padding: 15,
      backgroundColor: Colors.gray,
      borderRadius: 5,
      marginVertical: isWeb ? 0 : 10,
      marginTop: isWeb ? 0 : -15,
    },
    border: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.light_grayBorder,
    },
    content: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      padding: 20,
    },
    titleDiv: {
      width: "95%",
      alignItems: "flex-start",
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: Colors.light_grayBorder,
      paddingBottom: 5,
    },
    title: {
      fontSize: 20,
      color: Colors.text,
      fontWeight: "500",
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "300",
      color: Colors.subtext,
    },
    description: {
      fontSize: 17,
      color: Colors.text,
      marginVertical: 17,
    },
    moreDiv: {
      width: "100%",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: Colors.light_grayBorder,
    },
    more: {
      fontSize: 17,
      color: Colors.primary,
      marginTop: 10,
      cursor: "pointer",
    },
    Terms_MainDiv: {
      width: "100%",
      flexDirection: "row", // Permite que os itens fiquem lado a lado
      flexWrap: "wrap", // Faz os itens "pularem" para a linha de baixo
      justifyContent: isWeb ? "flex-start" : "center", // Alinha à esquerda no PC
      paddingHorizontal: isWeb ? "2.5%" : 0, // Compensa as margens laterais no PC
    },
    TermsDiv: {
      // Se for Web, 30% garante 3 por linha com espaçamento. Se for Mobile, 95%.
      width: isWeb ? "31%" : "95%",
      backgroundColor: Colors.black_gray,
      height: "auto",
      borderRadius: 5,
      paddingHorizontal: 25,
      paddingVertical: 20,
      // Adicione margem lateral no PC para eles não colarem um no outro
      marginHorizontal: isWeb ? "1%" : 0,
      marginBottom: 15,
    },
    BotaoPagina: {
      color: "#299CD5",
      fontSize: 18,
      fontWeight: "bold",
    },
    TextoPaginacao: {
      color: "white",
      fontWeight: "bold",
    },
    Paginacao: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      minWidth: 40,
      alignItems: "center",
      borderRadius: 5,
    },
  });
};
