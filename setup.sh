#!/bin/bash
# Quick setup script for WHEELS N BOOTS

echo "======================================"
echo "🚀 WHEELS N BOOTS - Modern Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "📥 Download from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js installed: $(node --version)"
echo "✅ npm installed: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "======================================"
echo "🎉 Setup Complete!"
echo "======================================"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Start development:"
echo "   npm run dev"
echo ""
echo "2. Build for production:"
echo "   npm run build"
echo ""
echo "3. Read the guides:"
echo "   - GETTING_STARTED.md (start here!)"
echo "   - MOBILE_OPTIMIZATION.md"
echo "   - SEO_OPTIMIZATION.md"
echo ""
echo "======================================"
echo "Ready to build? Start with:"
echo "npm run dev"
echo "======================================"
