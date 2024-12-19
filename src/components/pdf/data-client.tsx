import { Iclients } from "@/data-access/clients/get-all";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    backgroundColor: "#1e3a8a",
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 5,
    borderLeft: "3px solid #1e3a8a",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e3a8a",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#334155",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 10,
    borderTop: "1px solid #e2e8f0",
    paddingTop: 10,
  },
});

interface IpropsClient {
  client: Iclients | null;
}

const PDFDocument = (propps: IpropsClient) => {
  const dataHoraAtual = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (!propps.client) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Daods do cliente não encontrados</Text>
          </View>
        </Page>
      </Document>
    );
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dados do Cliente</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Informações Pessoais</Text>
          <Text style={styles.text}>ID: {propps.client?.id_cli}</Text>
          <Text style={styles.text}>Nome: {propps.client?.nome_cli}</Text>
          <Text style={styles.text}>CPF: {propps.client?.cpf_cli}</Text>
          <Text style={styles.text}>
            Data de nascimento: {propps.client?.data_nascimento_cli}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Informações de Contato</Text>
          <Text style={styles.text}>Email: {propps.client?.email_cli}</Text>
          <Text style={styles.text}>
            Telefone: {propps.client?.telefone_cli}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Informações adicionais</Text>
          <Text style={styles.text}>
            Data de cadastro: {propps.client?.criado_em}
          </Text>
        </View>

        <Text style={styles.footer}>Documento gerado em {dataHoraAtual}</Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
