# NERV Systems LaTeX Builder
# Docker image with XeLaTeX and modern fonts for document generation

FROM ubuntu:22.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install LaTeX and dependencies
RUN apt-get update && apt-get install -y \
    texlive-xetex \
    texlive-fonts-extra \
    texlive-latex-extra \
    texlive-science \
    python3 \
    python3-pip \
    python3-yaml \
    make \
    git \
    wget \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

# Install additional fonts
RUN apt-get update && apt-get install -y \
    fonts-firacode \
    fonts-roboto \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip3 install --no-cache-dir \
    pyyaml \
    jinja2

# Set working directory
WORKDIR /documents

# Update font cache
RUN fc-cache -f -v

# Default command
CMD ["make", "help"]
