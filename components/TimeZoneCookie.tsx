"use client";

import { useEffect } from "react";
import { TIME_ZONE_COOKIE } from "@/utils/timezone";

export default function TimeZoneCookie() {
  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timeZone) return;

    const prefix = `${TIME_ZONE_COOKIE}=`;
    const current = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(prefix))
      ?.slice(prefix.length);
    if (current === timeZone) return;

    const secure = location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${prefix}${timeZone}; path=/; samesite=lax${secure}`;
  }, []);

  return null;
}
