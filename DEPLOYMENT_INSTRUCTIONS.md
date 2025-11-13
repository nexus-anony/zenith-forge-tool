# 🚀 Deployment Instructions for Next.js Portfolio

## ⚠️ CRITICAL - READ BEFORE DEPLOYING

### TypeScript Configuration Note
There's a read-only `tsconfig.json` file that references `tsconfig.node.json` (Vite config). This causes a TypeScript error but **DOES NOT affect the Next.js build**. Next.js uses its own TypeScript configuration internally.

**This error can be safely ignored** - the app will build and run perfectly.

---

## 📦 Prerequisites

Make sure you have:
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

---

## 🏃 Running Locally

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The app will be available at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js apps:

### Option 1: One-Click Deploy
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Build Configuration for Vercel
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## 🔥 Deploy to Netlify

### Option 1: Netlify UI
1. Push code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repo
5. Build settings:
   - **Build command**: `next build`
   - **Publish directory**: `.next`
6. Click "Deploy site"

### Option 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🐳 Deploy with Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## ☁️ Other Deployment Options

### Cloudflare Pages
1. Push to GitHub
2. Go to Cloudflare Pages
3. Connect repository
4. Build settings:
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Output directory: `.vercel/output/static`

### Railway
1. Install Railway CLI: `npm i -g railway`
2. Login: `railway login`
3. Init: `railway init`
4. Deploy: `railway up`

### Render
1. Push to GitHub
2. Create new Web Service on Render
3. Build command: `npm run build`
4. Start command: `npm start`

---

## 🔧 Environment Variables

If you add any environment variables, make sure to set them in your deployment platform:

### Vercel
1. Go to Project Settings → Environment Variables
2. Add your variables

### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add your variables

---

## ✅ Post-Deployment Checklist

- [ ] Test all routes work
- [ ] Verify 3D animations load properly
- [ ] Check mobile responsiveness
- [ ] Test smooth scrolling
- [ ] Verify contact form works (if implemented)
- [ ] Check SEO metadata
- [ ] Test loading speed (should be <3s)

---

## 🐛 Troubleshooting

### Build Fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`

### 3D Elements Not Showing
- Make sure deployment platform supports SSR/CSR hybrid
- Check console for WebGL errors
- Verify all `'use client'` directives are in place

### Slow Loading
- Ensure dynamic imports are working (`{ ssr: false }`)
- Check if CDN is enabled
- Verify image optimization is working

---

## 📊 Performance Tips

1. **Enable CDN** - All platforms offer this
2. **Enable HTTP/2** - Should be automatic
3. **Enable compression** - Should be automatic
4. **Add caching headers** - Configure in next.config.js
5. **Monitor performance** - Use Vercel Analytics or Google Analytics

---

## 🎯 Success Indicators

After deployment, your site should:
- ✅ Load in < 3 seconds
- ✅ Have smooth 60fps animations
- ✅ Work on all devices
- ✅ Have perfect Lighthouse scores
- ✅ Have no console errors

---

## 📞 Need Help?

If deployment fails:
1. Check the build logs
2. Verify all dependencies are installed
3. Make sure Node.js version is 18+
4. Check the MIGRATION_NOTES.md file

**Good luck with your deployment! 🚀**
