import { z } from "zod";

export const newClientSchema = z.object({
  nome_cli: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .nonempty("O nome é obrigatório")
    .refine((name) => name.trim().length > 0, {
      message: "O nome não pode conter apenas espaços em branco",
    }),
  email_cli: z
    .string()
    .email("O email deve ser válido")
    .nonempty("O email é obrigatório"),
  telefone_cli: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de telefone deve estar no formato (00) 00000-0000"
    )
    .nonempty("O telefone é obrigatório"),
  cpf_cli: z
    .string()
    .min(11, "O CPF deve ter 11 caracteres")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "O CPF deve estar no formato 000.000.000-00"
    )
    .nonempty("O CPF é obrigatório"),
  data_nascimento_cli: z
    .string()
    .min(8, "A data de nascimento inválida")
    .refine((data) => data.trim().length > 0, {
      message: "A data de nascimento é obrigatória",
    })
    .refine(
      (data) => {
        const date = new Date(data);
        return !isNaN(date.getTime());
      },
      { message: "A data de nascimento deve ser válida" }
    )
    .refine(
      (data) => {
        const birthDate = new Date(data);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      },
      { message: "É necessário ser maior de 18 anos" }
    ),
});

export type TypeNewClient = z.infer<typeof newClientSchema>;
