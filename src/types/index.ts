export type ToolbarConfValue = boolean | ToolbarConfig | undefined;

export interface ToolbarConfig {
  [key: string]: ToolbarConfValue;
}

export type Theme = "dark" | "light";