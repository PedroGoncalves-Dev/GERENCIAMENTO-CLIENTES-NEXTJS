export interface Iclients {
  id_cli: string;
  nome_cli: string;
  email_cli: string;
  telefone_cli: string;
  cpf_cli: string;
  data_nascimento_cli: string;
  endreco_cli: string;
  status: boolean;
  criado_em: string;
  atualizado_em: string;
}
export async function getAllClients(): Promise<Iclients[]> {
  const res = await fetch("http://localhost:3333/clientes");

  const resData = await res.json();

  return resData.dados;
}
