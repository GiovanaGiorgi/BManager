import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";
import { fetchCategorias } from "@/api";

interface Props {
  value: string;
  onChange: (id: string) => void;
  erro?: boolean;
}

export default function SelectCategoria({ value, onChange, erro }: Props) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias()
      .then(setCategorias)
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Categoria</Text>
      <View
        style={[
          styles.pickerContainer,
          erro && { borderColor: "red" }
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria..." value="" />
          {categorias.map((cat: any) => (
            <Picker.Item key={cat.id} label={cat.nome} value={cat.id.toString()} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 10 },
  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6 ,
    overflow: "hidden",
  },
  picker: {
    height: 35,
    width: "100%",
  },
});
