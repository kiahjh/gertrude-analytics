import React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import getAdminData from "@/lib/get-data";

const AdminsPage: NextPage = async () => {
  const admins = await getAdminData();
  if (!admins.success) {
    return <div>{admins.error}</div>;
  }
  return (
    <div className="p-12 flex flex-col gap-4">
      {admins.data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((admin) => (
          <Link
            href={`/admins/${admin.id}`}
            className="border p-4 rounded-2xl flex justify-between items-center hover:bg-violet-50 transition-colors duration-200 active:bg-violet-100"
            key={admin.id}
          >
            <span className="font-semibold text-xl w-80">{admin.email}</span>
            <span className="text-slate-400">
              {new Date(admin.createdAt).toLocaleDateString()}
            </span>
            <span className="w-28 flex justify-end text-lg font-medium text-slate-700">
              {admin.children.length}
              {` `}
              {admin.children.length === 1 ? `child` : `children`}
            </span>
          </Link>
        ))}
    </div>
  );
};

export default AdminsPage;
