"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AddButton, Field, Input, SectionCard } from "@/components/resume/form/FormPrimitives";
import { createEmptySkill, type SkillItem } from "@/components/resume/form/types";

function SkillList({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: SkillItem[];
  onChange: (value: SkillItem[]) => void;
}) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const name = input.trim();

    if (!name) return;

    onChange([
      ...value,
      {
        ...createEmptySkill(),
        name,
      },
    ]);

    setInput("");
  };

  const removeSkill = (id: string) => {
    onChange(value.filter((skill) => skill.id !== id));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  return (
    <Field label={label}>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1"
          />

          <button
            type="button"
            onClick={addSkill}
            className="h-11 rounded-md bg-[#087F80] px-8 text-sm font-medium text-white transition hover:bg-[#096F70]"
          >
            Add
          </button>
        </div>

        {value.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {value.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 rounded-md bg-on-primary/10 px-3 py-1.5 text-xs text-on-primary/80"
              >
                <span>{skill.name}</span>

                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-on-primary/40 transition hover:text-destructive"
                  aria-label={`Remove ${skill.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Field>
  );
}

export function SkillsSection({
  technicalSkills,
  softSkills,
  tools,
  onChange,
  isUnlocked = false,
}: {
  technicalSkills: SkillItem[];
  softSkills: SkillItem[];
  tools: SkillItem[];
  isUnlocked?: boolean;
  onChange: (
    field: "technicalSkills" | "softSkills" | "tools",
    value: SkillItem[]
  ) => void;
}) {
  return (
    <SectionCard
      number={4}
      isUnlocked={isUnlocked}
      title="Skills"
      description="Highlight your professional competencies"
    >
      <div className="space-y-5">
        <SkillList
          label="Technical Skills"
          placeholder="e.g., JavaScript, Python, React..."
          value={technicalSkills}
          onChange={(value) => onChange("technicalSkills", value)}
        />

        <SkillList
          label="Soft Skills"
          placeholder="e.g., Leadership, communication, Problem Solving"
          value={softSkills}
          onChange={(value) => onChange("softSkills", value)}
        />

        <SkillList
          label="Tools"
          placeholder="e.g., Git, Notion, Figma, VS Code"
          value={tools}
          onChange={(value) => onChange("tools", value)}
        />
      </div>
    </SectionCard>
  );
}