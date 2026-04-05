# NERV Systems Document Builder Makefile
# Builds PDF documents from YAML metadata using XeLaTeX

.PHONY: all clean help deployment-checklist roi comparison technical compliance operations docker-build docker-shell install-fonts

# Document targets
DOCUMENTS := deployment-checklist roi comparison technical compliance operations
OUTPUT_DIR := ../public/downloads
BUILD_DIR := build/outputs

help:
	@echo "NERV Systems Document Builder"
	@echo "=============================="
	@echo ""
	@echo "Available targets:"
	@echo "  make all                    - Build all documents"
	@echo "  make deployment-checklist   - Build TAK Deployment Checklist"
	@echo "  make roi                    - Build Tactical AI ROI Calculator & Guide"
	@echo "  make comparison             - Build TAK vs. Commercial Alternatives"
	@echo "  make technical              - Build NERVA AI Integration Architecture Guide"
	@echo "  make compliance             - Build TAK Compliance & Regulations Guide"
	@echo "  make operations             - Build TAK System Administration Best Practices"
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

# Generic document build rule
define BUILD_DOC
$(1):
	@echo "Building $(1)..."
	@python3 build_document.py $(1)
	-@cd content/$(1) && \
		TEXINPUTS="../../templates:" xelatex -interaction=nonstopmode $(1).tex && \
		TEXINPUTS="../../templates:" xelatex -interaction=nonstopmode $(1).tex || true
	@test -f content/$(1)/$(1).pdf || (echo "ERROR: PDF not generated for $(1)" && exit 1)
	@mkdir -p $$(OUTPUT_DIR)
	@mkdir -p $$(BUILD_DIR)
	@cp content/$(1)/$(1).pdf $$(OUTPUT_DIR)/$(2).pdf
	@cp content/$(1)/$(1).pdf $$(BUILD_DIR)/
	@echo "✓ PDF generated: $$(OUTPUT_DIR)/$(2).pdf"
endef

$(eval $(call BUILD_DOC,deployment-checklist,deployment))
$(eval $(call BUILD_DOC,roi,roi))
$(eval $(call BUILD_DOC,comparison,comparison))
$(eval $(call BUILD_DOC,technical,technical))
$(eval $(call BUILD_DOC,compliance,compliance))
$(eval $(call BUILD_DOC,operations,operations))

# Build using Docker (if local LaTeX not available)
docker-build:
	docker build -t nerv-latex-builder .

docker-all: docker-build
	docker run --rm -v $(PWD):/documents nerv-latex-builder \
		make all

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
watch-%:
	@echo "Watching $* for changes..."
	@while true; do \
		inotifywait -e modify content/$*/metadata.yaml; \
		make $*; \
	done
