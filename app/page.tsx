import type { NextPage } from "next";
import getAdminData from "@/lib/get-data";
import SignupGraph from "@/components/SignupGraph";
import OverallStatsBlock from "@/components/OverallStatsBlock";
import OnboardingSuccessStatBlock from "@/components/OnboardingSuccessStatBlock";
import AppVersionBlock from "@/components/AppVersionBlock";

const Home: NextPage = async () => {
  const adminData = await getAdminData();
  if (!adminData.success) {
    return <div>{adminData.error}</div>;
  }
  return (
    <main className="p-12 flex flex-col gap-8">
      <h1 className="font-semibold text-4xl">Gertrude analytics</h1>
      <OverallStatsBlock admins={adminData.data} />
      <SignupGraph data={adminData.data} />
      <OnboardingSuccessStatBlock admins={adminData.data} />
      <div className="flex gap-8">
        <AppVersionBlock admins={adminData.data} type="app" />
        <AppVersionBlock admins={adminData.data} type="filter" />
      </div>
    </main>
  );
};

export default Home;
