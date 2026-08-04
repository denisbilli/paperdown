# paperdown - Professional Markdown to PDF Converter

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

### From npm

```bash
npm install -g paperdown
paperdown document.md
```

### Standalone executable

Grab the binary for your platform from the
[latest release](https://github.com/denisbilli/paperdown/releases/latest) — no
Node.js required.

### Prerequisites

- **A Chromium-based browser**: Chrome, Edge or Chromium. paperdown drives the
  browser already installed on your machine instead of downloading its own copy,
  so installing it stays small and fast. On Windows, Edge ships with the system
  and is picked up automatically.
- Node.js 18 or higher, only when installing from npm or building from source.

If your browser lives somewhere unusual, point paperdown at it:

```bash
# Linux / macOS
export PUPPETEER_EXECUTABLE_PATH=/opt/chromium/chrome

# Windows (PowerShell)
$env:PUPPETEER_EXECUTABLE_PATH = "D:\Chromium\chrome.exe"
```

### From source

```bash
git clone https://github.com/denisbilli/paperdown.git
cd paperdown
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

The executable will be created in the `output/` directory (e.g., `output/paperdown.exe`).

**Note:** neither the executable nor the npm package bundles Chromium, which
keeps both small. paperdown uses the Chrome, Edge or Chromium already installed
on your machine.

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
.\output\paperdown.exe input.md

# With options
.\output\paperdown.exe input.md --header "Confidential" --footer "Company Name"
```

### Command Line Options

| Option | Description | Example |
|--------|-------------|---------|
| `input.md` | Input Markdown file (required) | `paperdown doc.md` |
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
