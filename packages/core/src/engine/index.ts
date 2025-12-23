/**
 * Style Engine Exports
 */

// Context
export { 
  getContext, 
  configure, 
  createContext, 
  resetContext,
  resolveToken,
  resolveVar,
  isTokenRef,
  parseAndResolveToken,
} from "./context";
export type { StyleContext } from "./context";

// Registry
export { 
  getRegistry, 
  createRegistry, 
  resetGlobalRegistry,
} from "./registry";
export type { CSSRule, CSSRegistry } from "./registry";

// Resolvers
export { resolveAllProps } from "./resolvers";
export type { CSSDeclarations, PropertyResolver, PropertyDefinition } from "./resolvers";

// Style functions
export {
  css,
  createStyleFactory,
  inlineStyle,
  cssString,
  extractCSS,
  createSSRContext,
  mergeStyles,
  cx,
} from "./style";
export type { StyleResult, StyleOptions } from "./style";

// Keyframes
export {
  keyframeNameForComponent,
  serializeNamespacedKeyframes,
  namespaceKeyframeReferencesInStyleObject,
} from "./keyframes";

// Framework adapters
export {
  isStyleProp,
  splitProps,
  createStyled,
  SSRStyleCollector,
  createSSRCollector,
  applyStyles,
  createElement,
} from "./adapters";
export type { StyledComponentOptions, StyledResult } from "./adapters";
