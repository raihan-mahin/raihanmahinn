import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Messages } from "@/os/apps/Messages";
import { messageReply, resolveMessageThread } from "@/lib/messages-chat";
import { projectById, profile } from "@/data/portfolio";
const open = vi.fn();
vi.mock("@/os/store", () => ({ useOS: () => ({ open }) }));
afterEach(() => { cleanup(); open.mockClear(); });

describe("Messages navigation and actions", () => {
  it("starts desktop with recruiters and honors both legacy explicit payloads", () => {
    const view = render(<Messages/>);
    expect(screen.getByRole("region", { name: "Recruiters & Hiring conversation" })).toBeInTheDocument();
    view.rerender(<Messages payload="personal"/>);
    expect(screen.getByRole("region", { name: "Raihan Mahin conversation" })).toBeInTheDocument();
    view.rerender(<Messages payload="recruiters"/>);
    expect(screen.getByRole("region", { name: "Recruiters & Hiring conversation" })).toBeInTheDocument();
    expect(resolveMessageThread("pureit")).toBe("pureit");
  });
  it("starts phone on the six-conversation list, searches and returns from threads and home", () => {
    const home = vi.fn();
    render(<Messages mobile onHome={home}/>);
    expect(screen.queryByRole("log")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(6);
    fireEvent.change(screen.getByRole("textbox", { name: "Search messages" }), { target: { value: "Pureit" } });
    expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Open Pureit Brand Transition" }));
    expect(screen.getByRole("log")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Back to messages" }));
    fireEvent.click(screen.getByRole("button", { name: "Home" }));
    expect(home).toHaveBeenCalledOnce();
  });
  it("supports search-to-list keyboard focus and arrow navigation", () => {
    render(<Messages/>);
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Search messages" }), { key: "ArrowDown" });
    expect(screen.getByRole("button", { name: "Open Raihan Mahin" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement ?? document.body, { key: "ArrowDown" });
    expect(screen.getByRole("button", { name: "Open Recruiters & Hiring" })).toHaveFocus();
  });
  it("answers prompts/free text and opens the correct case, résumé and real contact links", () => {
    render(<Messages/>);
    const thread = screen.getByRole("region", { name: "Recruiters & Hiring conversation" });
    fireEvent.click(within(thread).getByRole("button", { name: "What did you do at Pureit?" }));
    fireEvent.click(within(thread).getByRole("button", { name: "Open Pureit case study" }));
    expect(open).toHaveBeenLastCalledWith("photos", "pureit-transition");
    fireEvent.click(within(thread).getByRole("button", { name: "View résumé" }));
    fireEvent.click(within(screen.getByRole("log")).getByRole("button", { name: "View résumé" }));
    expect(open).toHaveBeenLastCalledWith("preview", undefined);
    fireEvent.click(within(thread).getByRole("button", { name: "Get in touch" }));
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", profile.linkedin);
    fireEvent.change(screen.getByRole("textbox", { name: "Portfolio question" }), { target: { value: "Show XYZ reels" } });
    fireEvent.click(screen.getByRole("button", { name: "Ask question" }));
    fireEvent.click(screen.getByRole("button", { name: "Open XYZ portfolio" }));
    expect(open).toHaveBeenLastCalledWith("photos", "agency");
  });
  it("maps awards and client responses to real projects without claiming the response target was achieved", () => {
    for (const question of ["Tell me about Marico", "What did you pitch at Admaker?", "Which client accounts?"]) {
      const reply = messageReply("competitions", question);
      const action = reply.actions?.[0];
      expect(action?.app).toBe("photos");
      expect(projectById(action?.payload ?? "")).toBeDefined();
    }
    expect(messageReply("x-integrated", "How did you handle queries?").text).toContain("90%");
    expect(messageReply("x-integrated", "How did you handle queries?").text).toContain("response target, not an achieved result");
  });
});