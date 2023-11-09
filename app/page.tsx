import { Suspense } from "react";
import type { NextPage } from "next";
import SignupGraph from "@/components/SignupGraphContainer";
import OverallStatsBlock from "@/components/OverallStatsBlock";

const Home: NextPage = async () => (
  <main className="p-12">
    <header className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Gertrude analytics</h1>
      <Suspense
        fallback={
          <div className="w-48 h-24 rounded-3xl bg-slate-100 border animate-pulse" />
        }
      >
        <OverallStatsBlock />
      </Suspense>
    </header>
    <div className="mt-12">
      <Suspense
        fallback={
          <div className="bg-slate-100 rounded-3xl h-96 animate-pulse border" />
        }
      >
        <SignupGraph />
      </Suspense>
      <div className="mt-8 grid gap-2"></div>
    </div>
  </main>
);

export default Home;
