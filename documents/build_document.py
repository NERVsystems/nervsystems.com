#!/usr/bin/env python3
"""
NERV Systems Document Builder
Converts YAML metadata + Markdown content to LaTeX and builds PDFs using XeLaTeX
"""

import yaml
import sys
import os
from pathlib import Path
from datetime import datetime


def escape_latex(text):
    """Escape special LaTeX characters"""
    replacements = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}',
        '\\': r'\textbackslash{}',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


def load_metadata(yaml_file):
    """Load metadata from YAML file"""
    with open(yaml_file, 'r') as f:
        return yaml.safe_load(f)


def generate_checklist_document(metadata):
    """Generate LaTeX document from metadata"""

    doc = metadata['document']
    phases = metadata.get('phases', [])
    appendices = metadata.get('appendices', [])
    pitfalls = metadata.get('common_pitfalls', [])
    practices = metadata.get('best_practices', [])

    latex = []

    # Document class and template
    latex.append(r'\input{../templates/nerv-guide.tex}')
    latex.append('')

    # Document metadata
    latex.append(r'\renewcommand{\doctitle}{' + escape_latex(doc['title']) + '}')
    latex.append(r'\renewcommand{\docsubtitle}{' + escape_latex(doc['subtitle']) + '}')
    latex.append(r'\renewcommand{\docversion}{v' + doc['version'] + '}')
    latex.append(r'\renewcommand{\docdate}{' + doc['date'] + '}')
    latex.append(r'\renewcommand{\doccategory}{' + doc['category'] + '}')
    latex.append('')

    # PDF metadata
    latex.append(r'\hypersetup{')
    latex.append(r'  pdftitle={' + escape_latex(doc['title']) + '},')
    latex.append(r'  pdfauthor={NERV Systems},')
    latex.append(r'  pdfsubject={' + escape_latex(doc['subtitle']) + '},')
    latex.append(r'  pdfkeywords={TAK, ATAK, deployment, guide}')
    latex.append(r'}')
    latex.append('')

    # Begin document
    latex.append(r'\begin{document}')
    latex.append('')

    # Cover page
    latex.append(r'\makeNERVcover')
    latex.append(r'\cleardoublepage')
    latex.append('')

    # Copyright and legal
    latex.append(r'\thispagestyle{empty}')
    latex.append(r'\vspace*{\fill}')
    latex.append(r'\begin{center}')
    latex.append(r'\textcolor{tactical-dim}{')
    latex.append(r'\texttt{© ' + str(datetime.now().year) + r' NERV Systems. All rights reserved.}\\[1em]')
    latex.append(r'\small')
    latex.append(r'This document is provided for informational purposes only.\\')
    latex.append(r'No warranty is provided regarding the accuracy or completeness of information.\\')
    latex.append(r'Consult with qualified professionals for specific deployment guidance.\\[1em]')
    latex.append(r'NERV Systems\\')
    latex.append(r'nervsystems.com\\')
    latex.append(r'}')
    latex.append(r'\end{center}')
    latex.append(r'\vspace*{\fill}')
    latex.append(r'\cleardoublepage')
    latex.append('')

    # Table of contents
    latex.append(r'\tableofcontents')
    latex.append(r'\cleardoublepage')
    latex.append('')

    # Executive Summary
    latex.append(r'\chapter*{Executive Summary}')
    latex.append(r'\addcontentsline{toc}{chapter}{Executive Summary}')
    latex.append('')
    latex.append(escape_latex(doc['description']))
    latex.append('')
    latex.append(r'\begin{tacticalnote}')
    latex.append(r'\textbf{Document Overview}\\[0.5em]')
    latex.append(r'\textbf{Target Audience:} System administrators, deployment engineers, project managers\\')
    latex.append(r'\textbf{Reading Time:} ' + doc.get('reading_time', 'N/A') + r'\\')
    latex.append(r'\textbf{Implementation Time:} ' + doc.get('implementation_time', 'N/A') + r'\\')
    latex.append(r'\textbf{Topics Covered:} ' + ', '.join(doc['topics']))
    latex.append(r'\end{tacticalnote}')
    latex.append(r'\cleardoublepage')
    latex.append('')

    # Deployment Overview chapter
    latex.append(r'\chapter{Deployment Overview}')
    latex.append('')
    latex.append(r'This guide provides a comprehensive checklist for deploying TAK/ATAK systems ')
    latex.append(r'in operational environments. The deployment process is organized into ' +
                 str(len(phases)) + r' distinct phases:')
    latex.append('')
    latex.append(r'\begin{enumerate}[leftmargin=*]')
    for phase in phases:
        latex.append(r'\item \textbf{' + escape_latex(phase['name']) + r'} ' +
                     r'(\textasciitilde' + phase['duration'] + r') -- ' +
                     r'\priority{' + phase['priority'][0] + r'}')
    latex.append(r'\end{enumerate}')
    latex.append('')

    # Phase legend
    latex.append(r'\subsection*{Priority Levels}')
    latex.append(r'\begin{itemize}[leftmargin=*]')
    latex.append(r'\item \priority{C} -- CRITICAL: Must be completed for successful deployment')
    latex.append(r'\item \priority{H} -- HIGH: Important for operational effectiveness')
    latex.append(r'\item \priority{M} -- MEDIUM: Recommended for best practices')
    latex.append(r'\item \priority{L} -- LOW: Optional enhancements')
    latex.append(r'\end{itemize}')
    latex.append(r'\cleardoublepage')
    latex.append('')

    # Generate phase chapters
    for phase_idx, phase in enumerate(phases, 1):
        latex.append(r'\chapter{Phase ' + str(phase_idx) + r': ' +
                     escape_latex(phase['name']) + r'}')
        latex.append('')

        # Phase overview
        latex.append(r'\begin{tacticalnote}')
        latex.append(r'\textbf{Phase Overview}\\[0.5em]')
        latex.append(r'\textbf{Duration:} ' + phase['duration'] + r'\\')
        latex.append(r'\textbf{Priority:} ' + phase['priority'])
        latex.append(r'\end{tacticalnote}')
        latex.append('')

        # Sections within phase
        for section in phase.get('sections', []):
            latex.append(r'\section{' + escape_latex(section['title']) + r'}')
            latex.append('')
            latex.append(r'\begin{tacticalchecklist}')

            for item in section.get('items', []):
                latex.append(r'\checkitem{' + escape_latex(item) + r'}')

            latex.append(r'\end{tacticalchecklist}')
            latex.append('')

        latex.append(r'\cleardoublepage')
        latex.append('')

    # Best Practices chapter
    if practices:
        latex.append(r'\chapter{Best Practices}')
        latex.append('')
        latex.append(r'The following best practices have been identified from successful ')
        latex.append(r'TAK deployments across military, law enforcement, and emergency ')
        latex.append(r'management organizations:')
        latex.append('')
        latex.append(r'\begin{enumerate}[leftmargin=*]')
        for practice in practices:
            latex.append(r'\item ' + escape_latex(practice))
        latex.append(r'\end{enumerate}')
        latex.append(r'\cleardoublepage')
        latex.append('')

    # Common Pitfalls chapter
    if pitfalls:
        latex.append(r'\chapter{Common Pitfalls}')
        latex.append('')
        latex.append(r'Learn from others\textquotesingle{} mistakes. The following issues ')
        latex.append(r'are commonly encountered during TAK deployments:')
        latex.append('')

        for pitfall in pitfalls:
            latex.append(r'\begin{pitfall}')
            latex.append(r'\textbf{Issue:} ' + escape_latex(pitfall['issue']) + r'\\[0.5em]')
            latex.append(r'\textbf{Impact:} ' + escape_latex(pitfall['impact']) + r'\\[0.5em]')
            latex.append(r'\textbf{Mitigation:} ' + escape_latex(pitfall['mitigation']))
            latex.append(r'\end{pitfall}')
            latex.append(r'\vspace{1em}')
            latex.append('')

        latex.append(r'\cleardoublepage')
        latex.append('')

    # Appendices
    if appendices:
        latex.append(r'\appendix')
        latex.append('')

        for appendix in appendices:
            latex.append(r'\chapter{' + escape_latex(appendix['title']) + r'}')
            latex.append('')
            latex.append(escape_latex(appendix['description']))
            latex.append('')
            latex.append(r'\vspace{2em}')
            latex.append(r'\textcolor{tactical-dim}{\textit{Content to be added in future revision.}}')
            latex.append(r'\cleardoublepage')
            latex.append('')

    # Document end
    latex.append(r'\end{document}')

    return '\n'.join(latex)


def main():
    if len(sys.argv) < 2:
        print("Usage: python build_document.py <document-name>")
        print("Example: python build_document.py deployment-checklist")
        sys.exit(1)

    doc_name = sys.argv[1]
    content_dir = Path(f"content/{doc_name}")

    if not content_dir.exists():
        print(f"Error: Document directory not found: {content_dir}")
        sys.exit(1)

    metadata_file = content_dir / "metadata.yaml"
    if not metadata_file.exists():
        print(f"Error: Metadata file not found: {metadata_file}")
        sys.exit(1)

    print(f"Building document: {doc_name}")
    print(f"Loading metadata from: {metadata_file}")

    # Load metadata
    metadata = load_metadata(metadata_file)

    # Generate LaTeX
    latex_content = generate_checklist_document(metadata)

    # Write to output directory
    output_dir = content_dir
    output_file = output_dir / f"{doc_name}.tex"

    with open(output_file, 'w') as f:
        f.write(latex_content)

    print(f"Generated LaTeX file: {output_file}")
    print(f"")
    print(f"To compile the PDF, run:")
    print(f"  cd {content_dir}")
    print(f"  xelatex {doc_name}.tex")
    print(f"  xelatex {doc_name}.tex  # Run twice for TOC")


if __name__ == '__main__':
    main()
