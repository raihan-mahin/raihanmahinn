import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { qa } from "@/data/portfolio";

type Msg = { from: "me" | "them"; text: string };
export function Messages() {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "them", text: "Hey! 👋 I'm Mahin. Tap a question below — these are pre-written answers from my real career, not a live chat." }]);
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  const ask = (i: number) => {
    const item = qa[i];
    if (typing || !item) return;
    setMsgs((m) => [...m, { from: "me", text: item.q }]); setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { from: "them", text: item.a }]); }, 800);
  };
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex flex-col items-center border-b border-border py-2">
        <div className="grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">RM</div>
        <p className="mt-0.5 text-xs font-semibold">Raihan Mahin</p>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-auto p-4">
        {msgs.map((m, i) => (
          <div key={i} className={cn("flex animate-fade-up", m.from === "me" && "justify-end")}>
            <p className={cn("max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug", m.from === "me" ? "rounded-br-sm bg-bubble-me text-primary-foreground" : "rounded-bl-sm bg-bubble-them")}>{m.text}</p>
          </div>
        ))}
        {typing && <div className="flex"><p className="rounded-2xl bg-bubble-them px-4 py-2 text-sm tracking-widest">•••</p></div>}
        <div ref={end} />
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-border p-3">
        {qa.map((x, i) => <button key={x.q} onClick={() => ask(i)} disabled={typing} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-50">{x.q}</button>)}
      </div>
    </div>
  );
}
