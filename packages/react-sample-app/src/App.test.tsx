import { describe, expect, test } from "bun:test";
import * as React from "react";
import { renderToString } from "react-dom/server";

import { Button } from "@bassbook/react";

describe("react sample app", () => {
  test("Button renders without crashing", () => {
    const html = renderToString(
      <Button variant="primary" size="md">
        Hello
      </Button>
    );

    expect(html.length).toBeGreaterThan(0);
    expect(html).toContain("Hello");
  });
});
