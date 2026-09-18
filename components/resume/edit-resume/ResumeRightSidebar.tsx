import { ResumeAiPanel } from "@/components/resume/edit-resume/ResumeAiPanel";
import { ResumeEditPanel } from "@/components/resume/edit-resume/ResumeEditPanel";
import type { ResumeFormData } from "@/components/resume/form/types";
import type { ResumeData } from "@/types/resume";

type ResumeRightSidebarProps = {
  resumeData: ResumeFormData | ResumeData;
  isEditing: boolean;
  isAiEnhanceOpen: boolean;
  fontFamily: string;
  accentColor: number;
  selectedTemplate: string;
  onCloseEdit: () => void;
  onCloseAi: () => void;
  onFontChange: (value: string) => void;
  onAccentChange: (value: number) => void;
  onTemplateChange: (value: string) => void;
};

export function ResumeRightSidebar({
  resumeData,
  isEditing,
  isAiEnhanceOpen,
  fontFamily,
  accentColor,
  selectedTemplate,
  onCloseEdit,
  onCloseAi,
  onFontChange,
  onAccentChange,
  onTemplateChange,
}: ResumeRightSidebarProps) {
  if (isEditing) {
    return (
      <ResumeEditPanel
        resumeData={resumeData}
        fontFamily={fontFamily}
        accentColor={accentColor}
        selectedTemplate={selectedTemplate}
        onClose={onCloseEdit}
        onFontChange={onFontChange}
        onAccentChange={onAccentChange}
        onTemplateChange={onTemplateChange}
      />
    );
  }

  if (isAiEnhanceOpen) {
    return <ResumeAiPanel onClose={onCloseAi} />;
  }

  return null;
}

export default ResumeRightSidebar;
