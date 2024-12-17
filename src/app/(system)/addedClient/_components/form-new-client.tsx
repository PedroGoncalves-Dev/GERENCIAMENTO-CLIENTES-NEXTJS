"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IMaskInput } from "react-imask";
import { createClient } from "@/actions/clients/create";
import { newClientSchema, TypeNewClient } from "@/schema/clients/schema-create";

const FormNewClient = () => {
  const [sucesso, setSucesso] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TypeNewClient>({
    resolver: zodResolver(newClientSchema),
    defaultValues: {
      nome_cli: "",
      email_cli: "",
      telefone_cli: "",
      cpf_cli: "",
      data_nascimento_cli: "",
    },
  });

  const onSubmit = async (data: TypeNewClient) => {
    try {
      // Remover a máscara dos campos antes de enviar
      const cleanedData = {
        ...data,
        telefone_cli: data.telefone_cli.replace(/\D/g, ""), // Remove caracteres não numéricos
        cpf_cli: data.cpf_cli.replace(/\D/g, ""), // Remove caracteres não numéricos
      };

      const res = await createClient(cleanedData);

      if (res) {
        reset();
      }
    } catch (error) {
      console.log("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="nome">Nome completo:</label>
        <Controller
          name="nome_cli"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome completo"
              {...field}
              className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
            />
          )}
        />
        {errors.nome_cli && <span>{errors.nome_cli.message}</span>}
      </div>

      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="email">Email:</label>
        <Controller
          name="email_cli"
          control={control}
          render={({ field }) => (
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              {...field}
              className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
            />
          )}
        />
        {errors.email_cli && <span>{errors.email_cli.message}</span>}
      </div>

      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="telefone">Celular:</label>
        <Controller
          name="telefone_cli"
          control={control}
          render={({ field }) => (
            <IMaskInput
              mask="(00) 00000-0000"
              {...field}
              placeholder="(00) 00000-0000"
              className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
            />
          )}
        />
        {errors.telefone_cli && <span>{errors.telefone_cli.message}</span>}
      </div>

      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="cpf">CPF:</label>
        <Controller
          name="cpf_cli"
          control={control}
          render={({ field }) => (
            <IMaskInput
              mask="000.000.000-00"
              {...field}
              placeholder="000.000.000-00"
              className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
            />
          )}
        />
        {errors.cpf_cli && <span>{errors.cpf_cli.message}</span>}
      </div>

      <div className="w-full flex flex-col my-5 gap-4">
        <label htmlFor="data_nascimento">Data de Nascimento:</label>
        <Controller
          name="data_nascimento_cli"
          control={control}
          render={({ field }) => (
            <IMaskInput
              mask="00/00/0000"
              {...field}
              placeholder="00/00/0000"
              className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
            />
          )}
        />
        {errors.data_nascimento_cli && (
          <span>{errors.data_nascimento_cli.message}</span>
        )}
      </div>

      <Button type="submit">Cadastrar</Button>
    </form>
  );
};

export default FormNewClient;
