"use server";

import { TypeNewClient } from "@/schema/clients/schema-create";
import { revalidateTag } from "next/cache";

export async function editClient(data: TypeNewClient, id: string) {
  const bodyJson = {
    nome_cli: data.nome_cli,
    email_cli: data.email_cli,
    telefone_cli: data.telefone_cli,
    cpf_cli: data.cpf_cli,
    data_nascimento_cli: data.data_nascimento_cli,
    sexo_cli: data.sexo_cli,
    endereco: {
      cep: data.cep,
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      complemento: data.complemento,
    },
  };
  try {
    const res = await fetch(`http://localhost:3333/atualizar-cliente/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });

    const resData = await res.json();

    console.log(data);
    if (resData.sucesso) {
      revalidateTag("get-clients");
      return resData.sucesso;
    }
  } catch (error) {
    console.error("Erro detalhado:", error);
    return false;
  }
}
