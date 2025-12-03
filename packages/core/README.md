# @bassbook/core

Framework-agnostic style engine with atomic CSS optimization and extensible design tokens.

## Features

- **Atomic CSS** - Generates unique classes per CSS property-value pair with deduplication
- **Shorthand Aliases** - Use `p`, `m`, `w`, `h`, `bg`, etc. for concise styling
- **Standard CSS Values** - Numbers become `px`, strings are raw CSS values
- **Design Tokens** - Extensible colors, sizing, shadows, and more
- **Framework Agnostic** - Works with React, Svelte, Vue, Vanilla JS, or any framework
- **SSR Support** - Collect and extract CSS during server-side rendering
- **Variant System** - CVA-like variant-based styling for components

## Installation

```bash
bun add @bassbook/core
# or
npm install @bassbook/core
```

## Quick Start

```tsx
import { css, cx } from "@bassbook/core";

// Generate atomic CSS classes
const result = css({
  p: 16,            // padding: 16px (number → px)
  m: 8,             // margin: 8px
  w: "full",        // width: 100%
  bg: "white",      // background-color: #ffffff
  rounded: "lg",    // border-radius: 8px
});

// Use in your component
<div className={result.className} style={result.style}>
  Hello World
</div>
```

## API

### `css(props, options?)`

Main function to generate CSS classes from style props.

```ts
const result = css({
  p: "4",
  display: "flex",
  flexColumn: true,
  gap: "2",
});

// result.className - Space-separated class names
// result.classNames - Array of class names
// result.style - Inline styles (for CSS variables, etc.)
// result.css - Raw CSS string
```

### `cx(...inputs)`

Utility to conditionally join class names.

```ts
const className = cx(
  "base-class",
  isActive && "active",
  { "disabled": isDisabled }
);
```

### `inlineStyle(props)`

Get inline style object without generating classes.

```ts
const style = inlineStyle({ p: "4", color: "red" });
// { padding: "1rem", color: "red" }
```

### `cssString(props, selector?)`

Get raw CSS string.

```ts
const css = cssString({ p: "4", m: "2" }, ".my-class");
// ".my-class{padding:1rem;margin:0.5rem}"
```

### `configure(options)`

Configure global theme and settings.

```ts
import { configure } from "@bassbook/core";

configure({
  theme: {
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
    },
  },
  prefix: "my-app", // Class name prefix
});
```

### `createStyled(options)`

Create variant-based component styles (like CVA).

```ts
import { createStyled } from "@bassbook/core";

const button = createStyled({
  base: {
    display: "inline-flex",
    alignCenter: true,
    rounded: "md",
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
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

// Usage
const result = button({ size: "lg", variant: "primary" });
```

### `splitProps(props)`

Split style props from DOM props for framework integration.

```ts
const { styleProps, domProps } = splitProps({
  p: 16,
  onClick: handleClick,
  children: "Hello",
});
// styleProps: { p: 16 }
// domProps: { onClick: handleClick, children: "Hello" }
```

## Style Props Reference

### Spacing

| Prop | CSS Property |
|------|--------------|
| `p`, `padding` | padding |
| `pt`, `paddingTop` | padding-top |
| `pr`, `paddingRight` | padding-right |
| `pb`, `paddingBottom` | padding-bottom |
| `pl`, `paddingLeft` | padding-left |
| `px`, `ph` | padding-left, padding-right |
| `py`, `pv` | padding-top, padding-bottom |
| `m`, `margin` | margin |
| `mt`, `mr`, `mb`, `ml` | margin-* |
| `mx`, `my` | margin horizontal/vertical |
| `gap`, `g` | gap |
| `gv`, `gh` | row-gap, column-gap |

### Sizing

| Prop | CSS Property |
|------|--------------|
| `w`, `width` | width |
| `h`, `height` | height |
| `minW`, `minWidth` | min-width |
| `maxW`, `maxWidth` | max-width |
| `minH`, `minHeight` | min-height |
| `maxH`, `maxHeight` | max-height |

### Flexbox

| Prop | Effect |
|------|--------|
| `flexRow` | flex-direction: row |
| `flexColumn` | flex-direction: column |
| `justifyCenter` | justify-content: center |
| `justifyBetween` | justify-content: space-between |
| `alignCenter` | align-items: center |
| `flexAuto` | flex: 1 1 auto |
| `flexNone` | flex: none |

### Colors & Background

| Prop | CSS Property |
|------|--------------|
| `bg`, `background` | background / background-color |
| `bgColor` | background-color |
| `color`, `textColor` | color |
| `opacity` | opacity |

### Border

| Prop | CSS Property |
|------|--------------|
| `border` | border |
| `borderWidth` | border-width |
| `borderColor` | border-color |
| `rounded`, `borderRadius` | border-radius |
| `roundedTop` | border-top-*-radius |
| `ring` | box-shadow (ring effect) |

### Layout

| Prop | CSS Property |
|------|--------------|
| `d`, `display` | display |
| `pos`, `position` | position |
| `z`, `zIndex` | z-index |
| `overflow` | overflow |
| `shadow` | box-shadow |

## SSR Support

```ts
import { createSSRCollector } from "@bassbook/core";

// Create collector for SSR
const ssr = createSSRCollector();

// Generate styles during render
const result1 = ssr.css({ p: 16, bg: "white" });
const result2 = ssr.css({ m: 8, color: "black" });

// Get style tag for injection
const styleTag = ssr.getStyleTag();
// <style data-bassbook>.bb-xxx{...}</style>
```

## Design Tokens

Default tokens:

```ts
// Sizing: auto, full, half, quarter, 1/2, 1/3, 2/3, 1/4, 3/4, screen, screen-h, min, max, fit
// Colors: transparent, current, black, white
// Radius: none, sm, md, lg, xl, full
// Shadows: none, sm, md, lg, xl
```

Extend with custom tokens:

```ts
configure({
  theme: {
    colors: {
      brand: "#6366f1",
      "brand-light": "#818cf8",
    },
    sizing: {
      "container": "1200px",
    },
    vars: {
      "--header-height": "64px",
    },
  },
});
```

## License

MIT
