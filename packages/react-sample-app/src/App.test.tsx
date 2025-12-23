import { describe, expect, test } from "bun:test";
import * as React from "react";
import { renderToString } from "react-dom/server";

import { Button, Checkbox, Select } from "@bassbook/react";

describe("react sample app", () => {
  test("Button renders without crashing", () => {
    const html = renderToString(
      <Button variant="default" size="md">
        Hello
      </Button>
    );

    expect(html.length).toBeGreaterThan(0);
  });
});
