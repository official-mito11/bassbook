import type * as csstype from "csstype";

export type PropertyObject = {
  [key: string]: any;
} & csstype.Properties;