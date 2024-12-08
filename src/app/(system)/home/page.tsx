import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Descrição da página",
};

export default function home() {
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
