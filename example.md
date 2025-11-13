# Technical Documentation Example

This document demonstrates all the features of the **md2pdf** converter, including typography, code blocks, tables, images, and page break controls.

## Introduction

The md2pdf tool converts Markdown files into professionally styled PDF documents with:

- **Consistent typography** using Barlow and Fira Code fonts
- **Syntax-highlighted code blocks** for multiple languages
- **Tables, images, and figures** with proper page break handling
- **Automatic headers and footers** with page numbers
- **A4 layout** with 20mm margins and print-friendly colors

## Typography Examples

### Heading Level 3

This is a paragraph demonstrating normal text flow. The text uses the Barlow font family at 11pt with a line height of 1.55 for optimal readability.

#### Heading Level 4

You can use **bold text**, *italic text*, and even ***bold italic*** text. Links are styled like this: [GitHub](https://github.com).

##### Heading Level 5

###### Heading Level 6

## Lists

### Unordered Lists

- First item
- Second item with a longer description that wraps to multiple lines to demonstrate how list items are formatted
- Third item
  - Nested item A
  - Nested item B
    - Deeply nested item

### Ordered Lists

1. First step in the process
2. Second step with detailed explanation
3. Third step
   1. Sub-step 3.1
   2. Sub-step 3.2
4. Final step

## Code Examples

### Inline Code

Use the `console.log()` function to print output. Variables like `userName` should be in camelCase.

### JavaScript Code Block

```javascript
/**
 * Calculate the factorial of a number
 * @param {number} n - The input number
 * @returns {number} The factorial result
 */
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Example usage
const result = factorial(5);
console.log(`5! = ${result}`); // Output: 5! = 120
```

### Python Code Block

```python
def fibonacci(n):
    """
    Generate Fibonacci sequence up to n terms
    """
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    
    return sequence

# Generate first 10 Fibonacci numbers
fib_sequence = fibonacci(10)
print(f"Fibonacci sequence: {fib_sequence}")
```

### TypeScript Code Block

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

class UserManager {
  private users: Map<number, User>;

  constructor() {
    this.users = new Map();
  }

  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  getUser(id: number): User | undefined {
    return this.users.get(id);
  }
}

const manager = new UserManager();
manager.addUser({ id: 1, name: "Alice", email: "alice@example.com", roles: ["admin"] });
```

## Tables

### Simple Table

| Feature | Description | Status |
|---------|-------------|--------|
| Markdown Parsing | Convert MD to HTML | ✅ Complete |
| Syntax Highlighting | Code block colors | ✅ Complete |
| PDF Generation | Puppeteer rendering | ✅ Complete |
| Custom CSS | Style overrides | ✅ Complete |
| Page Numbers | Header/footer | ✅ Complete |

### Complex Table with Alignment

| Command | Description | Example | Result |
|:--------|:------------|--------:|:------:|
| `md2pdf` | Basic conversion | `md2pdf doc.md` | ✅ |
| `--css` | Custom styles | `md2pdf doc.md --css custom.css` | 🎨 |
| `--title` | Override title | `md2pdf doc.md --title "Report"` | 📄 |
| `--header` | Custom header | `md2pdf doc.md --header "Confidential"` | 🔒 |
| `--footer` | Custom footer | `md2pdf doc.md --footer "Draft v1.0"` | 📝 |

## Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

> **Important Note:**
> 
> Tables, code blocks, and figures automatically avoid page breaks to prevent awkward splits across pages.

## Horizontal Rules

Use horizontal rules to separate major sections:

---

## Images and Figures

Images are automatically scaled to fit within the page margins while maintaining aspect ratio.

> **Note:** Replace with actual image paths when testing. Example:
> 
> `![Architecture Diagram](./images/architecture.png)`

<div class="page-break"></div>

## Page Break Example

The previous `<div class="page-break"></div>` forces a page break before this section. This is useful for:

- Starting new chapters on fresh pages
- Separating major sections
- Ensuring specific content appears at the top of a page

## Advanced Features

### Nested Lists with Code

1. **Setup the project**
   ```bash
   npm install
   npm run build
   ```

2. **Run the converter**
   ```bash
   md2pdf example.md
   ```

3. **Check the output**
   - Verify the PDF is created
   - Check page numbers
   - Validate formatting

### Mixed Content

Here's a paragraph followed by a code block and then a table:

```sql
SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.name
HAVING order_count > 5
ORDER BY order_count DESC;
```

| User Name | Order Count | Status |
|-----------|-------------|--------|
| Alice Johnson | 12 | Premium |
| Bob Smith | 8 | Standard |
| Carol White | 6 | Standard |

## Customization Guide

### Custom CSS Override

Create a `custom.css` file:

```css
/* Custom theme with different colors */
body {
  font-family: 'Inter', sans-serif;
  color: #2c3e50;
}

h1, h2 {
  color: #e74c3c;
}

code {
  background: #ecf0f1;
  color: #c0392b;
}
```

Then use it:

```bash
md2pdf document.md --css custom.css
```

### Custom Header/Footer

Override the default header and footer:

```bash
md2pdf report.md --header "Confidential - Internal Use Only" --footer "Company Name"
```

## Conclusion

This example demonstrates all major features of the md2pdf converter. The tool handles:

✅ Rich typography and formatting  
✅ Syntax-highlighted code in multiple languages  
✅ Complex tables with proper styling  
✅ Images and figures without page breaks  
✅ Manual page break control  
✅ Automatic page numbering  
✅ Custom headers and footers  
✅ A4 layout with professional margins  

For more information, see the README.md file in the project repository.

---

**End of Document**
