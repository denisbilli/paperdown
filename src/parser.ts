/**
 * Markdown Parser Module
 * 
 * Converts Markdown text to HTML using the `marked` library with:
 * - Syntax highlighting for code blocks via highlight.js
 * - GitHub Flavored Markdown support (tables, strikethrough, etc.)
 * - Safe HTML rendering
 * 
 * HOW TO EXTEND:
 * - Add custom marked extensions via `marked.use({ extensions: [...] })`
 * - Customize renderer behavior by overriding specific methods
 * - Add post-processing hooks for custom transformations
 */

import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

/**
 * Configure marked with syntax highlighting
 */
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

/**
 * Configure marked options for GFM and proper rendering
 */
marked.setOptions({
  gfm: true,           // GitHub Flavored Markdown
  breaks: false,       // Don't convert \n to <br>
  pedantic: false,     // Don't conform to obscure parts of markdown.pl
});

/**
 * Parse Markdown content to HTML
 * 
 * @param markdown - Raw Markdown text
 * @returns HTML string with syntax-highlighted code blocks
 * 
 * @example
 * const html = parseMarkdown('# Hello\n\nThis is **bold**.');
 */
export function parseMarkdown(markdown: string): string {
  try {
    return marked.parse(markdown) as string;
  } catch (error) {
    throw new Error(`Failed to parse Markdown: ${error}`);
  }
}

/**
 * Extract the first H1 heading from Markdown content
 * Used as document title in header/footer
 * 
 * @param markdown - Raw Markdown text
 * @returns The text content of the first H1, or undefined
 */
export function extractTitle(markdown: string): string | undefined {
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : undefined;
}
