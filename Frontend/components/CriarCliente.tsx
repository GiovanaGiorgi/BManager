import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { criarCliente } from "@/api";
import { colors } from "@/theme";

export default function CriarCliente({ visible, onClose, onClienteCriado }: any) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erros, setErros] = useState<{ [key: string]: boolean }>({});
  const [tentouSalvar, setTentouSalvar] = useState(false);

  const handleSalvar = async () => {
    setTentouSalvar(true);
    const novoErros: any = {};
    if (!nome) novoErros.nome = true;
    if (!endereco) novoErros.endereco = true;
    if (Object.keys(novoErros).length > 0) {
      setErros(novoErros);
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      await criarCliente({ nome, endereco });
      setNome("");
      setEndereco("");
      onClienteCriado();
      onClose();
      alert("Cliente criado com sucesso!");
    } catch (error: any) {
      if (error.message === "Cliente idêntico já existe") {
        alert("Já existe um cliente com os mesmos dados.");
        setErros({ nome: true, endereco: true });
      } else {
        alert("Erro ao salvar");
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Novo Cliente</Text>
          <FloatingLabelInput
            label="Nome"
            value={nome}
            onChangeText={setNome}
            erro={tentouSalvar && erros.nome}
          />
          <FloatingLabelInput
            label="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            erro={tentouSalvar && erros.endereco}
          />

          <Pressable onPress={handleSalvar} style={styles.button}>
            <Text style={{ color: "white", textAlign: "center" }}>Salvar</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={{ color: "white", textAlign: "center" }}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#000000aa",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    justifyContent: "center",
    backgroundColor: colors.surface,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    width: "40%",
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
  },
});

