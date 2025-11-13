# md2pdf - Professional Markdown to PDF Converter

A powerful CLI tool that converts Markdown files into professionally styled PDF documents with WYSIWYG rendering using Puppeteer.

## ✨ Features

- 📝 **Rich Markdown Support**: Full GitHub Flavored Markdown (GFM) support including tables, strikethrough, and task lists
- 🎨 **Professional Typography**: Clean design using Barlow and Fira Code fonts
- 💻 **Syntax Highlighting**: Automatic code highlighting for 180+ languages via highlight.js
- 📄 **Smart Page Breaks**: Prevents tables, code blocks, and images from splitting across pages
- 🔢 **Auto Page Numbers**: Headers and footers with automatic page numbering
- 🖼️ **Image Support**: Handles images, figures, and captions with proper scaling
- 🎯 **A4 Layout**: Professional A4 format with 20mm margins
- 🛠️ **Customizable**: Support for custom CSS themes and header/footer text
- ⚡ **Fast Rendering**: Powered by Puppeteer's headless Chrome

## 📦 Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

### Install Globally (Optional)

```bash
npm link
```

After linking, you can use `md2pdf` from anywhere in your terminal.

## 🚀 Usage

### Basic Usage

Convert a Markdown file to PDF:

```bash
md2pdf document.md
```

This creates `document.pdf` in the same directory.

### Advanced Usage

#### Custom CSS

Apply your own stylesheet:

```bash
md2pdf document.md --css custom-theme.css
```

#### Custom Title

Override the document title (default is first H1):

```bash
md2pdf document.md --title "My Custom Title"
```

#### Custom Header

Add custom header text:

```bash
md2pdf document.md --header "Confidential - Internal Use Only"
```

#### Custom Footer

Add custom footer text (page numbers still included):

```bash
md2pdf document.md --footer "Company Name © 2025"
```

#### Combined Options

Use multiple options together:

```bash
md2pdf report.md --css corporate.css --title "Q4 Report" --header "Confidential" --footer "Acme Corp"
```

## 📝 Markdown Features

### Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Second item
   1. Nested ordered item
```

### Code Blocks

Syntax highlighting is automatic:

````markdown
```javascript
function hello() {
  console.log("Hello, world!");
}
```

```python
def greet(name):
    print(f"Hello, {name}!")
```
````

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Images

```markdown
![Alt text](path/to/image.png)
```

Images automatically scale to fit page width while maintaining aspect ratio.

### Page Breaks

Force a page break with an HTML div:

```markdown
<div class="page-break"></div>
```

### Blockquotes

```markdown
> This is a blockquote
> with multiple lines
```

## 🎨 Customization

### Custom CSS Themes

Create a CSS file to override default styles:

```css
/* custom-theme.css */

/* Change primary color */
h1, h2, h3 {
  color: #e74c3c;
}

/* Use different font */
body {
  font-family: 'Georgia', serif;
  font-size: 12pt;
}

/* Customize code blocks */
pre {
  background: #2d2d2d;
  color: #f8f8f2;
  border-left: 3px solid #e74c3c;
}

/* Add custom styling for specific elements */
.custom-box {
  border: 2px solid #3498db;
  padding: 1em;
  border-radius: 8px;
  background: #ecf0f1;
}
```

Then apply it:

```bash
md2pdf document.md --css custom-theme.css
```

### Customizing Header/Footer Templates

Edit `src/renderer.ts` to modify the header/footer templates. Puppeteer supports these special classes:

- `.pageNumber` - Current page number
- `.totalPages` - Total page count
- `.date` - Current date
- `.title` - Document title
- `.url` - Document URL

Example custom footer:

```typescript
const footerTemplate = `
  <div style="font-size: 9px; text-align: center; width: 100%; margin: 10px;">
    <span style="color: #0b3d91;">
      ${documentTitle}
    </span>
    <span style="margin: 0 10px;">|</span>
    Page <span class="pageNumber"></span> of <span class="totalPages"></span>
  </div>
`;
```

### Embedding Images Inline

You can embed images using:

1. **Relative paths** (relative to the Markdown file):
   ```markdown
   ![Diagram](./images/architecture.png)
   ```

2. **Absolute paths**:
   ```markdown
   ![Chart](file:///C:/Users/username/documents/chart.png)
   ```

3. **Data URIs** (for portability):
   ```markdown
   ![Icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...)
   ```

4. **Remote URLs**:
   ```markdown
   ![Logo](https://example.com/logo.png)
   ```

### Preventing Page Breaks

Add the `no-break` class to keep content together:

```html
<div class="no-break">
  This content will not be split across pages.
  
  - List item 1
  - List item 2
  - List item 3
</div>
```

### Page Break Controls

The CSS provides fine-grained control:

```css
/* Force page break before element */
.page-break {
  break-before: page;
  page-break-before: always;
}

/* Prevent breaks inside element */
.no-break {
  break-inside: avoid;
  page-break-inside: avoid;
}

/* These are already applied to: */
/* - pre (code blocks) */
/* - table */
/* - figure */
/* - img */
```

## 🏗️ Project Structure

```
md2pdf/
├── src/
│   ├── index.ts           # CLI entry point
│   ├── parser.ts          # Markdown → HTML parser
│   ├── template.ts        # HTML template generator
│   ├── renderer.ts        # PDF renderer (Puppeteer)
│   └── styles/
│       └── default.css    # Default PDF styles
├── dist/                  # Compiled JavaScript (generated)
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── example.md             # Example Markdown file
└── README.md              # This file
```

## 🔧 Development

### Run in Development Mode

Watch for changes and auto-compile:

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Test the CLI

```bash
npm test
```

This converts `example.md` to `example.pdf`.

## 📚 Technical Details

### Architecture

1. **Parser** (`parser.ts`): Uses `marked` library to convert Markdown to HTML with `highlight.js` for syntax highlighting
2. **Template** (`template.ts`): Wraps HTML in a complete document with embedded CSS and metadata
3. **Renderer** (`renderer.ts`): Uses Puppeteer to render HTML to PDF with custom headers/footers

### PDF Configuration

- **Format**: A4 (210mm × 297mm)
- **Margins**: 
  - Top: 25mm (includes header space)
  - Right: 18mm
  - Bottom: 25mm (includes footer space)
  - Left: 18mm
- **Fonts**: 
  - Body: Barlow (Google Fonts)
  - Code: Fira Code (Google Fonts)
- **Print Background**: Enabled (includes colors and images)

### Dependencies

- **marked** - Fast Markdown parser with extensibility
- **marked-highlight** - Syntax highlighting integration for marked
- **highlight.js** - Syntax highlighting for 180+ languages
- **puppeteer** - Headless Chrome automation for PDF rendering
- **commander** - CLI argument parsing

## 🐛 Troubleshooting

### Puppeteer Installation Issues

If Puppeteer fails to install, try:

```bash
# Install with legacy peer deps
npm install --legacy-peer-deps

# Or use specific Chromium revision
PUPPETEER_SKIP_DOWNLOAD=true npm install
```

### Images Not Showing

Make sure image paths are correct:
- Use absolute paths or paths relative to the Markdown file
- For remote images, ensure network access
- Check file permissions

### Code Not Highlighted

Ensure the language identifier is correct:

````markdown
```javascript  ✅ Correct
```js         ✅ Also works
```JAVASCRIPT ❌ Wrong (case-sensitive)
````

### Custom CSS Not Applied

- Verify the CSS file path is correct
- Check for CSS syntax errors
- Remember that header/footer require inline styles

## 📄 License

MIT License - feel free to use this in your projects!

## 🤝 Contributing

Contributions are welcome! To extend the tool:

1. **Add custom marked extensions** in `parser.ts`
2. **Create new CSS themes** in `src/styles/`
3. **Modify PDF settings** in `renderer.ts`
4. **Add new CLI options** in `index.ts`

## 📞 Support

For issues, questions, or feature requests, please check the documentation in the source code comments:

- **How to customize header/footer**: See `src/renderer.ts`
- **How to embed images**: See README (this file) and `src/template.ts`
- **How to apply page breaks**: See `src/styles/default.css`
- **How to extend CSS themes**: See `src/template.ts` and create custom CSS

---

**Happy Converting! 🎉**
