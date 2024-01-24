import React from "react";
import Link from "next/link";
import cx from "classnames";
import type { NextPage } from "next";
import getAdminData from "@/lib/get-data";
import SubscriptionStatusBadge from "@/components/SubscriptionStatusBadge";
import { isActive, isOnboarded } from "@/lib/utils";

const AdminsPage: NextPage = async () => {
  const admins = await getAdminData();
  if (!admins.success) {
    return <div>{admins.error}</div>;
  }
  return (
    <div className="p-12 flex flex-col gap-4">
      <h1 className="text-4xl font-semibold mb-4">Gertrude admins</h1>
      {admins.data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((admin) => (
          <Link
            href={`/admins/${admin.id}`}
            className="border p-4 rounded-2xl hover:bg-violet-50 transition-colors duration-200 active:bg-violet-100"
            key={admin.id}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-xl w-80">{admin.email}</span>
              <span className="text-slate-400">
                {new Date(admin.createdAt).toLocaleDateString()}
              </span>
              <span className="w-28 flex justify-end text-lg font-medium text-slate-700">
                {admin.children.length}
                {` `}
                {admin.children.length === 1 ? `child` : `children`}
              </span>
            </div>
            <div className="flex items-center justify-between mt-4 gap-2">
              <div className="flex gap-2 items-center">
                <div
                  className={cx(
                    `uppercase text-xs font-medium py-1 px-4 rounded-full w-36 flex justify-center`,
                    isActive(admin)
                      ? `bg-green-200 text-green-800`
                      : `bg-slate-100 text-slate-300`,
                  )}
                >
                  {isActive(admin) ? `active` : `inactive`}
                </div>
                <div
                  className={cx(
                    `uppercase text-xs font-medium py-1 px-4 rounded-full w-36 flex justify-center`,
                    isOnboarded(admin)
                      ? `bg-green-200 text-green-800`
                      : `bg-slate-100 text-slate-300`,
                  )}
                >
                  {isOnboarded(admin) ? `onboarded` : `not onboarded`}
                </div>
              </div>
              <SubscriptionStatusBadge status={admin.subscriptionStatus} />
            </div>
          </Link>
        ))}
    </div>
  );
};

export default AdminsPage;
