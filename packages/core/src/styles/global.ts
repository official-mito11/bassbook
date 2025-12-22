/**
 * Global CSS styles that should be injected by the library
 * These include animations and base styles needed by components
 */

export const globalStyles = `
/* Bassbook Global Styles */

/* Skeleton shimmer animation */
@keyframes bb-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Spinner animation */
@keyframes bb-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Modal/Dialog animations */
@keyframes bb-fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bb-modalIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes bb-dialogIn {
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Sheet slide animations */
@keyframes bb-slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes bb-slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes bb-slideInTop {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

@keyframes bb-slideInBottom {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
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
