"use client";

import { Pen, SquarePen, TextAlignCenter, TextAlignJustify, Trash2 } from "lucide-react";
import { useResumeEditor } from "./useResumeEditor";

export function ResumeEditToolbar() {
  const {
    selectedField,
    selectedElement,
    toolbarPosition,
    deleteField,
    clearSelection,
    startInlineEdit,
    isToneMenuOpen,
    setIsToneMenuOpen,
    menuRef,
  } = useResumeEditor();

  const logButtonTitle = (title: string) => {
    console.log(title);
  };

  if (!selectedField || !selectedElement) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="resume-editor-layer fixed z-[1200] w-[240px] rounded-xl border border-[#2a2e38] bg-[#171b20]/95 p-1.5 text-sm text-white shadow-2xl backdrop-blur-sm"
      style={{ top: toolbarPosition.top, left: toolbarPosition.left }}
      onMouseLeave={() => setIsToneMenuOpen(false)}
    >
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition cursor-pointer hover:bg-[#2a3139]"
        onClick={() => {
          if (!selectedField) return;
          startInlineEdit();
        }}
      >
        <SquarePen className="h-4 w-4" />
        <span>Rewrite</span>
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition cursor-pointer hover:bg-[#2a3139]"
        onClick={() => logButtonTitle("Make shorter")}
      >
        <TextAlignCenter className="h-4 w-4" />
        <span>Make shorter</span>
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition cursor-pointer hover:bg-[#2a3139]"
        onClick={() => logButtonTitle("Make longer")}
      >
        <TextAlignJustify className="h-4 w-4" />
        <span>Make longer</span>
      </button>

      <div className="relative">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left transition cursor-pointer hover:bg-[#2a3139]"
          onClick={() => setIsToneMenuOpen((pre) => !pre)}
        >
          <span className="flex items-center gap-2">
            <Pen className="h-4 w-4" />
            Change tone
          </span>
          <span className="text-base text-[#adb5bd]">›</span>
        </button>

        {(isToneMenuOpen) && (
          <div
            className="absolute left-full top-0 ml-2 w-36 overflow-hidden rounded-xl border border-[#2a2e38] bg-[#171b20]/95 shadow-2xl"
          >
            {[
              "Formal",
              "Casual",
              "Concise",
            ].map((tone) => (
              <button
                key={tone}
                type="button"
                className="flex w-full items-center px-3 py-2 text-left transition cursor-pointer hover:bg-[#2a3139]"
                onClick={() => logButtonTitle(tone)}
              >
                {tone}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[#ff8a8a] transition cursor-pointer hover:bg-[#2a3139]"
        onClick={() => {
          if (!selectedField) return;
          deleteField(selectedField);
          clearSelection();
        }}
      >
        <Trash2 className="h-4 w-4" />
        <span>Delete</span>
      </button>
    </div>
  );
}
