# Bassbook Design Principles

## 핵심 철학

> **"그냥 선언만 했는데도 멋진 UI가 만들어지네"**

Bassbook은 개발자가 복잡한 추상화나 컴포지션 없이도 직관적으로 아름다운 UI를 만들 수 있도록 설계된 라이브러리입니다.

## 우선순위

1. **성능 (Performance)** - 런타임 오버헤드 최소화
2. **개발자 경험 (Developer Experience)** - 직관적이고 예측 가능한 API
3. **개발자의 행복 (Developer Happiness)** - 즐거운 개발 경험

## 핵심 원칙

### 1. 🚫 하드코딩 금지 (No Hardcoding)

어떠한 컴포넌트도 특별 취급되어서는 안 됩니다. 모든 컴포넌트는 동일한 시스템을 통해 동작해야 합니다.

```typescript
// ❌ 잘못된 예: 특정 컴포넌트에 대한 하드코딩
if (spec.name === "Slider") {
  // Slider 전용 로직
}

// ✅ 올바른 예: 범용 시스템 사용
if (spec.cssVars) {
  // 모든 컴포넌트에 적용 가능한 범용 로직
}
```

### 2. 🎨 완전한 커스터마이징 (Full Customization)

모든 컴포넌트의 모든 부분(part)은 사용자가 세밀하게 커스터마이징할 수 있어야 합니다.

```typescript
// 모든 part에 대한 스타일 오버라이드 가능
<Button
  __partProps={{
    root: { bg: "custom-color" },
    icon: { size: 24 },
    label: { fontWeight: 600 },
  }}
/>
```

### 3. 🎯 선언적 API (Declarative API)

복잡한 로직 없이 선언만으로 원하는 결과를 얻을 수 있어야 합니다.

```typescript
// 선언만으로 완성되는 UI
<Button variant="primary" size="lg" rounded="full">
  Click me
</Button>
```

### 4. ⚡ 제로 런타임 오버헤드 (Zero Runtime Overhead)

- Atomic CSS로 중복 제거
- 정적 분석 가능한 스타일
- 불필요한 리렌더링 방지

### 5. 🔧 확장 가능한 설계 (Extensible Design)

새로운 기능 추가 시 기존 코드 수정 없이 확장 가능해야 합니다.

```typescript
// 새로운 컴포넌트도 동일한 시스템으로 정의
defineUnitComponent({
  name: "MyCustomComponent",
  tree: comp("Box", { part: "root", children: [...] }),
  styles: { base: {...}, variants: {...} },
  behavior: { state: {...}, actions: {...} },
  cssVars: { "--my-var": { from: "value", transform: (v) => `${v}px` } },
});
```

## 컴포넌트 계층 규칙

### Core Layer
- HTML 요소의 직접적인 래퍼
- 스타일 props만 처리
- 행동(behavior) 없음
- 다른 컴포넌트 참조 불가

### Unit Layer
- Core 컴포넌트만 참조 가능
- 독립적인 UI 단위
- 자체 상태 및 행동 가능
- Variant 시스템 사용

### Part Layer
- Core 및 Unit 컴포넌트 참조 가능
- 복합 컴포넌트 (Dialog, Modal 등)
- Slot 시스템으로 컴포지션
- 컨텍스트 제공/소비 가능

## 스타일링 규칙

### 1. 모든 값은 토큰 또는 직접 값

```typescript
// 토큰 사용
{ bg: "primary", rounded: "lg" }

// 직접 값 사용
{ bg: "#ff0000", rounded: "8px" }

// 숫자는 자동으로 px 변환
{ p: 16, m: 8 }  // padding: 16px, margin: 8px
```

### 2. Shorthand 우선

```typescript
// 간결한 shorthand 사용 권장
{ p: 16, m: 8, bg: "white", rounded: "lg" }

// 필요시 full name도 지원
{ padding: 16, margin: 8, backgroundColor: "white", borderRadius: "lg" }
```

### 3. Pseudo-class 지원

```typescript
{
  bg: "white",
  hover: { bg: "gray-100" },
  focus: { ring: "primary" },
  active: { scale: 0.98 },
}
```

## 행동(Behavior) 규칙

### 1. 상태는 명시적으로 정의

```typescript
behavior: {
  state: {
    open: { type: "boolean", default: false, controlled: true },
    value: { type: "number", default: 0, controlled: true },
  },
}
```

### 2. 액션은 순수 함수

```typescript
actions: {
  toggle: (state) => ({ open: !state.open }),
  setValue: (state, payload) => ({ value: payload }),
}
```

### 3. 바인딩은 선언적

```typescript
bindings: {
  trigger: { onClick: "toggle" },
  input: { onChange: { action: "setValue", payload: (e) => e.target.value } },
}
```

## 금지 사항

1. **컴포넌트 이름 기반 분기 금지**
   - `if (name === "Slider")` ❌
   - 범용 시스템 사용 ✅

2. **인라인 스타일 하드코딩 금지**
   - 렌더러에서 직접 스타일 주입 ❌
   - 스펙의 styles 또는 cssVars 사용 ✅

3. **매직 넘버 금지**
   - `width: 200` ❌
   - 토큰 또는 명시적 props 사용 ✅

4. **암묵적 동작 금지**
   - 문서화되지 않은 기본 동작 ❌
   - 모든 동작은 명시적이고 예측 가능해야 함 ✅

## 테스트 원칙

1. 모든 공개 API는 테스트 필수
2. 엣지 케이스 커버리지 확보
3. 성능 회귀 테스트 포함

## 기여 가이드라인

1. 이 원칙들을 준수하는지 PR 전 확인
2. 새로운 기능은 기존 시스템 확장으로 구현
3. 하드코딩이 필요해 보이면 시스템 설계 재검토

---

*"Simple things should be simple, complex things should be possible."* - Alan Kay
