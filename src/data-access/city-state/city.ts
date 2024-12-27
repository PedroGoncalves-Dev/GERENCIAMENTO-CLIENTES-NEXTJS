export interface Icity {
  id: number;
  nome: string;
}

export async function getAllCitys(UF: string): Promise<Icity[]> {
  const res = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`,
    {
      next: { tags: ["get-citys"] },
    }
  );

  return res.json();
}
