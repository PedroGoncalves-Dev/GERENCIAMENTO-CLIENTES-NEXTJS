import { FC } from "react";

interface FormatterProps {
  value: string;
  type?: "celular" | "cpf";
}

const InputFormatter: FC<FormatterProps> = ({ value, type = "phone" }) => {
  const formatValue = (val: string): string => {
    if (!val) return "";

    // Remove caracteres não numéricos
    const numbers = val.replace(/\D/g, "");

    // Aplica máscara baseada no tipo e quantidade de números
    if (type === "celular") {
      return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    if (type === "cpf") {
      return numbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

    // Se não houver números suficientes, retorna os números sem formatação
    return numbers;
  };

  return <span className="text-sm md:text-base">{formatValue(value)}</span>;
};

export default InputFormatter;
