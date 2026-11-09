import { useState } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
export function Portrait({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={cn("portrait shrink-0 overflow-hidden rounded-full bg-secondary", className)}>{failed ? <span className="grid h-full place-items-center font-bold">RM</span> : <img src={profile.avatar} alt={profile.shortName} onError={() => setFailed(true)} />}</div>;
}
