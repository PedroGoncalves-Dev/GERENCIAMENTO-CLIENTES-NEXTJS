"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const FormNewClient = () => {
  const newClientSchema = z.object({
    nome_cli: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    email_cli: z.string().email("O email deve ser vaiido"),
    telefone_cli: z.string(),
    cpf_cli: z.string(),
    data_nascimento_cli: z.string(),
  });

  type TypeNewClient = z.infer<typeof newClientSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TypeNewClient>({
    resolver: zodResolver(newClientSchema),
  });

  return (
    <form action="">
      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="nome">Nome completo:</label>
        <input
          type="text"
          id="nome"
          {...register("nome_cli")}
          className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
        />

        {errors.nome_cli && <span>{errors.nome_cli.message}</span>}
      </div>

      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email_cli")}
          required
          autoComplete="email"
          className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
        />

        {errors.email_cli && <span>{errors.email_cli.message}</span>}
      </div>

      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="telefone">Celular:</label>
        <input
          type="text"
          id="telefone"
          {...register("telefone_cli")}
          className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
        />

        {errors.telefone_cli && <span>{errors.telefone_cli.message}</span>}
      </div>

      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          {...register("cpf_cli")}
          className=" bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
        />

        {errors.cpf_cli && <span>{errors.cpf_cli.message}</span>}
      </div>
      <div className="w-full flex justify-center">
        <Button type="submit">Adicionar</Button>
      </div>
    </form>
  );
};

export default FormNewClient;
