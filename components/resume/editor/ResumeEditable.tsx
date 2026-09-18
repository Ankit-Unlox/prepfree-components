"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { useOptionalResumeEditor } from "./useResumeEditor";

type ResumeEditableProps = HTMLAttributes<HTMLElement> & {
  field: string;
  children: ReactNode;
  as?: any;
};

export function ResumeEditable({
  field,
  children,
  as: Component = "div",
  className = "",
  onClick,
  ...props
}: ResumeEditableProps) {
  const editor = useOptionalResumeEditor();
  const selectedField = editor?.selectedField ?? null;
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedField === field;

  const resolvedClassName = useMemo(() => {
    const classes = [className];

    if (isSelected || isHovered) {
      classes.push("outline outline-2 outline-[#4d8bff] outline-offset-1");
    }

    return classes.filter(Boolean).join(" ");
  }, [className, isHovered, isSelected]);

  const Tag = (Component ?? "div") as any;

  return (
    <Tag
      {...props}
      data-editable="true"
      data-field={field}
      data-resume-editable="true"
      className={resolvedClassName}
      onMouseEnter={(event: any) => {
        setIsHovered(true);
        if (event.currentTarget) {
          event.currentTarget.style.cursor = "text";
        }
      }}
      onMouseLeave={(event: any) => {
        setIsHovered(false);
        if (event.currentTarget) {
          event.currentTarget.style.cursor = "";
        }
      }}
      onClick={(event: any) => {
        if (editor) {
          event.stopPropagation();
        }
        editor?.setSelection(field, event.currentTarget as HTMLElement);
        onClick?.(event);
      }}
      onBlur={() => {
        if (selectedField === field) {
          editor?.clearSelection();
        }
      }}
    >
      {children}
    </Tag>
  );
}
