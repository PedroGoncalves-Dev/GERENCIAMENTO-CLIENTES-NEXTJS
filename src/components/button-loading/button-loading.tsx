import { useState } from "react";
import { Button } from "../ui/button";

interface IinactiveButtonProps {
  onClick: () => void;
}

const ButtonLoading = ({ onClick }: IinactiveButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Carregando..." : "Confirmar"}
    </Button>
  );
};

export default ButtonLoading;
