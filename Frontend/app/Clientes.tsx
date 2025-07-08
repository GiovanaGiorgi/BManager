import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import Header from "@/components/Header";
import ButtonHeader from "@/components/ButtonHeader";
import CriarCliente from "../components/CriarCliente";
import EditarCliente from "../components/EditarCliente";
import { useClientes } from "../lib/hooks/useClientes";
import { deletarCliente } from "@/api";
import { colors } from "@/theme";
import { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Clientes() {
  const { clientes, carregando, carregar } = useClientes();
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);
  const [modalNovoVisivel, setModalNovoVisivel] = useState(false);
  const [modalEditarVisivel, setModalEditarVisivel] = useState(false);

  const handleDeletar = async () => {
    if (!clienteSelecionado) {
      alert("Selecione um cliente para deletar");
      return;
    }
    const confirmar = confirm("Tem certeza que deseja deletar este cliente?");
    if (!confirmar) return;
    try {
      await deletarCliente(clienteSelecionado.id);
      alert("Cliente deletado com sucesso!");
      setClienteSelecionado(null);
      carregar();
    } catch (error) {
      alert("Erro ao deletar cliente");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Clientes" />
      <ButtonHeader
        buttons={[
          {
            label: "Novo Cliente",
            onPress: () => setModalNovoVisivel(true),
            icon: <FontAwesome6 name="plus" size={16} color="black" />,
          },
          {
            label: "Editar",
            onPress: () => {
              if (!clienteSelecionado) return alert("Selecione um cliente primeiro");
              setModalEditarVisivel(true);
            },
            icon: <FontAwesome6 name="pen" size={16} color="black" />,
          },
          {
            label: "Deletar",
            onPress: handleDeletar,
            icon: <FontAwesome6 name="trash" size={16} color="black" />,
          },
        ]}
      />

      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 2 }]}>Nome</Text>
        <Text style={[styles.headerText, { flex: 3 }]}>Endereço</Text>
      </View>

      {carregando ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={styles.listContainer}>
          {clientes.map((cliente: any, index: number) => (
            <TouchableOpacity
              key={cliente.id}
              onPress={() => {
                if (clienteSelecionado?.id === cliente.id) {
                  setClienteSelecionado(null);
                } else {
                  setClienteSelecionado(cliente);
                }
              }}
              style={[
                styles.tableRow,
                index % 2 === 0 && { backgroundColor: "#fafafa" },
                clienteSelecionado?.id === cliente.id && { backgroundColor: "#e0f7fa" },
              ]}
            >
              <Text style={[styles.cellText, { flex: 2 }]}>{cliente.nome}</Text>
              <Text style={[styles.cellText, { flex: 3 }]}>{cliente.endereco}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <CriarCliente
        visible={modalNovoVisivel}
        onClose={() => setModalNovoVisivel(false)}
        onClienteCriado={carregar}
      />

      <EditarCliente
        visible={modalEditarVisivel}
        onClose={() => setModalEditarVisivel(false)}
        cliente={clienteSelecionado}
        onAtualizado={carregar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: { fontWeight: "bold", flex: 1, textAlign: "center" },
  listContainer: { flex: 1, paddingHorizontal: 8 },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cellText: { flex: 1, textAlign: "center" },
});
