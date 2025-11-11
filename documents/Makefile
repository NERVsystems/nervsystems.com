# NERV Systems Document Builder Makefile
# Builds PDF documents from YAML metadata using XeLaTeX

.PHONY: all clean help deployment-checklist docker-build docker-shell install-fonts

# Document targets
DOCUMENTS := deployment-checklist
OUTPUT_DIR := ../public/downloads
BUILD_DIR := build/outputs

help:
	@echo "NERV Systems Document Builder"
	@echo "=============================="
	@echo ""
	@echo "Available targets:"
	@echo "  make all                    - Build all documents"
	@echo "  make deployment-checklist   - Build TAK Deployment Checklist"
	@echo "  make clean                  - Clean build artifacts"
	@echo "  make docker-build           - Build Docker image with XeLaTeX"
	@echo "  make docker-shell           - Enter Docker container for building"
	@echo ""
	@echo "Requirements:"
	@echo "  - XeLaTeX (texlive-xetex)"
	@echo "  - Python 3.x with PyYAML"
	@echo "  - Make"
	@echo ""
	@echo "Install on Ubuntu/Debian:"
	@echo "  sudo apt-get install texlive-xetex texlive-fonts-extra python3-yaml"
	@echo ""

all: $(DOCUMENTS)

# Generate LaTeX from YAML and build PDF
deployment-checklist:
	@echo "Building TAK Deployment Checklist..."
	@python3 build_document.py deployment-checklist
	@cd content/deployment-checklist && \
		xelatex -interaction=nonstopmode deployment-checklist.tex && \
		xelatex -interaction=nonstopmode deployment-checklist.tex
	@mkdir -p $(OUTPUT_DIR)
	@cp content/deployment-checklist/deployment-checklist.pdf $(OUTPUT_DIR)/deployment.pdf
	@cp content/deployment-checklist/deployment-checklist.pdf $(BUILD_DIR)/
	@echo "✓ PDF generated: $(OUTPUT_DIR)/deployment.pdf"

# Build using Docker (if local LaTeX not available)
docker-build:
	docker build -t nerv-latex-builder .

docker-deployment-checklist: docker-build
	docker run --rm -v $(PWD):/documents nerv-latex-builder \
		make deployment-checklist

docker-shell: docker-build
	docker run --rm -it -v $(PWD):/documents nerv-latex-builder bash

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@find content -name "*.aux" -delete
	@find content -name "*.log" -delete
	@find content -name "*.out" -delete
	@find content -name "*.toc" -delete
	@find content -name "*.pdf" -delete
	@find content -name "*.tex" -delete
	@rm -rf $(BUILD_DIR)/*
	@echo "✓ Clean complete"

# Development: Watch for changes and rebuild
watch-deployment-checklist:
	@echo "Watching deployment-checklist for changes..."
	@while true; do \
		inotifywait -e modify content/deployment-checklist/metadata.yaml; \
		make deployment-checklist; \
	done
