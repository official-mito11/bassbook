/**
 * @bassbook/core Usage Examples
 */

import {
  // Core style function
  css,
  cx,
  inlineStyle,
  cssString,
  extractCSS,
  
  // Configuration
  configure,
  createTheme,
  
  // Framework adapters
  createStyled,
  splitProps,
  createSSRCollector,
  
  // Types
  type StyleProps,
  type StyleResult,
} from "../src";

import { defineCoreComponent, defineUnitComponent, el, comp, slot } from "../src/components/spec";
import { renderFromSpecs } from "./component-runtime";

// ============================================
// 1. Basic Usage - css() function
// ============================================

// Generate atomic CSS classes
const result = css({
  p: 16,            // padding: 16px (number → px)
  m: 8,             // margin: 8px
  w: "full",        // width: 100%
  h: "auto",        // height: auto
  bg: "white",      // background-color from color token
  rounded: "lg",    // border-radius from radius token
  shadow: "md",     // box-shadow from shadow token
});

console.log("Basic usage:");
console.log("  className:", result.className);
console.log("  classNames:", result.classNames);
console.log("  css:", result.css);

// ============================================
// 2. Flexbox Layout
// ============================================

const flexResult = css({
  display: "flex",
  flexColumn: true,       // flex-direction: column
  justifyCenter: true,    // justify-content: center
  alignCenter: true,      // align-items: center
  gap: 16,                // gap: 16px
});

console.log("\nFlexbox:");
console.log("  className:", flexResult.className);

// ============================================
// 3. Responsive & Conditional Styles with cx()
// ============================================

const isActive = true;
const combinedClasses = cx(
  css({ p: 16, bg: "white" }).className,
  isActive && css({ bg: "black", color: "white" }).className,
  { "custom-class": true, "disabled": false }
);

console.log("\nConditional styles:");
console.log("  className:", combinedClasses);

// ============================================
// 4. Inline Styles (for CSS variables, etc.)
// ============================================

const styles = inlineStyle({
  p: 16,
  w: "full",
  color: "var(--custom-color)",  // CSS variable → inline style
});

console.log("\nInline styles:");
console.log("  styles:", styles);

// ============================================
// 5. CSS String Output (for SSR or style tags)
// ============================================

const cssStr = cssString({
  p: 16,
  m: 8,
  bg: "white",
}, ".my-component");

console.log("\nCSS string:");
console.log("  css:", cssStr);

// ============================================
// 6. Custom Theme Configuration
// ============================================

configure({
  theme: {
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
      danger: "#ef4444",
    },
    vars: {
      "--brand-color": "#6366f1",
    },
  },
});

const themedResult = css({
  bg: "primary",      // Uses custom color token
  p: 16,              // 16px
  color: "white",
});

console.log("\nCustom theme:");
console.log("  className:", themedResult.className);

// ============================================
// 7. Variant-based Styling (like CVA)
// ============================================

const button = createStyled({
  base: {
    display: "inline-flex",
    alignCenter: true,
    justifyCenter: true,
    rounded: "md",
    fontWeight: "medium",
    transition: "all 150ms ease",
  },
  variants: {
    size: {
      sm: { px: 12, py: 6, fontSize: "0.875rem" },
      md: { px: 16, py: 8, fontSize: "1rem" },
      lg: { px: 24, py: 12, fontSize: "1.125rem" },
    },
    variant: {
      primary: { bg: "primary", color: "white" },
      secondary: { bg: "secondary", color: "white" },
      outline: { border: "1px solid currentColor", bg: "transparent" },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const primaryButton = button({ size: "lg", variant: "primary" });
const outlineButton = button({ variant: "outline", p: 32 }); // Override with direct props

console.log("\nVariant styling:");
console.log("  primary button:", primaryButton.className);
console.log("  outline button:", outlineButton.className);

// ============================================
// 8. Props Splitting (for framework integration)
// ============================================

const componentProps = {
  p: 16,
  m: 8,
  bg: "white",
  onClick: () => console.log("clicked"),
  children: "Hello",
  className: "custom",
};

const { styleProps, domProps } = splitProps(componentProps);

console.log("\nProps splitting:");
console.log("  styleProps:", styleProps);
console.log("  domProps:", domProps);

// ============================================
// 9. SSR Support
// ============================================

const ssr = createSSRCollector();

// Generate styles during render
const ssrResult1 = ssr.css({ p: 16, bg: "white" });
const ssrResult2 = ssr.css({ m: 8, color: "black" });

// Get all CSS for injection
const allCSS = ssr.getCSS();
const styleTag = ssr.getStyleTag();

console.log("\nSSR support:");
console.log("  all CSS:", allCSS);
console.log("  style tag:", styleTag);

// ============================================
// 10. Extract All Generated CSS
// ============================================

const globalCSS = extractCSS();
console.log("\nAll generated CSS length:", globalCSS.length, "chars");

// ============================================
// 11. Component Specs -> Runtime Render Example
// ============================================

const CoreBox = defineCoreComponent({
  name: "CoreBox",
  tree: el("div", {
    part: "root",
    attrs: { "data-core": "box" },
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        p: 16,
        rounded: "md",
        bg: "white",
        border: "1px solid black",
      },
    },
  },
});

const CoreContent = defineCoreComponent({
  name: "CoreContent",
  tree: el("div", {
    part: "root",
    attrs: { "data-core": "content" },
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        p: 16,
      },
    },
  },
});

const Card = defineUnitComponent({
  name: "Card",
  tree: comp("CoreBox", {
    part: "container",
    children: [
      comp("CoreContent", {
        part: "content",
        children: [slot("children")],
      }),
    ],
  }),
  styles: {
    base: {
      container: { shadow: "md" },
      content: {},
    },
    variants: {
      tone: {
        neutral: { container: { bg: "white", color: "black" } },
        inverted: { container: { bg: "black", color: "white" } },
      },
    },
    defaultVariants: { tone: "neutral" },
  },
});

const rendered = renderFromSpecs(
  [CoreBox, CoreContent, Card],
  "Card",
  { tone: "inverted" },
  { theme: { colors: { black: "#111", white: "#fff" } } }
);

console.log("\nComponent runtime render:");
console.log("  html:", rendered.html);
console.log("  css:", rendered.css);
