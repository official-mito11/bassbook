/**
 * CSS Class Registry
 * Manages atomic CSS classes with deduplication and caching
 */

// Hash function for generating unique class names
function hashString(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

// Generate a unique class name from CSS property-value pair
function generateClassName(property: string, value: string, prefix = "bb"): string {
  const hash = hashString(`${property}:${value}`);
  return `${prefix}-${hash}`;
}

// CSS rule structure
export interface CSSRule {
  className: string;
  property: string;
  value: string;
  cssText: string;
  // For responsive/pseudo variants
  selector?: string;
  media?: string;
}

// Registry for managing CSS classes
export class CSSRegistry {
  // Map: cssText -> CSSRule (for deduplication)
  private rulesByCSS = new Map<string, CSSRule>();
  // Map: className -> CSSRule (for lookup)
  private rulesByClass = new Map<string, CSSRule>();
  // Ordered list of rules for stylesheet generation
  private rules: CSSRule[] = [];
  // Prefix for generated class names
  private prefix: string;
  // Injected stylesheet element (for browser)
  private styleElement: HTMLStyleElement | null = null;
  // Server-side collected CSS
  private serverCSS: string[] = [];
  // Flag for SSR mode
  private isServer: boolean;

  constructor(prefix = "bb") {
    this.prefix = prefix;
    this.isServer = typeof document === "undefined";
  }

  /**
   * Register a CSS property-value pair and return the class name
   * If the same CSS already exists, returns the existing class name
   */
  register(property: string, value: string, options?: { media?: string; selector?: string }): string {
    const cssKey = this.buildCSSKey(property, value, options);
    
    // Check for existing rule
    const existing = this.rulesByCSS.get(cssKey);
    if (existing) {
      return existing.className;
    }

    // Create new rule
    const className = generateClassName(property, value, this.prefix);
    const cssText = this.buildCSSText(className, property, value, options);
    
    const rule: CSSRule = {
      className,
      property,
      value,
      cssText,
      selector: options?.selector,
      media: options?.media,
    };

    this.rulesByCSS.set(cssKey, rule);
    this.rulesByClass.set(className, rule);
    this.rules.push(rule);

    // Inject CSS immediately
    this.injectRule(rule);

    return className;
  }

  /**
   * Register multiple CSS declarations and return combined class names
   */
  registerMultiple(declarations: Record<string, string>, options?: { media?: string; selector?: string }): string[] {
    const classNames: string[] = [];
    for (const [property, value] of Object.entries(declarations)) {
      if (value !== undefined && value !== null && value !== "") {
        classNames.push(this.register(property, value, options));
      }
    }
    return classNames;
  }

  /**
   * Build a unique key for CSS deduplication
   */
  private buildCSSKey(property: string, value: string, options?: { media?: string; selector?: string }): string {
    let key = `${property}:${value}`;
    if (options?.media) key = `@${options.media}{${key}}`;
    if (options?.selector) key = `${options.selector}{${key}}`;
    return key;
  }

  /**
   * Build CSS text for a rule
   */
  private buildCSSText(className: string, property: string, value: string, options?: { media?: string; selector?: string }): string {
    const selector = options?.selector 
      ? `.${className}${options.selector}` 
      : `.${className}`;
    const declaration = `${property}:${value}`;
    
    if (options?.media) {
      return `@media ${options.media}{${selector}{${declaration}}}`;
    }
    return `${selector}{${declaration}}`;
  }

  /**
   * Inject a single rule into the stylesheet
   */
  private injectRule(rule: CSSRule): void {
    if (this.isServer) {
      this.serverCSS.push(rule.cssText);
      return;
    }

    this.ensureStyleElement();
    if (this.styleElement?.sheet) {
      try {
        this.styleElement.sheet.insertRule(rule.cssText, this.styleElement.sheet.cssRules.length);
      } catch (e) {
        // Fallback: append to textContent
        this.styleElement.textContent += rule.cssText;
      }
    }
  }

  /**
   * Ensure stylesheet element exists in DOM
   */
  private ensureStyleElement(): void {
    if (this.styleElement) return;
    if (typeof document === "undefined") return;

    this.styleElement = document.createElement("style");
    this.styleElement.setAttribute("data-bassbook", "");
    document.head.appendChild(this.styleElement);
  }

  /**
   * Get all generated CSS as a string (for SSR)
   */
  getCSS(): string {
    return this.rules.map(r => r.cssText).join("");
  }

  /**
   * Get CSS for specific class names
   */
  getCSSForClasses(classNames: string[]): string {
    return classNames
      .map(cn => this.rulesByClass.get(cn)?.cssText)
      .filter(Boolean)
      .join("");
  }

  /**
   * Reset the registry (useful for testing)
   */
  reset(): void {
    this.rulesByCSS.clear();
    this.rulesByClass.clear();
    this.rules = [];
    this.serverCSS = [];
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }

  /**
   * Get statistics about the registry
   */
  getStats(): { totalRules: number; uniqueProperties: number } {
    const uniqueProps = new Set(this.rules.map(r => r.property));
    return {
      totalRules: this.rules.length,
      uniqueProperties: uniqueProps.size,
    };
  }
}

// Global singleton registry
let globalRegistry: CSSRegistry | null = null;

export function getRegistry(): CSSRegistry {
  if (!globalRegistry) {
    globalRegistry = new CSSRegistry();
  }
  return globalRegistry;
}

export function createRegistry(prefix?: string): CSSRegistry {
  return new CSSRegistry(prefix);
}

export function resetGlobalRegistry(): void {
  globalRegistry?.reset();
  globalRegistry = null;
}
