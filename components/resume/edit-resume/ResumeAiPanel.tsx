import { ArrowRight, ListChecks, Pencil, Plus, SpellCheck, WandSparkles } from "lucide-react";

type ResumeAiPanelProps = {
  onClose: () => void;
};

const aiEnhanceOptions = [
  { label: "Update my resume", icon: Pencil },
  { label: "Fix formatting", icon: ListChecks },
  { label: "Fix grammar & clarity", icon: SpellCheck },
  { label: "Improve bullet points", icon: WandSparkles },
];

export function ResumeAiPanel({ onClose }: ResumeAiPanelProps) {
  return (
    <aside className="flex h-full flex-col border-l border-white/10 bg-[#0d0e0e] px-3 py-5">
      <div className="mx-auto flex w-full max-w-[330px] flex-1 flex-col justify-between">
        <div className="pt-[108px]">
          <div className="mb-7">
            <p className="text-[15px] font-medium text-[#75c7c5]">Good afternoon, Shreya</p>
            <h2 className="mt-2 text-[16px] font-medium leading-tight text-white">
              How can I help you Today?
            </h2>
          </div>

          <div className="flex flex-col items-start gap-2">
            {aiEnhanceOptions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="flex h-[34px] items-center gap-2 rounded-full border border-white/10 bg-[#1a1d1d] px-4 text-left text-[12px] text-white/85 transition hover:border-[#50c9c2]/60 hover:bg-[#50c9c2]/10"
              >
                <Icon className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 h-[113px] rounded-[11px] border border-white/10 bg-[#1a1c1c] p-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#f8e3e4] text-[8px] font-semibold text-[#a34b4c]">PDF</div>
          <button
            type="button"
            aria-label="Attach a file"
            className="absolute bottom-3 left-3 text-white/65 transition hover:text-white"
          >
            <Plus className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Send resume to AI assistant"
            className="absolute bottom-3 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#087f7d] text-sm font-medium text-white transition hover:bg-[#0b9290]"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default ResumeAiPanel;
