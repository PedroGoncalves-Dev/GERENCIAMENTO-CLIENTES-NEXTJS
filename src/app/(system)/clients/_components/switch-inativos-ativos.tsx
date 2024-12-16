"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";

const SwitchInativosAtivos = () => {
  const [checked, setChecked] = useState(true);

  const handleSwitchChange = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <div className="flex items-center gap-5">
      <Switch
        id="ativos-inativos"
        checked={checked}
        onCheckedChange={handleSwitchChange}
      />
      <Label
        htmlFor="ativos-inativos"
        className={`${checked ? "text-primary" : "text-destructive"}`}
      >
        {checked ? "Ativos" : "Inativos"}
      </Label>

      <Link href={"/addedClient"}>
        <Button className="bg-sky-600 hover:bg-sky-300 hover:text-black transition-colors duration-500 ease-in-out">
          Adicionar Cliente
        </Button>
      </Link>
    </div>
  );
};

export default SwitchInativosAtivos;
