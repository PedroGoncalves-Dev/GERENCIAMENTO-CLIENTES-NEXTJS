import { ChartMostSales } from "@/components/charts/moreBought";
import { ChartSpentMore } from "@/components/charts/spentMore";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Descrição da página",
};

export default function home() {
  return (
    <main className="w-full py-9">
      <section className="bg-white w-[90%] mx-auto rounded-md">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-4">
          {" "}
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ChartMostSales />
          </div>

          <div>
            <ChartSpentMore />
          </div>
        </div>
      </section>
    </main>
  );
}
