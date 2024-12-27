"use client";
import { Button } from "@/components/ui/button";
import {
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
import { Loader2 } from "lucide-react";
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

import { useState, useEffect, Suspense } from "react";
import { getAllCitys, Icity } from "@/data-access/city-state/city";
import { getAllStates, Istate } from "@/data-access/city-state/state";
import { Toast } from "@/components/ui/toast";

interface IpropsModalEdit {
  cliente: Iclients;
}

const EditClient = ({ cliente }: IpropsModalEdit) => {
  const [estado, setEstado] = useState<Istate[]>();
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidade, setCidade] = useState<Icity[]>();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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

  return (
    <DialogContent className="sm:w-4/5 lg:w-1/2">
      <DialogHeader>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogDescription asChild>
          <form className="space-y-4">
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
                />
              </div>

              <div className="grid gap-1">
                <label htmlFor="">Sexo:</label>
                <Controller
                  name="sexo_cli"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o sexo" />
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
              </div>

              <div>
                <label htmlFor="" className="block text-sm font-medium">
                  CPF:
                </label>
                <MaskedInput
                  mask="___.___.___-__"
                  name="cpf_cli"
                  control={control}
                />
              </div>

              <div>
                <label htmlFor="" className="block text-sm font-medium">
                  Telefone:
                </label>
                <MaskedInput
                  mask="(__) _____-____"
                  name="telefone_cli"
                  control={control}
                  valor={cliente.telefone_cli}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="">CEP:</label>
                <MaskedInput mask="_____-___" name="cep" control={control} />
              </div>

              <div>
                <label htmlFor="">Cidade:</label>
                <Controller
                  name="cidade"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      disabled={!estadoSelecionado || loading}
                    >
                      <SelectTrigger>
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
                              {" "}
                              {cidade.nome}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
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
                    >
                      <SelectTrigger>
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
              </div>
            </div>
          </form>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancelar</Button>
        <Button type="submit">Salvar alterações</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditClient;
