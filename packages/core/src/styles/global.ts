/**
 * Global CSS styles that should be injected by the library
 * These include animations and base styles needed by components
 */

export const globalStyles = `
/* Bassbook Global Styles */
`;

let injected = false;

export function injectGlobalStyles(): void {
  if (injected) return;
  if (typeof document === "undefined") return;
  
  const style = document.createElement("style");
  style.setAttribute("data-bassbook", "global");
  style.textContent = globalStyles;
  document.head.appendChild(style);
  injected = true;
}

export function resetGlobalStylesInjection(): void {
  injected = false;
}
