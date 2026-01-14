/**
 * Debug Utilities
 * Provides development-mode warnings and logging
 */

const isDevelopment = typeof process !== "undefined" && process.env?.NODE_ENV === "development";

export function devWarn(message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    console.warn(`[bassbook] ${message}`, ...args);
  }
}

export function devError(message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    console.error(`[bassbook] ${message}`, ...args);
  }
}

export function devLog(message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    console.log(`[bassbook] ${message}`, ...args);
  }
}
