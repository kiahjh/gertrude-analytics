import type { AdminData } from "./types";

export default async function getAdminData(): Promise<AdminResult> {
  const res = await await fetch(
    `https://api.gertrude.app/pairql/super-admin/QueryAdmins`,
    {
      method: `POST`,
      headers: {
        "X-SuperAdminToken": process.env.SUPER_ADMIN_TOKEN ?? ``,
      },
    },
  );
  if (res.status === 200) {
    return {
      success: true,
      data: await res.json(),
    };
  }
  return {
    success: false,
    error: (await res.json()).error || `Unknown error`,
  };
}

export type AdminResult =
  | { success: true; data: AdminData[] }
  | { success: false; error: string };
