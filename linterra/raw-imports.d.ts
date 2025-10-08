/**
 * Type declarations for raw file imports.
 * Allows importing .tsx files as strings using the ?raw suffix.
 */

declare module '*.tsx?raw' {
  const content: string;
  export default content;
}

declare module '*.ts?raw' {
  const content: string;
  export default content;
}

declare module '*.jsx?raw' {
  const content: string;
  export default content;
}

declare module '*.js?raw' {
  const content: string;
  export default content;
}

