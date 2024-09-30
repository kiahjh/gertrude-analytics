import type { AdminData } from "./types";

// admin is active if it has children with installations and either monitoring turned on or keychains protecting said children
export function isActive(admin: AdminData): boolean {
  const hasChildrenWithInstallation = admin.children.some(
    (child) => child.installations.length > 0,
  );
  const hasChildrenWithMonitoring = admin.children.some(
    (child) => child.keyloggingEnabled || child.screenshotsEnabled,
  );
  const hasKeychains = admin.numKeychains > 0;
  const isAbleToUseTheApp = admin.subscriptionStatus !== `unpaid`;

  return (
    hasChildrenWithInstallation &&
    isAbleToUseTheApp &&
    (hasChildrenWithMonitoring || hasKeychains)
  );
}

export function isOnboarded(admin: AdminData): boolean {
  return admin.children.some((child) => child.installations.length > 0);
}
