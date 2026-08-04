#!/usr/bin/env node

/**
 * paperdown - Professional Markdown to PDF Converter
 * 
 * Main CLI entry point that handles command-line arguments and orchestrates
 * the conversion pipeline: Markdown → HTML → PDF
 * 
 * Usage:
 *   paperdown input.md
 *   paperdown input.md --css custom.css --title "My Document"
 */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { parseMarkdown } from './parser';
import { generateHTML } from './template';
import { renderPDF } from './renderer';

interface CliOptions {
  css?: string;
  header?: string;
  footer?: string;
  title?: string;
}

async function main() {
  const program = new Command();

  program
    .name('paperdown')
    .description('Convert Markdown files to professionally styled PDFs')
    .version('1.0.0')
    .argument('<input>', 'Input Markdown file (.md)')
    .option('--css <path>', 'Custom CSS file to override default styles')
    .option('--header <text>', 'Custom header text')
    .option('--footer <text>', 'Custom footer text')
    .option('--title <text>', 'Document title (overrides H1)')
    .action(async (inputFile: string, options: CliOptions) => {
      try {
        // Validate input file
        if (!fs.existsSync(inputFile)) {
          console.error(`❌ Error: File "${inputFile}" not found.`);
          process.exit(1);
        }

        if (!inputFile.endsWith('.md')) {
          console.error('❌ Error: Input file must have .md extension.');
          process.exit(1);
        }

        console.log(`📄 Reading Markdown file: ${inputFile}`);
        const markdownContent = fs.readFileSync(inputFile, 'utf-8');

        // Parse Markdown to HTML
        console.log('🔄 Converting Markdown to HTML...');
        const htmlContent = parseMarkdown(markdownContent);

        // Load custom CSS if provided
        let customCSS: string | undefined;
        if (options.css) {
          if (!fs.existsSync(options.css)) {
            console.error(`❌ Error: CSS file "${options.css}" not found.`);
            process.exit(1);
          }
          customCSS = fs.readFileSync(options.css, 'utf-8');
          console.log(`🎨 Using custom CSS: ${options.css}`);
        }

        // Generate complete HTML with embedded styles
        const fullHTML = generateHTML(htmlContent, {
          customCSS,
          documentTitle: options.title,
          headerText: options.header,
          footerText: options.footer,
        });

        // Determine output path
        const outputPath = inputFile.replace(/\.md$/, '.pdf');
        
        // Render PDF with Puppeteer
        console.log('🖨️  Rendering PDF with Puppeteer...');
        await renderPDF(fullHTML, outputPath, {
          documentTitle: options.title,
          headerText: options.header,
          footerText: options.footer,
        });

        console.log(`✅ PDF created successfully: ${outputPath}`);
      } catch (error) {
        console.error('❌ Error during conversion:', error);
        process.exit(1);
      }
    });

  program.parse();
}

main();
