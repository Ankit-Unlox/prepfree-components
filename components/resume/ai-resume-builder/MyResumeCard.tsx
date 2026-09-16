"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { ResumeCard, ResumeData } from "@/types/resume";
import {
  Check,
  ChevronRight,
  CirclePlus,
  Ellipsis,
  Eye,
  EyeOff,
  FilePenLine,
  FolderOpen,
  Pen,
  Trash2,
} from "lucide-react";
import ResumeTemplateOne from "@/components/resume/templets/resumeTemplateOne";
import ResumeTemplateTwo from "@/components/resume/templets/resumeTemplateTwo";
import ResumeTemplateThree from "@/components/resume/templets/resumeTemplateThree";

function ResumePreview({
  template,
  data,
}: {
  template: ResumeCard["template"];
  data: ResumeData;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const templateComponents: Record<
    ResumeCard["template"],
    ComponentType<any>
  > = {
    classic: ResumeTemplateOne,
    modern: ResumeTemplateTwo,
    minimal: ResumeTemplateThree,
  };
  const TemplateComponent = templateComponents[template];

  useEffect(() => {
    const element = previewRef.current;
    if (!element) return;

    const updateWidth = () => setContainerWidth(element.clientWidth);
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    updateWidth();

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={previewRef} className="h-full overflow-hidden rounded-t-lg ">
      {containerWidth > 0 && (
        <TemplateComponent
          ref={null}
          resumeData={data}
          colorIndex={
            template === "modern" ? 2 : template === "minimal" ? 4 : 0
          }
          containerWidth={containerWidth}
        />
      )}
    </div>
  );
}

function ResumeCardItem({ resume }: { resume: ResumeCard }) {


  return (
    <article className="aspect-4/3 flex flex-col overflow-hidden rounded-xl bg-primary border">
      <div className="w-full flex-1 overflow-hidden px-3 pt-3">
          <ResumePreview template={resume.template} data={resume.data} />
      </div>
      <div className="w-full min-h-[20%] flex items-center justify-between gap-2 p-2 bg-[color-mix(in_srgb,var(--primary)_80%,black)]">
        <p className="font-bold text-[14px] text-on-primary">{resume.name}</p>
        <div className="flex shrink-0 items-center gap-2 text-on-primary/60">
          <button
            type="button"
            title={`Edit Resume`}
            className="cursor-pointer"
          >
            <Pen className="h-4 w-4" />
          </button>
          <button
            type="button"
            title={`More options Resume`}
            className="cursor-pointer"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            title={`Delete Resume`}
            className="cursor-pointer"
          >
            <Trash2 className="h-4 w-4 text-[#CE6A6A]" />
          </button>
        </div>
      </div>
    </article>
  );
}

export { ResumeCardItem };
