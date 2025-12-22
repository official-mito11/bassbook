import * as React from "react";
import type { BassbookComponentProps } from "../types";

export type UseToggleControllerOptions = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export function useToggleController(options: UseToggleControllerOptions) {
  const { checked = false, onCheckedChange, disabled } = options;

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      if (disabled) return;
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        onCheckedChange?.(!checked);
      }
    },
    [checked, disabled, onCheckedChange]
  );

  const onClick = React.useCallback(() => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  }, [checked, disabled, onCheckedChange]);

  const props: BassbookComponentProps = {
    checked,
    disabled,
    __partProps: {
      root: {
        tabIndex: disabled ? -1 : 0,
        "aria-checked": checked,
        "aria-disabled": disabled,
        onClick,
        onKeyDown,
      },
    },
  };

  return { props };
}
