# Quick Start Guide

Get up and running with md2pdf in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages:
- `marked` - Markdown parser
- `highlight.js` - Syntax highlighting
- `puppeteer` - PDF rendering
- `commander` - CLI framework
- TypeScript and type definitions

## Step 2: Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

## Step 3: Try the Example

```bash
npm test
```

Or run directly:

```bash
node dist/index.js example.md
```

This converts `example.md` to `example.pdf`.

## Step 4: Convert Your Own Files

```bash
node dist/index.js your-document.md
```

## Step 5: Install Globally (Optional)

```bash
npm link
```

Now use it from anywhere:

```bash
md2pdf any-file.md
```

## Common Commands

### Basic conversion
```bash
md2pdf document.md
```

### With custom CSS
```bash
md2pdf document.md --css custom-theme-example.css
```

### With custom title and header
```bash
md2pdf document.md --title "My Report" --header "Confidential"
```

### Full customization
```bash
md2pdf report.md --css corporate.css --title "Q4 Report" --header "Internal Only" --footer "© 2025 Acme Corp"
```

## Project Structure

```
md2pdf/
├── src/
│   ├── index.ts          # CLI entry point
│   ├── parser.ts         # Markdown parser
│   ├── template.ts       # HTML generator
│   ├── renderer.ts       # PDF renderer
│   └── styles/
│       └── default.css   # Default styles
├── dist/                 # Compiled output (after build)
├── example.md            # Test file
├── package.json          # Dependencies
└── README.md             # Full documentation
```

## Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Explore [example.md](example.md) to see all supported features
3. Try [custom-theme-example.css](custom-theme-example.css) for styling examples
4. Modify `src/styles/default.css` to change default appearance

## Troubleshooting

### Puppeteer fails to install
```bash
npm install --legacy-peer-deps
```

### Can't find md2pdf command
Make sure you ran `npm link` or use:
```bash
node dist/index.js your-file.md
```

### Images not showing
- Use absolute paths or relative to markdown file
- Check file exists and permissions

### TypeScript errors
```bash
npm run build
```

## Need Help?

Check the inline code comments in:
- `src/renderer.ts` - Customize headers/footers
- `src/template.ts` - Modify HTML structure
- `src/parser.ts` - Extend Markdown features
- `src/styles/default.css` - Change default styling

Happy converting! 🎉
