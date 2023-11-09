import { Suspense } from "react";
import type { NextPage } from "next";
import SignupGraph from "@/components/SignupGraphContainer";

export const dynamic = `force-dynamic`;

const Home: NextPage = async () => (
  <main>
    <header></header>
    <div className="p-12">
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
