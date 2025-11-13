# Installation and Setup Instructions

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation Steps

1. **Navigate to the project directory:**
   ```powershell
   cd c:\Users\dbilli\source\repos\MDtoPDF
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```
   
   This will install:
   - marked (Markdown parser)
   - marked-highlight (syntax highlighting integration)
   - highlight.js (code syntax highlighting)
   - puppeteer (headless Chrome for PDF generation)
   - commander (CLI framework)
   - TypeScript and @types/node

3. **Build the TypeScript code:**
   ```powershell
   npm run build
   ```
   
   This compiles all TypeScript files in `src/` to JavaScript in `dist/`

4. **Test with the example file:**
   ```powershell
   npm test
   ```
   
   This runs: `node dist/index.js example.md` and creates `example.pdf`

5. **Optional - Install globally:**
   ```powershell
   npm link
   ```
   
   After this you can use `md2pdf` from anywhere in your terminal.

## Usage Examples

### Basic Usage
```powershell
# Using node directly
node dist/index.js document.md

# If globally installed
md2pdf document.md
```

### With Custom CSS
```powershell
md2pdf document.md --css custom-theme-example.css
```

### With Custom Title and Headers
```powershell
md2pdf report.md --title "Quarterly Report" --header "Confidential" --footer "© 2025"
```

## File Structure

```
MDtoPDF/
├── src/
│   ├── index.ts              # Main CLI entry point
│   ├── parser.ts             # Markdown to HTML parser
│   ├── template.ts           # HTML template generator
│   ├── renderer.ts           # PDF renderer using Puppeteer
│   └── styles/
│       └── default.css       # Default PDF styles
├── dist/                     # Compiled JavaScript (created after build)
├── node_modules/             # Dependencies (created after npm install)
├── example.md                # Example Markdown document
├── custom-theme-example.css  # Example custom CSS theme
├── package.json              # Project configuration and dependencies
├── tsconfig.json             # TypeScript compiler configuration
├── .gitignore                # Git ignore rules
├── README.md                 # Full documentation
├── QUICKSTART.md             # Quick start guide
└── INSTALL.md                # This file
```

## What Each File Does

- **src/index.ts**: CLI entry point that parses arguments and orchestrates the conversion
- **src/parser.ts**: Converts Markdown to HTML using marked + highlight.js
- **src/template.ts**: Wraps HTML in complete document with CSS
- **src/renderer.ts**: Uses Puppeteer to render HTML to PDF with headers/footers
- **src/styles/default.css**: Professional default stylesheet
- **example.md**: Comprehensive example showing all features
- **custom-theme-example.css**: Example of custom styling

## Verification

After installation, verify everything works:

```powershell
# Should create example.pdf
npm test

# Check that the PDF was created
dir example.pdf
```

## Troubleshooting

### Puppeteer Installation Issues
If Puppeteer fails to download Chromium:
```powershell
npm install --legacy-peer-deps
```

### TypeScript Errors During Build
Make sure you have TypeScript installed:
```powershell
npm install -g typescript
npm run build
```

### Module Not Found Errors
Reinstall dependencies:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

## Next Steps

1. Read [README.md](README.md) for complete documentation
2. Try converting [example.md](example.md) to see all features
3. Experiment with [custom-theme-example.css](custom-theme-example.css)
4. Create your own Markdown files and convert them!

## Support

For detailed feature documentation, see:
- **README.md** - Full documentation with examples
- **QUICKSTART.md** - Quick reference guide
- **Code comments** - Inline documentation in source files
