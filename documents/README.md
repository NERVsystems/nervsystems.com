# NERV Systems Document Generation System

AI-friendly PDF generation system using modern XeLaTeX typography with tactical NERV branding.

## Overview

This system generates professional PDF documents (whitepapers, guides, checklists) for the NERV Systems website lead magnet program. Documents are built from YAML metadata files for easy AI-assisted content generation.

## Features

- **Modern Typography**: XeLaTeX with professional fonts (Source Sans Pro, Fira Mono)
- **Tactical Branding**: NERV color scheme (#00ff41 accent, dark theme matching nervsystems.com)
- **AI-Friendly**: YAML metadata + Markdown content structure
- **Automated Build**: Python script + Makefile + Docker support
- **Multiple Templates**: Guide, whitepaper, technical, comparison formats
- **Professional Design**: HUD-style elements, checklists, tactical callouts

## Directory Structure

```
documents/
├── templates/              # LaTeX templates
│   ├── nerv-base.tex      # Base template with branding
│   ├── nerv-guide.tex     # Guide/checklist template
│   ├── nerv-whitepaper.tex
│   └── nerv-technical.tex
├── content/               # Document content (YAML + Markdown)
│   ├── deployment-checklist/
│   │   ├── metadata.yaml  # Structured content
│   │   └── content.md     # Additional markdown content
│   ├── roi-calculator/
│   ├── tak-comparison/
│   ├── nerva-integration/
│   ├── apac-compliance/
│   └── operations-manual/
├── assets/
│   ├── fonts/             # Custom fonts
│   └── images/            # Document images
├── build/
│   └── outputs/           # Built PDFs
├── build_document.py      # YAML → LaTeX converter
├── Makefile              # Build automation
├── Dockerfile            # LaTeX build environment
└── README.md             # This file
```

## Requirements

### Option 1: Local Build (Recommended for development)

**Ubuntu/Debian:**
```bash
sudo apt-get install texlive-xetex texlive-fonts-extra texlive-latex-extra python3-yaml
```

**macOS:**
```bash
brew install --cask mactex
pip3 install pyyaml
```

### Option 2: Docker Build (No local LaTeX required)

Just need Docker installed:
```bash
docker --version
```

## Building Documents

### Quick Start

```bash
cd documents

# Build TAK Deployment Checklist
make deployment-checklist

# Build all documents
make all

# Clean build artifacts
make clean
```

### Using Docker

```bash
# Build Docker image
make docker-build

# Build document in container
make docker-deployment-checklist

# Enter container shell
make docker-shell
```

## Document Structure

### 1. Create Metadata File (YAML)

Create `content/<document-name>/metadata.yaml`:

```yaml
document:
  title: "Document Title"
  subtitle: "Subtitle"
  category: "DEPLOYMENT"
  version: "1.0"
  pages: "18"
  template: "nerv-guide"

  description: >
    Document description here...

  topics:
    - "Topic 1"
    - "Topic 2"

phases:
  - id: 1
    name: "Phase Name"
    duration: "1-2 weeks"
    priority: "CRITICAL"
    sections:
      - title: "Section Title"
        items:
          - "Checklist item 1"
          - "Checklist item 2"

best_practices:
  - "Best practice 1"
  - "Best practice 2"

common_pitfalls:
  - issue: "Issue description"
    impact: "Impact description"
    mitigation: "How to avoid"
```

### 2. Build the Document

```bash
# Generate LaTeX from YAML
python3 build_document.py <document-name>

# Or use Makefile target
make <document-name>
```

### 3. Output Location

- Final PDFs: `../public/downloads/<document-name>.pdf`
- Build artifacts: `build/outputs/`

## AI-Assisted Content Generation

This system is designed for AI-assisted content creation:

### Example Prompt for Claude:

```
I need to create content for the "TAK vs Commercial Alternatives Comparison" document.
The metadata file is at content/tak-comparison/metadata.yaml.

Please generate a comprehensive 32-page comparison covering:
- Platform comparison matrix
- TCO analysis
- Security comparison
- Integration capabilities

Use the same YAML structure as deployment-checklist but adapted for comparison content.
Include detailed sections, best practices, and decision frameworks.
```

### Benefits:

- **Structured Format**: YAML ensures consistent, parseable content
- **Iterative Refinement**: Easy to edit and regenerate
- **Version Control**: Track changes in git
- **Collaboration**: Human-editable plain text format

## Templates

### nerv-base.tex

Base template providing:
- NERV color scheme and branding
- Typography setup (XeLaTeX)
- Headers/footers
- Cover page generation
- Tactical UI elements

### nerv-guide.tex (extends base)

For guides and checklists:
- Checklist environments (`\checkitem`, `\checkeditem`)
- Phase sections (`\phase{}`)
- Tactical callouts (`\opnote{}`, `\alert{}`)
- Requirements boxes
- Best practice boxes
- Common pitfall warnings

### Custom Commands

```latex
\tlabel{TEXT}              % Tactical label: [TEXT]
\opnote{text}             % Operator note callout
\alert{text}              % Alert box
\checkitem{text}          % Unchecked checkbox item
\checkeditem{text}        % Checked checkbox item
\priority{1}              % Priority badge [P1]
\phase{Phase Name}        % Phase section header
```

## Customization

### Fonts

Place custom fonts in `assets/fonts/`:
- Source Sans Pro (main text)
- Fira Mono (monospace/tactical)

Fallback to system fonts if custom fonts unavailable.

### Colors

Defined in `nerv-base.tex`:
```latex
\definecolor{tactical-accent}{HTML}{00FF41}  % NERV green
\definecolor{tactical-bg}{HTML}{0A0E14}      % Dark background
\definecolor{tactical-text}{HTML}{E6E6E6}    % Main text
```

### Branding

Cover page customization in `nerv-base.tex`:
- Logo/header
- Document metadata display
- Classification markings
- Footer information

## Integration with Website

Documents are built to `public/downloads/` for serving via Next.js:

### File Mapping (from TAKResourcesSection.tsx):

| Document | Output File | Category |
|----------|-------------|----------|
| TAK Deployment Checklist | `deployment.pdf` | DEPLOYMENT |
| TAK vs Commercial Alternatives | `comparison.pdf` | COMPARISON |
| Tactical AI ROI Calculator | `roi.pdf` | ROI |
| NERVA Integration Architecture | `technical.pdf` | TECHNICAL |
| APAC Compliance Guide | `compliance.pdf` | COMPLIANCE |
| System Administration Manual | `operations.pdf` | OPERATIONS |

### Enable Downloads

Update `components/tak/TAKResourcesSection.tsx` line 138:

```typescript
// Uncomment to enable downloads:
window.location.href = `/downloads/${selectedResource?.category.toLowerCase()}.pdf`;
```

## Troubleshooting

### XeLaTeX Not Found

Install TeX Live:
```bash
sudo apt-get install texlive-xetex
```

Or use Docker build method.

### Font Warnings

Install recommended fonts:
```bash
sudo apt-get install fonts-firacode fonts-roboto
fc-cache -f -v
```

Or fonts will fallback to system defaults.

### Missing Python Packages

```bash
pip3 install pyyaml
```

### Build Errors

Check LaTeX log files:
```bash
cat content/<document-name>/<document-name>.log
```

Most common issues:
- Special characters not escaped (use `escape_latex()`)
- Missing closing braces in LaTeX
- Package dependencies

## Development Workflow

### 1. Create Document Structure

```bash
mkdir -p content/new-document
touch content/new-document/metadata.yaml
```

### 2. Write Content (YAML)

Edit `metadata.yaml` with structured content.

### 3. Test Build

```bash
make new-document
```

### 4. Iterate

Edit YAML, rebuild, review PDF. Repeat until satisfied.

### 5. Deploy

Built PDF automatically copied to `public/downloads/`.

## Best Practices

1. **Page Count**: Target page counts are in metadata - aim for consistency
2. **Content Density**: Balance text, checklists, callouts, whitespace
3. **Professional Tone**: Military/tactical language, no emoji
4. **Accuracy**: Technical accuracy is critical - review with SMEs
5. **Testing**: Build and review PDF before committing changes
6. **Version Control**: Update `version` field when making changes
7. **Consistency**: Follow established patterns from deployment-checklist

## Future Enhancements

- [ ] Markdown content support (in addition to YAML)
- [ ] Additional templates (whitepaper, technical manual)
- [ ] Automated page count verification
- [ ] Screenshot/diagram generation
- [ ] Multi-language support
- [ ] Interactive PDF forms
- [ ] CI/CD integration (auto-build on commit)

## Contributing

When adding new documents:

1. Create metadata file following YAML structure
2. Add Makefile target
3. Update `TAKResourcesSection.tsx` if public-facing
4. Build and verify PDF output
5. Update this README with new document mapping

## Support

For issues or questions:
- Check build logs: `content/<name>/<name>.log`
- Review LaTeX warnings
- Consult XeLaTeX documentation
- Test with minimal YAML first

## License

© 2026 NERV Systems. All rights reserved.

Documents generated by this system are proprietary to NERV Systems.
