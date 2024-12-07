import { Button } from "@/components/ui/button";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

export default function Home() {
  return (
    <main className="bg-white rounded-lg w-4/5 h-[459px]">
      <div className="h-full p-8 shadow-2xl flex flex-col">
        <h1 className="text-3xl font-bold text-green-800 text-center">Login</h1>
        <p className="text-zinc-300 text-center m-4">
          Faça o login e gerencie seus clientes
        </p>
        <form action="">
          {/* Campo Email */}
          <div className="flex flex-col mb-8 relative">
            <label htmlFor="email" className="mb-2">
              Email:
            </label>
            <div className="flex items-center border-b-[1px]">
              <AiOutlineMail className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                className="flex-1 outline-none"
                placeholder="Digite seu email"
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col relative">
            <label htmlFor="senha" className="mb-2">
              Senha:
            </label>
            <div className="flex items-center border-b-[1px]">
              <AiOutlineLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="senha"
                className="flex-1 outline-none"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div className="w-full flex justify-center my-7">
            <Button type="submit" className="w-1/2">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
