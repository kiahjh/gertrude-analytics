import type { AdminData } from "./types";

export default async function getAdminData(): Promise<AdminResult> {
  const res = await (
    await fetch(`https://api.gertrude.app/pairql/super-admin/QueryAdmins`, {
      method: `POST`,
      headers: {
        "X-SuperAdminToken": process.env.SUPER_ADMIN_TOKEN ?? ``,
      },
    })
  ).json();
  if (Array.isArray(res)) {
    return {
      success: true,
      data: res,
    };
  }
  return {
    success: false,
    error: res.error || `Unknown error`,
  };
}

export type AdminResult =
  | { success: true; data: AdminData[] }
  | { success: false; error: string };
