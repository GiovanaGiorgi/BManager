import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { editarCliente } from "@/api";
import { colors } from "@/theme";

export default function EditarCliente({ visible, onClose, cliente, onAtualizado }: any) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erros, setErros] = useState<{ [key: string]: boolean }>({});
  const [tentouSalvar, setTentouSalvar] = useState(false);

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome || "");
      setEndereco(cliente.endereco || "");
      setErros({});
      setTentouSalvar(false);
    }
  }, [cliente]);

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
      await editarCliente(cliente.id, { nome, endereco });
      onAtualizado();
      onClose();
      alert("Cliente atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Editar Cliente</Text>
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
            <Text style={{ color: "white", textAlign: "center" }}>Atualizar</Text>
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

