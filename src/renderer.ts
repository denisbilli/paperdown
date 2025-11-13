/**
 * PDF Renderer Module
 * 
 * Renders HTML to PDF using Puppeteer's headless browser with:
 * - A4 page format with custom margins
 * - Header/footer templates with page numbers
 * - Print-optimized rendering (background graphics, proper scaling)
 * - Automatic title extraction from first H1
 * 
 * HOW TO CUSTOMIZE HEADER/FOOTER TEMPLATES:
 * 
 * Puppeteer supports special classes in headerTemplate/footerTemplate:
 * - .date: Formatted print date
 * - .title: Document title
 * - .url: Document location
 * - .pageNumber: Current page number
 * - .totalPages: Total page count
 * 
 * Example custom footer:
 * ```
 * footerTemplate: `
 *   <div style="font-size:9px; text-align:center; width:100%;">
 *     <span class="title"></span> - Page <span class="pageNumber"></span> of <span class="totalPages"></span>
 *   </div>
 * `
 * ```
 * 
 * IMPORTANT: Header/footer templates must include complete inline styles.
 * External CSS does not apply to header/footer content.
 */

import puppeteer from 'puppeteer';
import * as fs from 'fs';

interface RenderOptions {
  documentTitle?: string;
  headerText?: string;
  footerText?: string;
}

/**
 * Render HTML content to PDF using Puppeteer
 * 
 * @param htmlContent - Complete HTML document string
 * @param outputPath - Path where PDF should be saved
 * @param options - Rendering options (title, header, footer text)
 * 
 * HOW TO EMBED IMAGES OR DIAGRAMS INLINE:
 * - Use data URIs: <img src="data:image/png;base64,..." />
 * - Use absolute file paths: <img src="file:///C:/path/to/image.png" />
 * - Or ensure relative paths are resolved correctly
 * 
 * HOW TO APPLY .page-break BETWEEN SECTIONS:
 * Add the class to any element: <div class="page-break"></div>
 * This forces a page break before that element.
 */
export async function renderPDF(
  htmlContent: string,
  outputPath: string,
  options: RenderOptions = {}
): Promise<void> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set content with a base URL to resolve relative paths
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0', // Wait for all resources to load
    });

    // Extract document title from content if not provided
    let documentTitle = options.documentTitle;
    if (!documentTitle) {
      documentTitle = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 ? h1.textContent?.trim() : 'Document';
      });
    }

    /**
     * Header template with document title
     * Styled inline - external CSS does not apply
     */
    const headerTemplate = options.headerText
      ? `
        <div style="font-size: 9px; color: #666; text-align: center; width: 100%; margin-top: 10px;">
          ${options.headerText}
        </div>
      `
      : `
        <div style="font-size: 9px; color: #0b3d91; text-align: center; width: 100%; margin-top: 10px; font-weight: 600;">
          ${documentTitle || ''}
        </div>
      `;

    /**
     * Footer template with page numbers
     * Uses Puppeteer's special .pageNumber and .totalPages classes
     */
    const footerTemplate = options.footerText
      ? `
        <div style="font-size: 9px; color: #666; text-align: center; width: 100%; margin-bottom: 10px;">
          ${options.footerText} - Pag. <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `
      : `
        <div style="font-size: 9px; color: #666; text-align: center; width: 100%; margin-bottom: 10px;">
          Pag. <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `;

    /**
     * Generate PDF with A4 format and custom margins
     * 
     * HOW TO EXTEND CSS THEMES:
     * - Modify the embedded CSS in template.ts
     * - Pass custom CSS via --css flag
     * - Add @media print rules for print-specific styles
     * - Use CSS variables for easy theming:
     *   :root { --primary-color: #0b3d91; }
     */
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        top: '20mm',    // Margine superiore (include header)
        right: '15mm',  // Margine destro
        bottom: '20mm', // Margine inferiore (include footer)
        left: '15mm',   // Margine sinistro
      },
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
      printBackground: true, // Include background colors and images
      preferCSSPageSize: false,
    });

    console.log(`📦 PDF saved: ${outputPath}`);
  } catch (error) {
    throw new Error(`Failed to render PDF: ${error}`);
  } finally {
    await browser.close();
  }
}
