import React from "react";
import type { AdminData } from "@/lib/types";

const OnboardingSuccessStatBlock: React.FC<{ admins: AdminData[] }> = ({
  admins,
}) => {
  const successfulAdmins = admins.filter((admin) =>
    admin.children.reduce((acc, child) => {
      if (child.installations.length > 0) {
        return true;
      }
      return acc;
    }, false),
  );
  const successRate = Math.round(
    (successfulAdmins.length / admins.length) * 100,
  );

  return (
    <div className="border-4 border-violet-500 h-20 rounded-3xl flex justify-start p-1.5">
      <div
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl flex justify-center items-center"
        style={{ width: `${successRate}%` }}
      >
        <span className="text-white text-2xl font-semibold">
          {successRate}% of signups successfully onboard
        </span>
      </div>
    </div>
  );
};

export default OnboardingSuccessStatBlock;
