import { validateCPF } from "@/services/cpf-validate";
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
    .regex(/^\d{11}$/, "Telefone inválido")
    .nonempty("O telefone é obrigatório"),
  cpf_cli: z
    .string()
    .nonempty("CPF é obrigatório")
    .transform((cpf) => cpf.replace(/\D/g, ""))
    .refine((cpf) => validateCPF(cpf), {
      message: "CPF inválido",
    }),
  data_nascimento_cli: z
    .string()
    .min(10, "Data de nascimento inválida")
    .refine(
      (data) => {
        // Verifica se está no formato DD-MM-YYYY
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(data);
      },
      { message: "Formato de data inválido. Use DD-MM-YYYY" }
    )
    .refine(
      (data) => {
        const [dia, mes, ano] = data.split("/");
        const date = new Date(`${ano}-${mes}-${dia}`);
        return !isNaN(date.getTime());
      },
      { message: "Data de nascimento inválida" }
    )
    .refine(
      (data) => {
        const [dia, mes, ano] = data.split("/");
        const birthDate = new Date(`${ano}-${mes}-${dia}`);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          return age - 1 >= 18;
        }
        return age >= 18;
      },
      { message: "É necessário ser maior de 18 anos" }
    ),
  sexo_cli: z
    .string()
    .min(1, "Selecione o sexo")
    .nonempty("O sexo é obrigatório"),
  cep: z.string(),
  // .regex(/^\d{8}$/, { message: "O CEP deve conter 8 dígitos numéricos" }),
  logradouro: z
    .string()
    .min(2, { message: "O logradouro deve ter no mínimo 2 caracteres" })
    .max(70, { message: "O logradouro deve ter no máximo 70 caracteres" })
    .trim(),
  numero: z.string().nonempty({ message: "O campo numero é obrigatório" }),
  bairro: z
    .string()
    .min(2, { message: "O bairro deve ter no mínimo 2 caracteres" })
    .max(70, { message: "O bairro deve ter no máximo 70 caracteres" })
    .trim(),
  cidade: z
    .string()
    .min(2, { message: "A cidade deve ter no mínimo 2 caracteres" })
    .max(70, { message: "A cidade deve ter no máximo 70 caracteres" })
    .trim(),
  estado: z
    .string()
    .length(2, { message: "O estado deve ter 2 caracteres" })
    .trim()
    .toUpperCase(),
  complemento: z
    .string()
    .max(100, { message: "O complemento deve ter no máximo 100 caracteres" })
    .optional()
    .nullable()
    .default(""),
});

export type TypeNewClient = z.infer<typeof newClientSchema>;
