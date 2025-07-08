import { useState, useEffect } from "react";
import { fetchProdutos } from "@/api";

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    setCarregando(true);
    try {
      const data = await fetchProdutos();
      setProdutos(data);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return { produtos, setProdutos, carregando, carregar };
}
export default useProdutos;
