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
      console.log("Campos obrigatórios ausentes");
    }
    console.log(formData);
    const dataCleint = {
      nome_cli: formData.nome_cli,
      email_cli: formData.email_cli,
      telefone_cli: formData.telefone_cli,
      cpf_cli: formData.cpf_cli,
      data_nascimento_cli: formData.data_nascimento_cli,
    };
    console.log(dataCleint);

    const res = await fetch("http://localhost:3333/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCleint),
    });
    if (!res.ok) {
      console.log(`Erro ao cadastrar cliente: ${res.statusText}`);
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
