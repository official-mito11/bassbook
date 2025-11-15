import type { PropertyObject } from "../types";
import type { Properties } from "csstype";

export function parseToCSS(props: PropertyObject): string {
  return "";
}

export function parseToStyle(props: PropertyObject): Properties {
  return {
    width: props.width,
    height: props.height,
  };
}