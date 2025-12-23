function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function keyframeNameForComponent(componentName: string, keyframeName: string): string {
  return `bb-${componentName}-${keyframeName}`;
}

export function serializeNamespacedKeyframes(keyframes: unknown, componentName: string): string | undefined {
  if (!keyframes || typeof keyframes !== "object") return undefined;
  const kf = keyframes as Record<string, unknown>;
  const blocks: string[] = [];

  for (const [name, framesUnknown] of Object.entries(kf)) {
    if (!framesUnknown || typeof framesUnknown !== "object") continue;
    const frames = framesUnknown as Record<string, unknown>;
    const steps: string[] = [];

    for (const [pct, declsUnknown] of Object.entries(frames)) {
      if (!declsUnknown || typeof declsUnknown !== "object") continue;
      const decls = declsUnknown as Record<string, unknown>;
      const pairs: string[] = [];
      for (const [prop, val] of Object.entries(decls)) {
        if (val === undefined || val === null) continue;
        pairs.push(`${toKebabCase(prop)}:${String(val)}`);
      }
      steps.push(`${pct}{${pairs.join(";")}}`);
    }

    if (steps.length > 0) {
      blocks.push(`@keyframes ${keyframeNameForComponent(componentName, name)}{${steps.join("")}}`);
    }
  }

  return blocks.length > 0 ? blocks.join("\n") : undefined;
}

export function namespaceKeyframeReferencesInStyleObject(options: {
  style: Record<string, unknown>;
  componentName: string;
  keyframeNames: readonly string[];
}): void {
  const { style, componentName, keyframeNames } = options;
  if (!style || keyframeNames.length === 0) return;

  const replaceInString = (input: string) => {
    let out = input;
    for (const n of keyframeNames) {
      const re = new RegExp(`\\b${escapeRegExp(n)}\\b`, "g");
      out = out.replace(re, keyframeNameForComponent(componentName, n));
    }
    return out;
  };

  const visit = (obj: Record<string, unknown>) => {
    for (const [k, v] of Object.entries(obj)) {
      if ((k === "animation" || k === "animationName") && typeof v === "string") {
        obj[k] = replaceInString(v);
        continue;
      }
      if (v && typeof v === "object" && !Array.isArray(v)) {
        visit(v as Record<string, unknown>);
      }
    }
  };

  visit(style);
}
