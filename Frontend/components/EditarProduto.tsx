import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { editarProduto } from "@/api";
import FloatingLabelInput from "./FloatingLabelInput";
import SelectCategoria from "./SelectCategoria";
import { colors } from "@/theme";

export default function EditarProduto({
  visible,
  onClose,
  produto,
  onAtualizado,
}: any) {
  
  const [nome, setNome] = useState("");
  const [custo, setCusto] = useState("");
  const [valor, setValor] = useState("");
  const [qntEstoque, setEstoque] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [erros, setErros] = useState<{ [key: string]: boolean }>({});
  const [tentouSalvar, setTentouSalvar] = useState(false);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome || "");
      setCusto(produto.custo?.toString() || "");
      setValor(produto.valor?.toString() || "");
      setEstoque(produto.qntEstoque?.toString() || "");
      setIdCategoria(produto.idCategoria?.toString() || "");
      setErros({});
      setTentouSalvar(false);
    }
  }, [produto]);

  const handleSalvar = async () => {
    setTentouSalvar(true);

    const novoErros: any = {};
    if (!nome) novoErros.nome = true;
    if (!custo) novoErros.custo = true;
    if (!valor) novoErros.valor = true;
    if (!qntEstoque) novoErros.qntEstoque = true;
    if (!idCategoria) novoErros.idCategoria = true;

    if (Object.keys(novoErros).length > 0) {
      setErros(novoErros);
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await editarProduto(produto.id, {
        nome,
        custo: parseFloat(custo),
        valor: parseFloat(valor),
        qntEstoque: parseInt(qntEstoque),
        idCategoria: parseInt(idCategoria),
      });

      setNome("");
      setCusto("");
      setValor("");
      setEstoque("");
      setIdCategoria("");

      onAtualizado();
      onClose();
      alert("Produto atualizado com sucesso!");
    } catch (error: any) {
      alert("Erro ao atualizar");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Editar Produto
          </Text>

          <FloatingLabelInput
            label="Nome"
            value={nome}
            onChangeText={setNome}
            erro={tentouSalvar && erros.nome}
          />
          <FloatingLabelInput
            label="Preço Custo"
            value={custo}
            onChangeText={setCusto}
            erro={tentouSalvar && erros.custo}
          />
          <FloatingLabelInput
            label="Preço Venda"
            value={valor}
            onChangeText={setValor}
            erro={tentouSalvar && erros.valor}
          />
          <FloatingLabelInput
            label="Estoque"
            value={qntEstoque}
            onChangeText={setEstoque}
            erro={tentouSalvar && erros.qntEstoque}
          />
          <SelectCategoria
            value={idCategoria}
            onChange={setIdCategoria}
            erro={tentouSalvar && erros.idCategoria}
          />

          <Pressable onPress={handleSalvar} style={styles.button}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
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
    minHeight: "55%",
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
  buttonText: {
    color: colors.surface,
    textAlign: "center",
  },
});
