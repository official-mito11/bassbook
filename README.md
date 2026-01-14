# Bassbook

**"그냥 선언만 했는데도 멋진 UI가 만들어지네"**

Bassbook은 개발자가 복잡한 추상화나 컴포지션 없이도 직관적으로 아름다운 UI를 만들 수 있도록 설계된 UI 라이브러리입니다.

## 핵심 가치

1. **성능 (Performance)** - 런타임 오버헤드 최소화
2. **개발자 경험 (DX)** - 직관적이고 예측 가능한 API
3. **개발자의 행복** - 즐거운 개발 경험

## Features

- ✨ **Atomic CSS** - 자동 중복 제거 및 최적화
- 🎨 **Design Tokens** - 확장 가능한 테마 시스템
- 🔧 **Framework Agnostic** - React, Vue, Svelte, Vanilla JS 지원
- ⚡ **SSR Ready** - 서버 사이드 렌더링 완벽 지원
- 🎯 **Type Safe** - 완전한 TypeScript 지원
- 📦 **Component System** - 선언적 컴포넌트 스펙과 행동 정의
- 🎭 **Variant System** - CVA 스타일 variant 기반 스타일링
- 🔓 **Full Customization** - 모든 컴포넌트의 모든 부분 커스터마이징 가능

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| `@bassbook/core` | 0.4.4 | Core style engine and component system |
| `@bassbook/react` | 0.4.4 | React renderer and components |
| `@bassbook/storybook` | - | Storybook integration |

## Installation

```bash
bun install
```

## Quick Start

### Atomic CSS Styling

```typescript
import { css, cx } from "@bassbook/core";

const result = css({
  p: 16,           // padding: 16px
  m: 8,            // margin: 8px
  bg: "primary",   // background-color: var(--color-primary)
  rounded: "lg",   // border-radius: 8px
});

// Use in your component
<div className={result.className} style={result.style}>
  Hello World
</div>
```

### React Components

```typescript
import { Button } from "@bassbook/react";

function App() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}
```

## Architecture

```
┌─────────────────────────────────────────┐
│           Style Engine                   │
│  - Atomic CSS generation                 │
│  - Token resolution                      │
│  - SSR support                           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│        Component System                  │
│  - Declarative specs                     │
│  - Behavior runtime                      │
│  - Variant system                        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Framework Renderers                 │
│  - React                                 │
│  - Vue (planned)                         │
│  - Svelte (planned)                      │
└─────────────────────────────────────────┘
```

## Development

### Build all packages

```bash
bun run build
```

### Run tests

```bash
bun test
```

### Publish

```bash
bun run publish
```

## Component Layers

Bassbook uses a three-layer component architecture:

- **Core**: Basic HTML element wrappers (Box, Text, Button)
- **Unit**: Reusable UI components (Button, Input, Slider)
- **Part**: Compound components (Dialog, Modal, Sheet)

## Documentation

For detailed documentation, see:
- [Design Principles](./DESIGN_PRINCIPLES.md) - 프로젝트 철학 및 설계 원칙
- [Core Package](./packages/core/README.md) - 스타일 엔진 및 컴포넌트 시스템
- [React Package](./packages/react/README.md) - React 렌더러 및 컴포넌트

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT

---

Built with [Bun](https://bun.com) v1.3.2
