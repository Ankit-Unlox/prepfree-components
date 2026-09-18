"use client";

import { useContext } from "react";
import { ResumeEditorContext } from "./ResumeEditorProvider";

export function useResumeEditor() {
  const context = useOptionalResumeEditor();

  if (!context) {
    throw new Error("useResumeEditor must be used within ResumeEditorProvider");
  }

  return context;
}

export function useOptionalResumeEditor() {
  return useContext(ResumeEditorContext);
}
