import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, Search, SquarePen, ArrowUp, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { messageThreads, profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { messageReply, resolveMessageThread, type MessageReply, type MessageThread } from "@/lib/messages-chat";
import { Portrait } from "../Portrait";
import { useOS } from "../store";

type Msg = MessageReply & { from: "me" | "them" };
function Avatar({ thread }: { thread: MessageThread }) {
  const meta = messageThreads.find(t => t.id === thread);
  return thread === "personal" ? <Portrait className="size-10 shrink-0"/> : <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{meta?.initials}</span>;
}
export function Messages({ mobile = false, onHome, payload }: { mobile?: boolean; onHome?: () => void; payload?: string | undefined }) {
  const os = useOS();
  const [thread, setThread] = useState<MessageThread | null>(() => resolveMessageThread(payload) ?? (mobile ? null : "recruiters"));
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<Partial<Record<MessageThread, Msg[]>>>(() => Object.fromEntries(messageThreads.map(t => [t.id, t.welcome.map(text => ({ from: "them", text }))])));
  const scroll = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Partial<Record<MessageThread, HTMLButtonElement | null>>>({});
  const searchRef = useRef<HTMLInputElement>(null);
  const composer = useRef<HTMLInputElement>(null);
  useEffect(() => { const selected = resolveMessageThread(payload); if (selected) { setThread(selected); setDraft(""); } }, [payload]);
  useEffect(() => { if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight; }, [history, thread]);
  const select = (id: MessageThread) => { setThread(id); setDraft(""); };
  const back = () => { setThread(null); setDraft(""); requestAnimationFrame(() => searchRef.current?.focus()); };
  const ask = (question: string) => {
    if (!thread || !question.trim()) return;
    const text = question.trim();
    const reply = messageReply(thread, text);
    setHistory(prev => ({ ...prev, [thread]: [...(prev[thread] ?? []), { from: "me", text }, { from: "them", ...reply }] }));
    setDraft("");
  };
  const visible = messageThreads.filter(t => `${t.name} ${t.preview}`.toLowerCase().includes(search.trim().toLowerCase()));
  const keyboard = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = e.key === "ArrowDown" ? visible[(index + 1) % visible.length] : e.key === "ArrowUp" ? visible[(index - 1 + visible.length) % visible.length] : e.key === "Home" ? visible[0] : e.key === "End" ? visible.at(-1) : undefined;
    if (target) { e.preventDefault(); rowRefs.current[target.id]?.focus(); }
    if (e.key === "ArrowRight" && thread) { e.preventDefault(); composer.current?.focus(); }
  };
  const current = messageThreads.find(t => t.id === thread);
  return <div onKeyDown={e => { if (e.key === "Escape" && mobile && thread) { e.stopPropagation(); back(); } }} className={cn("messages-native native-dark flex min-h-0 flex-col bg-background text-foreground", mobile ? "absolute inset-0 pt-[48px] pb-[max(env(safe-area-inset-bottom),28px)]" : "h-full flex-row")}>
    {(!mobile || !thread) && <aside aria-label="Conversations" className={cn("min-h-0 overflow-y-auto", mobile ? "flex-1" : "w-[42%] max-w-72 shrink-0 border-r border-border")}>
      {mobile && <Button variant="ghost" className="ml-1 text-primary" onClick={onHome}><ChevronLeft/>Home</Button>}
      <header className="flex items-center justify-between px-4 pb-3 pt-2"><h1 className={cn("font-bold", mobile ? "text-[34px]" : "text-lg")}>Messages</h1><Button variant="ghost" size="icon" aria-label="Compose email" title="Compose email" asChild className="text-primary"><a href={`mailto:${profile.email}`}><SquarePen/></a></Button></header>
      <label className="mx-4 mb-3 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-muted-foreground"><Search size={17}/><input ref={searchRef} aria-label="Search messages" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => { if (e.key === "ArrowDown" || e.key === "Enter") { e.preventDefault(); const first = visible[0]; if (first) rowRefs.current[first.id]?.focus(); } if (e.key === "Escape") setSearch(""); }} className="min-w-0 w-full bg-transparent text-sm text-foreground outline-none"/></label>
      <div className="px-2 pb-4">{[true, false].map(pinned => <div key={String(pinned)}>{visible.some(t => t.pinned === pinned) && <p className="flex items-center gap-1 px-2 pb-1 pt-3 text-[11px] font-semibold text-muted-foreground">{pinned && <Pin size={11} aria-hidden/>}{pinned ? "Pinned" : "Topics"}</p>}{visible.filter(t => t.pinned === pinned).map(t => <Button key={t.id} ref={el => { rowRefs.current[t.id] = el; }} variant="ghost" aria-label={`Open ${t.name}`} aria-current={thread === t.id ? "true" : undefined} onKeyDown={e => keyboard(e, visible.indexOf(t))} onClick={() => select(t.id)} className={cn("mb-0.5 h-auto w-full min-w-0 justify-start gap-3 rounded-lg px-2 py-3 whitespace-normal", thread === t.id && !mobile && "bg-secondary")}><Avatar thread={t.id}/><span className="min-w-0 flex-1 text-left"><span className="block text-sm font-semibold leading-snug">{t.name}</span><span className="mt-1 line-clamp-2 block text-xs font-normal leading-snug text-muted-foreground">{t.preview}</span></span></Button>)}</div>)}</div>
      {!visible.length && <p className="p-4 text-sm text-muted-foreground" role="status">No conversations match.</p>}
    </aside>}
    {thread && current ? <section aria-label={`${current.name} conversation`} className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="relative flex min-h-[86px] shrink-0 flex-col items-center justify-center gap-1 border-b border-border px-12"><Button variant="ghost" size="icon" aria-label="Back to messages" className="absolute left-2 top-5 text-primary" onClick={back}><ChevronLeft/></Button><Avatar thread={thread}/><h2 className="text-center text-xs font-semibold">{current.name}</h2></header>
      <div ref={scroll} role="log" aria-label="Portfolio answers" aria-live="polite" className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">{(history[thread] ?? []).map((m,i) => <div key={i} className={cn("flex", m.from === "me" && "justify-end")}><div className={cn("max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed", m.from === "me" ? "rounded-br-sm bg-bubble-me text-primary-foreground" : "rounded-bl-sm bg-bubble-them")}><p className="whitespace-pre-line break-words">{m.text}</p>{m.actions && <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{m.actions.map(action => action.href ? <Button key={action.label} variant="link" asChild className="h-auto p-0 text-xs"><a href={action.href} target={action.href.startsWith("https:") ? "_blank" : undefined} rel={action.href.startsWith("https:") ? "noreferrer" : undefined}>{action.label}</a></Button> : <Button key={action.label} variant="link" className="h-auto p-0 text-left text-xs whitespace-normal" onClick={() => { if (action.app) os.open(action.app, action.payload); }}>{action.label}</Button>)}</div>}</div></div>)}</div>
      <div className="shrink-0 border-t border-border pb-2">
        <div className="flex flex-wrap gap-1.5 px-3 py-2">{current.prompts.map(q => <Button key={q} variant="secondary" className="h-auto min-h-8 max-w-full rounded-full px-3 py-1.5 text-left text-xs whitespace-normal" onClick={() => ask(q)}>{q}</Button>)}</div>
        <form onSubmit={e => { e.preventDefault(); ask(draft); }} className="mx-3 flex gap-2 rounded-full border border-border px-3 py-1"><input ref={composer} aria-label="Portfolio question" placeholder="Ask about my work" value={draft} onChange={e => setDraft(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none"/><Button type="submit" aria-label="Ask question" disabled={!draft.trim()} className="size-8 shrink-0 rounded-full p-0"><ArrowUp/></Button></form><p className="mt-1 text-center text-[10px] text-muted-foreground">Portfolio Q&amp;A · Nothing is sent</p>
      </div>
    </section> : !mobile && <div className="grid min-w-0 flex-1 place-items-center px-4 text-sm text-muted-foreground">Select a conversation</div>}
  </div>;
}
