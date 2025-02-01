"use server";

import { TypeNewClient } from "@/schema/clients/schema-create";
import { revalidateTag } from "next/cache";
import { ActionDispatch } from "react";

export async function createClient(formData: TypeNewClient) {
  try {
    // Validação de campos no servidor (opcional)
    if (
      !formData.nome_cli ||
      !formData.email_cli ||
      !formData.telefone_cli ||
      !formData.cpf_cli ||
      !formData.data_nascimento_cli
    ) {
      return false;
    }
    console.log(formData);
    const dataCleint = {
      nome_cli: formData.nome_cli,
      email_cli: formData.email_cli,
      telefone_cli: formData.telefone_cli,
      cpf_cli: formData.cpf_cli,
      data_nascimento_cli: formData.data_nascimento_cli,
      sexo_cli: formData.sexo_cli,
      endereco: {
        cep: formData.cep,
        logradouro: formData.logradouro,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        complemento: formData.complemento,
      },
    };
    console.log(dataCleint);

    const res = await fetch(
      "https://api-gerenciamento-cliente-nodejs-1.onrender.com/clientes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataCleint),
      }
    );
    if (!res.ok) {
      throw new Error(`Erro ao cadastrar cliente: ${res.statusText}`);
    }

    const resData = await res.json();

    if (resData.sucesso) {
      revalidateTag("get-clients");

      return resData.sucesso;
    } else {
      console.log("erro");
    }
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
  }
}
