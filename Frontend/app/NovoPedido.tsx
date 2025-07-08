import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "@/components/Header";

export default function NovoPedido() {

  const clientInfo = {
    name: "João Silva",
    phone: "(11) 98765-4321",
    address: "Rua Exemplo, 123"
  };


  const selectedProducts = [
    { id: 1, name: "Produto A", price: 29.90, quantity: 2 },
    { id: 2, name: "Produto B", price: 15.50, quantity: 1 },
  ];
 

  const total = selectedProducts.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);

  return (
    <View style={styles.container}>
      <Header title="Novo Pedido" />
      

      <View style={styles.mainContent}>
        

        <View style={styles.leftSection}>
          <Text style={styles.sectionTitle}>Informação do cliente</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.orangeButton}>
              <Text style={styles.buttonText}>Buscar Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orangeButton}>
              <Text style={styles.buttonText}>Cadastrar Novo</Text>
            </TouchableOpacity>
          </View>


            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Nome: {clientInfo.name}</Text>
              <Text style={styles.infoText}>Telefone: {clientInfo.phone}</Text>
              <Text style={styles.infoText}>Endereço: {clientInfo.address}</Text>
            </View>
          
        </View>


        <View style={styles.middleSection}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          
          <TouchableOpacity style={styles.orangeButton}>
            <Text style={styles.buttonText}>Buscar Produtos</Text>
          </TouchableOpacity>

          <View style={styles.productList}>
            {selectedProducts.map(product => (
              <View key={product.id} style={styles.productItem}>
                <Text>{product.name}</Text>
                <Text>{product.quantity}x R${product.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>Total do Pedido:</Text>
            <Text style={styles.totalPrice}>R$ {total.toFixed(2)}</Text>
            
            <TouchableOpacity style={styles.orangeButton}>
              <Text style={styles.buttonText}>Confirmar Pedido</Text>
            </TouchableOpacity>
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
  buttonRow: {
    marginBottom: 15,   
  },
  orangeButton: {
    backgroundColor: '#F27A2F', 
    padding: 12,
    borderRadius: 8,    
    marginBottom: 10,   
    alignItems: 'center', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#f9f9f9', 
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    marginBottom: 8,    
  },
  productList: {
    marginTop: 10,      
  },
  productItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
  },
  summaryBox: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  summaryText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F27A2F',  
    textAlign: 'center',
    marginBottom: 20,
  },
});