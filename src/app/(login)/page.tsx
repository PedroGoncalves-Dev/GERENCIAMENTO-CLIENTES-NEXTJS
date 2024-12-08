import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row bg-white rounded-lg w-4/5 h-[459px] mx-auto shadow-2xl overflow-hidden lg:h-[600px] xl:h-[800px]">
      {/* Imagem - Oculta em telas pequenas */}
      <div className="hidden lg:block lg:w-2/3 relative">
        <Image
          src={"/login.jpg"}
          fill
          style={{ objectFit: "cover" }}
          alt={"Imagem de login"}
        />
      </div>

      {/* Formulário de Login */}
      <div className="w-full lg:w-1/3 p-8 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-4 lg:text-4xl text-shadow-md ">
          Login
        </h1>
        <p className="text-zinc-500 text-center mb-6">
          Faça o login e gerencie seus clientes
        </p>
        <form>
          {/* Campo de Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <div className="flex items-center border-b-2 border-gray-300">
              <AiOutlineMail className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                className="flex-1 outline-none p-2"
                placeholder="Digite seu email"
              />
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="mb-6">
            <label htmlFor="senha" className="block mb-2 text-sm font-medium">
              Senha:
            </label>
            <div className="flex items-center border-b-2 border-gray-300">
              <AiOutlineLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="senha"
                className="flex-1 outline-none p-2"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {/* Botão de Login */}
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="w-1/2 bg-blue-800 hover:bg-blue-400 transition duration-500 ease-in-out"
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
