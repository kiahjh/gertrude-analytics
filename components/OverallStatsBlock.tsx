import React from "react";
import getAdminData from "@/lib/get-data";

const OverallStatsBlock: React.FC = async () => {
  const adminData = await getAdminData();
  if (!adminData.success) return <div>Error</div>;
  const admins = adminData.data;
  return (
    <div>
      <span>{admins.length}</span>
    </div>
  );
};

export default OverallStatsBlock;
