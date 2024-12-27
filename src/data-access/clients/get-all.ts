export interface Iclients {
  id_cli: string;
  nome_cli: string;
  email_cli: string;
  telefone_cli: string;
  cpf_cli: string;
  data_nascimento_cli: string;
  status: boolean;
  criado_em: string;
  atualizado_em: string;
  valor_total_compras: number;
  quantidade_total_compras: number;
  sexo_cli: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string | null;
}
export async function getAllClients(): Promise<Iclients[]> {
  const res = await fetch("http://localhost:3333/clientes", {
    next: { tags: ["get-clients"] },
  });

  const resData = await res.json();
  if (resData.dados === null) {
    return [];
  }
  return resData.dados;
}
