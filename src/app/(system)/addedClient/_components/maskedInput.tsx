import { InputMask } from "@react-input/mask";
import { TypeNewClient } from "@/schema/clients/schema-create";
import { Control, Controller } from "react-hook-form";

interface IpropsMask {
  mask: string;
  name: keyof TypeNewClient;
  placeholder: string;
  control: Control<TypeNewClient>;
}

const MaskedInput = ({ mask, name, placeholder, control }: IpropsMask) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value, ...field } }) => (
      <InputMask
        {...field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        mask={mask}
        replacement="_"
        placeholder={placeholder}
        className="bg-orange-100 rounded-xl lg:border-b line leading-7 px-4 py-1"
        showMask={false}
        separate
      />
    )}
  />
);

export default MaskedInput;
