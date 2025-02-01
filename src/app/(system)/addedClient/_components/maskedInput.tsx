import { InputMask, format } from "@react-input/mask";
import { TypeNewClient } from "@/schema/clients/schema-create";
import { Control, Controller } from "react-hook-form";

interface IpropsMask {
  mask: string;
  name: keyof TypeNewClient;
  placeholder?: string;
  className?: string;
  control: Control<TypeNewClient>;
  valor?: string;
}

const MaskedInput = ({
  mask,
  name,
  placeholder,
  className,
  control,
  valor,
}: IpropsMask) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value, ...field } }) => {
      const maskOptions = { mask, replacement: { _: /\d/ } };
      const formattedValue = value ? format(value, maskOptions) : "";

      return (
        <InputMask
          {...field}
          value={formattedValue}
          onChange={(e) => {
            if (name === "data_nascimento_cli") {
              // Mantém as barras para o campo de data
              onChange(e.target.value);
            } else {
              // Remove caracteres não numéricos para outros campos
              const numericValue = e.target.value.replace(/\D/g, "");
              onChange(numericValue);
            }
          }}
          mask={mask}
          replacement="_"
          placeholder={placeholder}
          className={`${className}`}
          showMask={false}
          separate
        />
      );
    }}
  />
);

export default MaskedInput;
