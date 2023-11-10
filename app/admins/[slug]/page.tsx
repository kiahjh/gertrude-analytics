import React from "react";
import cx from "classnames";
import { notFound } from "next/navigation";
import getAdminData from "@/lib/get-data";

const IndividualAdminPage: React.FC<{ params: { slug: string } }> = async ({
  params,
}) => {
  const admins = await getAdminData();
  if (!admins.success) {
    return <div>{admins.error}</div>;
  }
  const admin = admins.data.find((admin) => admin.id === params.slug);
  if (!admin) {
    return notFound();
  }
  const statusColors = {
    pendingEmailVerification: `bg-yellow-200 text-yellow-800`,
    trialing: `bg-blue-100 text-blue-800`,
    trialExpiringSoon: `bg-fuchsia-200 text-fuchsia-800`,
    overdue: `bg-red-200 text-red-800`,
    paid: `bg-green-200 text-green-800`,
    unpaid: `bg-red-200 text-red-800`,
    pendingAccountDeletion: `bg-gray-200 text-gray-800`,
    complimentary: `bg-green-200 text-green-800`,
  };

  return (
    <div className="p-12">
      <div className={cx(`border rounded-3xl flex flex-col`)}>
        <div className="p-8">
          <div
            className={cx(
              `uppercase text-xs font-medium py-1 px-4 rounded-full w-fit`,
              statusColors[admin.subscriptionStatus],
            )}
          >
            {admin.subscriptionStatus}
          </div>
          <h1 className="text-3xl font-semibold my-2">{admin.email}</h1>
          <h2 className="text-slate-400">{admin.id}</h2>
        </div>
        <div className="flex gap-8 items-start text-slate-500 py-4 px-8 bg-slate-50 rounded-b-3xl border-t">
          <span>
            <span className="font-semibold text-lg text-slate-700">
              {admin.children.length}
            </span>
            {` `}
            {admin.children.length === 1 ? `child` : `children`}
          </span>
          <span>
            <span className="font-semibold text-lg text-slate-700">
              {admin.numKeychains}
            </span>
            {` `}
            keychain
            {admin.numKeychains !== 1 && `s`}
          </span>
          <span>
            <span className="font-semibold text-lg text-slate-700">
              {admin.numNotifications}
            </span>
            {` `}
            notification method
            {admin.numNotifications !== 1 && `s`}
          </span>
        </div>
      </div>
      <h2 className="text-3xl font-semibold mt-16 ml-8">Children:</h2>
      <div className="border rounded-3xl p-8 mt-4 bg-slate-50 flex flex-wrap gap-8">
        {admin.children.length === 0 && (
          <div className="w-full flex justify-center items-center h-40 text-2xl text-slate-400">
            No children
          </div>
        )}
        {admin.children.map((child) => (
          <div
            className="p-6 rounded-3xl bg-white border w-[420px] relative"
            key={child.name + child.createdAt}
          >
            <span className="absolute right-6 top-4 text-slate-400">
              {child.numKeys} keys
            </span>
            <h3 className="text-2xl font-semibold max-w-xs">{child.name}</h3>
            <div className="flex gap-2 mt-3">
              <div
                className={cx(
                  `text-sm px-3 py-0.5 rounded-full`,
                  child.screenshotsEnabled
                    ? `bg-blue-100 text-blue-700`
                    : `bg-slate-100 text-slate-400`,
                )}
              >
                Screenshots
              </div>
              <div
                className={cx(
                  `text-sm px-3 py-0.5 rounded-full`,
                  child.screenshotsEnabled
                    ? `bg-blue-100 text-blue-700`
                    : `bg-slate-100 text-slate-400`,
                )}
              >
                Keylogging
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {child.installations.map((install) => (
                <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                      {install.modelIdentifier}
                    </span>
                    <span className="text-slate-500 text-sm">
                      App version:{` `}
                      <span className="font-semibold">
                        {install.appVersion}
                      </span>
                    </span>
                    <span className="text-slate-500 text-sm">
                      Filter version:{` `}
                      <span className="font-semibold">
                        {install.filterVersion}
                      </span>
                    </span>
                    <span className="text-slate-500 text-sm">
                      Release channel:{` `}
                      <span className="font-semibold">
                        {install.appReleaseChannel}
                      </span>
                    </span>
                  </div>
                  <img
                    src={`https://parents.gertrude.app/macs/${install.modelIdentifier}.png`}
                    alt="Mac computer"
                    className="w-16 h-16 object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualAdminPage;
