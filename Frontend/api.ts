const BASE_URL = "http://localhost:8000";

export const fetchProdutos = async () => {
  const response = await fetch(`${BASE_URL}/produtos`);
  if (!response.ok) throw new Error("Erro ao buscar produtos");
  return response.json();
};

export const criarProduto = async (produto: any) => {
  const res = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar produto");
  }

  return res.json();
};

export const editarProduto = async (id: number, dados: any) => {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
};

export const deletarProduto = async (id: number) => {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar produto");
};

export const fetchCategorias = async () => {
  const res = await fetch(`${BASE_URL}/categorias`);
  if (!res.ok) throw new Error("Erro ao buscar categorias");
  return res.json();
};

export const fetchProdutosPorCategoria = async (id: number) => {
  const res = await fetch(`${BASE_URL}/categorias/${id}/produtos`);
  if (!res.ok) throw new Error("Erro ao buscar produtos da categoria");
  return res.json();
};

// Clientes
export const fetchClientes = async () => {
  const res = await fetch(`${BASE_URL}/clientes`);
  if (!res.ok) throw new Error("Erro ao buscar clientes");
  return res.json();
};

export const criarCliente = async (cliente: any) => {
  const res = await fetch(`${BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar cliente");
  }
  return res.json();
};

export const editarCliente = async (id: number, dados: any) => {
  const res = await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error("Erro ao atualizar cliente");
  return res.json();
};

export const deletarCliente = async (id: number) => {
  const res = await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar cliente");
};
