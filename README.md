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
- Google Chrome or Chromium (if using the standalone executable, it uses the system browser if bundled one is missing)

### Install Dependencies

```bash
npm install
```

## 🛠️ Building

### Build from Source

To compile the TypeScript code:

```bash
npm run build
```

### Create Standalone Executable (.exe)

You can package the application into a single executable file:

```bash
npm run package
```

The executable will be created in the `output/` directory (e.g., `output/md2pdf.exe`).

**Note:** The executable does not bundle Chromium to keep the file size small. It will attempt to use your installed Google Chrome or Edge browser.

## 🚀 Usage

### As a CLI Tool (Development)

```bash
# Basic conversion
npm start -- input.md

# With custom CSS and title
npm start -- input.md --css styles/custom.css --title "My Document"
```

### Using the Executable

```bash
# Windows
.\output\md2pdf.exe input.md

# With options
.\output\md2pdf.exe input.md --header "Confidential" --footer "Company Name"
```

### Command Line Options

| Option | Description | Example |
|--------|-------------|---------|
| `input.md` | Input Markdown file (required) | `md2pdf doc.md` |
| `--css` | Path to custom CSS file | `--css style.css` |
| `--title` | Document title (overrides H1) | `--title "Report"` |
| `--header` | Custom header text | `--header "Draft"` |
| `--footer` | Custom footer text | `--footer "© 2026"` |

## 📂 Project Structure

```
├── src/
│   ├── index.ts        # CLI entry point
│   ├── parser.ts       # Markdown parsing logic
│   ├── renderer.ts     # Puppeteer PDF generation
│   ├── template.ts     # HTML templating
│   └── styles/         # Default CSS styles
├── examples/           # Example files
├── dist/               # Compiled JavaScript
├── output/             # Generated executables
└── package.json
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
