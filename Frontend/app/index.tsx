import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Header from "@/components/Header";
import { colors } from "@/theme";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header title="BManager" />

      <View style={styles.content}>
        <View style={styles.menuContainer}>
          <Link href="/NovoPedido" style={styles.menuItem}>
            <Text style={styles.menuText}>NOVO PEDIDO</Text>
          </Link>
          <Link href="/Clientes" style={styles.menuItem}>
            <Text style={styles.menuText}>CLIENTES</Text>
          </Link>
          <Link href="/Estoque" style={styles.menuItem}>
            <Text style={styles.menuText}>ESTOQUE</Text>
          </Link>
          <Link href="/Produtos" style={styles.menuItem}>
            <Text style={styles.menuText}>PRODUTOS</Text>
          </Link>
          <Link href="/Relatorios" style={styles.menuItem}>
            <Text style={styles.menuText}>RELATÓRIOS</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  content: {
    flex: 0.9,
    justifyContent: "center",
    paddingLeft: 200,
    paddingTop: 100,
  },
  menuContainer: {
    marginBottom: 40,
  },
  menuItem: {
    backgroundColor: colors.accent,
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderRadius: 20,
    width: 300,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.surface,
  },
});
