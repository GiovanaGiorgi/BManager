import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#f19f5e",
          width: 280,
          paddingTop: 40,
        },
        drawerActiveBackgroundColor: "#f97f20",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
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
