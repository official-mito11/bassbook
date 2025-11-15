import type { Length, LengthAlias, RawLengthValue } from "../types";

const LEN_MAP: Record<LengthAlias, RawLengthValue> = {
  "full": "100%",
  "half": "50%",
  "quarter": "25%",
}

export function lengthed(length: Length): RawLengthValue {
  if (typeof length === "number") {
    return `${length}px`;
  } else if (typeof length === "string") {
    const lenKeys = Object.keys(LEN_MAP) as LengthAlias[];
    if (lenKeys.includes(length as LengthAlias)) {
      return LEN_MAP[length as LengthAlias];
    }
  }
  return length as RawLengthValue;
}