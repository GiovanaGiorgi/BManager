import { Drawer } from "expo-router/drawer";
import { colors } from "@/theme";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.drawer,
          width: 280,
          paddingTop: 40,
        },
        drawerActiveBackgroundColor: colors.secondary,
        drawerActiveTintColor: colors.surface,
        drawerInactiveTintColor: colors.surface,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Início" }} />
      <Drawer.Screen name="Produtos" options={{ title: "Produtos" }} />
      <Drawer.Screen name="Clientes" />
      <Drawer.Screen name="Estoque" />
      <Drawer.Screen name="Relatorios" />
      <Drawer.Screen name="NovoPedido" options={{ title: "Novo Pedido" }} />
    </Drawer>
  );
}
