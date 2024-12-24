"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/actions/clients/create";
import MaskedInput from "./maskedInput";
import { newClientSchema, TypeNewClient } from "@/schema/clients/schema-create";
import { toast } from "@/hooks/use-toast";
import { FcOk } from "react-icons/fc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormNewClient = () => {
  const [sucesso, setSucesso] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      sexo_cli: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
    },
  });

  const onSubmit = async (data: TypeNewClient) => {
    setIsLoading(true);
    try {
      const cleanedData = {
        ...data,
        telefone_cli: data.telefone_cli.replace(/\D/g, ""),
        cpf_cli: data.cpf_cli.replace(/\D/g, ""),
        cep: data.cep.replace(/\D/g, ""),
      };

      const res = await createClient(cleanedData);

      if (res) {
        setSucesso(true);
        reset();
        toast({
          title: "Sucesso",
          description: (
            <div className="flex items-center gap-2">
              <FcOk />
              Cliente cadastrado com sucesso!
            </div>
          ),
          duration: 4000,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao cadastrar cliente",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="lg:flex gap-5">
        <div className="w-full flex flex-col my-5 gap-4">
          <label
            className="after:content-['*'] after:text-red-600 after:ml-1"
            htmlFor="nome"
          >
            Nome completo:
          </label>
          <Controller
            name="nome_cli"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="nome"
                placeholder="Digite seu nome completo"
                {...field}
                className="bg-[#1543601e] rounded-xl lg:border-b line leading-7 px-4 py-1"
              />
            )}
          />
          {errors.nome_cli && (
            <span className="animate-pulse text-red-600">
              {errors.nome_cli.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col my-5 gap-4">
          <label
            className="after:content-['*'] after:text-red-600 after:ml-1"
            htmlFor="email"
          >
            Email:
          </label>
          <Controller
            name="email_cli"
            control={control}
            render={({ field }) => (
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                {...field}
                className="bg-[#1543601e] rounded-xl lg:border-b line leading-7 px-4 py-1"
              />
            )}
          />
          {errors.email_cli && (
            <span className="animate-pulse text-red-600">
              {errors.email_cli.message}
            </span>
          )}
        </div>
      </div>

      <div className="lg:flex gap-5">
        <div className="w-full flex flex-col my-5 gap-4">
          <label
            className="after:content-['*'] after:text-red-600 after:ml-1"
            htmlFor="telefone"
          >
            Celular:
          </label>
          <MaskedInput
            control={control}
            mask="(__) _____-____"
            name="telefone_cli"
            placeholder="(00) 00000-0000"
          />
          {errors.telefone_cli && (
            <span className="animate-pulse text-red-600">
              {errors.telefone_cli.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col my-5 gap-4">
          <label
            className="after:content-['*'] after:text-red-600 after:ml-1"
            htmlFor="cpf"
          >
            CPF:
          </label>
          <MaskedInput
            control={control}
            mask="___.___.___-__"
            name="cpf_cli"
            placeholder="000.000.000-00"
          />
          {errors.cpf_cli && (
            <span className="animate-pulse text-red-600">
              {errors.cpf_cli.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col my-5 gap-4">
          <label
            className="after:content-['*'] after:text-red-600 after:ml-1"
            htmlFor="data_nascimento"
          >
            Data de Nascimento:
          </label>
          <MaskedInput
            control={control}
            mask="__/__/____"
            name="data_nascimento_cli"
            placeholder="00/00/0000"
          />
          {errors.data_nascimento_cli && (
            <span className="animate-pulse text-red-600">
              {errors.data_nascimento_cli.message}
            </span>
          )}
        </div>
        <div className="mt-5 mb-8">
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-600 after:ml-1 block text-sm font-medium "
          >
            Sexo
          </label>
          <Controller
            name="sexo_cli"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.sexo_cli && (
            <span className="animate-pulse text-red-600">
              {errors.sexo_cli.message}
            </span>
          )}
        </div>
      </div>

      <div className="lg:flex gap-5">
        <div className="w-full flex flex-col my-5 gap-4">
          <label htmlFor="">CEP:</label>
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <MaskedInput
                control={control}
                mask="_____-___"
                name="cep"
                placeholder="00000-000"
              />
            )}
          />

          {errors.cep && (
            <span className="animate-pulse text-red-600">
              {errors.cep.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col my-5 gap-4">
          <label htmlFor="">Logradouro:</label>
          <Controller
            name="logradouro"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="logradouro"
                placeholder="Digite seu logradouro"
                {...field}
                className="bg-[#1543601e] rounded-xl lg:border-b line leading-7 px-4 py-1"
              />
            )}
          />

          {errors.logradouro && (
            <span className="animate-pulse text-red-600">
              {errors.logradouro.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col my-5 gap-4">
          <label htmlFor="">Numero:</label>
          <Controller
            name="numero"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="logradouro"
                placeholder="Digite seu logradouro"
                {...field}
                className="bg-[#1543601e] rounded-xl lg:border-b line leading-7 px-4 py-1"
              />
            )}
          />
          {errors.numero && (
            <span className="animate-pulse text-red-600">
              {errors.numero.message}
            </span>
          )}
        </div>
      </div>

      <div className="lg:flex gap-5">
        <div className="w-full flex flex-col my-5 gap-4">
          <label htmlFor="">Bairro:</label>
          <Controller
            name="bairro"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="bairro"
                placeholder="Digite seu bairro"
                {...field}
                className="bg-[#1543601e] rounded-xl lg:border-b line leading-7 px-4 py-1"
              />
            )}
          />
          {errors.bairro && (
            <span className="animate-pulse text-red-600">
              {errors.bairro.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col my-5 gap-4">
          <label htmlFor="">Cidade:</label>
          <Controller
            name="cidade"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="cidade"
                placeholder="Digite sua cidade"
                {...field}
                className="bg-[#1543601e] rounded-xl lg:border-b line leading-7 px-4 py-1"
              />
            )}
          />
          {errors.cidade && (
            <span className="animate-pulse text-red-600">
              {errors.cidade.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col my-5 gap-4">
          <label htmlFor="">Estado:</label>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="estado"
                placeholder="Digite seu estado"
                {...field}
                className="bg-[#1543601e] rounded-xl lg:border-b line leading-7 px-4 py-1"
              />
            )}
          />
          {errors.estado && (
            <span className="animate-pulse text-red-600">
              {errors.estado.message}
            </span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="bg-cor-botao-primario  md:w-1/3 md:mx-auto md:hover:bg-cor-botao-primario-hover  lg:w-1/4"
      >
        {isLoading ? "Carregando..." : "Cadastrar"}
      </Button>
    </form>
  );
};

export default FormNewClient;
