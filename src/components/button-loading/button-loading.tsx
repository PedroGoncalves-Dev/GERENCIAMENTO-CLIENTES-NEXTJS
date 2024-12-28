import { useState } from "react";
import { Button } from "../ui/button";
import { SlReload } from "react-icons/sl";

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
      {isLoading ? (
        <>
          <SlReload className="animate-spin-slow w-5 h-5" /> Inativando
        </>
      ) : (
        "Inativar"
      )}
    </Button>
  );
};

export default ButtonLoading;
