import { useState, useEffect } from "react";
import { fetchClientes } from "@/api";

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = async () => {
    setCarregando(true);
    try {
      const data = await fetchClientes();
      setClientes(data);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return { clientes, setClientes, carregando, carregar };
}

export default useClientes;
