// src/types/tanstack-table.d.ts
import { ColumnMeta } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    className?: string; // Adiciona a propriedade className como opcional
  }
}
