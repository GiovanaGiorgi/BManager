import Header from "@/components/Header";
import { View, Text, StyleSheet } from "react-native";

export default function Estoque() {
  return (
    <View style={styles.container}>
      <Header title="Estoque" />
      
      <View style={styles.mainContent}>
        <View style={styles.leftSection}>
          <Text style={styles.sectionTitle}>Financeiro</Text>
        </View>

        <View style={styles.middleSection}>
          <Text style={styles.sectionTitle}>Históricos</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.sectionTitle}>Ranking</Text>
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
    flexDirection: 'row',
    padding: 10,
  },
  leftSection: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
  },
  middleSection: {
    flex: 2,
    padding: 10,
    borderRightWidth: 1,
  },
  rightSection: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});


