import Header from "@/components/Header";
import { View, Text, StyleSheet, TouchableOpacity, Picker } from "react-native";

export default function Estoque() {
  return (
    <View style={styles.container}>
      <Header title="Estoque" />

      <View style={styles.mainContent}>
        <View style={styles.leftSection}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.orangeButton}>
              <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orangeButton}>
              <Text style={styles.buttonText}>Categorias</Text>
            </TouchableOpacity>
          </View>

          <Picker style={styles.dropdown}>
            <Picker.Item label="Classifique a Alteracão"/>
            <Picker.Item label="Novos Itens"/>
            <Picker.Item label="Correção" />
          </Picker>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.sectionTitle}>Listagem de Produtos</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableColumn}>Produto</Text>
            <Text style={styles.tableColumn}>Custo</Text>
            <Text style={styles.tableColumn}>Estoque Atual</Text>
            <Text style={styles.tableColumn}>Movimentação</Text>
            <Text style={styles.tableColumn}>Qtd Final</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Italianinha</Text>
            <Text style={styles.tableCell}>R$ 10,00</Text>
            <Text style={styles.tableCell}>5</Text>
            <Text style={styles.tableCell}>+5</Text>
            <Text style={styles.tableCell}>10</Text>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  leftSection: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
  },
  rightSection: {
    flex: 3,
    padding: 10,
  },
  buttonRow: {
    marginBottom: 15,
  },
  orangeButton: {
    backgroundColor: "#F27A2F",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdown: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableColumn: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});


