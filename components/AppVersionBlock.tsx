import React from "react";
import type { AdminData } from "@/lib/types";

const AppVersionBlock: React.FC<{ admins: AdminData[] }> = ({ admins }) => {
  const installations = admins
    .flatMap((admins) => admins.children)
    .flatMap((child) => child.installations);
  const appVersions = installations.reduce((acc, install) => {
    if (acc.includes(install.appVersion)) {
      return acc;
    }
    return [...acc, install.appVersion];
  }, [] as string[]);

  return (
    <div className="flex flex-col rounded-3xl gap-1 border p-8 pt-4">
      <h3 className="text-xl font-semibold self-center mb-4">
        App version installs
      </h3>
      {appVersions
        .sort(
          (a, b) =>
            installations.filter((i) => i.appVersion === b).length -
            installations.filter((i) => i.appVersion === a).length,
        )
        .map((version, i) => {
          const versionDownloads = installations.filter(
            (i) => i.appVersion === version,
          ).length;
          const percentage = (versionDownloads * 100) / installations.length;
          return (
            <div className="flex items-center">
              <div
                style={{
                  height: `${percentage * 7}px`,
                  backgroundColor: i % 2 === 0 ? `#8b5cf6` : `#d946ef`,
                }}
                className="w-40 rounded"
              ></div>
              <div className="w-12 h-1 bg-slate-200 rounded-r-full" />
              <span className="h-0 -translate-y-3 text-slate-400 ml-2">
                <span className="font-bold text-slate-700">{version}</span>:
                {` `}
                {versionDownloads}
                {` `}({Math.round(percentage)}%)
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default AppVersionBlock;
