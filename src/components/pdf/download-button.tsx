"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./data-client";
const DownloadPdf = () => {
  return (
    <PDFDownloadLink document={<PDFDocument />} fileName="data-client.pdf">
      Download
    </PDFDownloadLink>
  );
};

export default DownloadPdf;
