#!/bin/bash
# Build and optimize script

echo "🔨 Building for production..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📊 Build output:"
    ls -lh dist/
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Deployment options:"
    echo "1. Vercel: vercel deploy"
    echo "2. Netlify: netlify deploy"
    echo "3. GitHub Pages: git push"
else
    echo "❌ Build failed"
    exit 1
fi
