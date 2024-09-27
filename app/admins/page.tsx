import React from "react";
import type { NextPage } from "next";
import getAdminData from "@/lib/get-data";
import AdminCard from "@/components/AdminCard";
import { isActive } from "@/lib/utils";

const AdminsPage: NextPage = async () => {
  const admins = await getAdminData();
  if (!admins.success) {
    return <div>{admins.error}</div>;
  }

  return (
    <div className="p-12 flex flex-col">
      <h1 className="text-4xl font-semibold">Gertrude admins</h1>
      <p className="mb-8 mt-2 text-xl font-medium text-slate-600">
        <span className="font-mono font-bold text-black">
          {admins.data.length}
        </span>
        {` `}
        admins,{` `}
        <span className="font-mono font-bold text-black">
          {admins.data.filter(isActive).length}
        </span>
        {` `}
        active,{` `}
        <span className="font-mono font-bold text-black">
          {
            admins.data.filter((admin) => admin.subscriptionStatus === `paid`)
              .length
          }
        </span>
        {` `}
        paid
      </p>
      <div className="flex flex-col">
        {admins.data
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((admin) => (
            <AdminCard key={admin.id} admin={admin} />
          ))}
      </div>
    </div>
  );
};

export default AdminsPage;
