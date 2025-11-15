import type * as csstype from "csstype";

export type Property = {
  [key: string]: any;
} & csstype.Properties;