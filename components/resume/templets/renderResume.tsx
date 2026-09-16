import React, { forwardRef } from "react";
import ResumeTemplateOne from "@/components/resume/templets/resumeTemplateOne";
import ResumeTemplateTwo from "@/components/resume/templets/resumeTemplateTwo";
import ResumeTemplateThree from "@/components/resume/templets/resumeTemplateThree";
import ResumeTemplateFour from "@/components/resume/templets/resumeTemplateFour";
import HtmlResumeRenderer from "@/components/resume/templets/HtmlResumeRenderer";
import { buildResumeHtml } from "@/components/resume/templets/buildResumeHtml";
import { ResumeTemplate } from "@/hooks/useTemplates";

interface RenderResumeProps {
  templateId: any;
  resumeData: any;
  colorIndex: number;
  containerWidth: number;
  /** If provided, use the server HTML template instead of React components */
  templateData?: ResumeTemplate;
}

const RenderResume = forwardRef(
  (
    {
      templateId,
      resumeData,
      colorIndex,
      containerWidth,
      templateData,
    }: RenderResumeProps,
    ref
  ) => {
    // ── New path: server-provided HTML template ──────────────────────────────
    if (templateData) {
      const colorHex =
        templateData.colorOptions?.[colorIndex] ??
        templateData.colorOptions?.[0] ??
        "#1B8D7A";
      const htmlString = buildResumeHtml(templateData, resumeData, colorHex);
      return (
        <HtmlResumeRenderer
          ref={ref}
          htmlString={htmlString}
          containerWidth={containerWidth}
        />
      );
    }

    // ── Legacy path: hardcoded React components (backward-compat) ────────────
    // switch (templateId) {
    //   case "tmp_x9a3b7p2":
    //     return (
    //       <ResumeTemplateOne
    //         ref={ref}
    //         resumeData={resumeData}
    //         colorIndex={colorIndex}
    //         containerWidth={containerWidth}
    //       />
    //     );
    //   case "tmp_m4d6e2t8":
    //     return (
    //       <ResumeTemplateTwo
    //         ref={ref}
    //         resumeData={resumeData}
    //         colorIndex={colorIndex}
    //         containerWidth={containerWidth}
    //       />
    //     );
    //   case "tmp_q1r9s5u3":
    //     return (
    //       <ResumeTemplateThree
    //         ref={ref}
    //         resumeData={resumeData}
    //         colorIndex={colorIndex}
    //         containerWidth={containerWidth}
    //       />
    //     );
    //   case "tmp_v7n2k8h4":
    //     return (
    //       <ResumeTemplateFour
    //         ref={ref}
    //         resumeData={resumeData}
    //         colorIndex={colorIndex}
    //         containerWidth={containerWidth}
    //       />
    //     );
    //   default:
    //     // If templateData is not provided and it's an unknown templateId, fallback to TemplateOne
    //     return (
    //       <ResumeTemplateOne
    //         ref={ref}
    //         resumeData={resumeData}
    //         colorIndex={colorIndex}
    //         containerWidth={containerWidth}
    //       />
    //     );
    // }
  }
);

RenderResume.displayName = "RenderResume";
export default RenderResume;
