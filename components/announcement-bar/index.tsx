import { shopConfig } from "@/lib/config";

import { AnnouncementRotator } from "./rotator";

export function AnnouncementBar() {
  if (shopConfig.announcements.length === 0) return null;
  return <AnnouncementRotator items={shopConfig.announcements} />;
}
