"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  deleteResumeField,
  updateResumeField,
} from "./resumeEditorUtils";
import { ResumeEditToolbar } from "./ResumeEditToolbar";

export type ResumeEditorContextValue = {
  selectedField: string | null;
  selectedElement: HTMLElement | null;
  toolbarPosition: { top: number; left: number };
  setSelection: (field: string, element: HTMLElement) => void;
  clearSelection: () => void;
  updateField: (field: string, value: unknown) => void;
  deleteField: (field: string) => void;
  startInlineEdit: () => void;
  isToneMenuOpen: boolean;
  setIsToneMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: React.RefObject<HTMLDivElement | null>;
};

export const ResumeEditorContext = createContext<ResumeEditorContextValue | null>(null);

type ResumeEditorProviderProps = {
  resumeData: Record<string, any>;
  onResumeDataChange: (nextValue: Record<string, any>) => void;
  children: ReactNode;
};

export function ResumeEditorProvider({
  resumeData,
  onResumeDataChange,
  children,
}: ResumeEditorProviderProps) {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [isToneMenuOpen, setIsToneMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const updateField = useCallback(
    (field: string, value: unknown) => {
      if (!field) return;
      onResumeDataChange(updateResumeField(resumeData, field, value) as Record<string, any>);
    },
    [onResumeDataChange, resumeData],
  );

  const deleteField = useCallback(
    (field: string) => {
      if (!field) return;
      onResumeDataChange(deleteResumeField(resumeData, field) as Record<string, any>);
    },
    [onResumeDataChange, resumeData],
  );

  const setSelection = useCallback((field: string, element: HTMLElement) => {
    setSelectedField(field);
    setSelectedElement(element);
    setIsToneMenuOpen(false);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedField(null);
    setSelectedElement(null);
    setIsToneMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!selectedElement) return;

    const updateToolbarPosition = () => {
      const rect = selectedElement.getBoundingClientRect();
      const menuWidth = 240;
      const menuHeight = 260;
      let left = rect.right + 14;
      let top = rect.top + 4;

      if (left + menuWidth > window.innerWidth - 18) {
        left = rect.left - menuWidth - 10;
      }

      if (top + menuHeight > window.innerHeight - 18) {
        top = Math.max(12, rect.bottom - menuHeight);
      }

      setToolbarPosition({ top, left });
    };

    updateToolbarPosition();

    const handleScroll = () => updateToolbarPosition();
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [selectedElement]);

  useEffect(() => {
    if (!selectedElement && !selectedField) return;

    const handleDocumentPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const clickedInsideSelected = selectedElement?.contains(target);
      const clickedInsideToolbar = menuRef.current?.contains(target);

      if (!clickedInsideSelected && !clickedInsideToolbar) {
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleDocumentPointerDown);
    return () => document.removeEventListener("mousedown", handleDocumentPointerDown);
  }, [clearSelection, selectedElement, selectedField]);

  const startInlineEdit = useCallback(() => {
    if (!selectedElement || !selectedField) return;

    const editableNode = selectedElement as HTMLElement;
    const originalText = editableNode.textContent ?? "";

    editableNode.setAttribute("contenteditable", "true");
    editableNode.focus();
    editableNode.style.outline = "2px solid #4d8bff";

    const range = document.createRange();
    range.selectNodeContents(editableNode);
    range.collapse(false);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const onBlur = () => {
      const nextValue = (editableNode.textContent ?? "").replace(/\s+/g, " ").trim();
      const previousValue = originalText.replace(/\s+/g, " ").trim();

      if (nextValue && nextValue !== previousValue) {
        updateField(selectedField, nextValue);
      }

      editableNode.setAttribute("contenteditable", "false");
      editableNode.style.outline = "";
      clearSelection();
    };

    editableNode.addEventListener("blur", onBlur, { once: true });

    editableNode.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          editableNode.blur();
        }

        if (event.key === "Escape") {
          event.preventDefault();
          editableNode.textContent = originalText;
          editableNode.blur();
        }
      },
      { once: true },
    );
  }, [clearSelection, selectedElement, selectedField, updateField]);

  const value = useMemo<ResumeEditorContextValue>(
    () => ({
      selectedField,
      selectedElement,
      toolbarPosition,
      setSelection,
      clearSelection,
      updateField,
      deleteField,
      startInlineEdit,
      isToneMenuOpen,
      setIsToneMenuOpen,
      menuRef,
    }),
    [clearSelection, deleteField, isToneMenuOpen, selectedElement, selectedField, setSelection, startInlineEdit, toolbarPosition, updateField],
  );

  return (
    <ResumeEditorContext.Provider value={value}>
      <>{children}</>
      {selectedField && selectedElement && typeof document !== "undefined"
        ? createPortal(<ResumeEditToolbar />, document.body)
        : null}
    </ResumeEditorContext.Provider>
  );
}
