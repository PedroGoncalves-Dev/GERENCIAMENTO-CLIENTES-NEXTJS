"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
        {checked ? (
          <Badge
            variant={"default"}
            className="bg-green-800 hover:bg-green-600"
          >
            Ativos
          </Badge>
        ) : (
          <Badge variant={"destructive"}>Inativos</Badge>
        )}
      </Label>

      <Link href={"/addedClient"}>
        <Button className="bg-[#008080] hover:bg-[#008080a6]  transition-colors duration-500 ease-in-out">
          Adicionar Cliente
        </Button>
      </Link>
    </div>
  );
};

export default SwitchInativosAtivos;
