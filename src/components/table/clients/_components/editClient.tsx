"use client";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Iclients } from "@/data-access/clients/get-all";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newClientSchema, TypeNewClient } from "@/schema/clients/schema-create";
import { SlReload } from "react-icons/sl";

import MaskedInput from "@/app/(system)/addedClient/_components/maskedInput";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { getAllCitys, Icity } from "@/data-access/city-state/city";
import { getAllStates, Istate } from "@/data-access/city-state/state";
import { Toast } from "@/components/ui/toast";
import { editClient } from "@/actions/clients/edit-client";
import { toast } from "@/hooks/use-toast";
import { FcOk } from "react-icons/fc";
import { FiXCircle } from "react-icons/fi";

interface IpropsModalEdit {
  cliente: Iclients;
}

const EditClient = ({ cliente }: IpropsModalEdit) => {
  const [estado, setEstado] = useState<Istate[]>();
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidade, setCidade] = useState<Icity[]>();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TypeNewClient>({
    resolver: zodResolver(newClientSchema),
    defaultValues: {
      nome_cli: cliente.nome_cli,
      email_cli: cliente.email_cli,
      telefone_cli: cliente.telefone_cli,
      cpf_cli: cliente.cpf_cli,
      data_nascimento_cli: cliente.data_nascimento_cli,
      sexo_cli: cliente.sexo_cli,
      cep: cliente.cep,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      bairro: cliente.bairro,
      cidade: cliente.cidade,
      estado: cliente.estado,
      complemento: cliente.complemento ? cliente.complemento : "",
    },
  });

  useEffect(() => {
    setLoading(true);
    if (cliente.estado) {
      setEstadoSelecionado(cliente.estado);
    }
    setLoading(false);
  }, [cliente.estado]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getAllStates();

        if (res) {
          setEstado(
            res.sort((a: Istate, b: Istate) => a.sigla.localeCompare(b.sigla))
          );
        }
      } catch (error) {}
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (estadoSelecionado) {
          setLoading(true);
          const res = await getAllCitys(estadoSelecionado);

          if (res) {
            setCidade(
              res.sort((a: Icity, b: Icity) => a.nome.localeCompare(b.nome))
            );
          }
        }
      } catch (error) {
        Toast({
          title: "Erro ao buscar cidade",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [estadoSelecionado]);

  const onSubmit = async (data: TypeNewClient) => {
    if (
      cliente.nome_cli === data.nome_cli &&
      cliente.email_cli === data.email_cli &&
      cliente.telefone_cli === data.telefone_cli &&
      cliente.cpf_cli === data.cpf_cli &&
      cliente.data_nascimento_cli === data.data_nascimento_cli &&
      cliente.sexo_cli === data.sexo_cli &&
      cliente.cep === data.cep &&
      cliente.logradouro === data.logradouro &&
      cliente.numero === data.numero &&
      cliente.bairro === data.bairro &&
      cliente.cidade === data.cidade &&
      cliente.estado === data.estado &&
      cliente.complemento === data.complemento
    ) {
      return toast({
        title: "Erro ao editar cliente",
        description: (
          <div className="flex items-center gap-2">
            <FiXCircle size={25} />
            Nenhum dado foi alterado!
          </div>
        ),
        variant: "destructive",
        duration: 3000,
      });
    }
    const clonedData = {
      ...data,
      telefone_cli: data.telefone_cli.replace(/\D/g, ""),
      cpf_cli: data.cpf_cli.replace(/\D/g, ""),
      cep: data.cep.replace(/\D/g, ""),
    };
    try {
      const res = await editClient(clonedData, String(cliente.id_cli));

      if (!res) {
        toast({
          title: "Erro ao editar cliente",
          variant: "destructive",
          duration: 3000,
        });

        console.error("Erro ao editar cliente:", res);
      }

      toast({
        title: "Sucesso",
        description: (
          <div className="flex items-center gap-2">
            <FcOk size={25} />
            Cliente editado com sucesso!
          </div>
        ),
        duration: 4000,
      });
    } catch (error) {
      toast({
        title: "Erro ao editar cliente",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <DialogContent className="sm:w-4/5 lg:w-1/2">
      <DialogHeader>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogDescription>
          Edite os dados do cliente abaixo...
        </DialogDescription>
      </DialogHeader>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium">
              Nome
            </label>
            <Controller
              name="nome_cli"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="nome"
                  {...field}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              )}
            />
            {errors.nome_cli && (
              <p className="text-red-500">{errors.nome_cli.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Controller
              name="email_cli"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              )}
            />
            {errors.email_cli && (
              <p className="text-red-500">{errors.email_cli.message}</p>
            )}
          </div>
        </div>

        <div className="grid xl:grid-cols-4 gap-4">
          <div>
            <label htmlFor="" className="block text-sm font-medium">
              Data de nascimento
            </label>
            <MaskedInput
              mask="__/__/____"
              name="data_nascimento_cli"
              control={control}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
            />
            {errors.data_nascimento_cli && (
              <p className="text-red-500">
                {errors.data_nascimento_cli.message}
              </p>
            )}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="">Sexo:</label>
            <Controller
              name="sexo_cli"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue
                      placeholder="Selecione o sexo"
                      className="block text-sm font-medium"
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        value="Masculino"
                        className="hover:scale-105 transition-transform duration-200 ease-in-out"
                      >
                        Masculino
                      </SelectItem>
                      <SelectItem
                        value="Feminino"
                        className="hover:scale-105 transition-transform duration-200 ease-in-out"
                      >
                        Feminino
                      </SelectItem>
                      <SelectItem
                        value="Outro"
                        className="hover:scale-105 transition-transform duration-200 ease-in-out"
                      >
                        Outro
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.sexo_cli && (
              <p className="text-red-500">{errors.sexo_cli.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="" className="block text-sm font-medium">
              CPF:
            </label>
            <MaskedInput
              mask="___.___.___-__"
              name="cpf_cli"
              control={control}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
            />

            {errors.cpf_cli && (
              <span className="text-xs text-red-500">
                {errors.cpf_cli.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="" className="block text-sm font-medium">
              Telefone:
            </label>
            <MaskedInput
              mask="(__) _____-____"
              name="telefone_cli"
              control={control}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
            />

            {errors.telefone_cli && (
              <span className="text-xs text-red-500">
                {errors.telefone_cli.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="">CEP:</label>
            <MaskedInput
              mask="_____-___"
              name="cep"
              control={control}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
            />
            {errors.cep && (
              <span className="text-xs text-red-500">{errors.cep.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-[2px]">
            <label htmlFor="">Cidade:</label>
            <Controller
              name="cidade"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!estadoSelecionado || loading}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue
                      placeholder={
                        loading ? (
                          <span className="flex items-center gap-2">
                            <SlReload className="animate-spin-slow w-5 h-5" />
                            carregando...
                          </span>
                        ) : (
                          <span>Selecione a cidade</span>
                        )
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cidade?.map((cidade) => (
                        <SelectItem key={cidade.id} value={cidade.nome}>
                          {cidade.nome}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.cidade && (
              <span className="text-xs text-red-500">
                {errors.cidade.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[2px]">
            <label htmlFor="">UF:</label>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEstadoSelecionado(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione a UF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="rounded-md  overflow-y-auto">
                      {estado?.map((estado) => (
                        <SelectItem
                          key={estado.id}
                          value={estado.sigla}
                          className="hover:scale-105 transition-transform duration-200 ease-in-out"
                        >
                          {estado.sigla}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.estado && (
              <span className="text-xs text-red-500">
                {errors.estado.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="">Logradouro:</label>
            <Controller
              name="logradouro"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              )}
            />

            {errors.logradouro && (
              <span className="text-xs text-red-500">
                {errors.logradouro.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="">Bairro:</label>
            <Controller
              name="bairro"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              )}
            />

            {errors.bairro && (
              <span className="text-xs text-red-500">
                {errors.bairro.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="">Numero:</label>
            <Controller
              name="numero"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              )}
            />

            {errors.numero && (
              <span className="text-xs text-red-500">
                {errors.numero.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="">Complemento</label>
            <Controller
              name="complemento"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              )}
            />

            {errors.complemento && (
              <span className="text-xs text-red-500">
                {errors.complemento.message}
              </span>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <SlReload className="animate-spin w-5 h-5" /> Salvando...
              </>
            ) : (
              "Salvar alterações"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditClient;
