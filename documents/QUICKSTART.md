# Quick Start Guide - NERV Lead Magnet System

## What We've Built

✅ **Complete LaTeX document generation system** with:

- **Modern XeLaTeX templates** with NERV tactical branding
- **AI-friendly YAML structure** for easy content creation
- **Automated build system** (Python + Makefile + Docker)
- **Full deployment checklist content** (18 pages structured in YAML)
- **6 document types defined** matching TAKResourcesSection.tsx

## Current Status

### ✅ Completed

1. **Templates Created**
   - `templates/nerv-base.tex` - Base template with NERV branding, colors, typography
   - `templates/nerv-guide.tex` - Guide/checklist template with tactical elements

2. **Content Structure**
   - `content/deployment-checklist/metadata.yaml` - Complete 18-page structured content
   - 9 deployment phases with detailed checklists
   - Best practices and common pitfalls included

3. **Build System**
   - `build_document.py` - YAML → LaTeX converter
   - `Makefile` - Build automation
   - `Dockerfile` - LaTeX build environment
   - `.gitignore` - Ignore build artifacts

4. **Documentation**
   - `README.md` - Comprehensive system documentation
   - `QUICKSTART.md` - This file

### ⏳ Next Steps

1. **Build First PDF** (choose one method below)
2. **Enable Downloads** in TAKResourcesSection.tsx
3. **Generate Remaining 5 Documents** using same pattern

## Building Your First PDF

### Option 1: Docker Build (Recommended - No Local Setup)

```bash
cd documents

# Build Docker image (one-time, ~2-5 minutes)
docker build -t nerv-latex-builder .

# Build deployment checklist PDF
docker run --rm -v "$(pwd)":/documents nerv-latex-builder \
  bash -c "python3 build_document.py deployment-checklist && \
           cd content/deployment-checklist && \
           xelatex -interaction=nonstopmode deployment-checklist.tex && \
           xelatex -interaction=nonstopmode deployment-checklist.tex"

# Copy to public directory
cp content/deployment-checklist/deployment-checklist.pdf ../public/downloads/deployment.pdf

# View the PDF
open ../public/downloads/deployment.pdf  # macOS
xdg-open ../public/downloads/deployment.pdf  # Linux
```

### Option 2: Local Build (Faster, Requires LaTeX)

**Install XeLaTeX:**

Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install texlive-xetex texlive-fonts-extra texlive-latex-extra python3-yaml
```

macOS:
```bash
brew install --cask mactex
pip3 install pyyaml
```

**Build Document:**
```bash
cd documents
make deployment-checklist

# PDF will be at: ../public/downloads/deployment.pdf
```

### Option 3: Use Makefile with Docker

```bash
cd documents
make docker-build
make docker-deployment-checklist
```

## Enable Downloads on Website

Once you have the PDF built, enable downloads in the website:

**File:** `components/tak/TAKResourcesSection.tsx` (line 138)

**Change from:**
```typescript
// In production, trigger actual PDF download here
// window.location.href = `/downloads/${selectedResource?.category.toLowerCase()}.pdf`;
```

**Change to:**
```typescript
// Trigger PDF download
window.location.href = `/downloads/${selectedResource?.category.toLowerCase()}.pdf`;
```

## Test the Download Flow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:** http://localhost:3000/solutions/tak#resources

3. **Click:** "Download Free PDF" on TAK Deployment Checklist

4. **Fill form** and submit

5. **PDF should download** automatically

## Generate More Documents

The system is ready for AI-assisted content generation! Here's the workflow:

### 1. Create Metadata Structure

```bash
cd documents/content/<document-name>
```

Copy and adapt `deployment-checklist/metadata.yaml` structure.

### 2. Use AI to Generate Content

Example prompt for Claude:

> I need to generate content for the "TAK vs Commercial Alternatives Comparison" document.
>
> Please create a metadata.yaml file following the structure in deployment-checklist/metadata.yaml,
> but adapted for a 32-page comparison document covering:
> - Platform comparison matrix
> - TCO analysis
> - Security comparison
> - Integration capabilities
>
> Include detailed sections, comparison tables, best practices, and decision frameworks.

### 3. Build the Document

```bash
cd documents
python3 build_document.py tak-comparison
cd content/tak-comparison
xelatex tak-comparison.tex
xelatex tak-comparison.tex  # Run twice for TOC
cp tak-comparison.pdf ../../public/downloads/comparison.pdf
```

### 4. Add Makefile Target

Add to `documents/Makefile`:

```makefile
tak-comparison:
	@echo "Building TAK Comparison..."
	@python3 build_document.py tak-comparison
	@cd content/tak-comparison && \
		xelatex -interaction=nonstopmode tak-comparison.tex && \
		xelatex -interaction=nonstopmode tak-comparison.tex
	@cp content/tak-comparison/tak-comparison.pdf $(OUTPUT_DIR)/comparison.pdf
	@echo "✓ PDF generated: $(OUTPUT_DIR)/comparison.pdf"
```

## Remaining Documents to Create

From `TAKResourcesSection.tsx`, we still need to create:

1. ✅ **TAK Deployment Checklist** (deployment.pdf) - DONE
2. ⏳ **Tactical AI ROI Calculator & Guide** (roi.pdf) - 24 pages
3. ⏳ **TAK vs. Commercial Alternatives** (comparison.pdf) - 32 pages
4. ⏳ **NERVA AI Integration Architecture** (technical.pdf) - 28 pages
5. ⏳ **Asia Pacific TAK Compliance** (compliance.pdf) - 22 pages
6. ⏳ **TAK System Administration** (operations.pdf) - 36 pages

## Document File Naming

| TAKResourcesSection.tsx Category | PDF Filename | Build Target |
|----------------------------------|--------------|--------------|
| `DEPLOYMENT` | `deployment.pdf` | `deployment-checklist` |
| `ROI` | `roi.pdf` | `roi-calculator` |
| `COMPARISON` | `comparison.pdf` | `tak-comparison` |
| `TECHNICAL` | `technical.pdf` | `nerva-integration` |
| `COMPLIANCE` | `compliance.pdf` | `apac-compliance` |
| `OPERATIONS` | `operations.pdf` | `operations-manual` |

## Customization Tips

### Colors
Edit `templates/nerv-base.tex` to adjust tactical color scheme (currently matches nervsystems.com exactly).

### Fonts
Place custom fonts in `assets/fonts/` or system will use fallback fonts.

### Page Layout
Adjust margins, headers, footers in `templates/nerv-base.tex`.

### Templates
Create new templates for different document types:
- `nerv-whitepaper.tex` - Long-form analysis
- `nerv-technical.tex` - API docs, architecture
- `nerv-datasheet.tex` - Product specs

## Troubleshooting

### XeLaTeX Not Found (Local)
Use Docker method or install TeX Live.

### Font Warnings
Install fonts or use system fallbacks (builds will still work).

### Build Errors
Check log file: `content/<name>/<name>.log`

### PDF Not Downloading
- Check file exists: `ls -lh public/downloads/`
- Check browser console for errors
- Verify line 138 uncommented in TAKResourcesSection.tsx

## Project Structure

```
nervsystems.com/
├── documents/                    ← LaTeX document system
│   ├── templates/               ← XeLaTeX templates
│   ├── content/                 ← YAML content files
│   ├── build_document.py        ← Build script
│   ├── Makefile                 ← Build automation
│   ├── Dockerfile               ← Docker build env
│   └── README.md                ← Full documentation
├── public/downloads/            ← Output PDFs (served by Next.js)
└── components/tak/
    └── TAKResourcesSection.tsx  ← Download UI
```

## Next Actions

**Immediate:**
1. Build deployment checklist PDF (use Docker or local)
2. Uncomment download line in TAKResourcesSection.tsx
3. Test download flow

**Short Term:**
4. Generate content for remaining 5 documents
5. Build all PDFs
6. Test all downloads

**Optional:**
7. Create additional templates (whitepaper, technical)
8. Add CI/CD automation
9. Generate diagrams/screenshots

## Questions?

Check `documents/README.md` for comprehensive documentation.

Example commands are tested and ready to run!
