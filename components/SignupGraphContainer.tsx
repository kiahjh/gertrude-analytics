import React from "react";
import SignupGraph from "./SignupGraph";
import getAdminData from "@/lib/get-data";

const SignupGraphContainer: React.FC = async () => {
  const data = await getAdminData();
  if (!data.success) {
    return <div>Error: {data.error}</div>;
  }
  return <SignupGraph data={data.data} />;
};

export default SignupGraphContainer;
