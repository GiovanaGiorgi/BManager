import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/Header";
import ButtonHeader from "@/components/ButtonHeader";

export default function Clientes() {
  // dados mockados
  const clientes = [
    { id: 1, nome: "Maria Silva", crianca: "Sim", endereco: "Rua A, 123", taxa: "5%" },
    { id: 2, nome: "João Santos", crianca: "Não", endereco: "Av. B, 456", taxa: "10%" },
  ];

  // Funções para os botões (por enquanto vazias)
  const handleBuscar = () => console.log("Buscar clientes");
  const handleEditar = () => console.log("Editar cliente");
  const handleNovo = () => console.log("Novo cliente");

  return (
    <View style={styles.container}>
      <Header title="Clientes" />
      
      {/* Novo componente ButtonHeader */}
      <ButtonHeader
        buttons={[
          { label: "Buscar", onPress: handleBuscar },
          { label: "Editar", onPress: handleEditar },
          { label: "Novo", onPress: handleNovo },
        ]}
      />

      {/* Cabeçalho da tabela */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 2 }]}>Nome</Text>
        <Text style={styles.headerText}>Criança</Text>
        <Text style={[styles.headerText, { flex: 2 }]}>Endereço</Text>
        <Text style={styles.headerText}>Taxa</Text>
      </View>

      {/* Lista de clientes */}
      <ScrollView style={styles.listContainer}>
        {clientes.map(cliente => (
          <View key={cliente.id} style={styles.tableRow}>
            <Text style={[styles.cellText, { flex: 2 }]}>{cliente.nome}</Text>
            <Text style={styles.cellText}>{cliente.crianca}</Text>
            <Text style={[styles.cellText, { flex: 2 }]}>{cliente.endereco}</Text>
            <Text style={styles.cellText}>{cliente.taxa}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cellText: {
    flex: 1,
    textAlign: "center",
  },
});