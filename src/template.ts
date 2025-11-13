/**
 * HTML Template Generator
 * 
 * Wraps parsed Markdown HTML in a complete HTML document with:
 * - Embedded CSS (default + optional custom overrides)
 * - Google Fonts (Barlow, Fira Code)
 * - Header/footer markup for Puppeteer
 * - Meta tags for proper PDF rendering
 * 
 * HOW TO CUSTOMIZE:
 * - Pass customCSS to override default styles
 * - Modify headerTemplate/footerTemplate structure for different layouts
 * - Add additional <meta> tags or <link> resources as needed
 * - Include external stylesheets via <link> instead of embedded CSS
 */

import * as fs from 'fs';
import * as path from 'path';
import { extractTitle } from './parser';

interface TemplateOptions {
  customCSS?: string;
  documentTitle?: string;
  headerText?: string;
  footerText?: string;
}

/**
 * Load default CSS styles from file
 */
function getDefaultCSS(): string {
  const cssPath = path.join(__dirname, 'styles', 'default.css');
  if (fs.existsSync(cssPath)) {
    return fs.readFileSync(cssPath, 'utf-8');
  }
  
  // Fallback inline CSS if file not found
  return `
    /* Default PDF Styles - Embedded Fallback */
    @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 11pt;
      line-height: 1.55;
      color: #111;
      background: white;
      padding: 0;
      margin: 0;
    }
    
    /* Typography */
    h1 { font-size: 2.2em; margin: 1.2em 0 0.6em; font-weight: 700; color: #0b3d91; }
    h2 { font-size: 1.8em; margin: 1em 0 0.5em; font-weight: 600; color: #0b3d91; }
    h3 { font-size: 1.4em; margin: 0.9em 0 0.4em; font-weight: 600; color: #2c5aa0; }
    h4 { font-size: 1.2em; margin: 0.8em 0 0.3em; font-weight: 500; color: #2c5aa0; }
    h5 { font-size: 1.05em; margin: 0.7em 0 0.3em; font-weight: 500; color: #333; }
    h6 { font-size: 1em; margin: 0.6em 0 0.3em; font-weight: 500; color: #555; }
    
    /* Prevent page breaks after headings */
    h1, h2, h3, h4, h5, h6 {
      break-after: avoid-page;
      page-break-after: avoid;
    }
    
    p {
      margin: 0 0 0.8em;
    }
    
    /* Links */
    a {
      color: #0969da;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    /* Lists */
    ul, ol {
      margin: 0.5em 0 1em;
      padding-left: 2em;
    }
    
    li {
      margin: 0.3em 0;
    }
    
    /* Code blocks */
    code, pre {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.9em;
      background: #f6f8fa;
    }
    
    code {
      padding: 2px 6px;
      border-radius: 3px;
      color: #e83e8c;
    }
    
    pre {
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1em 0;
      line-height: 1.45;
      border-left: 3px solid #0969da;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    pre code {
      padding: 0;
      background: transparent;
      color: inherit;
      border-radius: 0;
    }
    
    /* Tables */
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    th, td {
      border: 1px solid #d0d7de;
      padding: 6px 10px;
      text-align: left;
    }
    
    th {
      background: #f6f8fa;
      font-weight: 600;
      color: #0b3d91;
    }
    
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    
    /* Images and figures */
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1em auto;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    figure {
      margin: 1.5em 0;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    figcaption {
      text-align: center;
      font-style: italic;
      font-size: 0.9em;
      color: #666;
      margin-top: 0.5em;
    }
    
    /* Blockquotes */
    blockquote {
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 4px solid #0969da;
      background: #f6f8fa;
      color: #555;
      font-style: italic;
    }
    
    /* Horizontal rules */
    hr {
      border: none;
      border-top: 2px solid #d0d7de;
      margin: 2em 0;
    }
    
    /* Page break utility */
    .page-break {
      break-before: page;
      page-break-before: always;
    }
    
    /* Syntax highlighting (highlight.js default theme) */
    .hljs {
      display: block;
      overflow-x: auto;
      padding: 0;
      color: #333;
    }
    
    .hljs-comment,
    .hljs-quote {
      color: #998;
      font-style: italic;
    }
    
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-subst {
      color: #333;
      font-weight: bold;
    }
    
    .hljs-number,
    .hljs-literal,
    .hljs-variable,
    .hljs-template-variable,
    .hljs-tag .hljs-attr {
      color: #008080;
    }
    
    .hljs-string,
    .hljs-doctag {
      color: #d14;
    }
    
    .hljs-title,
    .hljs-section,
    .hljs-selector-id {
      color: #900;
      font-weight: bold;
    }
    
    .hljs-subst {
      font-weight: normal;
    }
    
    .hljs-type,
    .hljs-class .hljs-title {
      color: #458;
      font-weight: bold;
    }
    
    .hljs-tag,
    .hljs-name,
    .hljs-attribute {
      color: #000080;
      font-weight: normal;
    }
    
    .hljs-regexp,
    .hljs-link {
      color: #009926;
    }
    
    .hljs-symbol,
    .hljs-bullet {
      color: #990073;
    }
    
    .hljs-built_in,
    .hljs-builtin-name {
      color: #0086b3;
    }
    
    .hljs-meta {
      color: #999;
      font-weight: bold;
    }
    
    .hljs-deletion {
      background: #fdd;
    }
    
    .hljs-addition {
      background: #dfd;
    }
    
    .hljs-emphasis {
      font-style: italic;
    }
    
    .hljs-strong {
      font-weight: bold;
    }
  `;
}

/**
 * Generate complete HTML document with embedded styles
 * 
 * @param bodyContent - Parsed HTML content from Markdown
 * @param options - Template customization options
 * @returns Complete HTML document as string
 */
export function generateHTML(
  bodyContent: string,
  options: TemplateOptions = {}
): string {
  const defaultCSS = getDefaultCSS();
  const finalCSS = options.customCSS 
    ? `${defaultCSS}\n\n/* Custom CSS Overrides */\n${options.customCSS}`
    : defaultCSS;

  // Extract title from content if not provided
  const title = options.documentTitle || extractTitle(bodyContent) || 'Document';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    ${finalCSS}
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
