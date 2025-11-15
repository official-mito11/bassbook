import type { Length, LengthAlias, RawLengthValue } from "../types";

const UNIT_MAP: Record<LengthAlias, RawLengthValue> = {
  "full": "100%",
  "half": "50%",
  "quarter": "25%",
}

export function sized(size: Length): RawLengthValue {
  if (typeof size === "number") {
    return `${size}px`;
  } else if (typeof size === "string") {
    const keys = Object.keys(UNIT_MAP) as LengthAlias[];
    if (keys.includes(size as LengthAlias)) {
      return UNIT_MAP[size as LengthAlias];
    }
  }
  return size as RawLengthValue;
}