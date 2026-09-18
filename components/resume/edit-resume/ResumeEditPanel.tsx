import ResumeTemplatePanel from "@/components/resume/edit-resume/ResumeTemplatePanel";
import type { ResumeFormData } from "@/components/resume/form/types";
import type { ResumeData } from "@/types/resume";

type ResumeEditPanelProps = {
  resumeData: ResumeFormData | ResumeData;
  fontFamily: string;
  accentColor: number;
  selectedTemplate: string;
  onClose: () => void;
  onFontChange: (value: string) => void;
  onAccentChange: (value: number) => void;
  onTemplateChange: (value: string) => void;
};

export function ResumeEditPanel({
  resumeData,
  fontFamily,
  accentColor,
  selectedTemplate,
  onClose,
  onFontChange,
  onAccentChange,
  onTemplateChange,
}: ResumeEditPanelProps) {
  return (
    <aside className="h-full border-l border-white/10 bg-[#0d0e0e] px-4 py-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <h2 className="text-sm font-medium">Edit your resume</h2>
      </div>

      <div className="border-b border-white/10 py-5">
        <p className="mb-5 text-xs font-medium text-[#53b8b4]">Styling</p>
        <label className="mb-2 block text-[10px] text-white/85" htmlFor="resume-font">
          Font
        </label>
        <select
          id="resume-font"
          value={fontFamily}
          onChange={(event) => onFontChange(event.target.value)}
          className="h-9 w-full rounded-md border border-white/10 bg-[#1b1c1c] px-3 text-[10px] text-white/70 outline-none focus:border-[#087f7d]"
        >
          <option>Poppins</option>
          <option>Creato Display</option>
          <option>Georgia</option>
        </select>

        <p className="mb-2 mt-5 text-[10px] text-white/85">Accent Color</p>
        <div className="flex gap-2">
          {["#006666", "#7d47b2", "#2b98de", "#102a73", "#7d7d7d"].map((color, index) => (
            <button
              key={color}
              type="button"
                onClick={() => onAccentChange(index)}
              aria-label={`Choose accent color ${color}`}
              className="h-4 w-4 rounded-full border-2"
              style={{
                backgroundColor: color,
                 borderColor: accentColor === index ? "white" : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      <div className="py-5">
        <p className="mb-4 text-xs font-medium text-[#53b8b4]">My Templates</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onTemplateChange("Browse")}
            className="flex aspect-[1.05] flex-col items-center justify-center rounded-md border border-dashed border-[#53b8b4] bg-[#063f3e] text-[10px] text-[#8be0dc]"
          >
            <span className="mb-1 text-2xl font-light">+</span>
            Browse
            <br />
            More Templates
          </button>

          {["Template One", "Template Two", "Template Three"].map((template) => (
            <button
              key={template}
              type="button"
              onClick={() => onTemplateChange(template)}
              className={`relative aspect-[1.05] rounded-md border p-2 text-left ${selectedTemplate === template ? "border-[#70c6c2]" : "border-white/10"}`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-md bg-white">
                <div
                  className="origin-top-left"
                  style={{ width: "625%", transform: "scale(0.16)" }}
                >
                  <ResumeTemplatePanel
                    resumeData={resumeData}
                    accentColor={accentColor}
                    fontFamily={fontFamily}
                    template={
                      template === "Template Two"
                        ? "modern"
                        : template === "Template Three"
                          ? "minimal"
                          : "classic"
                    }
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-4 text-[10px] text-white/35">
          {selectedTemplate} selected · {fontFamily}
        </p>
      </div>
    </aside>
  );
}

export default ResumeEditPanel;
