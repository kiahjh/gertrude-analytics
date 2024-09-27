import React from "react";
import type { AdminData } from "@/lib/types";
import { isActive } from "@/lib/utils";

const OverallStatsBlock: React.FC<{ admins: AdminData[] }> = ({ admins }) => {
  const adminCount = admins.length;
  const activeAdminCount = admins.filter(isActive).length;
  const userCount = admins.reduce(
    (acc, admin) => acc + admin.children.length,
    0,
  );
  const computerCount = admins
    .flatMap((admin) => admin.children)
    .reduce((acc, child) => acc + child.installations.length, 0);
  const annualRevenue =
    admins.filter((a) => a.subscriptionStatus === `paid`).length * 5 * 12;

  return (
    <div className="border rounded-3xl p-6 flex items-center justify-around gap-8">
      <Stat title="Active admins" value={activeAdminCount} />
      <Stat title="Admin accounts" value={adminCount} />
      <Stat title="Protected users" value={userCount} />
      <Stat title="App installations" value={computerCount} />
      <Stat
        title="Annual revenue"
        value={`$${annualRevenue.toLocaleString()}`}
      />
    </div>
  );
};

export default OverallStatsBlock;

const Stat: React.FC<{ title: string; value: any }> = ({ title, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-5xl font-bold">{value.toLocaleString()}</span>
    <span className="text-slate-500 text-lg">{title}</span>
  </div>
);
