import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getStyles } from "../Styles/StyleModalTermos";
import * as Clipboard from "expo-clipboard";
import YoutubePlayer from "react-native-youtube-iframe";
import * as Speech from "expo-speech";
// import YoutubeIframe from 'react-native-youtube-iframe';

export default function ModalTermos({ visivel, fechar, termo }) {
  const { width } = useWindowDimensions();
  const [erro, setErro] = useState(false);
  const styles = getStyles(width);
  const isWeb = width > 768;

  if (!termo) return null;

  const copiarParaAreaDeTransferencia = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  const renderizarExemplos = () => {
    // Verificamos se existem exemplos
    if (!termo.exemplo || !termo.exemplo.pt || !termo.exemplo.en) return null;

    // Criamos um array unido
    const listaExemplos = [];

    // Assumindo que a quantidade é a mesma nas duas listas
    termo.exemplo.pt.forEach((frasePt, index) => {
      listaExemplos.push({ pt: frasePt, en: termo.exemplo.en[index] });
    });

    return listaExemplos.map((item, index) => (
      <View
        key={index}
        style={{
          marginBottom: 15,
          alignSelf: "flex-start",
          marginLeft: 0,
          width: "100%",
        }}
      >
        <Text style={[styles.subtitle, { color: "#e4edf2" }]}>
          PT : <Text style={styles.subtitle}>{item.pt}</Text>
        </Text>
        <Text style={[styles.subtitle, { color: "#e4edf2" }]}>
          EN : <Text style={styles.subtitle}>{item.en}</Text>
        </Text>
      </View>
    ));
  };

  const falarPalavra = (texto) => {
    // Verificamos se o texto existe
    if (texto) {
      Speech.speak(texto, {
        language: "en-US", // Ou 'pt-BR' se quiser pronúncia em português
        pitch: 1.0, // Tom da voz (1.0 é o normal)
        rate: 0.5, // Velocidade (um pouco mais lento ajuda na compreensão)
      });
    }
  };

  return (
    <Modal
      visible={visivel}
      animationType="fade"
      transparent={true}
      onRequestClose={fechar}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Preto com 70% de opacidade
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.containerDiv}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: "flex-start" }}
          >
            <View style={{ padding: 30, width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.title}>{termo.termo}</Text>
                  <TouchableOpacity onPress={() => falarPalavra(termo.termo)}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 12"
                      style={styles.svg}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.818 0.562728C12.9094 0.471435 13.0333 0.420157 13.1625 0.420157C13.2917 0.420157 13.4156 0.471435 13.507 0.562728L13.5089 0.564028L13.5109 0.565978L13.5167 0.572478C13.5449 0.600269 13.5718 0.629333 13.5973 0.659578C13.6487 0.717428 13.7195 0.801278 13.8027 0.909828C13.9698 1.12628 14.1888 1.44478 14.4066 1.85883C14.8421 2.68693 15.275 3.90178 15.275 5.45723C15.275 7.01268 14.8421 8.22753 14.4066 9.05628C14.2331 9.38946 14.0311 9.70699 13.8027 10.0053C13.7129 10.1221 13.6175 10.2344 13.5167 10.342L13.5102 10.3485L13.5089 10.3504L13.5076 10.3511L13.1625 10.0072L13.507 10.3517C13.4151 10.4406 13.292 10.4898 13.1642 10.4887C13.0363 10.4877 12.914 10.4365 12.8236 10.3461C12.7332 10.2558 12.6818 10.1335 12.6807 10.0057C12.6795 9.87788 12.7286 9.75471 12.8173 9.66273L12.8264 9.65363L12.8674 9.60813C12.906 9.56566 12.9601 9.49979 13.0299 9.41053C13.1677 9.23113 13.3549 8.96008 13.5434 8.60193C13.9204 7.88693 14.3 6.82678 14.3 5.45723C14.3 4.08768 13.9204 3.02753 13.5434 2.31253C13.3954 2.02896 13.2236 1.75845 13.0299 1.50393C12.9654 1.42017 12.8975 1.33907 12.8264 1.26083L12.8173 1.25173C12.7261 1.16032 12.6748 1.03642 12.6748 0.907228C12.6748 0.77804 12.7267 0.654134 12.818 0.562728ZM7.66155 0.189628C8.4175 -0.308922 9.425 0.233828 9.425 1.13928V10.4252C9.425 11.3313 8.4175 11.8734 7.66155 11.3748L3.76155 8.80408C3.73517 8.78648 3.70421 8.77699 3.6725 8.77678H1.7875C1.31343 8.77678 0.858768 8.58845 0.523547 8.25323C0.188325 7.91801 0 7.46335 0 6.98928V4.57518C0 4.34044 0.046235 4.108 0.136065 3.89113C0.225896 3.67426 0.357562 3.47721 0.523547 3.31122C0.689531 3.14524 0.886584 3.01357 1.10345 2.92374C1.32032 2.83391 1.55276 2.78768 1.7875 2.78768H3.6725C3.70437 2.78778 3.73556 2.77851 3.7622 2.76103L7.66155 0.189628Z"
                        fill="#e4edf2"
                      />
                    </svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => copiarParaAreaDeTransferencia(termo.termo)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 13"
                      style={styles.svg2}
                    >
                      <path
                        d="M2.33997 6.10805C2.33997 4.33615 2.33997 3.4502 2.88792 2.89965C3.43652 2.3491 4.31857 2.3491 6.08396 2.3491H7.95597C9.72071 2.3491 10.6034 2.3491 11.1514 2.89965C11.7 3.4502 11.7 4.33615 11.7 6.10805V9.24105C11.7 11.0129 11.7 11.8989 11.1514 12.4494C10.6034 13 9.72071 13 7.95597 13H6.08396C4.31857 13 3.43652 13 2.88792 12.4494C2.33932 11.8989 2.33997 11.0129 2.33997 9.24105V6.10805Z"
                        fill="#e4edf2"
                      />
                      <path
                        opacity="0.5"
                        d="M0.7618 0.7618C-7.7486e-08 1.52295 0 2.74885 0 5.2V6.5C0 8.95115 -7.7486e-08 10.177 0.7618 10.9382C1.16285 11.3399 1.69325 11.5297 2.4648 11.6194C2.34 11.0734 2.34 10.322 2.34 9.2404V6.10805C2.34 4.33615 2.34 3.4502 2.88795 2.89965C3.43655 2.3491 4.3186 2.3491 6.084 2.3491H7.956C9.0298 2.3491 9.776 2.3491 10.3207 2.4726C10.231 1.69715 10.0412 1.1648 9.6382 0.7618C8.87705 -7.7486e-08 7.65115 0 5.2 0C2.74885 0 1.52295 -7.7486e-08 0.7618 0.7618Z"
                        fill="#e4edf2"
                      />
                    </svg>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={fechar}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      style={styles.svg2}
                    >
                      <path
                        d="M1.10833 11.0833L0 9.975L4.43333 5.54167L0 1.10833L1.10833 0L5.54167 4.43333L9.975 0L11.0833 1.10833L6.65 5.54167L11.0833 9.975L9.975 11.0833L5.54167 6.65L1.10833 11.0833Z"
                        fill="#56575B"
                      />
                    </svg>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.subtitle}>{termo.silabas}</Text>
            </View>
            <View style={{ paddingHorizontal: 30, width: "100%" }}>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.title2}>Tradução</Text>
                <Text style={styles.subtitle}>{termo.traducao}</Text>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.title2}>Descrição</Text>
                <Text style={styles.subtitle}>{termo.definicao}</Text>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={[styles.title2, { marginBottom: -15 }]}>
                  Exemplos
                </Text>
                <Text style={styles.subtitle}> {renderizarExemplos()}</Text>
              </View>
              <View style={{ marginBottom: 20, marginTop: -10 }}>
                <Text style={styles.title2}>Sinônimos</Text>
                <Text style={styles.subtitle}>
                  {termo.sinonimos.join(", ")}
                </Text>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.title2}>Antônimos</Text>
                <Text style={styles.subtitle}>
                  {termo.antonimos.join(", ")}
                </Text>
              </View>
              <View style={{ marginBottom: 20, width: "100%" }}>
                <Text style={[styles.title2, { width: "100%" }]}>Imagem</Text>
                <Image
                  source={{ uri: termo.imagem }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
