"use client";
import dynamic from "next/dynamic";
import { PDFDownloadLinkProps } from "@react-pdf/renderer";
import PDFDocument from "./data-client";
import { useClient } from "@/context/client-context";
import { Button } from "../ui/button";
import { ImSpinner } from "react-icons/im";

const PDFDownloadLink = dynamic<PDFDownloadLinkProps>(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button className="bg-[#9b1107]">
        <ImSpinner className="animate-spin" />
      </Button>
    ),
  }
);

const DownloadPdf = () => {
  const { client } = useClient();
  return (
    <div>
      <PDFDownloadLink
        document={<PDFDocument client={client} />}
        fileName={`dados-cliente-${client?.nome_cli}.pdf`}
        style={{
          textDecoration: "none",
          padding: "8px 16px",
          background: "#9b1107",
          color: "#fff",
          borderRadius: "6px",
        }}
      >
        PDF
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadPdf;
