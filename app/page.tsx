import { Suspense } from "react";
import type { NextPage } from "next";
import SignupGraph from "@/components/SignupGraphContainer";

const Home: NextPage = async () => (
  <main className="p-12">
    <div>
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
