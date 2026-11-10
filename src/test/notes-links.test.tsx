import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { notes, profile } from "@/data/portfolio";
import { Render } from "@/os/apps/Notes";

const { open } = vi.hoisted(() => ({ open: vi.fn() }));
vi.mock("@/os/store", () => ({ useOS: () => ({ open }) }));
afterEach(() => { cleanup(); open.mockClear(); });

describe("Notes contact actions", () => {
  it("opens Photos from the About note", () => {
    render(<Render body={notes.find(note => note.id === "about")?.body ?? ""}/>);
    fireEvent.click(screen.getByRole("button", { name: "Open Photos" }));
    expect(open).toHaveBeenCalledWith("photos");
  });
  it("links the owner's public email and profiles", () => {
    render(<Render body={notes.find(note => note.id === "about")?.body ?? ""}/>);
    expect(screen.getByRole("link", { name: "Email" }).getAttribute("href")).toBe("mailto:raihanmahin.work@gmail.com");
    expect(screen.getByRole("link", { name: "Behance" }).getAttribute("href")).toBe(profile.behance);
    expect(screen.getByRole("link", { name: "LinkedIn" }).getAttribute("href")).toBe(profile.linkedin);
  });
  it("does not create executable links from edited notes", () => {
    render(<Render body="[Unsafe](javascript:alert) [Data](data:text/html,test)"/>);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});