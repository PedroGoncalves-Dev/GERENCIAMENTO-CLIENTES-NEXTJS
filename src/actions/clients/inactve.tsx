"use server";

interface IpropsInativeClient {
  id: string;
}

export async function inativeClient(id: string) {
  if (!id) {
    throw new Error("ID do cliente não fornecido");
  }

  try {
    const res = await fetch(`http://localhost:3333/inativar-cliente/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (!resData.sucesso) {
      throw new Error(`Erro HTTP: ${resData.dados}`);
    }

    return resData.sucesso;
  } catch (error) {
    console.error("Erro detalhado:", error);
    throw new Error("Erro ao inativar o cliente");
  }
}
