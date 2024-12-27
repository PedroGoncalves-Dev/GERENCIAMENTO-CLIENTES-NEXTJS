import * as XLSX from "xlsx";

export const exportToExcel = (data: any[], fileName: string) => {
  // Cria uma nova planilha
  const workbook = XLSX.utils.book_new();

  // Converte os dados para o formato de planilha
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Adiciona a planilha ao workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

  // Gera e faz download do arquivo
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
