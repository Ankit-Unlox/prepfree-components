export interface TemplateComponents {
  [key: string]: string;
}

export interface ResumeTemplate {
  template: string;
  colorOptions?: string[];
  template_components?: TemplateComponents;
}
