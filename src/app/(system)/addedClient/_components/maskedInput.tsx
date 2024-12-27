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
            // Remove todos os caracteres não numéricos antes de passar para o onChange
            const numericValue = e.target.value.replace(/\D/g, "");
            onChange(numericValue);
          }}
          mask={mask}
          replacement="_"
          placeholder={placeholder}
          className={`mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 ${className}`}
          showMask={false}
          separate
        />
      );
    }}
  />
);

export default MaskedInput;
