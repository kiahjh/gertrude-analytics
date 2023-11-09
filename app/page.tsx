import type { NextPage } from "next";
import SignupGraph from "@/components/SignupGraph";
import getAdminData from "@/lib/get-data";

const Home: NextPage = async () => {
  const adminData = await getAdminData();
  if (!adminData.success) {
    return <div>{adminData.error}</div>;
  }
  return (
    <main>
      <header></header>
      <div className="p-12">
        <SignupGraph data={adminData.data} />
        <div className="mt-8 grid gap-2"></div>
      </div>
    </main>
  );
};

export default Home;
