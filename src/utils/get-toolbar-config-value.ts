import { ToolbarConfValue, ToolbarConfig } from "@/types";

const getToolbarConfigValue = (
  config: ToolbarConfig,
  path: string
): ToolbarConfValue => {
  const props = path.split(".");
  let currValue = config[props[0]];

  for (let i = 1; i < props.length; i++) {
    if (typeof currValue === "object") {
      currValue = currValue[props[i]];
    } else break;
  }
  return currValue;
};

export default getToolbarConfigValue;