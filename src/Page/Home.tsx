import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import ModalTermos from "./ModalTermos";
import React, { useEffect, useState } from "react";
import { TermsService } from "../server/apiService.js";
import { getStyles } from "../Styles/StyleHome";

export default function () {
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  // 1. Configuração de Itens por Página
  const itensPorPagina = width < 768 ? 5 : 9;

  const [termos, setTermos] = useState([]);
  const [termosMestres, setTermosMestres] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("relevancia");
  const [termoSelecionado, setTermoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  let timer: NodeJS.Timeout;

  // Busca de dados
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await TermsService.getTerms();
        setTermosMestres(data);
        setTermos(data.filter((item) => !item.is_hidden));
      } catch (error) {
        console.error("Erro ao buscar termos:", error);
      }
    }
    fetchData();
  }, []);

  // Busca com debounce
  const handleSearch = (texto: string) => {
    setBusca(texto);
    setPaginaAtual(1); // Reseta para a página 1 ao buscar
    clearTimeout(timer);
    timer = setTimeout(() => {
      const base = texto.length === 0 
        ? termosMestres.filter((t) => !t.is_hidden)
        : termosMestres.filter((item) => item.termo.toLowerCase().includes(texto.toLowerCase()));
      setTermos(base);
    }, 300);
  };

  // Ordenação
  const termosOrdenados = [...termos].sort((a, b) => {
    if (ordem === "az") return a.traducao.localeCompare(b.traducao);
    if (ordem === "za") return b.traducao.localeCompare(a.traducao);
    return a.id - b.id;
  });

  // 2. Lógica da Janela de Itens (Paginação dos Cards)
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensPaginados = termosOrdenados.slice(indicePrimeiroItem, indiceUltimoItem);

  const totalPaginas = Math.ceil(termosOrdenados.length / itensPorPagina);

  // 3. Lógica para mostrar no máximo 5 números na barra
  const getNumerosPagina = () => {
    const maxBotoes = 5;
    let start = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
    let end = start + maxBotoes - 1;

    if (end > totalPaginas) {
      end = totalPaginas;
      start = Math.max(1, end - maxBotoes + 1);
    }

    const paginas = [];
    for (let i = start; i <= end; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  const abrirModal = (termo) => {
    setTermoSelecionado(termo);
    setModalVisivel(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <View style={{ width: "100%", alignItems: "center" }}>
        
        {/* Header e Busca */}
        <View style={styles.navBarDiv}>
          <Image source={require("../../assets/Logo.png")} resizeMode="contain" style={styles.image} />
          <View style={[styles.searchDiv, styles.border]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar no Dicionário..."
              value={busca}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={[styles.titleDiv, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
            <Text style={styles.title}>Buscar no dicionário</Text>
            <select
              value={ordem}
              onChange={(e) => { setOrdem(e.target.value); setPaginaAtual(1); }}
              style={{ backgroundColor: "#1A1B1F", color: "#e4edf2", borderRadius: 5, padding: 5, fontSize: 14 }}
            >
              <option value="relevancia">Relevância</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </View>

          {/* Listagem dos Cards Paginados */}
          <View style={styles.Terms_MainDiv}>
            {itensPaginados.map((item) => (
              <View key={item.id} style={[styles.TermsDiv, styles.border, { marginBottom: 15 }]}>
                <Text style={styles.title}>{item.termo}</Text>
                <Text style={styles.subtitle}>{item.traducao}</Text>
                <Text style={styles.description}>
                  {item.definicao.length > 70 ? `${item.definicao.substring(0, 70)}...` : item.definicao}
                </Text>
                <View style={styles.moreDiv}>
                  <TouchableOpacity onPress={() => abrirModal(item)} style={styles.moreDiv}>
                    <Text style={styles.more}>Ver mais</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Barra de Navegação das Páginas (Máximo 5 botões) */}
          {totalPaginas > 1 && (
            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 40, gap: 10, alignItems: 'center' }}>
              
              {paginaAtual >= 1 && (
                <TouchableOpacity onPress={() => setPaginaAtual(paginaAtual - 1)}>
                  <Text style={styles.BotaoPagina}>{"<"}</Text>
                </TouchableOpacity>
              )}

              {getNumerosPagina().map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => setPaginaAtual(num)}
                  style={[styles.Paginacao, {backgroundColor: paginaAtual === num ? "#299CD5" : "#1A1B1F",}]}
                >
                  <Text style={styles.TextoPaginacao}>{num}</Text>
                </TouchableOpacity>
              ))}

              {paginaAtual <= totalPaginas && (
                <TouchableOpacity onPress={() => setPaginaAtual(paginaAtual + 1)}>
                  <Text style={styles.BotaoPagina}>{">"}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <ModalTermos
            visivel={modalVisivel}
            fechar={() => setModalVisivel(false)}
            termo={termoSelecionado}
          />
        </View>
      </View>
    </ScrollView>
  );
}