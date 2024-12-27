export interface Istate {
  id: number;
  sigla: string;
}

export async function getAllStates(): Promise<Istate[]> {
  const res = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
    {
      cache: "force-cache",
      next: { tags: ["get-states"] },
    }
  );

  return res.json();
}
