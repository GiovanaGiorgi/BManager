import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity} from "react-native";
import Header from "@/components/Header";
import ButtonHeader from "@/components/ButtonHeader";
import { useProdutos } from "../lib/hooks/useProdutos";
import CriarProduto from "../components/CriarProduto";
import EditarProduto from "../components/EditarProduto";
import { useEffect, useState } from "react";
import { deletarProduto, fetchCategorias, fetchProdutosPorCategoria} from "@/api";
import { Picker } from "@react-native-picker/picker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Produtos() {
  
  const { produtos, setProdutos, carregando, carregar } = useProdutos();
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (error) {
        alert("Erro ao carregar categorias");
      }
    };
    carregarCategorias();
  }, []);

  const handleDeletarProduto = async () => {
    if (!produtoSelecionado) {
      alert("Selecione um produto para deletar");
      return;
    }

    const confirmar = confirm("Tem certeza que deseja deletar este produto?");
    if (!confirmar) return;

    try {
      await deletarProduto(produtoSelecionado.id);
      alert("Produto deletado com sucesso!");
      setProdutoSelecionado(null);

      if (categoriaSelecionada === "") {
        //para considerar o filtro de categoria antes de recarregar a pg
        carregar();
      } else {
        const produtosFiltrados = await fetchProdutosPorCategoria(
          Number(categoriaSelecionada)
        );
        setProdutos(produtosFiltrados);
      }
    } catch (error) {
      alert("Erro ao deletar produto");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Produtos" />
      <ButtonHeader
        buttons={[
          {
            label: "Novo Produto",
            onPress: () => setModalVisible(true),
            icon: <FontAwesome6 name="plus" size={16} color="black" />,
          },
          {
            customElement: (
              <View style={styles.categoriaDropdown}>
                <FontAwesome6
                  name="filter"
                  size={16}
                  color="black"
                  style={{ marginRight: 6 }}
                />
                <Picker
                  selectedValue={categoriaSelecionada}
                  onValueChange={async (valor) => {
                    setCategoriaSelecionada(valor);
                    if (valor === "") {
                      carregar();
                    } else {
                      const produtos = await fetchProdutosPorCategoria(
                        Number(valor)
                      );
                      setProdutos(produtos);
                    }
                  }}
                  style={{ width: 100, height: 20 }}
                >
                  <Picker.Item label="Todas" value="" />
                  {categorias.map((cat: any) => (
                    <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                  ))}
                </Picker>
              </View>
            ),
          },
          {
            label: "Editar",
            onPress: () => {
              if (!produtoSelecionado)
                return alert("Selecione um produto primeiro");
              setModalEditarVisivel(true);
            },
            icon: <FontAwesome6 name="pen" size={16} color="black" />,
          },
          {
            label: "Deletar",
            onPress: handleDeletarProduto,
            icon: <FontAwesome6 name="trash" size={16} color="black" />,
          },
        ]}
      />

      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 2 }]}>Produto</Text>
        <Text style={styles.headerCell}>Categoria</Text>
        <Text style={styles.headerCell}>Custo</Text>
        <Text style={styles.headerCell}>Venda</Text>
        <Text style={styles.headerCell}>Estoque</Text>
      </View>

      {carregando ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.listContainer}>
          {produtos.map((produto: any, index: number) => (
            <TouchableOpacity
              key={produto.id}
              onPress={() => {
                if (produtoSelecionado?.id === produto.id) {
                  setProdutoSelecionado(null);
                } else {
                  setProdutoSelecionado(produto);
                }
              }}
              style={[
                styles.tableRow,
                index % 2 === 0 && { backgroundColor: "#fafafa" },
                produtoSelecionado?.id === produto.id && {
                  backgroundColor: "#e0f7fa",
                },
              ]}
            >
              <Text style={[styles.cell, { flex: 2 }]}>{produto.nome}</Text>
              <Text style={styles.cell}>{produto.categoria?.nome || "-"}</Text>
              <Text style={styles.cell}>{produto.custo}</Text>
              <Text style={styles.cell}>{produto.valor}</Text>
              <Text style={styles.cell}>{produto.qntEstoque}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <CriarProduto
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onProdutoCriado={async () => {
          if (categoriaSelecionada === "") {
            carregar();
          } else {
            const produtosFiltrados = await fetchProdutosPorCategoria(
              Number(categoriaSelecionada)
            );
            setProdutos(produtosFiltrados);
          }
        }}
      />

      <EditarProduto
        visible={modalEditarVisivel}
        onClose={() => setModalEditarVisivel(false)}
        produto={produtoSelecionado}
        onAtualizado={async () => {
          if (categoriaSelecionada === "") {
            carregar();
          } else {
            const produtosFiltrados = await fetchProdutosPorCategoria(
              Number(categoriaSelecionada)
            );
            setProdutos(produtosFiltrados);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },

  categoriaDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  listContainer: { flex: 1, paddingHorizontal: 12, paddingTop: 10 },
});
