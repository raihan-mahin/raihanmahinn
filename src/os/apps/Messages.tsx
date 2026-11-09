import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Search, SquarePen, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { qa, profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { chatSuggestions, portfolioAnswer } from "@/lib/portfolio-chat";
import { Portrait } from "../Portrait";
import { useOS } from "../store";

type Thread = "personal" | "recruiters";
type Msg = { from: "me" | "them"; text: string };
const names = { personal: "Raihan Mahin", recruiters: "Recruiters & Hiring" };
function Avatar({ thread, large = false }: { thread: Thread; large?: boolean }) {
  return thread === "personal" ? <Portrait className={large ? "size-16" : "size-10"}/> : <span className={cn("grid shrink-0 place-items-center rounded-full bg-primary font-semibold text-primary-foreground", large ? "size-16 text-xl" : "size-10 text-sm")}>RH</span>;
}
export function Messages({ mobile = false, onHome, payload }: { mobile?: boolean; onHome?: () => void; payload?: string | undefined }) {
  const os = useOS();
  const [thread, setThread] = useState<Thread | null>(payload ? payload === "personal" ? "personal" : "recruiters" : null);
  const [search, setSearch] = useState(""); const [draft, setDraft] = useState(""); const [more, setMore] = useState(false);
  const [history, setHistory] = useState<Record<Thread, Msg[]>>({ personal: [{ from: "them", text: `Hi, I'm Raihan Mahin. ${profile.headline}. ${profile.bio}` }], recruiters: [{ from: "them", text: "Welcome! These are prewritten portfolio answers, not a live conversation. What would you like to know?" }] });
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => { if (payload) setThread(payload === "personal" ? "personal" : "recruiters"); }, [payload]);
  useEffect(() => { if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight; }, [history, thread]);
  const ask = (question: string) => {
    if (!thread || !question.trim()) return;
    setHistory(prev => ({ ...prev, [thread]: [...prev[thread], { from: "me", text: question }, { from: "them", text: portfolioAnswer(question) }] })); setDraft("");
  };
  const visible = (["personal", "recruiters"] as const).filter(id => `${names[id]} ${id === "personal" ? "Profile and introduction" : "Career résumé contact"}`.toLowerCase().includes(search.toLowerCase()));
  const list = <>
    <header className="flex items-center justify-between px-4 pb-3 pt-2"><h1 className={cn("font-bold", mobile ? "text-[34px]" : "text-lg")}>Messages</h1><Button variant="ghost" size="icon" aria-label="Compose email" title="Compose email" asChild className="text-primary"><a href={`mailto:${profile.email}`}><SquarePen/></a></Button></header>
    <label className="mx-4 mb-5 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-muted-foreground"><Search size={17}/><input aria-label="Search messages" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="min-w-0 w-full bg-transparent text-sm text-foreground outline-none"/></label>
    <div className={mobile ? "grid grid-cols-2 gap-3 px-4" : "px-2"}>{visible.map(id => <Button key={id} variant="ghost" aria-label={`Open ${names[id]}`} onClick={() => { setThread(id); setMore(false); }} className={cn("h-auto whitespace-normal", mobile ? "flex-col gap-2 px-1 py-3" : "mb-1 w-full justify-start gap-3 px-2 py-3", thread === id && !mobile && "bg-secondary")}><Avatar thread={id} large={mobile}/><span className={cn("min-w-0", mobile ? "text-center" : "text-left")}><span className="block text-sm font-semibold">{names[id]}</span><span className="mt-1 block text-xs text-muted-foreground">{id === "personal" ? "Profile & introduction" : "Career, résumé & contact"}</span></span></Button>)}</div>
    {!visible.length && <p className="p-4 text-sm text-muted-foreground">No conversations match.</p>}
  </>;
  return <div className={cn("messages-native native-dark flex min-h-0 flex-col bg-background text-foreground", mobile ? "absolute inset-0 pt-[48px] pb-[max(env(safe-area-inset-bottom),28px)]" : "h-full flex-row")}>
    {(!mobile || !thread) && <aside className={cn("min-h-0 overflow-y-auto", mobile ? "flex-1" : "w-56 shrink-0 border-r border-border")}>{mobile && <Button variant="ghost" className="ml-1 text-primary" onClick={onHome}><ChevronLeft/>Home</Button>}{list}</aside>}
    {thread ? <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="relative flex min-h-[86px] shrink-0 flex-col items-center justify-center gap-1 border-b border-border px-16"><Button variant="ghost" size="icon" aria-label="Back to messages" className="absolute left-2 top-5 text-primary" onClick={() => { setThread(null); setDraft(""); }}><ChevronLeft/></Button><Avatar thread={thread}/><h2 className="text-center text-xs font-semibold">{names[thread]}</h2></header>
      <div ref={scroll} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">{history[thread].map((m,i) => <div key={i} className={cn("flex", m.from === "me" && "justify-end")}><p className={cn("max-w-[86%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed", m.from === "me" ? "rounded-br-sm bg-bubble-me text-primary-foreground" : "rounded-bl-sm bg-bubble-them")}>{m.text}</p></div>)}</div>
      <div className="shrink-0 border-t border-border pb-2">
        <div className="flex gap-2 overflow-x-auto px-3 py-2">{(thread === "personal" ? ["Quick summary?", "Contact?"] : more ? qa.map(q => q.q) : chatSuggestions).map(q => <Button key={q} variant="secondary" className="h-8 shrink-0 rounded-full px-3 text-xs" onClick={() => ask(q)}>{q}</Button>)}{thread === "recruiters" && <Button variant="ghost" className="h-8 shrink-0 text-xs text-primary" onClick={() => setMore(v => !v)}>{more ? "Quick questions" : "More questions"}</Button>}</div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 px-4 pb-2"><Button variant="link" className="h-7 p-0 text-xs" onClick={() => os.open("preview")}>View résumé</Button><Button variant="link" asChild className="h-7 p-0 text-xs"><a href={`mailto:${profile.email}`}>Email</a></Button><Button variant="link" asChild className="h-7 p-0 text-xs"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></Button></div>
        <form onSubmit={e => { e.preventDefault(); ask(draft); }} className="mx-3 flex gap-2 rounded-full border border-border px-3 py-1"><input aria-label="Portfolio question" placeholder="Ask about my portfolio" value={draft} onChange={e => setDraft(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none"/><Button type="submit" aria-label="Ask question" disabled={!draft.trim()} className="size-8 shrink-0 rounded-full p-0"><ArrowUp/></Button></form><p className="mt-1 text-center text-[10px] text-muted-foreground">Prewritten answers · Nothing is sent</p>
      </div>
    </section> : !mobile && <div className="grid flex-1 place-items-center text-sm text-muted-foreground">Select a conversation</div>}
  </div>;
}